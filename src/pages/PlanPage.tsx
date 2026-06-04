import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import WorkoutCard from '../components/WorkoutCard'
import { RACE_LABEL, formatPace, computePaceZones } from '../lib/paceUtils'

export default function PlanPage() {
  const { profile, plan, shoes, clearProfile } = useStore()
  const navigate = useNavigate()
  const [week, setWeek] = useState(0)

  if (!profile) return null

  const current = plan[week]
  const zones = computePaceZones(profile.currentPaceSec, profile.raceDistance)

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">훈련계획</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {RACE_LABEL[profile.raceDistance]} · 총 {plan.length}주 프로그램
          </p>
        </div>
        <button
          onClick={() => navigate('/onboarding')}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500"
        >
          정보 수정
        </button>
      </div>

      {/* 페이스 존 요약 */}
      <div className="mb-5 grid grid-cols-3 gap-2">
        <ZoneChip label="이지" value={`${formatPace(zones.easy)}`} />
        <ZoneChip label="템포" value={`${formatPace(zones.tempo)}`} />
        <ZoneChip label="레이스" value={`${formatPace(zones.race)}`} />
      </div>

      {/* 주차 선택 */}
      <div className="-mx-5 mb-4 flex gap-2 overflow-x-auto px-5 pb-1">
        {plan.map((w, i) => (
          <button
            key={w.weekNumber}
            onClick={() => setWeek(i)}
            className={`shrink-0 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
              i === week
                ? 'bg-brand-600 text-white shadow-soft'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {w.weekNumber}주차
          </button>
        ))}
      </div>

      {current && (
        <>
          {/* 주차 요약 */}
          <div className="mb-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                {current.phase}
                {current.isCutback && ' · 회복주'}
              </div>
              <div className="text-sm text-slate-500">
                {current.weekNumber}주차 훈련
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-extrabold">
                {current.totalKm}
                <span className="text-xs font-semibold text-slate-400">km</span>
              </div>
              <div className="text-xs text-slate-400">주간 총거리</div>
            </div>
          </div>

          {/* 운동 카드 */}
          <div className="space-y-2.5">
            {current.workouts.map((wo) => (
              <WorkoutCard
                key={wo.dayIndex}
                workout={wo}
                shoes={shoes}
                zones={zones}
              />
            ))}
          </div>
        </>
      )}

      <button
        onClick={() => {
          if (confirm('입력한 정보와 계획을 초기화할까요?')) {
            clearProfile()
            navigate('/onboarding')
          }
        }}
        className="mt-8 w-full rounded-xl py-2 text-xs font-medium text-slate-300"
      >
        계획 초기화
      </button>
    </div>
  )
}

function ZoneChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-2 py-2 text-center shadow-soft">
      <div className="text-xs font-medium text-slate-400">{label}</div>
      <div className="text-sm font-bold text-slate-700">
        {value}
        <span className="text-[10px] font-medium text-slate-400">/km</span>
      </div>
    </div>
  )
}
