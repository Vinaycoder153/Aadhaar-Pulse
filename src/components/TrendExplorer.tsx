'use client';

import { useState } from 'react';
import { TrendData } from '@/types';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

type FilterType = 'overall' | 'biometric' | 'demographic' | 'male' | 'female';

export default function TrendExplorer({ data }: { data: TrendData[] }) {
    const [filter, setFilter] = useState<FilterType>('overall');

    const filters: { id: FilterType; label: string }[] = [
        { id: 'overall', label: 'Total Volume' },
        { id: 'biometric', label: 'Biometric Updates' },
        { id: 'demographic', label: 'Demographic Updates' },
        { id: 'male', label: 'Male' },
        { id: 'female', label: 'Female' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 h-full flex flex-col"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                    <h3 className="text-xl font-bold mb-1">Enrolment & Update Trends</h3>
                    <p className="text-sm text-[var(--text-muted)]">Daily volume with demographic breakdown</p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                    {filters.map(f => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={`px-3 py-1.5 rounded-full border transition-all ${filter === f.id
                                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-400'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 min-h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} key={filter}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: '#a1a1aa', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(str) => {
                                const d = str.split('-');
                                return `${d[0]}/${d[1]}`;
                            }}
                            minTickGap={30}
                        />
                        <YAxis
                            tick={{ fill: '#a1a1aa', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-surface)',
                                borderColor: 'var(--bg-glass-border)',
                                borderRadius: '8px',
                                color: 'white'
                            }}
                            // Casting to any to completely bypass TS compilation error for Recharts
                            formatter={(value: any) => [value.toLocaleString(), filters.find(f => f.id === filter)?.label || 'Value']}
                        />
                        <Area
                            type="monotone"
                            dataKey={filter === 'overall' ? 'value' : filter}
                            animationDuration={1000}
                            stroke="var(--color-primary)"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 flex gap-6 justify-center text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></span>
                    <span>{filters.find(f => f.id === filter)?.label} Trend</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white/20"></span>
                    <span>Baseline (Last 30 Days)</span>
                </div>
            </div>
        </motion.div>
    );
}
