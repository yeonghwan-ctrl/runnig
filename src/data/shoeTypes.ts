import type { ShoeCategory } from '../types'

export interface ShoeCategoryInfo {
  category: ShoeCategory
  label: string
  /** 특성 한 줄 설명 */
  blurb: string
  emoji: string
}

export const SHOE_CATEGORIES: ShoeCategoryInfo[] = [
  {
    category: 'daily',
    label: '데일리 트레이너',
    blurb: '적당한 쿠션과 내구성. 대부분의 이지/일상 훈련에 두루 적합',
    emoji: '👟',
  },
  {
    category: 'maxCushion',
    label: '맥스 쿠션 / 회복용',
    blurb: '두툼한 쿠션으로 충격 흡수. 롱런과 회복 런에 부담을 줄여줌',
    emoji: '☁️',
  },
  {
    category: 'tempo',
    label: '템포 / 경량',
    blurb: '가볍고 반발력 있는 신발. 템포·역치 훈련에 적합',
    emoji: '⚡',
  },
  {
    category: 'racing',
    label: '레이싱 (카본)',
    blurb: '카본 플레이트로 추진력 극대화. 인터벌·대회 당일용',
    emoji: '🏆',
  },
  {
    category: 'stability',
    label: '안정화 (스태빌리티)',
    blurb: '발목 안쪽 지지. 과회내(오버프로네이션) 러너의 일상 훈련에',
    emoji: '🦶',
  },
  {
    category: 'trail',
    label: '트레일',
    blurb: '거친 노면용 아웃솔과 보호. 비포장·산길 러닝에',
    emoji: '⛰️',
  },
]

export const SHOE_LABEL: Record<ShoeCategory, string> = Object.fromEntries(
  SHOE_CATEGORIES.map((c) => [c.category, c.label]),
) as Record<ShoeCategory, string>

export const SHOE_EMOJI: Record<ShoeCategory, string> = Object.fromEntries(
  SHOE_CATEGORIES.map((c) => [c.category, c.emoji]),
) as Record<ShoeCategory, string>
