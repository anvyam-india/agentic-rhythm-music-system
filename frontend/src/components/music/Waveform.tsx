import { cn } from '@/utils/format'

interface WaveformProps {
  bars?: number
  active?: boolean
  className?: string
}

export function Waveform({ bars = 24, active = true, className }: WaveformProps) {
  return (
    <div className={cn('flex h-12 items-end gap-1', className)} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="w-1 flex-1 rounded-full bg-[var(--accent)] origin-bottom"
          style={{
            height: `${30 + ((i * 37) % 70)}%`,
            animation: active ? `waveform ${0.8 + (i % 5) * 0.15}s ease-in-out infinite` : undefined,
            animationDelay: `${i * 0.04}s`,
            opacity: 0.45 + ((i % 5) * 0.1),
          }}
        />
      ))}
    </div>
  )
}
