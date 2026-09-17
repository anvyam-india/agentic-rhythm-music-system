import type { SkillProgress as SkillProgressItem } from '@/types/progress'
import { cn } from '@/utils/format'
import { Progress } from '@/components/ui/Progress/Progress'

interface SkillProgressProps {
  skills: SkillProgressItem[]
  overall?: number
  className?: string
}

export function SkillProgress({ skills, overall, className }: SkillProgressProps) {
  return (
    <div
      className={cn(
        'rounded-[1.125rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]',
        className,
      )}
    >
      <div className="mb-5 flex items-end justify-between">
        <h3 className="text-base font-semibold text-[var(--text)]">Skill progress</h3>
        {overall !== undefined ? (
          <span className="text-2xl font-semibold text-[var(--accent)]">{overall}%</span>
        ) : null}
      </div>
      <ul className="space-y-4">
        {skills.map((skill) => (
          <li key={skill.name}>
            <Progress value={skill.percentage} showLabel={false} size="md" />
            <div className="mt-1.5 flex justify-between text-sm">
              <span className="text-[var(--text)]">{skill.name}</span>
              <span className="text-[var(--text-secondary)]">{skill.percentage}%</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
