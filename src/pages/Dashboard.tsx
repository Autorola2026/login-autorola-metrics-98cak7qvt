import React from 'react'
import {
  Users,
  Heart,
  Eye,
  MousePointerClick,
  TrendingUp,
  TrendingDown,
  Calendar,
  Share2,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts'
import { useAuth } from '@/contexts/AuthContext'

// Dados simulados realistas dos últimos 30 dias para "Evolução de Seguidores"
const followerGrowthData = [
  { day: '01 Set', followers: 142000 },
  { day: '04 Set', followers: 143200 },
  { day: '07 Set', followers: 144100 },
  { day: '10 Set', followers: 144900 },
  { day: '13 Set', followers: 146300 },
  { day: '16 Set', followers: 147100 },
  { day: '19 Set', followers: 148500 },
  { day: '22 Set', followers: 149800 },
  { day: '25 Set', followers: 150600 },
  { day: '28 Set', followers: 151500 },
  { day: '30 Set', followers: 152480 },
]

// Dados do engajamento por rede social
const engagementByPlatformData = [
  { platform: 'Instagram', taxa: 11.4, color: '#FF5A00' },
  { platform: 'Facebook', taxa: 6.8, color: '#1877F2' },
  { platform: 'LinkedIn', taxa: 9.2, color: '#0077B5' },
  { platform: 'YouTube', taxa: 7.5, color: '#FF0000' },
]

// Tabela de Últimas Postagens
interface PostItem {
  id: string
  title: string
  platform: 'Instagram' | 'Facebook' | 'LinkedIn' | 'YouTube'
  reach: string
  engagement: string
  date: string
}

const latestPosts: PostItem[] = [
  {
    id: '1',
    title: 'Lançamento Autorola SP: Nova Plataforma de Leilão Online',
    platform: 'Instagram',
    reach: '48.200',
    engagement: '12,4%',
    date: 'Hoje, 14:32',
  },
  {
    id: '2',
    title: 'Dica de mercado: Como maximizar o valor residual da frota corporativa',
    platform: 'LinkedIn',
    reach: '34.800',
    engagement: '9,8%',
    date: 'Ontem, 10:15',
  },
  {
    id: '3',
    title: 'Webinar gravado: Transformação Digital na Gestão de Veículos Usados',
    platform: 'YouTube',
    reach: '18.450',
    engagement: '8,2%',
    date: '12 Set 2024',
  },
  {
    id: '4',
    title: 'Autorola Brasil atinge marca histórica de negociações no trimestre',
    platform: 'Facebook',
    reach: '29.100',
    engagement: '5,6%',
    date: '10 Set 2024',
  },
  {
    id: '5',
    title: 'Infográfico: Tendências do Mercado Automotivo B2B 2024/2025',
    platform: 'LinkedIn',
    reach: '52.900',
    engagement: '14,1%',
    date: '08 Set 2024',
  },
]

export default function Dashboard() {
  const { user } = useAuth()
  const userName = user?.name || (user?.email ? user.email.split('@')[0] : 'Marcelo CB')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* CABEÇALHO DO DASHBOARD */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1
            className="text-2xl sm:text-[28px] font-bold text-[#0A2540] tracking-tight"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Visão Geral
          </h1>
          <p className="text-sm text-[#64748B] mt-1 flex items-center gap-1.5">
            <span>Bem-vindo(a),</span>
            <span className="font-semibold text-[#1E293B]">{userName}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#FF5A00]/10 text-[#FF5A00] font-medium ml-1">
              Social Hub
            </span>
          </p>
        </div>

        {/* Filtro / Badges rápidas */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-[10px] text-xs font-medium text-[#1E293B] shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-[#FF5A00]" />
            <span>Últimos 30 dias</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#0A2540] text-white rounded-[10px] text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A00]" />
            <span>Métricas sincronizadas</span>
          </div>
        </div>
      </div>

      {/* 4 CARDS DE KPI (4 cols desktop, 2 cols tablet, 1 col mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* KPI 1: Seguidores */}
        <div
          className="bg-white rounded-[12px] p-5 sm:p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-default group"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-[#64748B]">Seguidores</span>
            <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-[#1877F2] group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight">
              152.480
            </h2>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#22C55E] bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+3,2%</span>
            </div>
          </div>
          <p className="text-xs text-[#64748B] mt-2">vs. período anterior</p>
        </div>

        {/* KPI 2: Engajamento */}
        <div
          className="bg-white rounded-[12px] p-5 sm:p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-default group"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-[#64748B]">Engajamento</span>
            <div className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center text-[#FF5A00] group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight">8,7%</h2>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#22C55E] bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+0,5%</span>
            </div>
          </div>
          <p className="text-xs text-[#64748B] mt-2">vs. período anterior</p>
        </div>

        {/* KPI 3: Alcance */}
        <div
          className="bg-white rounded-[12px] p-5 sm:p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-default group"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-[#64748B]">Alcance</span>
            <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center text-[#22C55E] group-hover:scale-105 transition-transform">
              <Eye className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight">1,2M</h2>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#EF4444] bg-red-50 px-2 py-0.5 rounded-full">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>-1,4%</span>
            </div>
          </div>
          <p className="text-xs text-[#64748B] mt-2">vs. período anterior</p>
        </div>

        {/* KPI 4: Interações */}
        <div
          className="bg-white rounded-[12px] p-5 sm:p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-default group"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-[#64748B]">Interações</span>
            <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-105 transition-transform">
              <MousePointerClick className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight">23.904</h2>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#22C55E] bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+12,1%</span>
            </div>
          </div>
          <p className="text-xs text-[#64748B] mt-2">vs. período anterior</p>
        </div>
      </div>

      {/* ÁREA DE GRÁFICOS (2 colunas desktop / 1 mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico 1: Evolução de Seguidores (Linha com gradiente laranja e área preenchida) */}
        <div
          className="bg-white rounded-[12px] p-5 sm:p-6 border border-[#E2E8F0] shadow-sm"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#0A2540]">Evolução de Seguidores</h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Crescimento acumulado nos últimos 30 dias
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FF5A00] bg-orange-50 px-2.5 py-1 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+10.480 novos</span>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={followerGrowthData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5A00" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#FF5A00" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tick={{ fontSize: 11, fill: '#64748B' }}
                />
                <YAxis
                  domain={['dataMin - 2000', 'dataMax + 2000']}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#0A2540] text-white p-2.5 rounded-[8px] text-xs shadow-lg border border-[#0A2540]">
                          <p className="font-semibold text-white/80">{label}</p>
                          <p className="text-sm font-bold text-[#FF5A00] mt-0.5">
                            {payload[0].value?.toLocaleString('pt-BR')} seguidores
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="followers"
                  stroke="#FF5A00"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorFollowers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Engajamento por Rede Social (Barras arredondadas e cores distintas) */}
        <div
          className="bg-white rounded-[12px] p-5 sm:p-6 border border-[#E2E8F0] shadow-sm"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#0A2540]">Engajamento por Rede Social</h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Taxa média de interação por plataforma (%)
              </p>
            </div>
            <div className="text-xs font-medium text-[#64748B] bg-[#F5F7FA] px-2.5 py-1 rounded-full border border-[#E2E8F0]">
              Média: 8,7%
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={engagementByPlatformData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="platform"
                  tickLine={false}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tick={{ fontSize: 12, fill: '#1E293B', fontWeight: 500 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  tickFormatter={(val) => `${val}%`}
                  domain={[0, 14]}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-[#0A2540] text-white p-2.5 rounded-[8px] text-xs shadow-lg border border-[#0A2540]">
                          <p className="font-semibold text-white/80">{data.platform}</p>
                          <p className="text-sm font-bold text-[#FF5A00] mt-0.5">
                            {data.taxa}% de engajamento
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="taxa" radius={[8, 8, 0, 0]}>
                  {engagementByPlatformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TABELA DE ÚLTIMAS POSTAGENS */}
      <div
        className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm overflow-hidden"
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)',
        }}
      >
        <div className="p-5 sm:p-6 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#0A2540]">Últimas Postagens</h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Performance recente das publicações nas redes monitoradas da Autorola
            </p>
          </div>
          <span className="text-xs text-[#64748B] self-start sm:self-auto font-medium">
            Mostrando 5 publicações mais recentes
          </span>
        </div>

        {/* Conteúdo responsivo da tabela */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[12px] font-semibold text-[#64748B] uppercase tracking-wider">
                <th className="py-3 px-5 sm:px-6">Postagem</th>
                <th className="py-3 px-4">Plataforma</th>
                <th className="py-3 px-4 text-right">Alcance</th>
                <th className="py-3 px-4 text-right">Engajamento</th>
                <th className="py-3 px-5 sm:px-6 text-right">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-sm">
              {latestPosts.map((post) => {
                // Badge colorida por plataforma
                let badgeClass = ''
                if (post.platform === 'Instagram') {
                  badgeClass =
                    'bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white'
                } else if (post.platform === 'Facebook') {
                  badgeClass = 'bg-[#1877F2] text-white'
                } else if (post.platform === 'LinkedIn') {
                  badgeClass = 'bg-[#0077B5] text-white'
                } else if (post.platform === 'YouTube') {
                  badgeClass = 'bg-[#FF0000] text-white'
                }

                return (
                  <tr key={post.id} className="hover:bg-[#F8FAFC] transition-colors duration-150">
                    <td className="py-4 px-5 sm:px-6 font-medium text-[#1E293B] max-w-xs sm:max-w-md truncate">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-[#64748B] shrink-0" />
                        <span className="truncate">{post.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs ${badgeClass}`}
                      >
                        {post.platform}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-[#0A2540] whitespace-nowrap">
                      {post.reach}
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <span className="font-semibold text-[#22C55E]">{post.engagement}</span>
                    </td>
                    <td className="py-4 px-5 sm:px-6 text-right text-xs text-[#64748B] whitespace-nowrap">
                      {post.date}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
