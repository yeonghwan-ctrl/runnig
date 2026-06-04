import { useState } from 'react'
import { INJURIES, BODY_AREAS, AREA_LABEL } from '../data/injuries'
import type { BodyArea, Injury } from '../types'

export default function InjuryPage() {
  const [area, setArea] = useState<BodyArea | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const list =
    area === 'all' ? INJURIES : INJURIES.filter((i) => i.area === area)

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">부상 가이드</h1>
      <p className="mt-0.5 text-sm text-slate-500">
        러너에게 흔한 부상의 증상·원인과 자가관리·치료법을 알아보세요.
      </p>

      {/* 면책 안내 */}
      <p className="mt-3 rounded-xl bg-amber-50 px-3.5 py-2.5 text-xs leading-relaxed text-amber-700">
        ⚠️ 일반적인 참고 정보이며 의학적 진단을 대체하지 않습니다. 통증이
        심하거나 지속되면 전문의의 진료를 받으세요.
      </p>

      {/* 부위 필터 */}
      <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1">
        <FilterChip active={area === 'all'} onClick={() => setArea('all')}>
          전체
        </FilterChip>
        {BODY_AREAS.map((a) => (
          <FilterChip
            key={a.area}
            active={area === a.area}
            onClick={() => setArea(a.area)}
          >
            {a.emoji} {a.label}
          </FilterChip>
        ))}
      </div>

      {/* 부상 카드 목록 */}
      <div className="mt-4 space-y-2.5">
        {list.map((injury) => (
          <InjuryCard
            key={injury.id}
            injury={injury}
            open={openId === injury.id}
            onToggle={() =>
              setOpenId((cur) => (cur === injury.id ? null : injury.id))
            }
          />
        ))}
      </div>
    </div>
  )
}

function InjuryCard({
  injury,
  open,
  onToggle,
}: {
  injury: Injury
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
      >
        <span className="text-2xl">{injury.emoji}</span>
        <div className="min-w-0 flex-1">
          <div className="font-bold text-slate-800">{injury.name}</div>
          <div className="truncate text-xs text-slate-400">
            {AREA_LABEL[injury.area]} · {injury.summary}
          </div>
        </div>
        <span
          className={`shrink-0 text-slate-300 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="space-y-4 border-t border-slate-100 px-4 pb-4 pt-3.5">
          <Section title="주요 증상" emoji="🔎" items={injury.symptoms} />
          <Section title="흔한 원인" emoji="⚠️" items={injury.causes} />
          <Section
            title="자가 관리 (스트레칭·강화)"
            emoji="🧘"
            items={injury.selfCare}
            accent
          />
          <Section title="권장 치료" emoji="💊" items={injury.treatment} />

          <div className="rounded-xl bg-red-50 px-3.5 py-2.5">
            <div className="text-xs font-bold text-red-600">
              🏥 이럴 땐 병원으로
            </div>
            <p className="mt-1 text-sm leading-relaxed text-red-700">
              {injury.seeDoctor}
            </p>
          </div>

          <a
            href={injury.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-500"
          >
            ▶ 재활 운동 영상 보기
          </a>
        </div>
      )}
    </div>
  )
}

function Section({
  title,
  emoji,
  items,
  accent,
}: {
  title: string
  emoji: string
  items: string[]
  accent?: boolean
}) {
  return (
    <div>
      <div
        className={`mb-1.5 text-xs font-bold ${
          accent ? 'text-brand-600' : 'text-slate-700'
        }`}
      >
        {emoji} {title}
      </div>
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex gap-2 text-sm leading-relaxed text-slate-600"
          >
            <span className={accent ? 'text-brand-500' : 'text-slate-300'}>
              •
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
        active ? 'bg-brand-600 text-white shadow-soft' : 'bg-slate-100 text-slate-500'
      }`}
    >
      {children}
    </button>
  )
}
