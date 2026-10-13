import React from 'react'

interface LogoAutorolaProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'light' | 'dark'
  showTagline?: boolean
  className?: string
}

export const LogoAutorola: React.FC<LogoAutorolaProps> = ({
  size = 'md',
  variant = 'light',
  showTagline = false,
  className = '',
}) => {
  const iconDimensions = {
    sm: { box: 32, font: 'text-lg', text: 'text-lg' },
    md: { box: 40, font: 'text-xl', text: 'text-2xl' },
    lg: { box: 52, font: 'text-2xl', text: 'text-3xl' },
    xl: { box: 64, font: 'text-3xl', text: 'text-4xl' },
  }[size]

  const isLight = variant === 'light'

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Símbolo "A" com gradiente laranja e cantos arredondados (12px) */}
      <div
        className="relative flex items-center justify-center rounded-[12px] shadow-md shrink-0 transition-transform hover:scale-105"
        style={{
          width: iconDimensions.box,
          height: iconDimensions.box,
          background: 'linear-gradient(135deg, #FF5A00 0%, #FF8C42 100%)',
          boxShadow: '0 4px 14px rgba(255, 90, 0, 0.35)',
        }}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5"
        >
          {/* Estilização moderna do glifo "A" da Autorola */}
          <path
            d="M18 5L7 30H13.2L15.3 25H20.7L22.8 30H29L18 5ZM16.8 21.2L18 17.5L19.2 21.2H16.8Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Wordmark AUTOROLA */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center tracking-tight">
          <span
            className={`font-black tracking-wider uppercase ${iconDimensions.text} ${
              isLight ? 'text-white' : 'text-[#0A2540]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
          >
            AUTOROLA
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-xs font-medium tracking-wide uppercase ${
              isLight ? 'text-white/80' : 'text-[#64748B]'
            }`}
          >
            Metrics
          </span>
        )}
      </div>
    </div>
  )
}

export default LogoAutorola
