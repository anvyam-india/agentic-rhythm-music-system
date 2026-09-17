import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { Waveform } from './Waveform'
import { Button } from '@/components/ui/Button/Button'
import { cn } from '@/utils/format'

interface AudioPlayerProps {
  title: string
  subtitle?: string
  className?: string
}

export function AudioPlayer({ title, subtitle, className }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className={cn('rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] p-5', className)}>
      <div className="mb-4 flex items-center gap-3">
        <Button
          variant="primary"
          size="sm"
          className="!rounded-full !h-10 !w-10 !px-0"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </Button>
        <div>
          <p className="font-medium text-[var(--text)]">{title}</p>
          {subtitle ? <p className="text-xs text-[var(--text-secondary)]">{subtitle}</p> : null}
        </div>
      </div>
      <Waveform active={playing} />
      <div className="mt-3 flex justify-between text-xs text-[var(--text-muted)]">
        <span>{playing ? '0:18' : '0:00'}</span>
        <span>2:40</span>
      </div>
    </div>
  )
}
