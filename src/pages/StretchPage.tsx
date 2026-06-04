import { useState } from 'react'
import { PRE_RUN_STRETCHES, POST_RUN_STRETCHES } from '../data/stretches'
import type { StretchItem } from '../types'

type Tab = 'pre' | 'post'

export default function StretchPage() {
  const [tab, setTab] = useState<Tab>('pre')
  const items = tab === 'pre' ? PRE_RUN_STRETCHES : POST_RUN_STRETCHES

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">스트레칭</h1>
      <p className="mt-0.5 text-sm text-slate-500">
        부상 예방을 위해 러닝 전후로 꼭 챙기세요.
      </p>

      {/* 탭 */}
      <div className="mt-5 grid grid-cols-2 gap-1 rounded-2xl bg-slate-100 p-1">
        <TabButton active={tab === 'pre'} onClick={() => setTab('pre')}>
          🔥 러닝 전 (워밍업)
        </TabButton>
        <TabButton active={tab === 'post'} onClick={() => setTab('post')}>
          🧘 러닝 후 (쿨다운)
        </TabButton>
      </div>

      <p className="mt-3 rounded-xl bg-brand-50 px-3.5 py-2.5 text-xs leading-relaxed text-brand-700">
        {tab === 'pre'
          ? '동적 스트레칭으로 체온과 가동범위를 올려 부드럽게 출발하세요.'
          : '정적 스트레칭으로 근육을 늘이고 천천히 회복하세요.'}
      </p>

      <div className="mt-4 space-y-2.5">
        {items.map((item) => (
          <StretchCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

function StretchCard({ item }: { item: StretchItem }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3.5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-bold text-slate-800">{item.name}</h3>
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
          ⏱ {item.duration}
        </span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
        {item.description}
      </p>
      <a
        href={item.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-semibold text-red-500"
      >
        ▶ 영상으로 보기
      </a>
    </div>
  )
}

function TabButton({
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
      className={`rounded-xl py-2.5 text-sm font-semibold transition-colors ${
        active ? 'bg-white text-slate-800 shadow-soft' : 'text-slate-400'
      }`}
    >
      {children}
    </button>
  )
}
