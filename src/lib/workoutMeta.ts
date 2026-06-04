import type { WorkoutType } from '../types'

export interface WorkoutMeta {
  label: string
  /** Tailwind 배경/글자색 클래스 */
  badge: string
  emoji: string
}

export const WORKOUT_META: Record<WorkoutType, WorkoutMeta> = {
  rest: { label: '휴식', badge: 'bg-slate-100 text-slate-400', emoji: '🛌' },
  easy: { label: '이지 런', badge: 'bg-sky-100 text-sky-700', emoji: '🏃' },
  recovery: {
    label: '회복 런',
    badge: 'bg-teal-100 text-teal-700',
    emoji: '🌿',
  },
  long: { label: '롱런', badge: 'bg-indigo-100 text-indigo-700', emoji: '🛣️' },
  tempo: {
    label: '템포',
    badge: 'bg-amber-100 text-amber-700',
    emoji: '⚡',
  },
  interval: {
    label: '인터벌',
    badge: 'bg-rose-100 text-rose-700',
    emoji: '🔥',
  },
  race: { label: '대회', badge: 'bg-brand-600 text-white', emoji: '🏁' },
}
