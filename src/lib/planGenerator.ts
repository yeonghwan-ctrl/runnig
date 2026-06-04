import type {
  RaceDistance,
  RunnerProfile,
  WeekPlan,
  Workout,
  WorkoutType,
} from '../types'
import {
  RACE_KM,
  computePaceZones,
  paceForWorkout,
  type PaceZones,
} from './paceUtils'
import { recommendedShoeTypes } from './shoeRecommender'

const DAY_NAMES = ['월', '화', '수', '목', '금', '토', '일']
export const dayName = (i: number) => DAY_NAMES[i] ?? '?'

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n))

/** 0.5km 단위 반올림 */
const round05 = (n: number) => Math.round(n * 2) / 2

/** 시작 볼륨 대비 최대 주간 볼륨 배수 (과훈련 방지 캡) */
const PEAK_VOLUME_CAP: Record<RaceDistance, number> = {
  '5K': 1.4,
  '10K': 1.5,
  Half: 1.8,
  Full: 2.0,
}

/** 거리별 목표(피크) 롱런 (km) */
const PEAK_LONG_RUN: Record<RaceDistance, number> = {
  '5K': 11,
  '10K': 15,
  Half: 26,
  Full: 32,
}

/** 거리별 테이퍼 주 수 */
const TAPER_WEEKS: Record<RaceDistance, number> = {
  '5K': 1,
  '10K': 1,
  Half: 2,
  Full: 2,
}

type Role = 'quality1' | 'quality2' | 'easy' | 'recovery' | 'long'
interface Slot {
  dayIndex: number
  role: Role
}

/** 주당 일수별 요일 배치 템플릿 (0=월 ... 6=일, 롱런은 항상 일요일) */
function weekTemplate(daysPerWeek: number): Slot[] {
  const d = clamp(Math.round(daysPerWeek), 3, 6)
  switch (d) {
    case 3:
      return [
        { dayIndex: 1, role: 'quality1' },
        { dayIndex: 3, role: 'easy' },
        { dayIndex: 6, role: 'long' },
      ]
    case 4:
      return [
        { dayIndex: 1, role: 'quality1' },
        { dayIndex: 3, role: 'easy' },
        { dayIndex: 5, role: 'easy' },
        { dayIndex: 6, role: 'long' },
      ]
    case 5:
      return [
        { dayIndex: 1, role: 'quality1' },
        { dayIndex: 2, role: 'easy' },
        { dayIndex: 4, role: 'quality2' },
        { dayIndex: 5, role: 'easy' },
        { dayIndex: 6, role: 'long' },
      ]
    default: // 6
      return [
        { dayIndex: 0, role: 'recovery' },
        { dayIndex: 1, role: 'quality1' },
        { dayIndex: 2, role: 'easy' },
        { dayIndex: 4, role: 'quality2' },
        { dayIndex: 5, role: 'easy' },
        { dayIndex: 6, role: 'long' },
      ]
  }
}

/** 거리·주차에 따른 퀄리티 훈련 종류 선택 */
function qualityPool(race: RaceDistance): WorkoutType[] {
  // 앞쪽이 우선/주력
  switch (race) {
    case '5K':
    case '10K':
      return ['interval', 'tempo']
    case 'Half':
      return ['tempo', 'interval']
    case 'Full':
      return ['tempo', 'interval']
  }
}

function qualityType(
  race: RaceDistance,
  slot: 'quality1' | 'quality2',
  weekNumber: number,
): WorkoutType {
  const pool = qualityPool(race)
  if (slot === 'quality2') return pool[1]
  // quality1: 주차에 따라 번갈아 (주력 종류 위주)
  return pool[(weekNumber - 1) % 2]
}

/** km 분배 가중치 */
function roleWeight(type: WorkoutType): number {
  switch (type) {
    case 'tempo':
      return 1.1
    case 'interval':
      return 0.9
    case 'easy':
      return 1.0
    case 'recovery':
      return 0.6
    default:
      return 1.0
  }
}

/** 훈련 설명 문구 */
function describe(
  type: WorkoutType,
  km: number,
  race: RaceDistance,
): string {
  switch (type) {
    case 'easy':
      return `편하게 대화 가능한 페이스로 ${km}km 이지 런`
    case 'recovery':
      return `아주 가볍게 ${km}km 회복 조깅 (피로 풀기)`
    case 'long':
      return `천천히 거리에 적응하는 롱런 ${km}km`
    case 'tempo':
      return `워밍업 1~2km + 역치 페이스 구간 + 쿨다운 (총 ${km}km)`
    case 'interval': {
      const reps =
        race === 'Half' || race === 'Full'
          ? '1~2km 반복 (예: 1km x 4, 사이 조깅 회복)'
          : '400m~1km 반복 (예: 1km x 4, 사이 조깅 회복)'
      return `인터벌 세션 — ${reps}, 총 ${km}km`
    }
    case 'race':
      return `🏁 대회 당일! 레이스 페이스로 ${km}km`
    case 'rest':
      return '완전 휴식 — 회복도 훈련의 일부'
  }
}

function makeWorkout(
  dayIndex: number,
  type: WorkoutType,
  km: number,
  race: RaceDistance,
  zones: PaceZones,
): Workout {
  return {
    dayIndex,
    type,
    distanceKm: km,
    targetPaceSec: paceForWorkout(type, zones),
    description: describe(type, km, race),
    recommendedShoes: recommendedShoeTypes(type),
  }
}

function restWorkout(dayIndex: number): Workout {
  return {
    dayIndex,
    type: 'rest',
    distanceKm: 0,
    targetPaceSec: null,
    description: describe('rest', 0, '5K'),
    recommendedShoes: [],
  }
}

/** 한 주의 훈련을 구성 */
function buildWeek(
  weekNumber: number,
  vol: number,
  longKm: number,
  isCutback: boolean,
  phase: string,
  isRaceWeek: boolean,
  profile: RunnerProfile,
  zones: PaceZones,
): WeekPlan {
  const template = weekTemplate(profile.daysPerWeek)
  const activeDays = new Set(template.map((s) => s.dayIndex))
  const race = profile.raceDistance

  const workouts: Workout[] = []

  if (isRaceWeek) {
    // 대회 주: 가볍게 + 대회 당일
    for (const slot of template) {
      if (slot.role === 'long') {
        workouts.push(
          makeWorkout(slot.dayIndex, 'race', RACE_KM[race], race, zones),
        )
      } else if (slot.role === 'quality1' || slot.role === 'quality2') {
        // 짧은 자극 (스트라이드 포함 이지)
        workouts.push(makeWorkout(slot.dayIndex, 'easy', 4, race, zones))
      } else {
        workouts.push(makeWorkout(slot.dayIndex, slot.role, 4, race, zones))
      }
    }
  } else {
    // 롤별 종류 확정
    const typed = template.map((slot): { day: number; type: WorkoutType } => {
      if (slot.role === 'long') return { day: slot.dayIndex, type: 'long' }
      if (slot.role === 'easy') return { day: slot.dayIndex, type: 'easy' }
      if (slot.role === 'recovery')
        return { day: slot.dayIndex, type: 'recovery' }
      return { day: slot.dayIndex, type: qualityType(race, slot.role, weekNumber) }
    })

    // 롱런 외 거리 분배
    const remaining = Math.max(0, vol - longKm)
    const nonLong = typed.filter((t) => t.type !== 'long')
    const weightSum = nonLong.reduce((s, t) => s + roleWeight(t.type), 0) || 1

    for (const t of typed) {
      if (t.type === 'long') {
        workouts.push(
          makeWorkout(t.day, 'long', round05(longKm), race, zones),
        )
        continue
      }
      let km = round05((remaining * roleWeight(t.type)) / weightSum)
      const min = t.type === 'recovery' ? 3 : t.type === 'interval' ? 4 : 3
      km = Math.max(min, km)
      workouts.push(makeWorkout(t.day, t.type, km, race, zones))
    }
  }

  // 비활성 요일은 휴식으로 채움
  for (let d = 0; d < 7; d++) {
    if (!activeDays.has(d)) workouts.push(restWorkout(d))
  }
  workouts.sort((a, b) => a.dayIndex - b.dayIndex)

  const totalKm = round05(
    workouts.reduce((s, w) => s + w.distanceKm, 0),
  )

  return { weekNumber, phase, totalKm, isCutback, workouts }
}

function phaseLabel(
  weekNumber: number,
  buildWeeks: number,
  isCutback: boolean,
  isTaper: boolean,
  isRaceWeek: boolean,
): string {
  if (isRaceWeek) return '대회 주'
  if (isTaper) return '테이퍼·조정'
  if (isCutback) return '회복(감량)'
  const frac = buildWeeks <= 1 ? 1 : weekNumber / buildWeeks
  if (frac <= 0.4) return '기초 적응'
  if (frac <= 0.75) return '강화'
  return '피크'
}

/**
 * 러너 프로필로부터 전체 주간 훈련계획을 생성한다.
 * 규칙 기반: 점진적 과부하 + 4주마다 회복주 + 대회 전 테이퍼.
 */
export function generatePlan(profile: RunnerProfile): WeekPlan[] {
  const zones = computePaceZones(profile.currentPaceSec, profile.raceDistance)
  const race = profile.raceDistance
  const totalWeeks = clamp(profile.weeksToRace, 1, 24)

  let taper = TAPER_WEEKS[race]
  let build: number
  if (totalWeeks === 1) {
    taper = 1
    build = 0
  } else {
    taper = Math.min(taper, totalWeeks - 1)
    build = totalWeeks - taper
  }

  const startVol = Math.max(profile.weeklyKm, 10)
  const peakVol = startVol * PEAK_VOLUME_CAP[race]
  const startLong = Math.max(profile.longestRunKm, Math.round(startVol * 0.3), 5)
  const peakLong = Math.max(PEAK_LONG_RUN[race], startLong)

  const plan: WeekPlan[] = []

  // --- 빌드 구간 ---
  for (let w = 1; w <= build; w++) {
    const frac = build <= 1 ? 1 : (w - 1) / (build - 1)
    const isCutback = w % 4 === 0 && w !== build
    let vol = startVol + (peakVol - startVol) * frac
    let longKm = startLong + (peakLong - startLong) * frac
    if (isCutback) {
      vol *= 0.75
      longKm *= 0.8
    }
    // 롱런이 주간 볼륨의 55%를 넘지 않도록 (안전)
    longKm = Math.min(longKm, vol * 0.55)
    longKm = Math.max(longKm, 5)

    plan.push(
      buildWeek(
        w,
        round05(vol),
        longKm,
        isCutback,
        phaseLabel(w, build, isCutback, false, false),
        false,
        profile,
        zones,
      ),
    )
  }

  // --- 테이퍼 + 대회 주 ---
  // 테이퍼 볼륨 비율 (마지막이 대회 주)
  const taperFracs =
    taper >= 2 ? [0.65, 0.45] : [0.5]
  // taper 수에 맞춰 자르기/채우기
  const fracs = taperFracs.slice(-taper)
  for (let i = 0; i < taper; i++) {
    const weekNumber = build + i + 1
    const isRaceWeek = i === taper - 1
    const vol = round05(peakVol * (fracs[i] ?? 0.45))
    const longKm = Math.min(peakLong * 0.6, vol * 0.5)
    plan.push(
      buildWeek(
        weekNumber,
        vol,
        Math.max(longKm, 5),
        false,
        phaseLabel(weekNumber, build, false, true, isRaceWeek),
        isRaceWeek,
        profile,
        zones,
      ),
    )
  }

  return plan
}
