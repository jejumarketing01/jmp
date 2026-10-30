# 제주마케팅파트너스 웹사이트

Astro 기반 정적 사이트다. `npm run build`로 `dist/`를 만들고 Cloudflare Pages에 배포한다. 빌드 명령은 `npm run build`, 출력 폴더는 `dist`다.

메인(`src/pages/index.astro`)이 완성된 기준 페이지다. 다른 페이지는 메인과 같은 디자인 시스템으로 만든다. 디자인 레퍼런스는 Borgholm 워드프레스 테마(https://borgholm.qodeinteractive.com/)이며, 레이아웃·여백·리듬만 따르고 테마의 사진·문구·코드는 쓰지 않는다.

Astro 이전의 원본 HTML은 Git 최초 커밋에 보관되어 있다. 작업 트리에는 별도 원본 사본을 두지 않는다.

프로젝트 구조와 파일별 책임은 [docs/PROJECT-STRUCTURE.md](docs/PROJECT-STRUCTURE.md)를 따른다.

## 개발·배포

- 개발 서버: `npm run dev`
- 정적 빌드: `npm run build`
- 빌드 결과 확인: `npm run preview`
- 공개 페이지는 `src/pages/`에 둔다. `services.astro`의 주소는 `/services`이며 내부 링크에도 `.html`을 붙이지 않는다.
- CSS·JavaScript·이미지는 `public/assets/`에 두고 Astro·Markdown 마크업에서는 `/assets/...` 루트 기준 경로로 불러온다.
- `public/`의 파일은 빌드 때 사이트 루트로 그대로 복사된다. `public/assets/img/...`의 공개 URL은 `/assets/img/...`다.
- `dist/`는 빌드 생성물이므로 직접 수정하거나 커밋하지 않는다.
- 스타일가이드 원본은 `src/internal/styleguide.astro`에 보관한다. `src/pages/`에 두지 않으며 배포 페이지로 만들지 않는다.

## 새 페이지 만들기

1. `src/pages/<페이지>.astro`를 만들고 `src/layouts/BaseLayout.astro`를 사용한다. 제목·설명·canonical·OG 문구·본문 클래스·페이지 CSS·활성 메뉴를 props로 넘긴다. 본문 섹션 구성은 `src/pages/index.astro`를 기준으로 한다.
2. 페이지 전용 스타일은 `public/assets/css/pages/<페이지>.css`에 둔다. 색·글자 크기·간격은 `design-system.css`의 토큰(`var(--...)`)만 쓴다.
3. 섹션은 디자인 시스템의 컴포넌트로 조립한다 → [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md)
4. 문구는 [docs/카피_기준자료.md](docs/카피_기준자료.md)의 확정 문구·사실만 쓰고, [docs/COPY-RULES.md](docs/COPY-RULES.md)로 점검한다. 기준자료에 없는 수치·기간·서비스는 넣지 않고 `<!-- TODO: 확인 필요 -->`로 남긴다.
5. 사진 자리는 `.img-slot`으로 잡고, 넣을 사진 설명을 [docs/IMAGES.md](docs/IMAGES.md)에 추가한다.
6. 예전 `.html` 주소를 유지해야 할 때만 `public/_redirects`에 `/페이지.html /페이지 301`을 추가한다.

완료 기준: `npm run build` 성공, 1440px·390px 폭에서 가로 스크롤 없음, 콘솔 오류 없음, 페이지의 모든 문구가 기준자료와 일치, 새 TODO는 [docs/TODO.md](docs/TODO.md)에 기록.

## 공통 영역 수정

공통 문서 구조와 공통 `<head>`는 `src/layouts/BaseLayout.astro`에서 관리한다. 헤더·메뉴 패널·푸터·플로팅 버튼·하단 문의는 각각 `src/components/Header.astro`, `MenuPanel.astro`, `SiteFooter.astro`, `FloatingActions.astro`, `ContactCta.astro`에서 관리한다. 공통 영역을 페이지에 다시 복사하지 않는다. 페이지별 JSON-LD나 추가 메타데이터는 `BaseLayout`의 `head` 슬롯에 넣는다.

## 마크업 규칙

- 시맨틱 태그: `header` / `nav` / `main` / `section`(+`aria-labelledby`) / `article` / `footer`. 페이지당 `h1`은 하나.
- 제목 단계를 건너뛰지 않는다 (h1 → h2 → h3).
- 영문 장식 라벨(`.eyebrow`)은 `aria-hidden="true"`. 사장님이 읽는 문구는 모두 한국어.
- 내부 링크는 `/services`, `/contact#consult`처럼 루트 기준 경로를 쓴다.

## 상담 신청 폼

`src/pages/contact.astro`의 폼은 구글 앱스 스크립트(구글 시트 저장 + 이메일 알림)로 받는다. 설정은 [docs/FORM-SETUP.md](docs/FORM-SETUP.md). 배포 URL을 `<form data-endpoint="">`에 넣는다. 폼 동작 코드는 `public/assets/js/main.js`의 `[data-consult-form]` 부분.

## 블로그 글 추가

글은 Astro 콘텐츠 컬렉션 `blog`로 관리한다. 스키마는 `src/content.config.ts`, 글 파일은 `src/content/blog/`에 둔다.

1. `src/content/blog/example-post.md`를 복사해 `src/content/blog/<글-주소>.md`로 저장한다. 글 주소는 영문 소문자·숫자·하이픈 (예: `jeju-ad-cost.md`, 공개 주소 `/blog/jeju-ad-cost`).
2. frontmatter의 `title`, `description`, `category`, `publishDate`, `updatedDate`, `heroImage`, `heroAlt`를 바꾸고 공개할 때 `draft: false`로 둔다.
3. 본문은 Markdown의 h2·h3·p·ul·ol·blockquote·table과 예시 글에 있는 `figure`, `notice-box` 마크업만 쓴다. 문구는 COPY-RULES.md를 따른다.
4. 대표 사진: `public/assets/img/blog/<글-주소>.webp` (1600×900, 16:9). `heroImage`에는 `/assets/img/blog/<글-주소>.webp`를 넣는다.
5. 글 목록 카드, 상세 페이지, canonical·OG·JSON-LD, 이전·다음 글 링크는 컬렉션 데이터로 자동 생성된다. 게시한 주제는 `src/pages/blog.astro`의 "앞으로 쓸 글"에서 지운다.
6. `draft: true`인 글은 목록과 정적 상세 페이지 빌드에서 제외된다.

글 상세 마크업은 `src/layouts/BlogPostLayout.astro`에서 관리한다. 자산과 내부 링크는 `/assets/...`, `/services`처럼 루트 기준 경로를 쓴다.
