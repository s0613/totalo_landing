import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { email, type } = await req.json()
    
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
      console.log(`사용자(${email})에게 신청 완료 메일 전송 성공`)
    } catch (userMailError) {
      console.error('사용자에게 메일 전송 실패:', userMailError)
      return new Response(JSON.stringify({ error: '사용자에게 메일 전송 실패' }), { status: 500 })
    }

    // 2. 관리자에게 알림 메일 전송
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: `[신청완료] ${email}`,
        text: `새로운 사전신청이 접수되었습니다.\n\n이메일: ${email}\n신청일시: ${new Date().toLocaleString('ko-KR')}`,
        html: `
          <h2>TotaloadCert 서비스 사전신청</h2>
          <p><strong>이메일:</strong> ${email}</p>
          <p><strong>신청일시:</strong> ${new Date().toLocaleString('ko-KR')}</p>
          <p><strong>신청 유형:</strong> ${type || '사전신청'}</p>
        `,
      })
      console.log(`관리자(${process.env.EMAIL_TO})에게 알림 메일 전송 성공`)
    } catch (adminMailError) {
      console.error('관리자에게 메일 전송 실패:', adminMailError)
      // 관리자 메일 실패는 전체 요청 실패로 처리하지 않음 (사용자는 이미 메일을 받았으므로)
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    console.error('메일 전송 오류:', err)
    return new Response(JSON.stringify({ error: '메일 전송 실패', detail: String(err) }), { status: 500 })
  }
}
