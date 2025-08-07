export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    
    if (!email) {
      return new Response(JSON.stringify({ error: '이메일 주소가 필요합니다' }), { status: 400 })
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: '올바른 이메일 형식이 아닙니다' }), { status: 400 })
    }

    // Google Apps Script URL
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL

    if (!scriptUrl) {
      return new Response(JSON.stringify({ error: '스크립트 설정 오류' }), { status: 500 })
    }

    // Google Apps Script에 데이터 전송 (email만 전송)
    const result = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email,
        timestamp: new Date().toLocaleString("ko-KR"),
        type: "사전신청"
      }),
    })

    if (!result.ok) {
      const errorText = await result.text()
      throw new Error(`Google Apps Script 요청 실패: ${result.status} - ${errorText}`)
    }

    const responseText = await result.text()
    
    let json
    try {
      json = JSON.parse(responseText)
    } catch (parseError) {
      // HTML 응답인 경우 (Google Apps Script 오류 페이지)
      if (responseText.includes('<!DOCTYPE html>') || responseText.includes('TypeError')) {
        throw new Error('Google Apps Script 실행 오류 - 스프레드시트 연결을 확인해주세요')
      }
      
      throw new Error('Google Apps Script 응답 형식 오류')
    }

    return new Response(JSON.stringify({ success: true, data: json }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: '시트 저장 실패', detail: String(err) }), { status: 500 })
  }
}
