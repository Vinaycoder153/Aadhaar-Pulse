'use client';

import { PredictionData } from '@/types';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';
import { motion } from 'framer-motion';

interface ChartEntry {
    date: string;
    value: number;
    band: [number, number];
}

export default function PredictiveChart({ data }: { data: PredictionData[] }) {
    // Transform to [lowerBound, upperBound] band for recharts
    const chartData: ChartEntry[] = data.map(d => ({
        date: d.date,
        value: d.value,
        band: [d.lowerBound, d.upperBound],
    }));

    // Find today boundary — first prediction point is "future"
    const todayDate = data.length > 0 ? data[0].date : undefined;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-6 h-full flex flex-col"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                        <span className="text-2xl">🔮</span> Predictive Analytics
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">AI-Forecasted Demand (Next 6 Months)</p>
                </div>
                <div className="text-xs font-mono text-violet-400 border border-violet-500/30 px-2 py-1 rounded bg-violet-500/5">
                    95% CI
                </div>
            </div>

            <div className="flex-1 min-h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="gradValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="gradBand" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.12} />
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.04} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: '#a1a1aa', fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(str: string) => {
                                const d = str.split('-');
                                return d.length >= 2 ? `${d[1]}/${d[2] ?? d[0]}` : str;
                            }}
                        />
                        <YAxis
                            tick={{ fill: '#a1a1aa', fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-surface)',
                                borderColor: 'var(--bg-glass-border)',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '12px',
                            }}
                            formatter={(value: number | string | readonly (number | string)[] | undefined, name: number | string | undefined) => {
                                if (name === 'band') return null;
                                const num = typeof value === 'number' ? value : Number(value);
                                return [num.toLocaleString(), 'Predicted Volume'];
                            }}
                        />
                        {todayDate && (
                            <ReferenceLine
                                x={todayDate}
                                stroke="rgba(255,255,255,0.15)"
                                strokeDasharray="4 4"
                                label={{ value: 'Forecast Start', fill: '#a1a1aa', fontSize: 10, position: 'insideTopRight' }}
                            />
                        )}
                        {/* Confidence Band */}
                        <Area
                            type="monotone"
                            dataKey="band"
                            stroke="none"
                            fill="url(#gradBand)"
                            fillOpacity={1}
                            legendType="none"
                            activeDot={false}
                        />
                        {/* Predicted Line */}
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#8b5cf6"
                            strokeWidth={2.5}
                            strokeDasharray="6 3"
                            fillOpacity={1}
                            fill="url(#gradValue)"
                            dot={false}
                            activeDot={{ r: 5, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 flex gap-6 justify-center text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-0.5 bg-[#8b5cf6]" style={{ borderTop: '2px dashed #8b5cf6', background: 'none' }} />
                    <span>Predicted Trend</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-3 rounded bg-[#8b5cf6]/20 border border-[#8b5cf6]/30" />
                    <span>Confidence Interval (95%)</span>
                </div>
            </div>
        </motion.div>
    );
}

