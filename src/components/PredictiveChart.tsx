'use client';

import { PredictionData } from '@/types';
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';
import { motion } from 'framer-motion';

export default function PredictiveChart({ data }: { data: PredictionData[] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                        <span className="text-2xl">🔮</span> Predictive Analytics
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">AI-Forecasted Demand (Next 6 Months)</p>
                </div>
            </div>

            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                        <defs>
                            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
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
                                return `${d[1]}/${d[2]}`; // MM/YYYY
                            }}
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

                        {/* Confidence Band */}
                        <Area
                            type="monotone"
                            dataKey="upperBound"
                            stroke="none"
                            fill="#8b5cf6"
                            fillOpacity={0.1}
                        />
                        <Area
                            type="monotone"
                            dataKey="lowerBound"
                            stroke="none"
                            fill="var(--bg-card)"
                            fillOpacity={1}
                        />
                        {/* Note: In ComposedChart, layering is order-dependent. 
                            To make a proper band, usually we use a range area or stacked areas.
                            Simplified here for visual effect: fill between upper and lower isn't trivial in simple Area without custom shapes.
                            Alternative: Stacked Area? No.
                            Let's just show the line and maybe a shaded area for the 'value'.
                         */}

                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorPredicted)"
                            strokeDasharray="5 5"
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 flex gap-6 justify-center text-sm text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
                    <span>Predicted Trend</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#8b5cf6]/30" />
                    <span>Confidence Interval (95%)</span>
                </div>
            </div>
        </motion.div>
    );
}
