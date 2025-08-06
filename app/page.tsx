"use client"

import {
  ArrowRight,
  CheckCircle,
  Download,
  FileText,
  Globe,
  Shield,
  Zap,
  Database,
  Users,
  BarChart3,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function LandingPage() {
  // 사전신청 폼 상태
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<null | { type: "success" | "error"; message: string }>(null)
  const { toast } = useToast()

  // 사전신청 폼 전송 함수
  async function handlePreRegisterSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch("/api/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "pre-register" }),
      })
      if (res.ok) {
        setResult({ type: "success", message: "사전신청이 완료되었습니다! 입력하신 이메일로 확인 메일을 발송했습니다." })
        setEmail("")
      } else {
        const data = await res.json()
        setResult({ type: "error", message: data.error || "전송 중 오류가 발생했습니다." })
      }
    } catch (err) {
      setResult({ type: "error", message: "네트워크 오류가 발생했습니다." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/95 backdrop-blur-sm border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/logo.svg" alt="TotaloadCert" className="h-8 w-auto cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">
                기능
              </a>
              <a href="#background" className="text-slate-300 hover:text-white transition-colors">
                사업 배경
              </a>
              <a href="#contact" className="text-slate-300 hover:text-white transition-colors">
                문의하기
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white">AI 및 디지털 인증으로</span>
                  <br />
                  <span className="text-emerald-400">모빌리티 수출의</span>
                  <br />
                  <span className="text-white">신뢰와 실리를 증명합니다</span>
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed">
                  중고차 수출 인증 프로세스를 완전 자동화하여 시간과 비용을 절약하고, 국제 표준에 맞는 신뢰할 수 있는
                  인증서를 제공합니다.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg flex items-center justify-center rounded-lg transition-colors duration-200" style={{ minHeight: 48 }}>
                  데모 요청하기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="aspect-video bg-slate-700 rounded-lg overflow-hidden">
                  <img
                    src="/dashboard-hero.png"
                    alt="TotaloadCert 대시보드 - 람보르기니 우루스 차량 인증 예시"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-slate-400">실제 대시보드 인터페이스</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white">현재 중고차 수출 시장의 문제점</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">복잡한 수동 검수 프로세스</h3>
                    <p className="text-slate-400">전문가의 직접 방문과 수동 검사로 인한 시간 지연과 높은 비용</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">국가별 상이한 인증 기준</h3>
                    <p className="text-slate-400">각국의 다른 규정과 요구사항으로 인한 혼란과 오류 발생</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">신뢰성 부족</h3>
                    <p className="text-slate-400">표준화되지 않은 인증서와 검증 과정으로 인한 신뢰도 저하</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="aspect-square bg-slate-700 rounded-lg overflow-hidden">
                  <img
                    src="/used-car-market.avif"
                    alt="복잡한 중고차 수출 시장 현황"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-slate-400">현재 중고차 수출 시장의 복잡한 현실</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">핵심 기능</h2>
            <p className="text-xl text-slate-400">AI 기반 자동화로 중고차 수출 인증을 혁신합니다</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800 border-slate-700 p-8">
              <CardContent className="p-0 space-y-6">
                <div className="w-16 h-16 bg-emerald-600/20 rounded-xl flex items-center justify-center">
                  <img src="/logo1.svg" alt="AI 자동 검수" className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">AI 자동 검수 및 ISO 인증</h3>
                  <p className="text-slate-400 leading-relaxed">
                    머신러닝 기반 이미지 분석과 데이터 검증을 통해 ISO 표준에 맞는 자동 검수 시스템을 제공합니다.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 p-8">
              <CardContent className="p-0 space-y-6">
                <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center">
                  <img src="/europe.svg" alt="국가별 인증" className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">국가별 인증 리포트 생성</h3>
                  <p className="text-slate-400 leading-relaxed">
                    각국의 수입 규정에 맞춘 맞춤형 인증서와 다국어 리포트를 자동으로 생성합니다.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 p-8">
              <CardContent className="p-0 space-y-6">
                <div className="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center">
                  <img src="/totaload-icon.svg" alt="ERP/API 연동" className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">ERP/API 연동 기반 SaaS</h3>
                  <p className="text-slate-400 leading-relaxed">
                    기존 시스템과의 완벽한 연동을 통해 워크플로우 중단 없이 서비스를 이용할 수 있습니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">인증 프로세스</h2>
            <p className="text-xl text-slate-400">4단계 자동화 프로세스로 빠르고 정확한 인증</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "검수", desc: "AI 기반 자동 차량 검수", icon: Shield },
              { step: 2, title: "인증", desc: "ISO 표준 인증 생성", icon: CheckCircle },
              { step: 3, title: "발급", desc: "다국어 인증서 발급", icon: FileText },
              { step: 4, title: "수출 완료", desc: "최종 승인 및 수출", icon: Globe },
            ].map((item, index) => (
              <div key={index} className="text-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-sm font-bold text-emerald-400">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">대시보드 프리뷰</h2>
            <p className="text-xl text-slate-400">바이어와 관리자를 위한 직관적인 인터페이스</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-slate-800 border-slate-700 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="h-8 w-8 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white">바이어 뷰</h3>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3 text-slate-300">
                    <Download className="h-5 w-5 text-emerald-400" />
                    <span>인증서 다운로드</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-300">
                    <Globe className="h-5 w-5 text-blue-400" />
                    <span>언어별 리포트 보기</span>
                  </div>
                </div>
                <div className="bg-slate-700 rounded-lg p-6">
                  <div className="aspect-video bg-slate-600 rounded overflow-hidden">
                    <img
                      src="/dashboard-buyer.png"
                      alt="바이어 대시보드 - 차량 인증 정보 조회"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Settings className="h-8 w-8 text-purple-400" />
                  <h3 className="text-2xl font-bold text-white">관리자 뷰</h3>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3 text-slate-300">
                    <BarChart3 className="h-5 w-5 text-emerald-400" />
                    <span>검수 이력 확인</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-300">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <span>JSON/PDF 관리</span>
                  </div>
                </div>
                <div className="bg-slate-700 rounded-lg p-6">
                  <div className="aspect-video bg-slate-600 rounded overflow-hidden">
                    <img
                      src="/dashboard-admin.png"
                      alt="관리자 대시보드 - 인증서 발급 시스템"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Value */}
      <section id="background" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">사업 가치</h2>
            <p className="text-xl text-slate-400">TotaloadCert가 제공하는 핵심 가치</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "완전 자동화", desc: "수동 프로세스 제거로 90% 시간 단축", icon: Zap },
              { title: "무방문 인증", desc: "원격 검수로 비용 절감", icon: Shield },
              { title: "다국가 기준 대응", desc: "50개국 수출 규정 지원", icon: Globe },
              { title: "개발자 최적화", desc: "RESTful API와 SDK 제공", icon: Database },
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-600/20 rounded-xl flex items-center justify-center mx-auto">
                  <item.icon className="h-8 w-8 text-emerald-400" />
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">사전신청하기</h2>
          <p className="text-xl text-slate-400 mb-12">
            TotaloadCert 서비스 출시 시 가장 먼저 알려드립니다
          </p>
          {/* 사전신청 폼 */}
          <form onSubmit={handlePreRegisterSubmit} className="flex flex-col gap-4 max-w-md mx-auto mb-8 bg-slate-800 p-6 rounded-xl border border-slate-700">
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              className="bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 px-4 py-3 rounded"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded text-lg font-semibold disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "신청 중..." : "사전신청하기"}
            </button>
            {result && (
              <div className={`mt-2 text-sm ${result.type === "success" ? "text-emerald-400" : "text-red-400"}`}>
                {result.message}
              </div>
            )}
          </form>
          <div className="flex justify-center space-x-8 text-slate-400">
            <a
              href="#api"
              className="hover:text-emerald-400 transition-colors flex items-center space-x-2"
              onClick={e => {
                e.preventDefault();
                toast({ title: "준비중입니다", description: "빠른 시일 내에 제공될 예정입니다." });
              }}
            >
              <FileText className="h-4 w-4" />
              <span>API 문서</span>
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>보안 정책</span>
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>고객 지원</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src="/logo.svg" alt="TotaloadCert" className="h-8 w-auto" />
              <span className="text-slate-400">© 2024 TotaloadCert. All rights reserved.</span>
            </div>
            <div className="flex space-x-6 text-slate-400">
              <a href="#" className="hover:text-white transition-colors">
                개인정보처리방침
              </a>
              <a href="#" className="hover:text-white transition-colors">
                이용약관
              </a>
              <a href="#" className="hover:text-white transition-colors">
                문의하기
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
