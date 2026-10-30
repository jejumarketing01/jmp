# 이미지 목록

사이트에 들어갈 모든 이미지와 파일 경로. Astro 페이지·컴포넌트의 `.img-slot` 안 `<strong>` ID가 아래 표의 ID와 같다.

## 정리 규칙

- **폴더**: `public/assets/img/` 아래 `common`, `home`, `services`, `pricing`, `cases`, `about`, `contact`, `blog`로 나눈다. 여러 페이지에 같이 쓰는 사진은 파일 하나를 여러 페이지에서 불러온다.
- **공개 URL**: `public/`은 사이트 루트로 배포된다. Astro·Markdown 마크업에서는 `/assets/img/...`를 쓴다.
- **파일 이름**: 사진 자리 ID를 소문자로 (HERO-1 → `hero-1.webp`). 한글·띄어쓰기 쓰지 않음. 드라이브 원본 이름은 그대로 두고 사이트용 파일만 바꿔 저장한다.
- **형식**: WebP, 화질 80% 안팎. 예외: `og-image.jpg`(카카오톡 공유 호환), 아이콘은 SVG/PNG.
- **크기**: 아래 표의 픽셀로 잘라 저장(실제 표시 크기의 약 2배, 레티나 대응).
- **용량**: 넓은 사진·첫 화면 사진 250KB 이하 / 카드 사진 150KB 이하 / 갤러리·세로 사진 120KB 이하.
- **원본**: 원본 사진은 저장소에 넣지 않는다(드라이브에 보관). 저장소에는 다듬은 파일만.
- **사용 허락**: 외관 사진은 모두 사용 허락을 받았다(2026-10-23). 7~12번 사례는 상호를 밝히지 않으므로 간판·상호가 보이는 사진을 쓰지 않는다.

## 넣는 방법

```html
<!-- 전 -->
<div class="img-slot ratio-4x3" role="img" aria-label="소플러스 제주노형공항점 외관">…</div>
<!-- 후: 비율 클래스는 그대로 둔다 -->
<img class="img-cover ratio-4x3" src="/assets/img/cases/case-01.webp" alt="소플러스 제주노형공항점 외관" width="1200" height="900" loading="lazy">
```

- alt는 기존 `aria-label` 문구를 그대로 쓴다.
- **첫 화면 사진**(표에서 ★)은 `loading="lazy"`를 빼고 `fetchpriority="high"`를 넣는다. 나머지는 모두 `loading="lazy"`.
- 메인 배너 2·3장(hero-2, hero-3)은 첫 화면이지만 처음엔 숨겨져 있으므로 `loading="lazy"` 대신 기본값(eager)으로 두고 `fetchpriority`는 넣지 않는다.
- 21:9 넓은 사진은 모바일에서 4:3으로 잘린다. 사람·간판이 가운데 오게 자른다. 필요하면 `object-position`으로 조정.

## 공통 (모든 페이지)

| ID | 파일 경로 | 위치 | 크기 (px) | 비율 | 넣을 이미지 |
|---|---|---|---|---|---|
| LOGO | public/assets/img/common/logo.svg | 헤더·푸터 로고 | 가로 240 기준 (벡터) | — | 로고 파일이 있으면 교체. 지금은 `.logo__ko` 글자로 표시 |
| FAVICON | public/assets/img/common/favicon.svg | 브라우저 탭 아이콘 | 벡터 | 1:1 | 로고 심볼 또는 주황 원(#f23902) |
| FAVICON-32 | public/assets/img/common/favicon-32.png | 탭 아이콘 예비 | 32×32 | 1:1 | 위와 같음 |
| APPLE-ICON | public/assets/img/common/apple-touch-icon.png | 휴대폰 홈 화면 아이콘 | 180×180 | 1:1 | 위와 같음, 배경 채움 |
| OG | public/assets/img/common/og-image.jpg | 카톡·SNS 공유 미리보기 (모든 페이지 `og:image`) | 1200×630 | 1.9:1 | 로고 + "제주에 있는 마케팅 회사, 직접 찾아갑니다" + 대표 사진 |

아이콘 파일이 준비되면 `src/layouts/BaseLayout.astro`의 공통 `<head>`에 `<link rel="icon" href="/assets/img/common/favicon.svg" type="image/svg+xml">`, `<link rel="icon" href="/assets/img/common/favicon-32.png" sizes="32x32">`, `<link rel="apple-touch-icon" href="/assets/img/common/apple-touch-icon.png">`를 추가한다. 기본 `ogImage` 경로도 `/assets/img/common/og-image.jpg`로 바꾼다(현재 기본값은 `/assets/img/og-image.jpg`).

## 메인 (`src/pages/index.astro`) — 15장

| ID | 파일 경로 | 위치 | 크기 (px) | 비율 | 넣을 이미지 | alt |
|---|---|---|---|---|---|---|
| HERO-1 ★ | public/assets/img/home/hero-1.webp | 메인 배너 1 (가장 먼저 로딩) | 1600×1000 | 16:10 | 대표가 가게 테이블에서 사장님과 마주 보고 이야기하는 모습 | 대표가 가게에서 사장님과 이야기하는 모습 |
| HERO-2 | public/assets/img/home/hero-2.webp | 메인 배너 2 | 1600×1000 | 16:10 | 가게에서 음식이나 사장님을 촬영하는 현장. 장비가 보이게 | 가게에서 홍보 영상을 촬영하는 모습 |
| HERO-3 | public/assets/img/home/hero-3.webp | 메인 배너 3 | 1600×1000 | 16:10 | 손님으로 붐비는 가게 입구·웨이팅 줄 | 손님이 가게 앞에서 기다리는 모습 |
| SERVICE-VIDEO | public/assets/img/home/service-video.webp | 주요 서비스 · 영상 | 1200×900 | 4:3 | 음식 위로 카메라를 든 촬영 장면 클로즈업 | 음식을 촬영하는 장면 |
| SERVICE-ADS | public/assets/img/home/service-ads.webp | 주요 서비스 · 광고 | 1200×900 | 4:3 | 광고 결과 화면을 사장님께 짚어 설명하는 손 (화면 숫자는 흐리게) | 광고 결과 화면을 사장님께 설명하는 모습 |
| SERVICE-CONSULT | public/assets/img/home/service-consult.webp | 주요 서비스 · 컨설팅 | 1200×900 | 4:3 | 가게 밖에서 간판·입구를 함께 살펴보는 모습 | 가게 간판과 입구를 살펴보는 모습 |
| WIDE-MEETING | public/assets/img/home/wide-meeting.webp | 차별점 위 넓은 사진 | 2400×1030 | 21:9 (모바일 4:3) | 가게 안 넓은 장면. 사장님과 대표·담당자가 이야기하는 모습 | 가게에서 사장님과 저희 팀이 이야기하는 모습 |
| CEO | public/assets/img/home/ceo.webp | 대표 소개 | 800×800 | 1:1 | 대표 한승지 인물 사진 (스톡 사진 금지) | 대표 한승지 |
| CASE-1 | public/assets/img/home/case-1.webp | 성공사례 줄 1 | 900×1200 | 3:4 | 적용 완료 · 소플러스 외관 | 소플러스 제주노형공항점 외관 |
| CASE-5 | public/assets/img/home/case-5.webp | 성공사례 줄 2 | 900×900 | 1:1 | 적용 완료 · 안녕전복 외관 | 안녕전복 외관 |
| CASE-4 | public/assets/img/home/case-4.webp | 성공사례 줄 3 | 900×1200 | 3:4 | 적용 완료 · 중문우동한그릇 외관 | 중문우동한그릇 외관 |
| CASE-6 | public/assets/img/home/case-6.webp | 성공사례 줄 4 | 900×900 | 1:1 | 적용 완료 · 고은물식당 외관 | 고은물식당 외관 |
| CASE-3 | public/assets/img/home/case-3.webp | 성공사례 줄 5 | 900×1200 | 3:4 | 다정이네김밥 외관 | 다정이네김밥 |
| CASE-2 | public/assets/img/home/case-2.webp | 성공사례 줄 6 | 900×900 | 1:1 | 고윤호 재활PT&요가 외관 | 고윤호 재활PT&요가 |
| VIDEO-POSTER | public/assets/img/home/video-poster.webp | 홍보 영상 (흑백 표시) | 2400×1030 | 21:9 (모바일 4:3) | 저희가 만든 홍보 영상의 한 장면. 영상 주소는 `data-video-src`에 | 홍보 영상의 한 장면 |

메인 성공사례 줄(CASE-1~6)은 성공사례 페이지의 외관 원본을 3:4·1:1로 다시 잘라 써도 된다. 3:4와 1:1이 번갈아 들어가는 배치이므로 비율을 바꾸지 않는다.

## 서비스 (`src/pages/services.astro`) — 6장

| ID | 파일 경로 | 위치 | 크기 (px) | 비율 | 넣을 이미지 | alt |
|---|---|---|---|---|---|---|
| SVC-HERO ★ | public/assets/img/services/svc-hero.webp | 인트로 (첫 화면) | 1600×1000 | 16:10 | 가게에서 사장님을 촬영하는 현장. 카메라·조명과 사장님이 함께 | 가게에서 사장님을 촬영하는 모습 |
| SVC-SHORT-1 | public/assets/img/services/svc-short-1.webp | 01 영상 · 예시 영상 1 | 720×1280 | 9:16 | 소플러스 메뉴 소개 영상의 대표 장면 | 소플러스 메뉴 소개 영상의 한 장면 |
| SVC-SHORT-2 | public/assets/img/services/svc-short-2.webp | 01 영상 · 예시 영상 2 | 720×1280 | 9:16 | 중문우동한그릇 녹차면 소개 영상의 대표 장면 | 중문우동한그릇 녹차면 소개 영상의 한 장면 |
| SVC-SHORT-3 | public/assets/img/services/svc-short-3.webp | 01 영상 · 예시 영상 3 | 720×1280 | 9:16 | 안녕전복 세트메뉴 소개 영상의 대표 장면 | 안녕전복 세트메뉴 소개 영상의 한 장면 |
| SVC-ADS | public/assets/img/home/service-ads.webp (공유) | 02 광고 | 1200×900 | 4:3 | 메인 SERVICE-ADS와 같은 사진. 다른 사진이면 `public/assets/img/services/svc-ads.webp` | 광고 결과 화면을 사장님께 설명하는 모습 |
| SVC-WIDE | public/assets/img/services/svc-wide.webp | 광고와 컨설팅 사이 | 2400×1030 | 21:9 (모바일 4:3) | 가게 앞에서 대표가 사장님과 간판·입구를 바라보는 뒷모습 | 가게 앞에서 간판과 입구를 살펴보는 모습 |

예시 영상 3개는 사진을 누르면 영상(인스타·유튜브)으로 가도록 링크를 걸 예정. 영상 주소는 TODO.md 참고.

## 가격 (`src/pages/pricing.astro`) — 1장

| ID | 파일 경로 | 위치 | 크기 (px) | 비율 | 넣을 이미지 | alt |
|---|---|---|---|---|---|---|
| PRICE-HERO ★ | public/assets/img/pricing/price-hero.webp | 인트로 (첫 화면) | 1600×1000 | 16:10 | 가게 테이블에서 대표가 사장님께 종이·태블릿으로 가격을 짚어 설명하는 모습 | 상담 테이블에서 사장님께 가격을 설명하는 모습 |

## 성공사례 (`src/pages/cases.astro`) — 20장

| ID | 파일 경로 | 위치 | 크기 (px) | 비율 | 넣을 이미지 (드라이브 원본) | alt |
|---|---|---|---|---|---|---|
| GALLERY-01 | public/assets/img/cases/gallery-01.webp | 함께한 제주 가게 줄 | 900×1200 | 3:4 | 적용 완료 | 함께한 제주 가게 외관 |
| GALLERY-02 | public/assets/img/cases/gallery-02.webp | 〃 | 900×1200 | 3:4 | 적용 완료 | 함께한 제주 가게 외관 |
| GALLERY-03 | public/assets/img/cases/gallery-03.webp | 〃 | 900×1200 | 3:4 | 적용 완료 | 함께한 제주 가게 외관 |
| GALLERY-04 | public/assets/img/cases/gallery-04.webp | 〃 | 900×1200 | 3:4 | 적용 완료 | 함께한 제주 가게 외관 |
| GALLERY-05 | public/assets/img/cases/gallery-05.webp | 〃 | 900×1200 | 3:4 | 적용 완료 | 함께한 제주 가게 외관 |
| GALLERY-06 | public/assets/img/cases/gallery-06.webp | 〃 | 900×1200 | 3:4 | 피플제주_외관.jpg | 피플제주 외관 |
| GALLERY-07 | public/assets/img/cases/gallery-07.webp | 〃 | 900×1200 | 3:4 | 안녕전복_외관측면.jpeg | 안녕전복 외관 |
| GALLERY-08 | public/assets/img/cases/gallery-08.webp | 〃 | 900×1200 | 3:4 | 운정이네_외관.jpeg 또는 다른 가게 외관 (중문우동한그릇은 CASE-04에 쓰므로 제외) | 함께한 가게 외관 |
| CASE-01 | public/assets/img/cases/case-01.webp | 사례 1 | 1200×900 | 4:3 | 소플러스공항점_외관.jpg | 소플러스 제주노형공항점 외관 |
| CASE-02 | public/assets/img/cases/case-02.webp | 사례 2 | 1200×900 | 4:3 | 고윤호재활pt&요가_외관.jpeg (세로 사진, 가운데를 가로로 자름) | 고윤호 재활PT&요가 외관 |
| CASE-03 | public/assets/img/cases/case-03.webp | 사례 3 | 1200×900 | 4:3 | 다정이네김밥 지점 외관 | 다정이네김밥 외관 |
| CASE-04 | public/assets/img/cases/case-04.webp | 사례 4 | 1200×900 | 4:3 | 중문우동한그릇_외관.png | 중문우동한그릇 외관 |
| CASE-05 | public/assets/img/cases/case-05.webp | 사례 5 | 1200×900 | 4:3 | 안녕전복_외관정면.jpeg | 안녕전복 외관 |
| CASE-06 | public/assets/img/cases/case-06.webp | 사례 6 | 1200×900 | 4:3 | 고은물식당 외관 | 고은물식당 외관 |
| CASE-07 | public/assets/img/cases/case-07.webp | 사례 7 | 1200×900 | 4:3 | 상호를 흐리게 처리한 외관 | 상호를 흐리게 처리한 성산 갈치조림 전문점 외관 |
| CASE-08 | public/assets/img/cases/case-08.webp | 사례 8 | 1200×900 | 4:3 | 상호를 흐리게 처리한 외관 | 상호를 흐리게 처리한 월정리 파스타 전문점 외관 |
| CASE-09 | public/assets/img/cases/case-09.webp | 사례 9 | 1200×900 | 4:3 | 상호를 흐리게 처리한 외관 | 상호를 흐리게 처리한 성산 짬뽕 전문점 외관 |
| CASE-10 | public/assets/img/cases/case-10.webp | 사례 10 | 1200×900 | 4:3 | 상호를 흐리게 처리한 외관 | 상호를 흐리게 처리한 표선 한식 전문점 외관 |
| CASE-11 | public/assets/img/cases/case-11.webp | 사례 11 | 1200×900 | 4:3 | 상호를 흐리게 처리한 외관 | 상호를 흐리게 처리한 해물탕 전문점 외관 |
| CASE-12 | public/assets/img/cases/case-12.webp | 사례 12 | 1200×900 | 4:3 | 상호를 흐리게 처리한 외관 | 상호를 흐리게 처리한 성산 갈치조림 전문점 외관 |

갤러리 alt에 가게 이름을 쓰면 외관 간판과 맞아 검색에도 도움이 된다. 사진 자리 안내 문구의 드라이브 파일 예시 순서와 위 표 순서가 다를 수 있다 — **이 표가 기준**이다.

## 합계

공통 5개 + 사진 42장 (메인 15 · 서비스 6 · 가격 1 · 성공사례 20). 서비스 SVC-ADS를 메인과 같은 파일로 쓰면 사진 41장.

## 소개 (`src/pages/about.astro`) — 11장

| ID | 파일 경로 | 위치 | 크기 (px) | 비율 | 넣을 이미지 | alt |
|---|---|---|---|---|---|---|
| ABOUT-CEO ★ | public/assets/img/about/about-ceo.webp | 인트로 (첫 화면) | 900×1200 | 3:4 | 대표 한승지 인물 사진 (상반신, 밝은 배경). 메인 CEO 사진과 같은 원본 가능 | 대표 한승지 |
| ABOUT-LECTURE-WIDE | public/assets/img/about/about-lecture-wide.webp | 숫자와 강의 사이 넓은 사진 | 2400×1030 | 21:9 (모바일 4:3) | 강의 현장. 대표가 앞에서 설명하고 사장님들이 듣는 모습 | 사장님들께 마케팅 강의를 하는 모습 |
| ABOUT-LECTURE-1 | public/assets/img/about/about-lecture-1.webp | 강의 | 1200×900 | 4:3 | 강의 자료 화면과 대표 | 강의하는 대표 한승지 |
| ABOUT-LECTURE-2 | public/assets/img/about/about-lecture-2.webp | 강의 | 1200×900 | 4:3 | 강의를 듣는 사장님들 (얼굴이 크게 보이지 않게) | 강의를 듣는 사장님들 |
| CERT-01 | public/assets/img/about/cert-01.webp | 자격증·수상 | 600×800 | 3:4 | 마케팅 전문강사 임명장 | 마케팅 전문강사 임명장 |
| CERT-02 | public/assets/img/about/cert-02.webp | 〃 | 600×800 | 3:4 | 온라인마케팅 우수상 | 온라인마케팅 우수상 |
| CERT-03 | public/assets/img/about/cert-03.webp | 〃 | 600×800 | 3:4 | 상권분석 수료증 | 상권분석 수료증 |
| CERT-04 | public/assets/img/about/cert-04.webp | 〃 | 600×800 | 3:4 | GTQ 그래픽기술자격 1급 (한국생산성본부) | GTQ 그래픽기술자격 1급 자격증 |
| CERT-05 | public/assets/img/about/cert-05.webp | 〃 | 600×800 | 3:4 | SNS광고마케터 1급 (한국정보통신진흥협회) | SNS광고마케터 1급 자격증 |
| CERT-06 | public/assets/img/about/cert-06.webp | 〃 | 600×800 | 3:4 | AI 자격증 (한국인공지능교육연구협회) | AI 자격증 |
| ABOUT-OFFICE | public/assets/img/about/about-office.webp | 오시는 길 | 1200×900 | 4:3 | 사무실 내부 또는 상담 테이블 | 제주마케팅파트너스 사무실 |

자격증 사진은 가로로 된 것이 있으면 흰 여백을 넣어 3:4로 맞춘다(자르지 않음). 개인정보(생년월일·자격번호)는 가린다. 지도는 구글 지도 `<iframe>`이 들어가 있어 이미지가 필요 없다.

합계 갱신: 공통 5개 + 사진 53장 (메인 15 · 서비스 6 · 가격 1 · 성공사례 20 · 소개 11).

## 문의 (`src/pages/contact.astro`) — 1장

| ID | 파일 경로 | 위치 | 크기 (px) | 비율 | 넣을 이미지 | alt |
|---|---|---|---|---|---|---|
| CONTACT-BUILDING | public/assets/img/contact/contact-building.webp | 오시는 길 (지도 옆) | 1200×900 | 4:3 | 연북로 161 건물 입구 또는 주차장. 처음 오는 사장님이 찾기 쉽게 | 사무실 건물 입구 |

합계 갱신: 공통 5개 + 사진 54장 (메인 15 · 서비스 6 · 가격 1 · 성공사례 20 · 소개 11 · 문의 1).

## 블로그 (`src/pages/blog.astro` · `src/content/blog/*.md`)

| ID | 파일 경로 | 위치 | 크기 (px) | 비율 | 넣을 이미지 |
|---|---|---|---|---|---|
| POST-HERO ★ | public/assets/img/blog/<글-주소>.webp | 글 대표 사진 (글 상세 첫 화면 + 목록 카드) | 1600×900 | 16:9 | 글 주제를 보여주는 사진 |
| POST-IMG | public/assets/img/blog/<글-주소>-1.webp, -2.webp … | 본문 사진 | 1200×900 | 4:3 | 본문 설명용 사진. 화면 캡처는 가로 1200 맞춤, 비율 자유 |
| CEO | public/assets/img/home/ceo.webp (공유) | 글 아래 글쓴이 | 800×800 | 1:1 | 메인 대표 사진을 그대로 씀 |

블로그 목록(`/blog`) 자체에는 고정 이미지가 없다. 글이 생기면 카드마다 POST-HERO가 들어간다.
