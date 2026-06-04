# RunPlan 🏃 — 러닝 훈련 플래너

내 페이스와 주행거리를 입력하면 **대회 목표(5K/10K/하프/풀)에 맞춘 주간 훈련계획**을 자동으로 만들어 주는 웹앱입니다.
보유 신발에 맞는 훈련별 신발 추천, 러닝 전/후 스트레칭 가이드도 함께 제공합니다.

## 주요 기능
- **주간 훈련계획 생성** — 페이스 존 자동 계산, 점진적 과부하(주 ~10% 증가), 4주마다 회복주, 대회 전 테이퍼링
- **신발 추천** — 보유 신발을 종류별로 등록 → 각 훈련(이지/롱런/템포/인터벌/대회)에 알맞은 신발 추천
- **스트레칭 / 쿨다운** — 러닝 전(동적)·후(정적) 가이드 + 유튜브 참고 영상
- **부상 가이드** — 러너 흔한 부상 8종의 증상·원인·자가관리(스트레칭/강화)·치료·병원 방문 시점 (부위별 필터)
- **PWA** — 휴대폰 홈화면에 설치해 앱처럼 사용 가능, 오프라인 동작
- 모든 데이터는 **브라우저(localStorage)** 에 저장 — 서버/로그인 불필요

## 실행 방법
```bash
npm install      # 최초 1회
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 프로덕션 빌드 (dist/)
npm run preview  # 빌드 결과 미리보기
```

## 기술 스택
React 18 · TypeScript · Vite · Tailwind CSS · React Router · vite-plugin-pwa

## 폴더 구조
```
src/
├─ lib/        # planGenerator(계획 생성), paceUtils(페이스), shoeRecommender(신발 매칭)
├─ data/       # stretches(스트레칭), shoeTypes(신발 종류)
├─ pages/      # Onboarding, PlanPage, ShoesPage, StretchPage
├─ components/ # Layout(하단 네비), WorkoutCard
├─ hooks/      # useLocalStorage
└─ store.tsx   # 전역 상태(프로필·신발·계획)
```

## 추후 앱(모바일) 전환
PWA로 제작되어 있어 다음 단계로 네이티브 앱 출시가 가능합니다.
```bash
npm i -D @capacitor/cli @capacitor/core
npx cap init
npx cap add android   # 또는 ios
npm run build && npx cap copy
```

## 커스터마이징 메모
- 스트레칭 영상 링크는 `src/data/stretches.ts`에서 유튜브 **검색 URL**로 되어 있습니다. 특정 추천 영상으로 교체할 수 있습니다.
- 계획 생성 규칙(증가율·회복주·테이퍼·롱런 목표)은 `src/lib/planGenerator.ts` 상단 상수에서 조정 가능합니다.
