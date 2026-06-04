// 공용 타입 정의

/** 목표 대회 거리 */
export type RaceDistance = '5K' | '10K' | 'Half' | 'Full'

/** 훈련(운동) 종류 */
export type WorkoutType =
  | 'rest' // 휴식
  | 'easy' // 이지 런
  | 'recovery' // 회복 런
  | 'long' // 롱런
  | 'tempo' // 템포(역치)
  | 'interval' // 인터벌(스피드)
  | 'race' // 대회 당일

/** 신발 종류/특성 */
export type ShoeCategory =
  | 'daily' // 데일리 트레이너 (쿠션)
  | 'maxCushion' // 맥스 쿠션 / 회복용
  | 'tempo' // 템포 / 경량
  | 'racing' // 레이싱 (카본 플레이트)
  | 'stability' // 안정화 (스태빌리티)
  | 'trail' // 트레일

/** 러너 프로필 (사용자 입력) */
export interface RunnerProfile {
  /** 현재 페이스 (초/km) — 예: 5분30초 => 330 */
  currentPaceSec: number
  /** 현재 주간 주행거리 (km/week) */
  weeklyKm: number
  /** 최대 단일 런 거리 (km) */
  longestRunKm: number
  /** 목표 대회 거리 */
  raceDistance: RaceDistance
  /** 대회까지 남은 주(week) 수 */
  weeksToRace: number
  /** 주당 훈련 일수 (3~6) */
  daysPerWeek: number
  /** 프로필 생성 시각 (epoch ms) — 마이그레이션/표시용 */
  createdAt: number
}

/** 하루치 훈련 */
export interface Workout {
  /** 요일 인덱스 (0=월 ... 6=일) */
  dayIndex: number
  type: WorkoutType
  /** 거리 (km), 휴식이면 0 */
  distanceKm: number
  /** 목표 페이스 (초/km), 휴식이면 null */
  targetPaceSec: number | null
  /** 한 줄 설명 */
  description: string
  /** 추천 신발 종류 (휴식이면 빈 배열) */
  recommendedShoes: ShoeCategory[]
}

/** 한 주의 훈련계획 */
export interface WeekPlan {
  /** 주차 (1부터) */
  weekNumber: number
  /** 단계 라벨 (예: 기초기, 강화기, 테이퍼) */
  phase: string
  /** 이번 주 총 거리 (km) */
  totalKm: number
  /** 회복(감량)주 여부 */
  isCutback: boolean
  workouts: Workout[]
}

/** 보유 신발 */
export interface Shoe {
  id: string
  name: string
  category: ShoeCategory
  /** 브랜드 식별자 (카탈로그에서 선택 시) */
  brand?: string
}

/** 스트레칭/쿨다운 항목 */
export interface StretchItem {
  id: string
  name: string
  /** 권장 소요 시간 (예: '30초 x 양쪽') */
  duration: string
  description: string
  /** 참고 영상 (유튜브 검색/영상 URL) */
  videoUrl: string
}

/** 부상 부위 (필터용) */
export type BodyArea = 'knee' | 'foot' | 'shin' | 'ankle' | 'hip' | 'muscle'

/** 러닝 부상 정보 */
export interface Injury {
  id: string
  /** 한글 명칭 */
  name: string
  /** 영문/의학 명칭 */
  enName: string
  area: BodyArea
  emoji: string
  /** 한 줄 요약 */
  summary: string
  /** 주요 증상 */
  symptoms: string[]
  /** 흔한 원인 */
  causes: string[]
  /** 자가 관리 — 스트레칭/강화운동/생활 */
  selfCare: string[]
  /** 권장 치료 */
  treatment: string[]
  /** 병원/전문가 진료가 필요한 신호 */
  seeDoctor: string
  /** 참고 영상 (유튜브 검색/영상 URL) */
  videoUrl: string
}
