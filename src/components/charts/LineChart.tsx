import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartPoint } from '@/types/common'
import { chartColors, defaultMargin } from './chartTheme'

interface LineChartProps {
  data: ChartPoint[]
  height?: number
  dataKey?: string
  stroke?: string
  className?: string
}

export function LineChart({
  data,
  height = 240,
  dataKey = 'value',
  stroke = chartColors.primary,
  className,
}: LineChartProps) {
  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={defaultMargin}>
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
            contentStyle={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              color: 'var(--text)',
              boxShadow: 'var(--shadow)',
            }}
            labelStyle={{ color: 'var(--text-secondary)' }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={stroke}
            strokeWidth={2}
            dot={{ fill: stroke, strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, fill: stroke }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}
