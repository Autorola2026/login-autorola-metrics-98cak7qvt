import React from 'react'
import {
  BarChart3,
  TrendingUp,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Calendar,
  Filter,
} from 'lucide-react'

export default function Metricas() {
  const networks = [
    {
      name: 'Instagram',
      followers: '78.400',
      engagement: '11,4%',
      impressions: '420.500',
      icon: Instagram,
      gradient: 'from-[#f09433] via-[#dc2743] to-[#bc1888]',
      color: '#dc2743',
    },
    {
      name: 'LinkedIn',
      followers: '42.150',
      engagement: '9,2%',
      impressions: '290.100',
      icon: Linkedin,
      gradient: 'from-[#0077b5] to-[#005582]',
      color: '#0077b5',
    },
    {
      name: 'Facebook',
      followers: '21.600',
      engagement: '6,8%',
      impressions: '115.000',
      icon: Facebook,
      gradient: 'from-[#1877f2] to-[#0b51b3]',
      color: '#1877f2',
    },
    {
      name: 'YouTube',
      followers: '10.330',
      engagement: '7,5%',
      impressions: '375.000',
      icon: Youtube,
      gradient: 'from-[#ff0000] to-[#cc0000]',
      color: '#ff0000',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0A2540]">Métricas Sociais</h2>
          <p className="text-sm text-[#64748B]">
            Desempenho detalhado por canal oficial da Autorola Brasil
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E2E8F0] rounded-[10px] text-xs font-semibold text-[#1E293B]">
            <Filter className="w-3.5 h-3.5 text-[#FF5A00]" />
            <span>Filtrar</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-[#0A2540] text-white rounded-[10px] text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-[#FF5A00]" />
            <span>Mês Atual</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {networks.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.name}
              className="bg-white rounded-[12px] p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.gradient} flex items-center justify-center text-white shadow-sm`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A2540]">{item.name}</h3>
                    <p className="text-xs text-[#64748B]">Canal Oficial Autorola</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Ativo
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-5">
                <div>
                  <span className="text-xs text-[#64748B] block">Seguidores</span>
                  <span className="text-lg font-bold text-[#0A2540] mt-1 block">
                    {item.followers}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#64748B] block">Engajamento</span>
                  <span className="text-lg font-bold text-[#FF5A00] mt-1 block">
                    {item.engagement}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#64748B] block">Impressões</span>
                  <span className="text-lg font-bold text-[#0A2540] mt-1 block">
                    {item.impressions}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
