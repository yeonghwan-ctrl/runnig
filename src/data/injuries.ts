import type { BodyArea, Injury } from '../types'

const yt = (q: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`

export const BODY_AREAS: { area: BodyArea; label: string; emoji: string }[] = [
  { area: 'knee', label: '무릎', emoji: '🦵' },
  { area: 'foot', label: '발', emoji: '🦶' },
  { area: 'shin', label: '정강이', emoji: '🦴' },
  { area: 'ankle', label: '발목', emoji: '🦿' },
  { area: 'hip', label: '엉덩이/고관절', emoji: '🍑' },
  { area: 'muscle', label: '근육', emoji: '💪' },
]

export const AREA_LABEL: Record<BodyArea, string> = Object.fromEntries(
  BODY_AREAS.map((a) => [a.area, a.label]),
) as Record<BodyArea, string>

export const INJURIES: Injury[] = [
  {
    id: 'runners-knee',
    name: '러너스 니 (슬개대퇴 통증증후군)',
    enName: "Runner's Knee / PFPS",
    area: 'knee',
    emoji: '🦵',
    summary:
      '무릎 앞쪽(슬개골 주변)이 시큰거리는, 러너에게 가장 흔한 통증.',
    symptoms: [
      '무릎 앞·슬개골 주변의 둔한 통증',
      '계단 내려갈 때, 오래 앉아 있다 일어날 때 악화',
      '쪼그려 앉기나 내리막에서 통증 증가',
    ],
    causes: [
      '갑작스러운 거리·강도 증가',
      '약한 둔근/대퇴사두로 인한 슬개골 정렬 불량',
      '평발·과회내 등 발 정렬 문제',
    ],
    selfCare: [
      '둔근 강화: 클램쉘, 사이드 레그 레이즈, 브릿지',
      '대퇴사두·장경인대·둔근 스트레칭 및 폼롤러',
      '통증 없는 범위로 거리 줄이고 내리막 피하기',
    ],
    treatment: [
      '급성기 RICE(휴식·냉찜질·압박·거상)',
      '통증 시 NSAIDs(소염진통제)는 단기 사용',
      '물리치료 + 러닝 폼/케이던스 교정',
    ],
    seeDoctor:
      '무릎이 붓거나 잠김/꺾임 느낌, 2~3주 자가관리에도 통증이 지속되면 진료를 받으세요.',
    videoUrl: yt('러너스니 슬개대퇴 통증 재활 운동'),
  },
  {
    id: 'it-band',
    name: '장경인대 증후군 (IT밴드)',
    enName: 'IT Band Syndrome',
    area: 'knee',
    emoji: '🦵',
    summary: '무릎 바깥쪽이 콕콕 쑤시는 통증. 장거리 러너에게 흔함.',
    symptoms: [
      '무릎 바깥쪽의 날카로운/타는 듯한 통증',
      '일정 거리·시간 뛰면 반복적으로 발생',
      '내리막에서 악화',
    ],
    causes: [
      '주행거리 급증, 같은 방향 트랙·경사로 반복',
      '약한 둔근(중둔근)과 고관절 안정성 부족',
      '낡은 신발, 다리 길이 차이',
    ],
    selfCare: [
      '중둔근 강화: 클램쉘, 사이드 플랭크, 밴드 사이드 워크',
      'IT밴드·둔근·대퇴근막장근 폼롤러 마사지',
      '거리 줄이고 내리막·캠버(경사진 노면) 피하기',
    ],
    treatment: [
      '급성기 냉찜질, 활동 조절',
      '물리치료로 고관절·코어 안정화',
      '재발 잦으면 러닝 폼·케이던스 분석',
    ],
    seeDoctor:
      '쉬어도 통증이 계속되거나 무릎 바깥쪽이 붓고 눌렀을 때 심하게 아프면 진료가 필요합니다.',
    videoUrl: yt('장경인대 증후군 IT밴드 스트레칭 강화'),
  },
  {
    id: 'plantar-fasciitis',
    name: '족저근막염',
    enName: 'Plantar Fasciitis',
    area: 'foot',
    emoji: '🦶',
    summary: '발뒤꿈치~발바닥 아치의 통증. 아침 첫 발걸음이 가장 아픔.',
    symptoms: [
      '아침에 일어나 첫 발을 디딜 때 발뒤꿈치 통증',
      '오래 앉았다 일어날 때 통증',
      '발바닥 아치·뒤꿈치 안쪽 압통',
    ],
    causes: [
      '종아리·아킬레스건의 경직',
      '갑작스러운 거리 증가, 딱딱한 노면',
      '아치 지지 부족한 신발, 평발/높은 아치',
    ],
    selfCare: [
      '종아리·발바닥 스트레칭(벽 밀기, 수건 당기기)',
      '발바닥 공·얼음병 굴리기, 발가락 수건 집기 강화',
      '쿠션·아치 지지 좋은 신발, 야간 부목 고려',
    ],
    treatment: [
      '냉찜질과 활동 조절',
      '맞춤/기성 인솔(아치 서포트)',
      '지속 시 물리치료·체외충격파(ESWT)',
    ],
    seeDoctor:
      '수개월간 호전이 없거나 발뒤꿈치 저림·찌릿함(신경 증상)이 있으면 진료를 받으세요.',
    videoUrl: yt('족저근막염 스트레칭 마사지 치료'),
  },
  {
    id: 'achilles',
    name: '아킬레스건염',
    enName: 'Achilles Tendinitis',
    area: 'ankle',
    emoji: '🦿',
    summary: '발뒤꿈치 위 아킬레스건의 통증·뻣뻣함.',
    symptoms: [
      '발뒤꿈치 위쪽 힘줄의 통증·뻣뻣함(특히 아침)',
      '운동 시작 시 아프다 풀리고 끝나면 다시 악화',
      '건을 누르면 압통, 부어오름',
    ],
    causes: [
      '언덕/스피드 훈련 급증',
      '종아리 근육 경직과 약화',
      '평평한 신발로의 급격한 전환',
    ],
    selfCare: [
      '카프 레이즈(특히 신장성/eccentric) 강화 운동',
      '종아리 스트레칭, 폼롤러',
      '훈련량 줄이고 언덕·스피드 일시 중단',
    ],
    treatment: [
      '냉찜질, 활동 조절',
      '신장성 운동 중심 재활(근거 강함)',
      '필요 시 힐 리프트, 물리치료',
    ],
    seeDoctor:
      '갑자기 "툭" 소리와 함께 힘이 빠지면 아킬레스건 파열일 수 있어 즉시 진료가 필요합니다.',
    videoUrl: yt('아킬레스건염 신장성 운동 재활'),
  },
  {
    id: 'shin-splints',
    name: '신스플린트 (정강이 통증)',
    enName: 'Shin Splints / MTSS',
    area: 'shin',
    emoji: '🦴',
    summary: '정강이 안쪽을 따라 넓게 퍼지는 통증. 초보 러너에게 흔함.',
    symptoms: [
      '정강이 안쪽을 따라 욱신거리는 통증',
      '러닝 초반/후에 통증, 누르면 넓게 아픔',
      '심해지면 걷기만 해도 통증',
    ],
    causes: [
      '거리·빈도 급증(과사용)',
      '딱딱한 노면, 낡은/안 맞는 신발',
      '종아리 약화, 과회내',
    ],
    selfCare: [
      '훈련량 줄이고 부드러운 노면·쿠션 신발',
      '종아리·정강이 근육 스트레칭과 강화(토 레이즈)',
      '초기 냉찜질, 점진적 복귀',
    ],
    treatment: [
      '상대적 휴식(통증 없는 교차운동: 수영·자전거)',
      '점진적 부하 증가와 폼 교정',
      '인솔/신발 점검',
    ],
    seeDoctor:
      '한 지점이 콕 집어 아프고 밤에도 아프면 피로골절일 수 있어 진료가 필요합니다.',
    videoUrl: yt('신스플린트 정강이 통증 스트레칭 강화'),
  },
  {
    id: 'stress-fracture',
    name: '피로골절',
    enName: 'Stress Fracture',
    area: 'foot',
    emoji: '🦴',
    summary: '뼈에 반복 충격이 쌓여 생기는 미세 골절. 정강이·발등·발에 흔함.',
    symptoms: [
      '한 지점을 콕 집어 누르면 심한 통증',
      '체중을 실으면 아프고 쉬면 가라앉음',
      '점점 심해지며 부을 수 있음',
    ],
    causes: [
      '급격한 훈련량 증가, 회복 부족',
      '낮은 골밀도·영양 부족(에너지 부족 RED-S)',
      '딱딱한 노면, 부적절한 신발',
    ],
    selfCare: [
      '⚠️ 자가관리만으로 낫지 않음 — 달리기 중단이 핵심',
      '통증 없는 범위에서만 활동',
      '칼슘·비타민D 등 영양 점검',
    ],
    treatment: [
      '진단(X-ray/MRI) 후 일정 기간 체중부하 제한',
      '6~8주 이상 휴식 후 단계적 복귀',
      '재발 방지를 위한 골밀도·식이 평가',
    ],
    seeDoctor:
      '피로골절이 의심되면 반드시 병원 진료가 필요합니다. 방치하면 완전 골절로 진행할 수 있습니다.',
    videoUrl: yt('러닝 피로골절 증상 치료'),
  },
  {
    id: 'hamstring',
    name: '햄스트링 손상',
    enName: 'Hamstring Strain',
    area: 'muscle',
    emoji: '💪',
    summary: '허벅지 뒤 근육의 당김·파열. 스피드 훈련 중 흔함.',
    symptoms: [
      '허벅지 뒤쪽의 갑작스러운 통증/당김',
      '다리를 뻗거나 속도를 낼 때 악화',
      '심하면 멍·붓기',
    ],
    causes: [
      '워밍업 부족, 급가속·스프린트',
      '햄스트링 약화 또는 좌우 불균형',
      '피로 누적',
    ],
    selfCare: [
      '급성기 RICE, 무리한 스트레칭 자제',
      '회복기 신장성 강화(노르딕 컬, 브릿지)',
      '충분한 워밍업과 점진적 복귀',
    ],
    treatment: [
      '초기 48~72시간 냉찜질·압박',
      '통증 줄면 점진적 근력·가동범위 회복',
      '물리치료로 재발 방지',
    ],
    seeDoctor:
      '"툭" 하는 느낌과 함께 큰 멍·심한 약화가 있으면 부분/완전 파열일 수 있어 진료가 필요합니다.',
    videoUrl: yt('햄스트링 부상 재활 노르딕 컬'),
  },
  {
    id: 'ankle-sprain',
    name: '발목 염좌',
    enName: 'Ankle Sprain',
    area: 'ankle',
    emoji: '🦿',
    summary: '발목 인대가 늘어나거나 찢어지는 부상. 트레일·울퉁불퉁한 노면에서 흔함.',
    symptoms: [
      '발목을 접질린 직후 통증·붓기',
      '체중을 싣기 어렵고 멍이 듦',
      '발목 불안정감',
    ],
    causes: [
      '울퉁불퉁한 노면, 헛디딤',
      '약한 발목 안정근, 과거 염좌 이력',
      '피로로 인한 균형 저하',
    ],
    selfCare: [
      '초기 RICE(휴식·냉찜질·압박·거상)',
      '회복기 밸런스/고유수용성 운동(한 발 서기)',
      '발목 강화 밴드 운동, 점진적 복귀',
    ],
    treatment: [
      '급성기 압박붕대·필요 시 보조기',
      '조기 가동범위 운동과 균형 재활',
      '재발 잦으면 정밀 검사',
    ],
    seeDoctor:
      '체중을 전혀 싣지 못하거나 뼈를 누를 때 심한 통증·변형이 있으면 골절 감별을 위해 진료하세요.',
    videoUrl: yt('발목 염좌 재활 균형 운동'),
  },
]
