import nodemailer from 'nodemailer'

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

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // 1. 사용자에게 신청 완료 메일 전송
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: '[TotaloadCert] 사전신청 접수 완료',
        text: `안녕하세요,\n\nTotaloadCert 서비스 사전신청이 성공적으로 접수되었습니다.\n\n서비스 출시 시 가장 먼저 연락드리겠습니다.\n\n감사합니다.\nTotaloadCert 팀`,
        html: `
          <h2>사전신청 접수 완료</h2>
          <p>안녕하세요,</p>
          <p>TotaloadCert 서비스 사전신청이 성공적으로 접수되었습니다.</p>
          <p>서비스 출시 시 가장 먼저 연락드리겠습니다.</p>
          <br>
          <p>감사합니다.</p>
          <p><strong>TotaloadCert 팀</strong></p>
        `,
      })
    } catch (userMailError) {
      return new Response(JSON.stringify({ error: '사용자에게 메일 전송 실패' }), { status: 500 })
    }

    // 2. 구글 시트에 이메일 저장
    try {
      // Google Apps Script URL
      const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL

      if (!scriptUrl) {
        throw new Error('스크립트 설정 오류')
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
      
      try {
        JSON.parse(responseText)
      } catch (parseError) {
        // HTML 응답인 경우 (Google Apps Script 오류 페이지)
        if (responseText.includes('<!DOCTYPE html>') || responseText.includes('TypeError')) {
          throw new Error('Google Apps Script 실행 오류 - 스프레드시트 연결을 확인해주세요')
        }
        
        throw new Error('Google Apps Script 응답 형식 오류')
      }
    } catch (sheetError) {
      // 시트 저장 실패는 전체 요청 실패로 처리하지 않음 (사용자는 이미 메일을 받았으므로)
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: '메일 전송 실패', detail: String(err) }), { status: 500 })
  }
}
