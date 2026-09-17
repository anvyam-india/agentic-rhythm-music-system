import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartPoint } from '@/types/common'
import { chartColors, defaultMargin } from './chartTheme'

interface BarChartProps {
  data: ChartPoint[]
  height?: number
  dataKey?: string
  fill?: string
  className?: string
}

export function BarChart({
  data,
  height = 240,
  dataKey = 'value',
  fill = chartColors.primary,
  className,
}: BarChartProps) {
  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={defaultMargin}>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: chartColors.text, fontSize: 12 }}
            axisLine={{ stroke: chartColors.border }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: chartColors.text, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip
            cursor={{ fill: 'var(--accent-soft)' }}
            contentStyle={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              color: 'var(--text)',
              boxShadow: 'var(--shadow)',
            }}
          />
          <Bar dataKey={dataKey} fill={fill} radius={[8, 8, 0, 0]} maxBarSize={48} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
