'use client';

import { InsightData } from '@/types';
import { motion } from 'framer-motion';

const CATEGORY_COLORS = {
    'Migration': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Digital Inclusion': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Administrative': 'bg-amber-500/20 text-amber-400 border-amber-500/30'
};

export default function SocietalInsights({ data }: { data: InsightData[] }) {
    return (
        <div className="h-full">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                        <span className="text-2xl">💡</span> Societal Insights
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">AI-Detected Patterns & Anomalies</p>
                </div>
                <button className="text-sm text-[var(--color-primary)] hover:underline">View All</button>
            </div>

            <div className="space-y-4">
                {data.map((insight, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="glass-panel p-5 relative overflow-hidden group hover:bg-white/5 transition-colors border-l-4 border-l-[var(--color-primary)]"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className={`text-xs px-2 py-1 rounded-full border ${CATEGORY_COLORS[insight.category] || 'bg-gray-500/20'}`}>
                                {insight.category}
                            </span>
                            {insight.impact === 'High' && (
                                <span className="flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                            )}
                        </div>

                        <h4 className="font-semibold text-lg mb-2 text-white/90">{insight.title}</h4>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                            {insight.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
