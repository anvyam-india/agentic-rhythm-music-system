import { cn } from '@/utils/format'

interface RhythmAiAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  pulse?: boolean
}

const sizes = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-20 w-20',
  xl: 'h-28 w-28',
}

/** Music-themed Riya avatar — vinyl + note glow */
export function RhythmAiAvatar({ size = 'md', className, pulse }: RhythmAiAvatarProps) {
  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center rounded-full',
        sizes[size],
        className,
      )}
      style={pulse ? { animation: 'aiPulse 2.8s ease-in-out infinite' } : undefined}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#14B8A6] via-[#0F766E] to-[#7C3AED] opacity-90" />
      <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-[#0B1220] to-[#172033]" />
      {/* vinyl ring */}
      <div className="absolute inset-[18%] rounded-full border border-white/15" />
      <div className="absolute inset-[28%] rounded-full border border-white/10" />
      <svg
        viewBox="0 0 48 48"
        className="relative z-[1] h-[55%] w-[55%] text-white"
        aria-hidden
      >
        {/* music note */}
        <ellipse cx="18" cy="34" rx="7" ry="5" fill="currentColor" opacity="0.95" />
        <rect x="23" y="12" width="3.2" height="23" rx="1.2" fill="currentColor" />
        <path
          d="M26.2 12.2 C32 10 38 11.5 40 16.5 L40 22 C36.5 19.2 31.5 18 26.2 19.2 Z"
          fill="currentColor"
          opacity="0.9"
        />
        {/* sparkle */}
        <circle cx="12" cy="16" r="1.6" fill="#14B8A6" />
        <circle cx="38" cy="28" r="1.2" fill="#A78BFA" />
      </svg>
    </div>
  )
}
