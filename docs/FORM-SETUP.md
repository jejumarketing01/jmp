# 상담 신청 폼 연결 (구글 시트 + 이메일)

`contact.html`의 상담 신청 폼은 구글 앱스 스크립트로 받는다.
신청이 들어오면 **구글 시트에 한 줄 저장**되고, **이메일로 알림**이 온다. 서버나 유료 서비스는 필요 없다.

## 1. 구글 시트 만들기
1. 구글 드라이브에서 새 스프레드시트를 만든다. 이름 예: `상담 신청`.
2. 메뉴 **확장 프로그램 → Apps Script**를 연다.

## 2. 스크립트 붙여넣기
기존 코드를 지우고 아래를 붙여넣는다. `NOTIFY_EMAIL`만 받을 주소로 바꾼다.

```js
const NOTIFY_EMAIL = '받을주소@gmail.com';   // ← 알림 받을 이메일
const SHEET_NAME = '상담신청';
const COLS = ['접수 시각','가게 이름','성함','휴대폰 번호','고민','알게 된 경로','한 달 홍보 예산','통화하기 편한 시간','바라는 결과'];

function clean(v) {
  v = String(v || '').slice(0, 1000).trim();
  return /^[=+\-@]/.test(v) ? "'" + v : v;   // 시트 수식 주입 방지
}

function doPost(e) {
  const p = e.parameter || {};
  if (p.website) return ContentService.createTextOutput('ok');          // 스팸(숨은 칸 채움)
  if (!p.shop || !p.name || !p.phone || !p.concern || !p.agree) return ContentService.createTextOutput('missing');

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(COLS);

  const budget = p.budget === '직접 적기' ? p.budget_custom : p.budget;
  const row = [new Date(), p.shop, p.name, p.phone, p.concern, p.source, budget, p.call_time, p.goal].map((v, i) => i === 0 ? v : clean(v));
  sh.appendRow(row);

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: `[상담 신청] ${clean(p.shop)} · ${clean(p.name)}`,
    body: COLS.map((c, i) => `${c}: ${row[i] || '-'}`).join('\n') + `\n\n시트: ${ss.getUrl()}`
  });
  return ContentService.createTextOutput('ok');
}
```

## 3. 배포
1. 오른쪽 위 **배포 → 새 배포** → 유형 **웹 앱**.
2. 실행 사용자: **나**, 액세스 권한: **모든 사용자**.
3. 처음 한 번 권한 승인(시트·메일 사용)을 한다.
4. 나오는 **웹 앱 URL**(`https://script.google.com/macros/s/…/exec`)을 복사한다.

## 4. 사이트에 연결
`contact.html`에서 아래 부분의 `data-endpoint=""` 안에 URL을 넣는다.

```html
<form class="consult-form reveal" data-consult-form data-endpoint="여기에 URL" novalidate>
```

## 5. 확인
- 사이트에서 시험 신청 → 시트에 한 줄 추가, 메일 도착을 확인한다.
- 스크립트를 고치면 **배포 → 배포 관리 → 수정 → 새 버전**으로 다시 배포해야 반영된다 (URL은 그대로).

## 참고
- 주소가 비어 있으면 폼은 "카카오톡이나 전화로 연락 주세요" 안내만 띄운다.
- 브라우저는 구글의 응답 내용을 읽지 못한다(no-cors). 네트워크가 끊긴 경우만 실패 안내가 나온다.
- 동의 문구의 보관 기간은 **상담이 끝나고 1년**이다. 1년이 지난 줄은 시트에서 지운다.
