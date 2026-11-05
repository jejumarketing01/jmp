# 디자인 시스템

모든 값은 `public/assets/css/design-system.css`의 토큰이 원본이다. 이 문서는 쓰는 법만 적는다. 참고용 마크업은 `src/internal/styleguide.astro`에 있으며 배포하지 않는다.

페이지 마크업은 `src/pages/*.astro`, 공통 문서 구조는 `src/layouts/BaseLayout.astro`, 공통 영역은 `src/components/*.astro`에서 관리한다. 클래스 기반 디자인 시스템은 Astro 컴포넌트 안에서도 아래 마크업을 그대로 사용한다.

## 원칙 (Borgholm에서 가져온 것)

- **흰 바탕 + 넓은 여백.** 섹션 위아래 여백은 `--section-y` 하나로 통일한다.
- **주황은 포인트로만.** 큰 제목의 강조 단어, 주 버튼, 얇은 선, 작은 원. 넓은 면적을 주황으로 채우지 않는다 (예외: 오른쪽 위 메뉴 원, 문의 띠의 버튼).
- **배경 리듬.** 흰색 → 회색(`.section--soft`) → 살구색(`.section--peach`) → 흰색을 번갈아 써서 섹션을 구분한다. 같은 배경이 연속되면 구분선 대신 사진(`.wide-photo`)을 끼운다.
- **사진은 화면 끝까지.** 가로 줄(`.rail`)과 넓은 사진은 컨테이너 밖 화면 끝까지 늘린다.
- **글꼴은 Pretendard 하나.** 자간은 좁히지 않는다(0). 제목 줄 간격은 1.4(`--lh-tight`), 카드 제목은 1.5. 큰 제목(`.display`)은 굵기 600, 섹션 제목(`.h2`)·카드 제목(`.h3`)은 700. 차움(chaum.net) 사이트의 Pretendard 설정을 기준으로 맞췄다. 음수 `letter-spacing`은 쓰지 않는다(로고 글자만 예외). 한국어에 기울임꼴은 쓰지 않는다.

## 색

| 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `--c-point` | #f23902 | 큰 제목 강조, 버튼 배경, 선 |
| `--c-point-hover` | #d93300 | 주 버튼 hover |
| `--c-point-text` | #c42e00 | **작은 글씨**의 주황 (태그, 번호, 수치 강조) |
| `--c-ink` / `--c-text` / `--c-muted` / `--c-faint` | #111 / #333 / #6b6b6b / #9a9a9a | 제목 / 본문 / 보조 / 라벨 |
| `--c-bg-soft` / `--c-peach` | #f7f7f7 / #fbe9df | 섹션 배경 |

접근성: `#f23902`는 흰 바탕 대비가 약 3.9:1이라 큰 글씨(19px 굵게 이상)에만 쓴다. 작은 주황 글씨는 `--c-point-text`를 쓴다. 버튼 글자를 19px 굵게로 둔 이유도 이것이다.

## 글자

| 클래스 | 크기 | 쓰는 곳 |
|---|---|---|
| `.display` | 36→60px, 굵기 600, 줄 간격 1.4 | 메인 배너 H1 (페이지 첫 제목) |
| `.h2` | 30→46px, 굵기 700, 줄 간격 1.4 | 섹션 제목 |
| `.h3` | 20→24px, 굵기 700, 줄 간격 1.5 | 카드 제목 |
| `.lead` | 17→20px | 제목 아래 보조 문장 |
| 본문 | 17px | 사장님이 읽기 편한 크기. 이보다 줄이지 않는다 |
| `.small` | 15px | 안내문 |
| `.eyebrow` | 12px 영문 대문자 | 섹션 위 장식 라벨 (`aria-hidden`) |

강조 단어는 `<span class="accent">`로 감싼다. 메인 배너처럼 두 줄을 나눌 때는 `<span class="line">`을 쓴다.

## 컴포넌트

| 이름 | 클래스 | 설명 |
|---|---|---|
| 섹션 | `.section` (+ `--soft` / `--peach` / `--dark`) | 위아래 여백과 배경 |
| 2단 | `.grid-2` | 왼쪽 글(5) : 오른쪽 이미지(7) |
| 주 버튼 | `.btn.btn--primary` | "카카오톡으로 문의하기" 전용. 상자 밖으로 화살표가 나온다 |
| 보조 버튼 | `.btn.btn--ghost` | "상담 신청하기" |
| 버튼 묶음 | `.btn-group` + `.btn-note` | 버튼 + 아래 안내문 |
| 글자 링크 | `.link-arrow` | "~ 보기" 형태의 이동 링크 |
| 텍스트 카드 | `.line-card` | 제목 + 본문 + 링크 |
| 번호 목록 | `ol.num-list` | 01·02·03 번호가 붙는 항목 |
| 숫자 | `.stat` > `.stat__num` + `.stat__label` | 큰 숫자, 단위는 `<em>` |
| 문의 띠 | `.section--peach.cta-band` | 주황 제목 + 버튼 한 줄 |
| 가로 줄 | `ul.rail[data-rail="이름"]` + `.rail-nav[data-rail-nav="이름"]` | 옆으로 넘기는 카드. 이전/다음 버튼은 `public/assets/js/main.js`가 연결 |
| 이미지 자리 | `.img-slot.ratio-*` | 사진 전까지 쓰는 회색 박스. 아래 참고 |
| 메뉴 패널 | `dialog#menu-panel` | 오른쪽에서 열리는 메뉴·연락처 |
| 플로팅 | `.floating` > `.fab--kakao`, `.fab--top` | 카카오톡, 맨 위로 |
| 등장 효과 | `.reveal` | 스크롤하면 아래에서 올라오며 나타남 |
| 서브 페이지 인트로 | `section.page-intro` > `.page-intro__copy` + `.page-intro__visual` | 메인 배너를 한 장으로 줄인 형태. 사진 뒤에 주황 원을 배치. H1은 `.display` |
| 페이지 안 바로가기 | `ul.jump-links` (`nav` 안) | 번호 + 이름 + ↓ 목록. 같은 페이지 섹션으로 이동 |
| 넓은 사진 | `.wide-photo` | 섹션 사이 화면 끝까지. PC 21:9, 모바일 4:3 |
| 2단 블록 | `.split` > `header.split__head`(라벨·H2·`.split__lead`) + 내용 | 서브 페이지 본문 기본형. 왼쪽 제목이 PC에서 따라옴. 라벨은 `.split__label`(번호 + 영문, `aria-hidden`) |
| 안내 상자 | `aside.notice-box` | 흰 배경의 안내 상자 |
| 정의 표 | `dl.def-list` > `div` > `dt`+`dd` | 항목 / 내용 줄. 계약 조건 같은 목록 |
| 하단 문의 | `section.contact` | `BaseLayout`의 `showContactCta`로 표시. 마크업은 `src/components/ContactCta.astro`에서 관리 |

## 이미지 자리

```html
<div class="img-slot ratio-4x3" role="img" aria-label="사진 설명">
  <p class="img-slot__text"><strong>ID · 비율 · 크기</strong>넣을 사진 설명</p>
</div>
```

사진이 생기면 이렇게 바꾼다. 비율 클래스는 남겨서 레이아웃이 흔들리지 않게 한다.

```html
<img class="img-cover ratio-4x3" src="/assets/img/파일명.jpg" alt="사진 설명" width="1200" height="900" loading="lazy">
```

첫 화면(메인 배너) 사진에는 `loading="lazy"`를 빼고 `fetchpriority="high"`를 넣는다. 비율 클래스: `ratio-16x10`, `4x3`, `3x4`, `1x1`, `21x9`, `16x9`, `9x16`(세로 영상).

## 페이지 구성 패턴 (메인 기준)

1. 메인 배너 / 페이지 인트로 — 흰 바탕, 왼쪽 글 + 오른쪽 사진
2. 짧은 카드 묶음 — 회색 바탕, `.line-card`
3. 주요 내용 — 흰 바탕, 왼쪽 고정 제목 + 오른쪽 가로 줄
4. 문의 띠 — 살구색
5. 넓은 사진 → 흰 바탕 2단 (제목 / 번호 목록)
6. 카드 가로 줄 — 회색 바탕
7. 안심 조건 — 살구색
8. 하단 문의 — 흰 바탕의 2단 구성

## 서브 페이지 구성 패턴 (`src/pages/services.astro` 기준)

서브 페이지는 `src/pages/pricing.astro`의 페이지 구성과 `BaseLayout` props를 참고해 시작한다. 공통 헤더·메뉴·푸터·플로팅 버튼은 복사하지 않는다. `src/pages/services.astro`의 `.svc__*`는 `.split`과 같은 모양의 옛 이름이다.

1. 인트로 — `.page-intro`. 흰 바탕, 왼쪽 H1·설명·바로가기 + 오른쪽 사진
2. 내용 블록 — `.section` + 2단(왼쪽 5 : 오른쪽 7). 왼쪽 제목은 PC에서 스크롤해도 따라오게(sticky) 고정
3. 블록 머리 — 번호 라벨(`01 영상 ——`) + H2(강조 단어는 `.accent`) + 설명 줄 + `.link-arrow`
4. 배경 리듬 — 흰색 ↔ 회색을 번갈아 쓰고, 흰색이 이어지면 `.wide-photo`를 끼운다. 살구색은 페이지 끝 가까이 한 번
5. 하단 문의 — `.contact`

목록에 주는 여백은 컴포넌트 클래스에 그대로 쓰면 된다. 공통 리셋(`:where(ul[class], ol[class])`)은 우선순위가 0이라 덮어쓰지 않는다.
