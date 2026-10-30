# 제주마케팅파트너스 웹사이트

Astro 기반 정적 사이트입니다.

Node.js 22.23.4 이상이 필요합니다.

```sh
npm install
npm run dev
```

## 주요 경로

- `src/pages/`: 공개 페이지. 파일명이 주소가 됩니다 (`services.astro` → `/services`).
- `src/layouts/BaseLayout.astro`: 공통 문서 구조와 페이지 메타데이터.
- `src/components/`: 헤더, 메뉴 패널, 푸터, 플로팅 버튼, 하단 문의.
- `src/content/blog/`: 콘텐츠 컬렉션으로 관리하는 블로그 Markdown 글.
- `src/layouts/BlogPostLayout.astro`: 블로그 글 상세 화면.
- `public/assets/`: CSS, JavaScript, 이미지 등 정적 파일.
- `src/internal/styleguide.astro`: 배포하지 않는 디자인 시스템 참고용 마크업.

Astro 이전 원본 HTML은 Git 최초 커밋에서 확인할 수 있습니다.

## 배포

Cloudflare Pages 빌드 명령은 `npm run build`, 출력 폴더는 `dist`입니다.
