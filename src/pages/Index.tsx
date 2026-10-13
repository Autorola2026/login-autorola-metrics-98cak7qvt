import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, AlertCircle, Check } from 'lucide-react'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/contexts/AuthContext'
import LogoAutorola from '@/components/LogoAutorola'

// Ícones SVG customizados das 4 redes sociais em alta fidelidade
const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6 fill-none stroke-current"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

export default function Index() {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading: authLoading, refreshUser } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [authError, setAuthError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (!authLoading && (isAuthenticated || pb.authStore.isValid)) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, authLoading, navigate])

  const validate = () => {
    const errs: { email?: string; password?: string } = {}
    if (!email.trim()) {
      errs.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Insira um e-mail válido'
    }

    if (!password) {
      errs.password = 'Senha é obrigatória'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)

    if (!validate()) {
      return
    }

    setIsSubmitting(true)
    try {
      await pb.collection('users').authWithPassword(email.trim(), password)
      refreshUser()
      // Sucesso -> navegar com transição suave para /dashboard
      navigate('/dashboard')
    } catch {
      setAuthError('E-mail ou senha incorretos. Verifique e tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Preenchimento de credencial de demonstração
  const fillDemoCredentials = () => {
    setEmail('mcb@autorola.com.br')
    setPassword('Skip@Pass')
    setErrors({})
    setAuthError(null)
  }

  return (
    <div className="flex min-h-screen w-full bg-white font-sans animate-fade-in overflow-hidden">
      {/* PAINEL ESQUERDO — BRAND PANEL (55% desktop, 40% tablet, oculto no mobile) */}
      <div
        className="hidden md:flex md:w-[40%] lg:w-[55%] relative flex-col justify-between p-8 lg:p-12 text-white overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0A2540 0%, #0D3A66 100%)',
        }}
      >
        {/* Luz de fundo decorativa com acentos sutis */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30 pointer-events-none blur-3xl"
          style={{ background: '#FF5A00' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 pointer-events-none blur-3xl"
          style={{ background: '#0D3A66' }}
        />

        {/* Topo do painel: Logo Autorola grande com tagline */}
        <div className="relative z-10 flex flex-col items-start">
          <LogoAutorola size="xl" variant="light" />
          <div className="mt-3 flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#FF5A00] animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
              Centralizador de Métricas
            </span>
          </div>
        </div>

        {/* Centro do painel: Emblema circular com pulse-ring e ícones das redes sociais */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center py-10">
          <div className="relative flex items-center justify-center">
            {/* Anel pulsante externo da animação pulse-ring da spec */}
            <div className="absolute w-72 h-72 lg:w-80 lg:h-80 rounded-full border-2 border-[#FF5A00]/50 animate-pulse-ring pointer-events-none" />
            {/* Anel sutil intermediário estático */}
            <div className="absolute w-60 h-60 lg:w-68 lg:h-68 rounded-full border border-white/15 pointer-events-none" />

            {/* Núcleo central do emblema */}
            <div
              className="relative w-44 h-44 lg:w-52 lg:h-52 rounded-full flex flex-col items-center justify-center p-6 text-center shadow-2xl backdrop-blur-md"
              style={{
                background:
                  'linear-gradient(145deg, rgba(10, 37, 64, 0.85) 0%, rgba(13, 58, 102, 0.95) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md mb-2"
                style={{
                  background: 'linear-gradient(135deg, #FF5A00 0%, #FF8C42 100%)',
                }}
              >
                <span className="text-white font-black text-xl">A</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-white/70 font-semibold">
                Autorola
              </span>
              <span className="text-sm font-bold text-white mt-0.5">Social Hub</span>
            </div>

            {/* Ícones de redes sociais dispostos simetricamente em anel */}
            {/* Instagram - Topo */}
            <div
              className="absolute -top-4 w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
              style={{
                background:
                  'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                color: '#ffffff',
                boxShadow: '0 8px 20px rgba(220, 39, 67, 0.4)',
              }}
              title="Instagram"
            >
              <InstagramIcon />
            </div>

            {/* LinkedIn - Direita */}
            <div
              className="absolute -right-4 w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer bg-[#0077b5] text-white"
              style={{
                boxShadow: '0 8px 20px rgba(0, 119, 181, 0.4)',
              }}
              title="LinkedIn"
            >
              <LinkedinIcon />
            </div>

            {/* YouTube - Base */}
            <div
              className="absolute -bottom-4 w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer bg-[#FF0000] text-white"
              style={{
                boxShadow: '0 8px 20px rgba(255, 0, 0, 0.4)',
              }}
              title="YouTube"
            >
              <YoutubeIcon />
            </div>

            {/* Facebook - Esquerda */}
            <div
              className="absolute -left-4 w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer bg-[#1877F2] text-white"
              style={{
                boxShadow: '0 8px 20px rgba(24, 119, 242, 0.4)',
              }}
              title="Facebook"
            >
              <FacebookIcon />
            </div>
          </div>

          <div className="mt-8 text-center max-w-sm">
            <h3 className="text-xl font-bold tracking-tight text-white mb-2">
              Gestão Unificada de Redes
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Monitore engajamento, seguidores, impressões e interações em tempo real com relatórios
              executivos.
            </p>
          </div>
        </div>

        {/* Rodapé do painel esquerdo */}
        <div className="relative z-10 border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/70">
          <span>Acompanhe suas redes sociais em um só lugar</span>
          <span className="font-semibold text-white/90">Autorola Brasil</span>
        </div>
      </div>

      {/* PAINEL DIREITO — FORM PANEL (45% desktop, 60% tablet, 100% mobile) */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-white overflow-y-auto">
        {/* Cabeçalho mobile com logo quando o painel esquerdo está oculto */}
        <div className="md:hidden flex items-center justify-between pb-6 border-b border-[#E2E8F0]">
          <LogoAutorola size="md" variant="dark" />
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0A2540] text-white">
            Metrics
          </span>
        </div>

        <div className="w-full max-w-md mx-auto my-auto py-6">
          {/* Título e Subtítulo */}
          <div className="mb-8">
            <h1
              className="text-2xl sm:text-[24px] font-bold tracking-tight text-[#0A2540]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Bem-vindo de volta
            </h1>
            <p className="text-sm text-[#64748B] mt-1.5">
              Entre para acompanhar suas métricas de redes sociais
            </p>
          </div>

          {/* Atalho rápido para preencher credencial de teste */}
          <div className="mb-6 p-3.5 rounded-[12px] bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-between">
            <div className="text-xs text-[#1E293B]">
              <span className="font-semibold text-[#0A2540]">Credencial de acesso:</span>
              <span className="block text-[#64748B]">mcb@autorola.com.br / Skip@Pass</span>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-[8px] bg-white border border-[#E2E8F0] text-[#FF5A00] hover:bg-[#FF5A00] hover:text-white transition-colors shadow-xs"
            >
              Preencher
            </button>
          </div>

          {/* Alerta de erro da autenticação */}
          {authError && (
            <div
              className="mb-6 p-4 rounded-[12px] bg-[#FEF2F2] border border-[#FCA5A5] flex items-start gap-3 animate-fade-in text-[#EF4444]"
              role="alert"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-sm font-medium leading-relaxed">{authError}</div>
            </div>
          )}

          {/* Formulário de Login */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Campo E-mail */}
            <div>
              <label
                htmlFor="email"
                className="block text-[13px] font-medium text-[#1E293B] mb-1.5"
              >
                E-mail
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                  }}
                  placeholder="exemplo@autorola.com.br"
                  className={`w-full px-3.5 py-2.5 text-sm text-[#1E293B] bg-white rounded-[8px] border transition-all duration-200 outline-none ${
                    errors.email
                      ? 'border-[#EF4444] focus:ring-3 focus:ring-[#EF4444]/20'
                      : 'border-[#E2E8F0] focus:border-[#FF5A00] focus:ring-3 focus:ring-[#FF5A00]/15'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-[#EF4444] font-medium flex items-center gap-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Campo Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-[13px] font-medium text-[#1E293B] mb-1.5"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
                  }}
                  placeholder="Digite sua senha"
                  className={`w-full px-3.5 py-2.5 pr-11 text-sm text-[#1E293B] bg-white rounded-[8px] border transition-all duration-200 outline-none ${
                    errors.password
                      ? 'border-[#EF4444] focus:ring-3 focus:ring-[#EF4444]/20'
                      : 'border-[#E2E8F0] focus:border-[#FF5A00] focus:ring-3 focus:ring-[#FF5A00]/15'
                  }`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748B] hover:text-[#FF5A00] transition-colors"
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-[#EF4444] font-medium flex items-center gap-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Lembrar-me e Esqueceu a senha */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
                    rememberMe
                      ? 'bg-[#FF5A00] border-[#FF5A00] text-white'
                      : 'border-[#CBD5E1] bg-white hover:border-[#FF5A00]'
                  }`}
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-[13px] text-[#64748B] hover:text-[#1E293B]">Lembrar-me</span>
              </label>

              <a
                href="#recuperar"
                onClick={(e) => {
                  e.preventDefault()
                  alert(
                    'Para redefinir sua senha, entre em contato com o suporte de TI da Autorola (suporte@autorola.com.br).',
                  )
                }}
                className="text-[13px] font-medium text-[#FF5A00] hover:text-[#E14D00] hover:underline transition-colors"
              >
                Esqueceu a senha?
              </a>
            </div>

            {/* Botão de Submissão "Entrar" */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 py-3 px-4 rounded-[12px] bg-[#FF5A00] hover:bg-[#E14D00] text-[#0A2540] font-semibold text-[16px] transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              style={{
                boxShadow: '0 4px 14px rgba(255, 90, 0, 0.3)',
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-[#0A2540]" />
                  <span>Acessando...</span>
                </>
              ) : (
                <span>Entrar</span>
              )}
            </button>
          </form>

          {/* Ajuda / Dica adicional */}
          <div className="mt-8 pt-6 border-t border-[#E2E8F0] text-center">
            <p className="text-xs text-[#64748B]">
              Precisa de acesso à plataforma Autorola Metrics?{' '}
              <a
                href="https://autorola.com.br"
                target="_blank"
                rel="noreferrer"
                className="text-[#FF5A00] font-medium hover:underline"
              >
                Fale com seu gestor
              </a>
            </p>
          </div>
        </div>

        {/* Rodapé: © 2024 Autorola. Todos os direitos reservados. */}
        <div className="text-center pt-4 text-xs text-[#64748B]">
          © 2024 Autorola. Todos os direitos reservados.
        </div>
      </div>
    </div>
  )
}
