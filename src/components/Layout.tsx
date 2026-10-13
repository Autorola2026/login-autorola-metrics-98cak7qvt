import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import LogoAutorola from '@/components/LogoAutorola'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { name: 'Visão Geral', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Métricas', href: '/metricas', icon: BarChart3 },
  { name: 'Relatórios', href: '/relatorios', icon: FileText },
  { name: 'Configurações', href: '/configuracoes', icon: Settings },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  // Nome e inicial do usuário
  const userName = user?.name || (user?.email ? user.email.split('@')[0] : 'Usuário')
  const userInitial = userName.charAt(0).toUpperCase()
  const userEmail = user?.email || 'mcb@autorola.com.br'

  // Data atual formatada em português brasileiro
  const currentDateFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  // Título da página baseado na rota
  const getCurrentPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Visão Geral'
      case '/metricas':
        return 'Métricas Sociais'
      case '/relatorios':
        return 'Relatórios de Desempenho'
      case '/configuracoes':
        return 'Configurações'
      default:
        return 'Painel'
    }
  }

  return (
    <div className="flex h-screen w-full bg-[#F5F7FA] font-sans overflow-hidden">
      {/* 1. SIDEBAR DESKTOP FIXA (260px) */}
      <aside
        className="hidden md:flex md:w-[260px] flex-col justify-between shrink-0 h-full text-white z-30 transition-all select-none"
        style={{
          backgroundColor: '#0A2540',
          boxShadow: '0 0 20px rgba(0,0,0,0.05)',
        }}
      >
        {/* Topo da Sidebar: Logo */}
        <div>
          <div className="p-6 border-b border-white/10">
            <LogoAutorola size="md" variant="light" showTagline />
          </div>

          {/* Itens de navegação */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-white/50 uppercase">
              Menu Principal
            </div>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-sm font-medium transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-white/80 hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {/* Borda esquerda laranja no estado ativo */}
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[#FF5A00]" />
                  )}
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      isActive ? 'text-[#FF5A00]' : 'text-white/70 group-hover:text-white'
                    }`}
                  />
                  <span>{item.name}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Rodapé da Sidebar: Usuário + Logout */}
        <div className="p-4 border-t border-white/10 bg-black/10">
          <div className="flex items-center gap-3 p-2 rounded-[10px] mb-2">
            {/* Avatar Círculo com inicial */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #FF5A00 0%, #FF8C42 100%)',
              }}
            >
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{userName}</p>
              <p className="text-xs text-white/60 truncate">{userEmail}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-[8px] bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-[#FF5A00]" />
            <span>Sair do sistema</span>
          </button>
        </div>
      </aside>

      {/* 2. DRAWER MOBILE (Telas < 768px) */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 bottom-0 left-0 w-[280px] bg-[#0A2540] text-white z-50 flex flex-col justify-between p-4 transform transition-transform duration-300 ease-out md:hidden ${
          mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 pt-2 px-2">
            <LogoAutorola size="sm" variant="light" showTagline />
            <button
              onClick={() => setMobileDrawerOpen(false)}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
              aria-label="Fechar menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold border-l-4 border-[#FF5A00]'
                      : 'text-white/80 hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#FF5A00]' : 'text-white/70'}`} />
                  <span>{item.name}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Rodapé Mobile */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-2 rounded-[10px] mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0"
              style={{
                background: 'linear-gradient(135deg, #FF5A00 0%, #FF8C42 100%)',
              }}
            >
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{userName}</p>
              <p className="text-xs text-white/60 truncate">{userEmail}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-[8px] bg-white/10 text-white hover:bg-white/15"
          >
            <LogOut className="w-4 h-4 text-[#FF5A00]" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* 3. ÁREA DE CONTEÚDO PRINCIPAL */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-xs z-10">
          <div className="flex items-center gap-3">
            {/* Botão Hambúrguer Mobile */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden p-2 rounded-lg text-[#1E293B] hover:bg-[#F5F7FA] border border-[#E2E8F0]"
              aria-label="Abrir menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#0A2540]">
                {getCurrentPageTitle()}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Data atual em português */}
            <div className="hidden sm:flex items-center text-xs text-[#64748B] font-medium capitalize">
              {currentDateFormatted}
            </div>

            {/* Ícone de sino com indicador */}
            <button
              className="relative p-2 rounded-full text-[#64748B] hover:text-[#0A2540] hover:bg-[#F5F7FA] transition-colors"
              aria-label="Notificações"
              onClick={() => alert('Todas as métricas estão em dia. Nenhuma notificação pendente.')}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF5A00]" />
            </button>

            {/* Link para o site institucional autorola.com.br */}
            <a
              href="https://autorola.com.br"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-[#0A2540] hover:text-[#FF5A00] transition-colors"
            >
              <span>autorola.com.br</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* ÁREA DE SCROLL DO CONTEÚDO */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F5F7FA]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
