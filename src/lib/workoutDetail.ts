import type { Workout } from '../types'
import type { PaceZones } from './paceUtils'

/** 세부 구간 단계 */
export type SegmentPhase = 'warmup' | 'main' | 'cooldown' | 'recovery'

/** 훈련을 구성하는 세부 구간 한 칸 */
export interface WorkoutSegment {
  phase: SegmentPhase
  /** 구간 이름 (예: 워밍업, 템포 구간) */
  label: string
  /** 구간 거리 (km) */
  distanceKm: number
  /** 목표 페이스 (초/km), 없으면 null */
  paceSec: number | null
  /** 구간 설명 */
  detail: string
}

const round05 = (n: number) => Math.round(n * 2) / 2
const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n))

const PHASE_META: Record<
  SegmentPhase,
  { emoji: string; dot: string; chip: string }
> = {
  warmup: { emoji: '🔆', dot: 'bg-amber-400', chip: 'text-amber-600' },
  main: { emoji: '🎯', dot: 'bg-brand-500', chip: 'text-brand-600' },
  recovery: { emoji: '💨', dot: 'bg-teal-400', chip: 'text-teal-600' },
  cooldown: { emoji: '🧊', dot: 'bg-sky-400', chip: 'text-sky-600' },
}

export const segmentMeta = (phase: SegmentPhase) => PHASE_META[phase]

/**
 * 하루치 훈련을 워밍업·본 운동·쿨다운 등 세부 구간으로 분해한다.
 * 페이스 존을 사용해 각 구간의 목표 페이스를 채운다.
 */
export function buildWorkoutSegments(
  w: Workout,
  zones: PaceZones,
): WorkoutSegment[] {
  const km = w.distanceKm

  switch (w.type) {
    case 'easy': {
      const wu = round05(clamp(km * 0.25, 0.5, 1.5))
      const main = round05(Math.max(0.5, km - wu))
      return [
        {
          phase: 'warmup',
          label: '워밍업',
          distanceKm: wu,
          paceSec: zones.easy,
          detail: '천천히 출발해 점진적으로 페이스를 끌어올리며 몸을 깨우기',
        },
        {
          phase: 'main',
          label: '이지 런',
          distanceKm: main,
          paceSec: zones.easy,
          detail:
            '옆 사람과 대화할 수 있는 편안한 페이스 유지. 마지막에 4~6회 짧은 스트라이드 추천',
        },
      ]
    }

    case 'recovery': {
      return [
        {
          phase: 'recovery',
          label: '회복 조깅',
          distanceKm: km,
          paceSec: zones.recovery,
          detail:
            '아주 가볍게. 심박을 낮게 유지하며 어제의 피로를 푸는 데 집중',
        },
      ]
    }

    case 'long': {
      const wu = round05(clamp(km * 0.15, 1, 3))
      const finish = round05(clamp(km * 0.15, 1, 3))
      const main = round05(Math.max(0.5, km - wu - finish))
      return [
        {
          phase: 'warmup',
          label: '워밍업',
          distanceKm: wu,
          paceSec: zones.easy,
          detail: '이지보다 살짝 느리게 시작해 몸을 푼다',
        },
        {
          phase: 'main',
          label: '롱런 본 구간',
          distanceKm: main,
          paceSec: zones.long,
          detail: '일정한 리듬으로 거리에 적응. 수분·전해질 보충 잊지 않기',
        },
        {
          phase: 'main',
          label: '마무리 빌드업',
          distanceKm: finish,
          paceSec: round05((zones.long + zones.tempo) / 2),
          detail: '여유가 있다면 마지막 구간은 살짝 페이스를 올려 마무리',
        },
      ]
    }

    case 'tempo': {
      const wu = round05(clamp(km * 0.22, 1, 2.5))
      const cd = round05(clamp(km * 0.18, 1, 2))
      const main = round05(Math.max(0.5, km - wu - cd))
      return [
        {
          phase: 'warmup',
          label: '워밍업',
          distanceKm: wu,
          paceSec: zones.easy,
          detail: '이지 페이스로 가볍게 풀고 스트라이드 몇 회로 자극 주기',
        },
        {
          phase: 'main',
          label: '템포(역치) 구간',
          distanceKm: main,
          paceSec: zones.tempo,
          detail:
            '“편안하게 힘든” 강도로 꾸준히. 끊기지 않게 일정 페이스 유지',
        },
        {
          phase: 'cooldown',
          label: '쿨다운',
          distanceKm: cd,
          paceSec: zones.recovery,
          detail: '천천히 조깅하며 심박을 내리고 마무리',
        },
      ]
    }

    case 'interval': {
      const wu = round05(clamp(km * 0.25, 1.5, 3))
      const cd = round05(clamp(km * 0.2, 1, 2.5))
      const main = Math.max(1, km - wu - cd)
      // 반복 거리: 본 구간이 길수록 길게
      const repDist = main >= 10 ? 1.5 : main >= 6 ? 1 : 0.8
      const recDist = round05(repDist * 0.5)
      // 한 사이클 = 빠른 구간 + 회복 조깅
      const reps = Math.max(3, Math.round(main / (repDist + recDist)))
      const repLabel =
        repDist >= 1 ? `${repDist}km` : `${Math.round(repDist * 1000)}m`
      const recLabel =
        recDist >= 1 ? `${recDist}km` : `${Math.round(recDist * 1000)}m`
      return [
        {
          phase: 'warmup',
          label: '워밍업',
          distanceKm: wu,
          paceSec: zones.easy,
          detail: '충분히 풀고 스트라이드 4~6회로 빠른 페이스를 미리 자극',
        },
        {
          phase: 'main',
          label: `인터벌 ${reps} × ${repLabel}`,
          distanceKm: round05(main),
          paceSec: zones.interval,
          detail: `빠른 ${repLabel}를 ${reps}회 반복. 각 사이 ${recLabel} 회복 조깅`,
        },
        {
          phase: 'cooldown',
          label: '쿨다운',
          distanceKm: cd,
          paceSec: zones.recovery,
          detail: '천천히 조깅하며 호흡과 심박을 안정시키기',
        },
      ]
    }

    case 'race': {
      return [
        {
          phase: 'warmup',
          label: '레이스 전 워밍업',
          distanceKm: round05(clamp(km * 0.06, 1, 3)),
          paceSec: zones.easy,
          detail:
            '출발 전 가볍게 조깅 + 스트라이드로 몸을 데우기 (대회 거리에 미포함)',
        },
        {
          phase: 'main',
          label: '레이스',
          distanceKm: km,
          paceSec: zones.race,
          detail:
            '목표 레이스 페이스로! 전반부는 절제하고 후반부에 힘을 남기기',
        },
        {
          phase: 'cooldown',
          label: '쿨다운',
          distanceKm: 1,
          paceSec: zones.recovery,
          detail: '완주 후 가볍게 걷거나 조깅하며 정리',
        },
      ]
    }

    case 'rest':
      return []
  }
}
