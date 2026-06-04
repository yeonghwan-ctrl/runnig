import { useState } from 'react'
import type { Shoe, Workout } from '../types'
import { dayName } from '../lib/planGenerator'
import { formatPace } from '../lib/paceUtils'
import type { PaceZones } from '../lib/paceUtils'
import { WORKOUT_META } from '../lib/workoutMeta'
import { buildWorkoutSegments, segmentMeta } from '../lib/workoutDetail'
import { matchShoeForWorkout } from '../lib/shoeRecommender'
import { SHOE_EMOJI, SHOE_LABEL } from '../data/shoeTypes'

export default function WorkoutCard({
  workout,
  shoes,
  zones,
}: {
  workout: Workout
  shoes: Shoe[]
  zones: PaceZones
}) {
  const [open, setOpen] = useState(false)
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
  const segments = buildWorkoutSegments(workout, zones)

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-4 py-3.5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <DayBadge day={workout.dayIndex} />
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${meta.badge}`}
          >
            {meta.emoji} {meta.label}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <div className="text-right">
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
            <svg
              className={`h-4 w-4 shrink-0 text-slate-300 transition-transform ${
                open ? 'rotate-180' : ''
              }`}
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                d="M5 7.5l5 5 5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {workout.description}
        </p>

        {!open && (
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
            <span className="ml-auto font-medium text-brand-400">
              자세히 보기
            </span>
          </div>
        )}
      </button>

      {open && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3.5">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            훈련 구성
          </div>
          <ol className="space-y-3">
            {segments.map((seg, i) => {
              const sm = segmentMeta(seg.phase)
              const last = i === segments.length - 1
              return (
                <li key={i} className="relative flex gap-3">
                  {/* 타임라인 라인 + 점 */}
                  <div className="flex flex-col items-center">
                    <span
                      className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${sm.dot}`}
                    />
                    {!last && (
                      <span className="mt-0.5 w-px flex-1 bg-slate-200" />
                    )}
                  </div>
                  <div className="flex-1 pb-0.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-bold text-slate-700">
                        {sm.emoji} {seg.label}
                      </span>
                      <span className="shrink-0 text-xs font-semibold text-slate-500">
                        {seg.distanceKm}km
                        {seg.paceSec != null && (
                          <span className={`ml-1 ${sm.chip}`}>
                            {formatPace(seg.paceSec)}/km
                          </span>
                        )}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                      {seg.detail}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* 추천 신발 */}
          <div className="mt-3.5 flex items-center gap-1.5 border-t border-slate-200/70 pt-3 text-xs">
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
                  .map((c) => SHOE_LABEL[c])
                  .join(' / ')}
              </span>
            )}
          </div>
        </div>
      )}
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
