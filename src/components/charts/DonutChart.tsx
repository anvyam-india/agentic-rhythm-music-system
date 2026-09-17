import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { ChartPoint } from '@/types/common'
import { chartColors } from './chartTheme'

interface DonutChartProps {
  data: ChartPoint[]
  height?: number
  innerRadius?: number
  outerRadius?: number
  colors?: string[]
  className?: string
}

const defaultPalette = [
  chartColors.primary,
  chartColors.secondary,
  chartColors.tertiary,
  chartColors.quaternary,
]

export function DonutChart({
  data,
  height = 240,
  innerRadius = 56,
  outerRadius = 80,
  colors = defaultPalette,
  className,
}: DonutChartProps) {
  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            contentStyle={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              color: 'var(--text)',
              boxShadow: 'var(--shadow)',
            }}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={3}
            stroke="var(--surface)"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell key={entry.label} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
