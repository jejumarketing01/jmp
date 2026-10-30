# Astro 프로젝트 구조

이 문서는 소스 파일의 위치와 수정 책임을 정한다. Astro 이전 원본 HTML은 Git 최초 커밋에서 확인한다.

## 실행과 배포

| 작업 | 명령 또는 설정 |
|---|---|
| 개발 서버 | `npm run dev` |
| 정적 빌드 | `npm run build` |
| 빌드 결과 확인 | `npm run preview` |
| Cloudflare Pages 빌드 명령 | `npm run build` |
| Cloudflare Pages 출력 폴더 | `dist` |

Node.js 버전은 `package.json`의 `engines`를 따른다. `dist/`와 `node_modules/`는 생성물이므로 직접 수정하지 않는다.

## 디렉터리별 책임

| 경로 | 책임 |
|---|---|
| `src/pages/` | 파일 기반 공개 라우트 |
| `src/layouts/BaseLayout.astro` | 공통 문서 구조, 메타데이터, 공통 컴포넌트 조립 |
| `src/layouts/BlogPostLayout.astro` | 블로그 상세 화면과 BlogPosting JSON-LD |
| `src/components/` | 헤더, 메뉴 패널, 푸터, 플로팅 버튼, 하단 문의 |
| `src/content.config.ts` | `blog` 콘텐츠 컬렉션 스키마 |
| `src/content/blog/` | 블로그 Markdown·MDX 원문 |
| `src/internal/styleguide.astro` | 디자인 시스템 참고용 마크업. 라우트가 아니며 배포하지 않음 |
| `public/assets/css/` | 디자인 토큰과 페이지별 CSS |
| `public/assets/js/main.js` | 브라우저 상호작용과 상담 폼 처리 |
| `public/assets/img/` | 최적화한 공개 이미지 |
| `public/_redirects` | 예전 `.html` 주소의 301 리다이렉트 |
| `dist/` | `npm run build`가 만드는 배포 결과. 직접 수정 금지 |

`public/` 아래 파일은 사이트 루트에 그대로 배포된다. 예를 들어 `public/assets/img/home/hero-1.webp`는 마크업에서 `/assets/img/home/hero-1.webp`로 참조한다.

## 공개 주소

| 소스 | 주소 |
|---|---|
| `src/pages/index.astro` | `/` |
| `src/pages/services.astro` | `/services` |
| `src/pages/pricing.astro` | `/pricing` |
| `src/pages/cases.astro` | `/cases` |
| `src/pages/about.astro` | `/about` |
| `src/pages/blog.astro` | `/blog` |
| `src/pages/blog/[slug].astro` | `/blog/<글-주소>` |
| `src/pages/contact.astro` | `/contact` |
| `src/pages/privacy.astro` | `/privacy` |

스타일가이드는 공개 주소가 없다. `src/internal/styleguide.astro`는 참고용 소스이며 `src/pages/`로 옮기지 않는다.

내부 링크는 `.html` 없이 루트 기준 경로를 쓴다. 이전 주소 호환이 필요한 페이지만 `public/_redirects`에 301 규칙을 둔다.

## 수정 위치 선택

- 모든 페이지에 보이는 구조는 `BaseLayout.astro` 또는 해당 공통 컴포넌트에서 고친다.
- 한 페이지의 내용은 해당 `src/pages/*.astro`에서 고친다.
- 한 페이지의 모양은 `public/assets/css/pages/*.css`에서 고친다.
- 전체 디자인 토큰과 공통 클래스는 `public/assets/css/design-system.css`에서 고친다.
- 브라우저 동작은 `public/assets/js/main.js`에서 고친다.
- 블로그 글 데이터는 `src/content/blog/*.{md,mdx}`에서 고친다. 목록 카드와 상세 경로는 컬렉션에서 자동 생성된다.
- `dist/`의 파일은 고치지 않는다. Astro 이전 원본이 필요하면 Git 최초 커밋을 확인한다.

## 블로그 빌드 흐름

`src/content.config.ts`가 frontmatter를 검증한다. `src/pages/blog.astro`는 공개 글 목록을 만들고, `src/pages/blog/[slug].astro`는 글별 정적 경로를 만든다. `draft: true`인 글은 목록과 상세 페이지 빌드에서 모두 제외된다.

글 상세 공통 마크업, canonical, OG, BlogPosting JSON-LD, 이전·다음 글은 `BlogPostLayout.astro`와 동적 라우트가 생성한다. 개별 글에서 이를 중복 작성하지 않는다.

## 완료 확인

1. `npm run build`가 성공한다.
2. 내부 링크는 `.html` 없이 열리고, 필요한 예전 주소는 301로 이동한다.
3. 1440px와 390px에서 가로 스크롤이 없다.
4. 브라우저 콘솔 오류와 깨진 내부 링크가 없다.
5. 새로 확인할 내용은 `docs/TODO.md`에 기록한다.
