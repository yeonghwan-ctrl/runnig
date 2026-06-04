import type { Shoe, ShoeCategory, WorkoutType } from '../types'
import { SHOE_LABEL } from '../data/shoeTypes'

/**
 * 훈련 종류별로 "이상적인" 신발 특성(우선순위 순).
 */
export const IDEAL_SHOES: Record<WorkoutType, ShoeCategory[]> = {
  rest: [],
  easy: ['daily', 'maxCushion', 'stability'],
  recovery: ['maxCushion', 'daily'],
  long: ['maxCushion', 'daily', 'stability'],
  tempo: ['tempo', 'racing', 'daily'],
  interval: ['racing', 'tempo'],
  race: ['racing', 'tempo'],
}

/** 훈련 종류에 추천하는 신발 특성 목록 */
export function recommendedShoeTypes(type: WorkoutType): ShoeCategory[] {
  return IDEAL_SHOES[type]
}

export interface ShoeMatch {
  /** 보유 신발 중 이 훈련에 가장 적합한 신발 (없으면 null) */
  bestOwned: Shoe | null
  /** 추천 특성 라벨 (보유 여부와 무관) */
  idealLabels: string[]
  /** 보유 신발이 없어 구매 가이드를 보여줄지 */
  needsPurchaseHint: boolean
}

/**
 * 보유 신발 목록에서 해당 훈련에 가장 적합한 신발을 고른다.
 * 이상적 특성 우선순위가 높은 신발을 우선 선택.
 */
export function matchShoeForWorkout(
  type: WorkoutType,
  owned: Shoe[],
): ShoeMatch {
  const ideal = IDEAL_SHOES[type]
  const idealLabels = ideal.map((c) => SHOE_LABEL[c])

  if (type === 'rest') {
    return { bestOwned: null, idealLabels: [], needsPurchaseHint: false }
  }

  let best: Shoe | null = null
  let bestRank = Infinity
  for (const shoe of owned) {
    const rank = ideal.indexOf(shoe.category)
    if (rank !== -1 && rank < bestRank) {
      best = shoe
      bestRank = rank
    }
  }

  // 이상적 특성에 맞는 신발이 없으면, 보유 신발 중 아무거나(데일리 우선)로 대체 제안
  if (!best && owned.length > 0) {
    best =
      owned.find((s) => s.category === 'daily') ??
      owned.find((s) => s.category === 'maxCushion') ??
      owned[0]
  }

  return {
    bestOwned: best,
    idealLabels,
    needsPurchaseHint: owned.length === 0,
  }
}
