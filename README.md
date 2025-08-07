# TotaloadCert Landing Page

TotaloadCert 서비스의 랜딩 페이지입니다.

## 환경변수 설정

### 이메일 설정

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 구글 시트 설정 (Google Apps Script 사용)

1. **구글 시트 생성**

   - Google Sheets에서 새 스프레드시트 생성
   - 첫 번째 시트에 헤더 추가: `이메일 | 시간 | 신청유형`
   - **스프레드시트 ID 복사**: URL에서 `https://docs.google.com/spreadsheets/d/` 와 `/edit` 사이의 문자열 복사

2. **Google Apps Script 편집기 열기**

   - 스프레드시트에서 `확장 프로그램` → `Apps Script` 클릭
   - 또는 [script.google.com](https://script.google.com)에서 새 프로젝트 생성

3. **다음 코드를 Apps Script에 붙여넣기:**

   **중요**: `YOUR_SPREADSHEET_ID_HERE` 부분을 실제 스프레드시트 ID로 교체하세요.

```javascript
function doPost(e) {
  try {
    // 요청 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 방법 1: 스프레드시트 ID로 직접 접근 (권장)
    const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE"; // 스프레드시트 URL에서 복사
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    // 방법 2: 활성 스프레드시트 사용 (대안)
    // const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    if (!spreadsheet) {
      throw new Error(
        "스프레드시트를 찾을 수 없습니다. 스프레드시트 ID를 확인해주세요."
      );
    }

    const sheet = spreadsheet.getActiveSheet();
    if (!sheet) {
      throw new Error("활성 시트를 찾을 수 없습니다.");
    }

    // 데이터 준비
    const rowData = [
      data.email || "",
      data.timestamp || new Date().toLocaleString("ko-KR"),
      data.type || "사전신청",
    ];

    // 데이터 추가
    sheet.appendRow(rowData);

    console.log("데이터 추가 성공:", rowData);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "데이터가 성공적으로 추가되었습니다.",
        data: rowData,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Google Apps Script 오류:", error);

    return ContentService.createTextOutput(
      JSON.stringify({
        error: true,
        message: error.toString(),
        details: error.stack,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// 테스트용 함수 (Google Apps Script 편집기에서 직접 실행 가능)
function testFunction() {
  const testData = {
    email: "test@example.com",
    timestamp: new Date().toLocaleString("ko-KR"),
    type: "테스트",
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
    },
  };

  const result = doPost(mockEvent);
  console.log("테스트 결과:", result.getContent());
}

// 스프레드시트 ID 확인용 함수
function getSpreadsheetInfo() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (spreadsheet) {
      console.log("스프레드시트 ID:", spreadsheet.getId());
      console.log("스프레드시트 이름:", spreadsheet.getName());
      console.log("URL:", spreadsheet.getUrl());
    } else {
      console.log("활성 스프레드시트를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("오류:", error);
  }
}
```

4. **배포 설정**

   - `배포` → `새 배포` 클릭
   - `유형`을 `웹 앱`으로 설정
   - `설명`에 "API 엔드포인트" 입력
   - `실행 권한`: "모든 사용자"로 설정
   - `액세스 권한`: "모든 사용자"로 설정
   - `배포` 버튼 클릭

5. **권한 승인**

   - 배포 후 나타나는 권한 요청 창에서 `권한 검토` 클릭
   - Google 계정 선택 후 `고급` → `안전하지 않은 앱으로 이동` 클릭
   - `허용` 버튼 클릭

6. **URL 복사 및 환경변수 설정**
   - 배포 완료 후 나타나는 웹 앱 URL 복사
   - 환경변수 파일(.env.local)에 설정:

```

GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

```

### 문제 해결

**"Cannot read properties of null (reading 'appendRow')" 오류가 발생하는 경우:**

1. **스프레드시트 ID 확인**

   - Google Apps Script 코드에서 `YOUR_SPREADSHEET_ID_HERE`를 실제 스프레드시트 ID로 교체했는지 확인
   - 스프레드시트 URL에서 ID를 다시 복사해보세요
   - `getSpreadsheetInfo()` 함수를 실행하여 스프레드시트 정보 확인

2. **권한 확인**

   - Google Apps Script에서 스프레드시트에 대한 읽기/쓰기 권한이 있는지 확인
   - `서비스` → `Google Sheets API` 활성화

3. **테스트 실행**

   - Google Apps Script 편집기에서 `getSpreadsheetInfo()` 함수를 먼저 실행하여 스프레드시트 정보 확인
   - 그 다음 `testFunction()` 함수를 실행해보세요
   - 실행 로그에서 오류 메시지 확인

4. **배포 재설정**
   - 기존 배포를 삭제하고 새로 배포해보세요
   - 권한을 다시 승인해주세요

**단계별 해결 방법:**

1. **스프레드시트 ID 찾기**

   ```
   스프레드시트 URL: https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789JKL/edit
   스프레드시트 ID: 1ABC123DEF456GHI789JKL
   ```

2. **Google Apps Script에서 ID 교체**

   ```javascript
   const SPREADSHEET_ID = "1ABC123DEF456GHI789JKL"; // 실제 ID로 교체
   ```

3. **테스트 실행**

   - `getSpreadsheetInfo()` 실행 → 스프레드시트 정보 확인
   - `testFunction()` 실행 → 데이터 추가 테스트

4. **배포 및 권한 승인**
   - 새 버전으로 배포
   - 권한 다시 승인

## 설치 및 실행

```bash
npm install
npm run dev
```

## 기능

- 사전신청 폼
- 이메일 전송 (사용자에게 신청 완료 메일)
- 구글 시트에 이메일 저장 (A1 셀부터 이메일, 시간, 신청유형 저장)
