import { useState } from 'react'
import { useStore } from '../store'
import { SHOE_CATEGORIES } from '../data/shoeTypes'
import {
  BRANDS,
  BRAND_LABEL,
  SHOE_CATALOG,
  type ShoeBrand,
  type CatalogShoe,
} from '../data/shoeCatalog'
import BrandLogo from '../components/BrandLogo'
import { IDEAL_SHOES } from '../lib/shoeRecommender'
import { WORKOUT_META } from '../lib/workoutMeta'
import type { WorkoutType } from '../types'

const USAGE_TYPES: WorkoutType[] = [
  'easy',
  'long',
  'recovery',
  'tempo',
  'interval',
  'race',
]

export default function ShoesPage() {
  const { shoes, addShoe, removeShoe } = useStore()
  const [brand, setBrand] = useState<ShoeBrand | null>(null)

  const addCatalogShoe = (b: ShoeBrand, shoe: CatalogShoe) => {
    addShoe({
      id: `${Date.now()}-${Math.round(Math.random() * 1e6)}`,
      name: `${BRAND_LABEL[b]} ${shoe.model}`,
      category: shoe.category,
      brand: b,
    })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">내 신발</h1>
      <p className="mt-0.5 text-sm text-slate-500">
        브랜드에서 보유한 러닝화를 선택해 저장하면 훈련별로 알맞은 신발을
        추천해 드려요.
      </p>

      {/* 1단계: 브랜드 선택 */}
      <h2 className="mb-2 mt-5 text-sm font-bold text-slate-700">
        1. 브랜드 선택
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {BRANDS.map((b) => (
          <button
            key={b.brand}
            type="button"
            onClick={() => setBrand((cur) => (cur === b.brand ? null : b.brand))}
            className={`flex h-16 items-center justify-center rounded-2xl border px-2 transition-colors ${
              brand === b.brand
                ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-300'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <BrandLogo info={b} />
          </button>
        ))}
      </div>

      {/* 2단계: 러닝화 모델 선택 */}
      {brand && (
        <>
          <h2 className="mb-2 mt-6 text-sm font-bold text-slate-700">
            2. {BRAND_LABEL[brand]} 러닝화 선택
          </h2>
          <div className="space-y-2">
            {SHOE_CATALOG[brand].map((shoe) => {
              const info = SHOE_CATEGORIES.find(
                (c) => c.category === shoe.category,
              )
              return (
                <button
                  key={shoe.model}
                  type="button"
                  onClick={() => addCatalogShoe(brand, shoe)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-left shadow-soft transition-colors hover:border-brand-400 hover:bg-brand-50"
                >
                  <span className="text-2xl">{info?.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold text-slate-800">
                      {shoe.model}
                    </div>
                    <div className="text-xs text-slate-400">{info?.label}</div>
                  </div>
                  <span className="rounded-lg bg-brand-600 px-2.5 py-1 text-xs font-bold text-white">
                    추가
                  </span>
                </button>
              )
            })}
          </div>
        </>
      )}

      {/* 보유 신발 목록 */}
      <h2 className="mb-2 mt-7 text-sm font-bold text-slate-700">
        보유 신발 ({shoes.length})
      </h2>
      {shoes.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-400">
          아직 등록한 신발이 없어요. 위에서 브랜드와 러닝화를 선택해 보세요.
        </p>
      ) : (
        <div className="space-y-2">
          {shoes.map((s) => {
            const info = SHOE_CATEGORIES.find((c) => c.category === s.category)
            return (
              <div
                key={s.id}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-soft"
              >
                <span className="text-2xl">{info?.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold text-slate-800">
                    {s.name}
                  </div>
                  <div className="text-xs text-slate-400">{info?.label}</div>
                </div>
                <button
                  onClick={() => removeShoe(s.id)}
                  className="rounded-lg px-2 py-1 text-xs font-medium text-slate-300 hover:text-red-500"
                >
                  삭제
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* 훈련별 추천 가이드 */}
      <h2 className="mb-2 mt-7 text-sm font-bold text-slate-700">
        훈련별 추천 신발
      </h2>
      <div className="space-y-2">
        {USAGE_TYPES.map((t) => {
          const meta = WORKOUT_META[t]
          const owned = shoes.filter((s) => IDEAL_SHOES[t].includes(s.category))
          return (
            <div
              key={t}
              className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-soft"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${meta.badge}`}
                >
                  {meta.emoji} {meta.label}
                </span>
                <span className="text-xs text-slate-400">
                  {IDEAL_SHOES[t]
                    .map(
                      (c) =>
                        SHOE_CATEGORIES.find((x) => x.category === c)?.label,
                    )
                    .join(' / ')}
                </span>
              </div>
              {owned.length > 0 ? (
                <p className="mt-1.5 text-sm font-medium text-brand-700">
                  ✅ 추천: {owned.map((s) => s.name).join(', ')}
                </p>
              ) : (
                <p className="mt-1.5 text-sm text-slate-400">
                  적합한 신발이 없어요 — 위 특성의 러닝화를 골라 보세요.
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
