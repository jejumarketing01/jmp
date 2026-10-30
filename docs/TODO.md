# 확인 필요 목록

Astro 페이지·컴포넌트와 정적 JavaScript에서는 `TODO` 주석과 `data-todo` 속성으로 표시해 두었다. 해결하면 코드의 표시와 이 목록을 함께 지운다.

## 주소·연락처

- [ ] 카카오톡 채널 주소 — `src/components/`와 `src/pages/`의 `data-todo="kakao-url"` (일부는 지금 `https://pf.kakao.com/` 또는 `#`)
- [ ] 인스타그램·유튜브·네이버 블로그 주소 — `data-todo="sns-*"`
- [ ] 실제 도메인 — `astro.config.mjs`의 `site`와 각 페이지가 `BaseLayout`에 넘기는 `canonical` 확인 (지금은 jejumarketing.co.kr로 추정)
- [ ] 홍보 영상 주소 — 메인 `.video__play`의 `data-video-src`, 서비스 예시 영상 3개(소플러스·중문우동한그릇·안녕전복)

## 이미지·공유 미리보기

- [ ] `public/assets/img/common/`에 favicon·apple-touch-icon을 준비하고 `src/layouts/BaseLayout.astro`의 공통 `<head>`에 연결
- [ ] `public/assets/img/common/og-image.jpg`를 준비하고 `BaseLayout.astro`의 기본 `ogImage` 경로를 변경

## 문구 (사용자 확정 필요)

- [ ] 메인 배너 2·3장 문구 — Claude 제안안 그대로 들어가 있음
- [ ] 서비스 이름 '컨설팅' — 사장님 말로 바꿀지 결정 (메인 서비스 카드, 서비스 페이지 바로가기·03 라벨)
- [ ] 서비스 페이지 광고 본문 "매달 직접 만나서 설명합니다"(확정 문구) — 보고서만 받는 가게도 있음. 유지할지, "매달 결과를 설명해 드립니다"로 바꿀지
- [ ] 차별점 3 제목 "메뉴·가격·간판까지 봅니다" — 확정 문구 "광고만 하지 않습니다"를 대체함. `카피_기준자료.md` 확정 표도 고쳐야 함
- [ ] 차별점 1 제목 "한 달에 한 번, 직접 만납니다" — 보고서만 받는 가게가 많으면 "매달 결과를 설명해 드립니다"로
- [ ] 중간 문의 띠 "견적이 궁금하신가요?" — 새로 쓴 문구
- [ ] 성공사례 아래 "가게마다 결과는 다릅니다." — 새로 쓴 문구
- [ ] 사장님 후기 섹션 — 후기 사용 허락 후 `hidden` 제거, 표기 방식(가게 이름 여부) 결정

## 사실 확인

- [ ] 성공사례 '영상 보기' 주소 11곳 — `data-todo="video-url"`에 넣기 (8번은 반영 완료. 주소는 모두 있음)
- [ ] 성공사례 사진 — `case-03.webp`, `gallery-06.webp`~`gallery-08.webp` 추가 필요. 나머지 제공 사진은 적용 완료
- [ ] 성공사례 3번 다정이네김밥 지점 지역 — 모르면 태그 없이 유지
- [x] 성공사례 9번 "인스타 광고"로 수정 (블로그 광고는 이제 하지 않음)
- [ ] 문의 폼 접수 주소 — 앱스 스크립트 배포 후 `src/pages/contact.astro`의 `data-endpoint`에 넣기 (docs/FORM-SETUP.md)
- [ ] 문의 폼 연결 전 Google Apps Script·Sheets·Gmail의 개인정보 처리위탁 및 국외 이전 고지 항목(이전 국가·시기·방법·보유기간 포함)을 실제 계정 설정과 약관에 맞춰 확인하고 `src/pages/privacy.astro`에 반영
- [x] 개인정보 보관 기간 — 상담이 끝나고 1년 (반영 완료)


## 다음 페이지

- [x] 가격 페이지의 영상 길이 '25~30초' → 20초로 통일 (`src/pages/pricing.astro` 완료)
