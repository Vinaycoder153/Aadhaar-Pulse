'use client';

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

export default function TrendExplorer({ data }: { data: TrendData[] }) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold mb-1">Enrolment & Update Trends</h3>
                    <p className="text-sm text-[var(--text-muted)]">Daily volume across all regions</p>
                </div>
                <div className="flex gap-2 text-sm">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">2025</span>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
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
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="var(--color-primary)"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
