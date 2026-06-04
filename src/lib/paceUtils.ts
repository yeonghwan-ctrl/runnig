import type { RaceDistance, WorkoutType } from '../types'

/** "5:30" 또는 "5분30초" 형태 -> 초/km. 파싱 실패 시 null */
export function parsePace(input: string): number | null {
  const trimmed = input.trim()
  if (!trimmed) return null
  // 콜론 형태: m:ss
  const colon = trimmed.match(/^(\d{1,2})\s*[:분]\s*(\d{1,2})/)
  if (colon) {
    const m = Number(colon[1])
    const s = Number(colon[2])
    if (s >= 60) return null
    return m * 60 + s
  }
  // 분 단위 소수: "5.5" => 5분30초
  const dec = Number(trimmed)
  if (!Number.isNaN(dec) && dec > 0) {
    const m = Math.floor(dec)
    const s = Math.round((dec - m) * 60)
    return m * 60 + s
  }
  return null
}

/** 초/km -> "5:30" 형태 문자열 */
export function formatPace(sec: number | null): string {
  if (sec == null) return '-'
  const rounded = Math.round(sec)
  const m = Math.floor(rounded / 60)
  const s = rounded % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** 초/km -> "5분 30초" 한글 표기 */
export function formatPaceKo(sec: number | null): string {
  if (sec == null) return '-'
  const rounded = Math.round(sec)
  const m = Math.floor(rounded / 60)
  const s = rounded % 60
  return s === 0 ? `${m}분` : `${m}분 ${s}초`
}

export const RACE_KM: Record<RaceDistance, number> = {
  '5K': 5,
  '10K': 10,
  Half: 21.1,
  Full: 42.2,
}

export const RACE_LABEL: Record<RaceDistance, string> = {
  '5K': '5K',
  '10K': '10K',
  Half: '하프 마라톤',
  Full: '풀 마라톤',
}

/**
 * 페이스 존 계산.
 * 입력 currentPace는 보통 최근 5K~10K 페이스에 가까운 값으로 가정.
 * 각 존은 현재 페이스 대비 상대 보정 (초/km).
 */
export interface PaceZones {
  easy: number
  recovery: number
  long: number
  tempo: number
  interval: number
  race: number
}

export function computePaceZones(
  currentPaceSec: number,
  raceDistance: RaceDistance,
): PaceZones {
  // 목표 레이스 페이스: 거리가 길수록 현재 페이스보다 느리게 잡힘
  const raceAdj: Record<RaceDistance, number> = {
    '5K': -5,
    '10K': 10,
    Half: 25,
    Full: 45,
  }
  return {
    easy: currentPaceSec + 75,
    recovery: currentPaceSec + 95,
    long: currentPaceSec + 70,
    tempo: currentPaceSec - 12,
    interval: currentPaceSec - 30,
    race: currentPaceSec + raceAdj[raceDistance],
  }
}

/** 훈련 종류에 맞는 목표 페이스 반환 */
export function paceForWorkout(
  type: WorkoutType,
  zones: PaceZones,
): number | null {
  switch (type) {
    case 'easy':
      return zones.easy
    case 'recovery':
      return zones.recovery
    case 'long':
      return zones.long
    case 'tempo':
      return zones.tempo
    case 'interval':
      return zones.interval
    case 'race':
      return zones.race
    case 'rest':
      return null
  }
}
