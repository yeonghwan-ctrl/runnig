import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { parsePace, formatPace, RACE_LABEL } from '../lib/paceUtils'
import type { RaceDistance } from '../types'

const RACES: RaceDistance[] = ['5K', '10K', 'Half', 'Full']

export default function Onboarding() {
  const { profile, setProfile } = useStore()
  const navigate = useNavigate()

  const [pace, setPace] = useState(
    profile ? formatPace(profile.currentPaceSec) : '',
  )
  const [weeklyKm, setWeeklyKm] = useState(
    profile ? String(profile.weeklyKm) : '',
  )
  const [longestRunKm, setLongestRunKm] = useState(
    profile ? String(profile.longestRunKm) : '',
  )
  const [raceDistance, setRaceDistance] = useState<RaceDistance>(
    profile?.raceDistance ?? 'Half',
  )
  const [weeksToRace, setWeeksToRace] = useState(
    profile ? String(profile.weeksToRace) : '12',
  )
  const [daysPerWeek, setDaysPerWeek] = useState(
    profile ? profile.daysPerWeek : 4,
  )
  const [error, setError] = useState('')

  const submit = () => {
    const paceSec = parsePace(pace)
    const wk = Number(weeklyKm)
    const lr = Number(longestRunKm)
    const wtr = Number(weeksToRace)

    if (!paceSec) {
      setError('페이스를 "분:초" 형태(예: 5:30)로 입력해주세요.')
      return
    }
    if (!wk || wk <= 0) {
      setError('현재 주간 주행거리를 입력해주세요.')
      return
    }
    if (!lr || lr <= 0) {
      setError('최근 가장 길게 뛴 거리를 입력해주세요.')
      return
    }
    if (!wtr || wtr < 1) {
      setError('대회까지 남은 주 수를 입력해주세요.')
      return
    }

    setProfile({
      currentPaceSec: paceSec,
      weeklyKm: wk,
      longestRunKm: lr,
      raceDistance,
      weeksToRace: Math.round(wtr),
      daysPerWeek,
      createdAt: Date.now(),
    })
    navigate('/plan')
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">RunPlan</h1>
        <p className="mt-1 text-sm text-slate-500">
          내 정보를 입력하면 맞춤 주간 훈련계획을 만들어 드려요.
        </p>
      </div>

      <div className="space-y-5">
        <Field label="현재 페이스" hint="1km당 기록 (예: 5:30)">
          <input
            inputMode="numeric"
            value={pace}
            onChange={(e) => setPace(e.target.value)}
            placeholder="5:30"
            className={inputCls}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="주간 주행거리" hint="km / 주">
            <input
              inputMode="numeric"
              value={weeklyKm}
              onChange={(e) => setWeeklyKm(e.target.value)}
              placeholder="20"
              className={inputCls}
            />
          </Field>
          <Field label="최대 롱런" hint="최근 가장 긴 거리(km)">
            <input
              inputMode="numeric"
              value={longestRunKm}
              onChange={(e) => setLongestRunKm(e.target.value)}
              placeholder="10"
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="목표 대회">
          <div className="grid grid-cols-4 gap-2">
            {RACES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRaceDistance(r)}
                className={`rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                  raceDistance === r
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                {r === 'Half' ? '하프' : r === 'Full' ? '풀' : r}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-slate-400">
            {RACE_LABEL[raceDistance]} 목표
          </p>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="대회까지" hint="남은 주(week) 수">
            <input
              inputMode="numeric"
              value={weeksToRace}
              onChange={(e) => setWeeksToRace(e.target.value)}
              placeholder="12"
              className={inputCls}
            />
          </Field>
          <Field label="주당 훈련 일수">
            <div className="flex gap-1.5">
              {[3, 4, 5, 6].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDaysPerWeek(d)}
                  className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                    daysPerWeek === d
                      ? 'border-brand-500 bg-brand-50 text-brand-700'
                      : 'border-slate-200 text-slate-500'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </Field>
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          onClick={submit}
          className="w-full rounded-2xl bg-brand-600 py-3.5 text-base font-bold text-white shadow-soft transition-colors hover:bg-brand-700 active:bg-brand-700"
        >
          훈련계획 만들기
        </button>
      </div>
    </div>
  )
}

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-base font-medium outline-none transition-colors focus:border-brand-400 focus:bg-white'

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
      </label>
      {children}
    </div>
  )
}
