import type { Shoe, Workout } from '../types'
import { dayName } from '../lib/planGenerator'
import { formatPace } from '../lib/paceUtils'
import { WORKOUT_META } from '../lib/workoutMeta'
import { matchShoeForWorkout } from '../lib/shoeRecommender'
import { SHOE_EMOJI, SHOE_LABEL } from '../data/shoeTypes'

export default function WorkoutCard({
  workout,
  shoes,
}: {
  workout: Workout
  shoes: Shoe[]
}) {
  const meta = WORKOUT_META[workout.type]
  const isRest = workout.type === 'rest'

  if (isRest) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-200 px-4 py-3 text-slate-400">
        <DayBadge day={workout.dayIndex} muted />
        <span className="text-sm font-medium">휴식 · 회복</span>
      </div>
    )
  }

  const match = matchShoeForWorkout(workout.type, shoes)

  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3.5 shadow-soft">
      <div className="flex items-center gap-3">
        <DayBadge day={workout.dayIndex} />
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${meta.badge}`}
        >
          {meta.emoji} {meta.label}
        </span>
        <div className="ml-auto text-right">
          <div className="text-lg font-extrabold leading-none">
            {workout.distanceKm}
            <span className="text-xs font-semibold text-slate-400">km</span>
          </div>
          {workout.targetPaceSec != null && (
            <div className="text-xs font-medium text-slate-400">
              {formatPace(workout.targetPaceSec)}/km
            </div>
          )}
        </div>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {workout.description}
      </p>

      <div className="mt-2.5 flex items-center gap-1.5 text-xs">
        {match.bestOwned ? (
          <span className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-2 py-1 font-semibold text-brand-700">
            {SHOE_EMOJI[match.bestOwned.category]} 추천 신발:{' '}
            {match.bestOwned.name}
          </span>
        ) : match.needsPurchaseHint ? (
          <span className="text-slate-400">
            👟 추천 특성: {match.idealLabels.slice(0, 2).join(' / ')}
          </span>
        ) : (
          <span className="text-slate-400">
            👟 추천 특성:{' '}
            {workout.recommendedShoes
              .slice(0, 2)
              .map((c) => SHOE_LABEL[c])
              .join(' / ')}
          </span>
        )}
      </div>
    </div>
  )
}

function DayBadge({ day, muted }: { day: number; muted?: boolean }) {
  const isWeekend = day >= 5
  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
        muted
          ? 'bg-slate-50 text-slate-300'
          : isWeekend
            ? 'bg-brand-50 text-brand-700'
            : 'bg-slate-100 text-slate-600'
      }`}
    >
      {dayName(day)}
    </div>
  )
}
