import type { BrandInfo } from '../data/shoeCatalog'

interface Props {
  info: BrandInfo
  /** 로고 높이(px) */
  size?: number
}

/**
 * 브랜드 로고 표시.
 * - 실제 로고 SVG가 있으면 이미지로 렌더
 * - 없으면 브랜드 색상의 워드마크 텍스트로 렌더
 */
export default function BrandLogo({ info, size = 22 }: Props) {
  if (info.logo) {
    return (
      <img
        src={info.logo}
        alt={info.label}
        style={{ height: size }}
        className="w-auto object-contain"
      />
    )
  }
  return (
    <span
      style={{ color: info.color, fontSize: size * 0.8 }}
      className="font-extrabold uppercase leading-none tracking-tight"
    >
      {info.label}
    </span>
  )
}
