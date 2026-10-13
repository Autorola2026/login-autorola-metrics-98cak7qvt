import React from 'react'
import { FileText, Download, Share2, CheckCircle2 } from 'lucide-react'

export default function Relatorios() {
  const reports = [
    {
      title: 'Relatório Mensal de Performance — Setembro 2024',
      date: 'Gerado em 30/09/2024',
      size: '2.4 MB',
      type: 'PDF Consolidado',
    },
    {
      title: 'Auditoria de Engajamento e ROI de Campanhas B2B',
      date: 'Gerado em 15/09/2024',
      size: '1.8 MB',
      type: 'PDF Executivo',
    },
    {
      title: 'Análise de Concorrência e Benchmarking Automotivo',
      date: 'Gerado em 01/09/2024',
      size: '4.1 MB',
      type: 'Apresentação',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-[#0A2540]">Relatórios de Desempenho</h2>
        <p className="text-sm text-[#64748B]">
          Documentos consolidados de redes sociais para apresentação à diretoria
        </p>
      </div>

      <div className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm divide-y divide-[#E2E8F0]">
        {reports.map((report) => (
          <div
            key={report.title}
            className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-[#F8FAFC] transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF5A00] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0A2540] text-sm sm:text-base">
                  {report.title}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-[#64748B]">
                  <span>{report.date}</span>
                  <span>•</span>
                  <span>{report.size}</span>
                  <span>•</span>
                  <span className="text-[#0A2540] font-medium">{report.type}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => alert(`Iniciando download de: ${report.title}`)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-[#FF5A00] text-[#0A2540] font-semibold text-xs hover:bg-[#E14D00] transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Baixar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
