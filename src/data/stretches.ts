import type { StretchItem } from '../types'

// 유튜브 링크는 "검색 결과" URL로 두어 항상 동작하도록 함.
// 추후 특정 추천 영상으로 교체 가능.
const yt = (q: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`

/** 러닝 전: 동적 스트레칭 / 워밍업 */
export const PRE_RUN_STRETCHES: StretchItem[] = [
  {
    id: 'leg-swing',
    name: '레그 스윙 (앞뒤)',
    duration: '15회 x 양쪽',
    description:
      '벽이나 기둥을 잡고 한쪽 다리를 앞뒤로 크게 흔든다. 고관절을 부드럽게 풀어준다.',
    videoUrl: yt('러닝 전 레그 스윙 동적 스트레칭'),
  },
  {
    id: 'high-knees',
    name: '하이 니 (제자리)',
    duration: '30초',
    description:
      '제자리에서 무릎을 골반 높이까지 빠르게 들어올린다. 심박과 체온을 올린다.',
    videoUrl: yt('하이니 high knees 워밍업'),
  },
  {
    id: 'walking-lunge',
    name: '워킹 런지',
    duration: '10보 x 2세트',
    description:
      '앞으로 크게 내딛으며 무릎을 90도로 굽힌다. 둔근과 허벅지를 활성화한다.',
    videoUrl: yt('워킹 런지 다이나믹 스트레칭'),
  },
  {
    id: 'butt-kicks',
    name: '뒤꿈치 차기 (벗 킥)',
    duration: '30초',
    description:
      '제자리 또는 가볍게 이동하며 뒤꿈치로 엉덩이를 차듯 들어올린다. 햄스트링을 깨운다.',
    videoUrl: yt('벗킥 butt kicks 러닝 워밍업'),
  },
  {
    id: 'ankle-circle',
    name: '발목 돌리기',
    duration: '10회 x 양쪽',
    description: '한 발씩 들어 발목을 시계/반시계 방향으로 크게 돌린다.',
    videoUrl: yt('발목 돌리기 워밍업'),
  },
  {
    id: 'hip-opener',
    name: '힙 오프너 (무릎 원 그리기)',
    duration: '10회 x 양쪽',
    description:
      '한쪽 무릎을 들어 바깥쪽으로 원을 그리며 고관절 가동범위를 넓힌다.',
    videoUrl: yt('힙 오프너 고관절 스트레칭 러닝'),
  },
]

/** 러닝 후: 정적 스트레칭 / 쿨다운 */
export const POST_RUN_STRETCHES: StretchItem[] = [
  {
    id: 'cooldown-walk',
    name: '쿨다운 걷기',
    duration: '5분',
    description:
      '러닝 직후 멈추지 말고 천천히 걸으며 심박을 서서히 낮춘다.',
    videoUrl: yt('러닝 후 쿨다운 걷기'),
  },
  {
    id: 'calf-stretch',
    name: '종아리 스트레칭',
    duration: '30초 x 양쪽',
    description:
      '벽을 밀듯 한 발을 뒤로 보내 뒤꿈치를 바닥에 붙인다. 종아리가 늘어나는 것을 느낀다.',
    videoUrl: yt('종아리 스트레칭 러닝 후'),
  },
  {
    id: 'hamstring-stretch',
    name: '햄스트링 스트레칭',
    duration: '30초 x 양쪽',
    description:
      '한 다리를 앞으로 뻗고 상체를 숙여 허벅지 뒤를 늘린다. 반동 없이 유지한다.',
    videoUrl: yt('햄스트링 스트레칭 러닝 후'),
  },
  {
    id: 'quad-stretch',
    name: '대퇴사두 스트레칭',
    duration: '30초 x 양쪽',
    description:
      '서서 한 발목을 손으로 잡아 엉덩이 쪽으로 당긴다. 허벅지 앞이 늘어난다.',
    videoUrl: yt('대퇴사두 허벅지 앞 스트레칭'),
  },
  {
    id: 'hip-flexor',
    name: '고관절 굴곡근 스트레칭',
    duration: '30초 x 양쪽',
    description:
      '런지 자세에서 골반을 앞으로 밀어 뒤쪽 다리의 고관절 앞을 늘린다.',
    videoUrl: yt('고관절 굴곡근 스트레칭 러너'),
  },
  {
    id: 'glute-stretch',
    name: '둔근 스트레칭 (피겨4)',
    duration: '30초 x 양쪽',
    description:
      '누워서 한쪽 발목을 반대쪽 무릎에 올리고 허벅지를 당겨 엉덩이를 늘린다.',
    videoUrl: yt('둔근 피겨4 스트레칭'),
  },
  {
    id: 'foam-roll',
    name: '폼롤러 마사지',
    duration: '1~2분 x 부위',
    description:
      '종아리·허벅지·IT밴드를 폼롤러로 천천히 굴려 근막을 이완한다.',
    videoUrl: yt('러닝 후 폼롤러 마사지'),
  },
]
