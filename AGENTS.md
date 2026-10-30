# 제주마케팅파트너스 웹사이트

정적 HTML 사이트. 빌드 도구 없음. GitHub에 푸시하면 Cloudflare Pages가 저장소 루트를 그대로 배포한다 (빌드 명령 없음, 출력 폴더 `/`).

메인(`index.html`)이 완성된 기준 페이지다. 다른 페이지는 메인과 같은 디자인 시스템으로 만든다. 디자인 레퍼런스는 Borgholm 워드프레스 테마(https://borgholm.qodeinteractive.com/)이며, 레이아웃·여백·리듬만 따르고 테마의 사진·문구·코드는 쓰지 않는다.

## 새 페이지 만들기

1. `index.html`에서 공통 뼈대를 복사한다: `<head>`(제목·설명만 바꿈), 헤더, 메뉴 패널 `<dialog>`, 푸터, 플로팅 버튼, `main.js`. 해당 메뉴 링크에 `aria-current="page"`를 단다.
2. 페이지 전용 스타일은 `assets/css/pages/<페이지>.css`에 둔다. 색·글자 크기·간격은 `design-system.css`의 토큰(`var(--...)`)만 쓴다.
3. 섹션은 디자인 시스템의 컴포넌트로 조립한다 → [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md)
4. 문구는 [docs/카피_기준자료.md](docs/카피_기준자료.md)의 확정 문구·사실만 쓰고, [docs/COPY-RULES.md](docs/COPY-RULES.md)로 점검한다. 기준자료에 없는 수치·기간·서비스는 넣지 않고 `<!-- TODO: 확인 필요 -->`로 남긴다.
5. 사진 자리는 `.img-slot`으로 잡고, 넣을 사진 설명을 [docs/IMAGES.md](docs/IMAGES.md)에 추가한다.

완료 기준: 1440px·390px 폭에서 가로 스크롤 없음, 콘솔 오류 없음, 페이지의 모든 문구가 기준자료와 일치, 새 TODO는 [docs/TODO.md](docs/TODO.md)에 기록.

## 공통 영역 수정

헤더·메뉴 패널·푸터·플로팅 버튼 마크업은 모든 페이지에 똑같이 들어 있다. 하나를 고치면 모든 HTML 파일에서 같이 고친다.

## 마크업 규칙

- 시맨틱 태그: `header` / `nav` / `main` / `section`(+`aria-labelledby`) / `article` / `footer`. 페이지당 `h1`은 하나.
- 제목 단계를 건너뛰지 않는다 (h1 → h2 → h3).
- 영문 장식 라벨(`.eyebrow`)은 `aria-hidden="true"`. 사장님이 읽는 문구는 모두 한국어.
- 내부 링크는 `services.html` 형식 (Cloudflare Pages가 `/services`로 정리해 준다).

## 상담 신청 폼

`contact.html`의 폼은 구글 앱스 스크립트(구글 시트 저장 + 이메일 알림)로 받는다. 설정은 [docs/FORM-SETUP.md](docs/FORM-SETUP.md). 배포 URL을 `<form data-endpoint="">`에 넣는다. 폼 동작 코드는 `main.js`의 `[data-consult-form]` 부분.

## 블로그 글 추가

글은 이 사이트 안 `blog/` 폴더에 HTML 파일 하나씩 올린다.

1. `blog/_template.html`을 복사해 `blog/<글-주소>.html`로 저장한다. 글 주소는 영문 소문자·숫자·하이픈 (예: `jeju-ad-cost.html`).
2. `<head>`에서 `noindex` 줄을 지우고, 제목·설명·canonical·og·JSON-LD(BlogPosting)의 "글 제목/요약/글-주소/날짜"를 모두 바꾼다.
3. 본문은 `.prose` 안에서 템플릿에 있는 요소(h2·h3·p·ul·ol·figure·blockquote·table·notice-box)만 쓴다. 문구는 COPY-RULES.md를 따른다.
4. 대표 사진: `assets/img/blog/<글-주소>.webp` (1600×900, 16:9). 목록 카드에도 같은 사진을 쓴다.
5. `blog.html`의 `.post-grid` 맨 앞에 카드(주석 예시 복사)를 추가하고, 첫 글을 올릴 때 `.post-empty`를 지운다. "앞으로 쓸 글"에서 같은 주제는 지운다.
6. 이전·다음 글 링크(`.post__nav`)를 앞뒤 글과 서로 맞춘다.

`blog/` 안의 파일은 경로가 한 단계 아래라 `../assets/...`, `../services.html`처럼 `../`를 붙인다. `_template.html`은 배포되더라도 `noindex`라 검색에 나오지 않는다.
