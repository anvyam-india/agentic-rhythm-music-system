import {
  ResponsiveContainer,
  LineChart as RLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart as RAreaChart,
  Area,
  BarChart as RBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import type { ChartPoint } from '@/types/common'

interface ChartProps {
  data: ChartPoint[]
  height?: number
  color?: string
  valueSuffix?: string
}

export function LineChart({ data, height = 220, color = 'var(--chart-1)', valueSuffix = '' }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RLineChart data={data}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} width={36} />
        <Tooltip
          contentStyle={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            color: 'var(--text)',
          }}
          formatter={(value) => [`${String(value)}${valueSuffix}`, '']}
        />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} dot={false} />
      </RLineChart>
    </ResponsiveContainer>
  )
}

export function AreaChart({ data, height = 220, color = 'var(--chart-1)', valueSuffix = '' }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RAreaChart data={data}>
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} width={36} />
        <Tooltip
          contentStyle={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            color: 'var(--text)',
          }}
          formatter={(value) => [`${String(value)}${valueSuffix}`, '']}
        />
        <Area type="monotone" dataKey="value" stroke={color} fill="url(#areaFill)" strokeWidth={2} />
      </RAreaChart>
    </ResponsiveContainer>
  )
}

export function BarChart({ data, height = 220, color = 'var(--chart-1)', valueSuffix = '' }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RBarChart data={data}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} width={36} />
        <Tooltip
          contentStyle={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            color: 'var(--text)',
          }}
          formatter={(value) => [`${String(value)}${valueSuffix}`, '']}
        />
        <Bar dataKey="value" fill={color} radius={[8, 8, 0, 0]} />
      </RBarChart>
    </ResponsiveContainer>
  )
}

interface DonutChartProps {
  value: number
  label?: string
  height?: number
}

export function DonutChart({ value, label = 'Progress', height = 180 }: DonutChartProps) {
  const data = [
    { name: 'done', value },
    { name: 'rest', value: Math.max(0, 100 - value) },
  ]
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={55} outerRadius={75} startAngle={90} endAngle={-270} stroke="none">
            <Cell fill="var(--accent)" />
            <Cell fill="var(--surface-muted)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl text-[var(--text)]">{value}%</span>
        <span className="text-xs text-[var(--text-muted)]">{label}</span>
      </div>
    </div>
  )
}
