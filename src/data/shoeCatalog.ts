import type { ShoeCategory } from '../types'

/** 브랜드 식별자 */
export type ShoeBrand =
  | 'asics'
  | 'nike'
  | 'adidas'
  | 'puma'
  | 'brooks'
  | 'on'
  | 'salomon'
  | 'saucony'
  | 'newbalance'

export interface BrandInfo {
  brand: ShoeBrand
  /** 화면 표기명 */
  label: string
  /** 브랜드 대표 색상 (워드마크/강조용) */
  color: string
  /**
   * 로컬 로고 SVG 경로 (public 기준). 실제 로고가 있는 브랜드만 지정.
   * 없으면 label 을 브랜드 색상 워드마크로 표시한다.
   */
  logo?: string
}

/** 카탈로그의 러닝화 한 모델 */
export interface CatalogShoe {
  /** 표시 이름 (브랜드명 제외, 예: "페가수스 41") */
  model: string
  category: ShoeCategory
}

export const BRANDS: BrandInfo[] = [
  { brand: 'asics', label: 'ASICS', color: '#002569' },
  { brand: 'nike', label: 'Nike', color: '#111111', logo: '/brands/nike.svg' },
  {
    brand: 'adidas',
    label: 'adidas',
    color: '#000000',
    logo: '/brands/adidas.svg',
  },
  { brand: 'puma', label: 'PUMA', color: '#242B2F', logo: '/brands/puma.svg' },
  { brand: 'brooks', label: 'Brooks', color: '#003A70' },
  { brand: 'on', label: 'On', color: '#000000' },
  { brand: 'salomon', label: 'SALOMON', color: '#1A1A1A' },
  { brand: 'saucony', label: 'Saucony', color: '#C8102E' },
  {
    brand: 'newbalance',
    label: 'New Balance',
    color: '#CF0A2C',
    logo: '/brands/newbalance.svg',
  },
]

export const BRAND_LABEL: Record<ShoeBrand, string> = Object.fromEntries(
  BRANDS.map((b) => [b.brand, b.label]),
) as Record<ShoeBrand, string>

/**
 * 브랜드별 대표 러닝화 라인업.
 * category 는 shoeRecommender 의 훈련 매칭에 그대로 쓰인다.
 */
export const SHOE_CATALOG: Record<ShoeBrand, CatalogShoe[]> = {
  asics: [
    { model: '노바블라스트 (Novablast)', category: 'daily' },
    { model: '젤 카야노 (Gel-Kayano)', category: 'stability' },
    { model: 'GT-2000', category: 'stability' },
    { model: '젤 님버스 (Gel-Nimbus)', category: 'maxCushion' },
    { model: '젤 큐물러스 (Gel-Cumulus)', category: 'daily' },
    { model: '슈퍼블라스트 (Superblast)', category: 'tempo' },
    { model: '매직스피드 (Magic Speed)', category: 'tempo' },
    { model: '메타스피드 스카이/엣지 (Metaspeed)', category: 'racing' },
    { model: '젤 트라부코 (Gel-Trabuco)', category: 'trail' },
  ],
  nike: [
    { model: '페가수스 (Pegasus)', category: 'daily' },
    { model: '보메로 (Vomero)', category: 'maxCushion' },
    { model: '인빈서블 (Invincible)', category: 'maxCushion' },
    { model: '인피니티 런 (InfinityRN)', category: 'stability' },
    { model: '스트럭처 (Structure)', category: 'stability' },
    { model: '줌 플라이 (Zoom Fly)', category: 'tempo' },
    { model: '베이퍼플라이 (Vaporfly)', category: 'racing' },
    { model: '알파플라이 (Alphafly)', category: 'racing' },
    { model: '페가수스 트레일 (Pegasus Trail)', category: 'trail' },
  ],
  adidas: [
    { model: '슈퍼노바 (Supernova)', category: 'daily' },
    { model: '울트라부스트 (Ultraboost)', category: 'maxCushion' },
    { model: '솔라글라이드 (Solarglide)', category: 'stability' },
    { model: '아디제로 SL', category: 'tempo' },
    { model: '아디제로 보스턴 (Adizero Boston)', category: 'tempo' },
    { model: '아디제로 아디오스 프로 (Adios Pro)', category: 'racing' },
    { model: '아디제로 타쿠미 센 (Takumi Sen)', category: 'racing' },
    { model: '테렉스 (Terrex)', category: 'trail' },
  ],
  puma: [
    { model: '벨로시티 니트로 (Velocity Nitro)', category: 'daily' },
    { model: '매그니파이 니트로 (Magnify Nitro)', category: 'maxCushion' },
    { model: '포에버런 니트로 (ForeverRun Nitro)', category: 'stability' },
    { model: '디비에이트 니트로 (Deviate Nitro)', category: 'tempo' },
    { model: '패스트-R 니트로 엘리트 (Fast-R Elite)', category: 'racing' },
  ],
  brooks: [
    { model: '고스트 (Ghost)', category: 'daily' },
    { model: '론치 (Launch)', category: 'daily' },
    { model: '글리세린 (Glycerin)', category: 'maxCushion' },
    { model: '아드레날린 GTS (Adrenaline GTS)', category: 'stability' },
    { model: '하이페리온 (Hyperion)', category: 'tempo' },
    { model: '하이페리온 엘리트 (Hyperion Elite)', category: 'racing' },
    { model: '카스카디아 (Cascadia)', category: 'trail' },
  ],
  on: [
    { model: '클라우드서퍼 (Cloudsurfer)', category: 'daily' },
    { model: '클라우드몬스터 (Cloudmonster)', category: 'maxCushion' },
    { model: '클라우드러너 (Cloudrunner)', category: 'stability' },
    { model: '클라우드플로우 (Cloudflow)', category: 'tempo' },
    { model: '클라우드붐 에코 (Cloudboom Echo)', category: 'racing' },
    { model: '클라우드울트라 (Cloudultra)', category: 'trail' },
  ],
  salomon: [
    { model: '에어로 블레이즈 (Aero Blaze)', category: 'daily' },
    { model: '에어로 글라이드 (Aero Glide)', category: 'maxCushion' },
    { model: 'S/Lab 팬텀 (Phantasm)', category: 'racing' },
    { model: '스피드크로스 (Speedcross)', category: 'trail' },
    { model: '센스라이드 (Sense Ride)', category: 'trail' },
    { model: '울트라 글라이드 (Ultra Glide)', category: 'trail' },
  ],
  saucony: [
    { model: '라이드 (Ride)', category: 'daily' },
    { model: '트라이엄프 (Triumph)', category: 'maxCushion' },
    { model: '가이드 (Guide)', category: 'stability' },
    { model: '킨바라 (Kinvara)', category: 'tempo' },
    { model: '엔돌핀 스피드 (Endorphin Speed)', category: 'tempo' },
    { model: '엔돌핀 프로 (Endorphin Pro)', category: 'racing' },
    { model: '페레그린 (Peregrine)', category: 'trail' },
  ],
  newbalance: [
    { model: '880', category: 'daily' },
    { model: 'Fresh Foam X 1080', category: 'maxCushion' },
    { model: '860', category: 'stability' },
    { model: '리벨 (Rebel)', category: 'tempo' },
    { model: '슈퍼콤프 트레이너 (SC Trainer)', category: 'tempo' },
    { model: '슈퍼콤프 엘리트 (SC Elite)', category: 'racing' },
    { model: '하이어롤 (Hierro)', category: 'trail' },
  ],
}
