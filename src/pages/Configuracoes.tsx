import React, { useState } from 'react'
import { Settings, User, Bell, Shield, KeyRound, Save } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function Configuracoes() {
  const { user } = useAuth()
  const [userName, setUserName] = useState(user?.name || 'Marcelo CB')
  const [email] = useState(user?.email || 'mcb@autorola.com.br')
  const [notificationEmail, setNotificationEmail] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-[#0A2540]">Configurações</h2>
        <p className="text-sm text-[#64748B]">
          Gerencie suas preferências de acesso e notificações do Autorola Metrics
        </p>
      </div>

      <div className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="border-b border-[#E2E8F0] pb-5">
            <h3 className="text-base font-bold text-[#0A2540] flex items-center gap-2">
              <User className="w-5 h-5 text-[#FF5A00]" />
              Dados do Perfil
            </h3>
            <p className="text-xs text-[#64748B] mt-1">
              Informações da sua conta corporativa Autorola
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wider mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-[8px] border border-[#E2E8F0] focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1E293B] uppercase tracking-wider mb-2">
                E-mail Corporativo
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-3.5 py-2.5 text-sm rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] cursor-not-allowed"
              />
            </div>
          </div>

          <div className="border-b border-[#E2E8F0] pt-4 pb-5">
            <h3 className="text-base font-bold text-[#0A2540] flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#FF5A00]" />
              Notificações
            </h3>
            <p className="text-xs text-[#64748B] mt-1">
              Alertas sobre anomalias ou picos de engajamento nas redes
            </p>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.checked)}
                className="w-4 h-4 text-[#FF5A00] accent-[#FF5A00] rounded"
              />
              <span className="text-sm text-[#1E293B]">
                Receber resumo semanal consolidado por e-mail
              </span>
            </label>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-[8px] bg-[#FF5A00] text-[#0A2540] font-semibold text-sm hover:bg-[#E14D00] transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Alterações</span>
            </button>
            {saved && (
              <span className="text-xs font-semibold text-emerald-600 animate-fade-in">
                Preferências salvas com sucesso!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
