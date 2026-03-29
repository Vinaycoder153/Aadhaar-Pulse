'use client';

import { RecommendationData } from '@/types';
import { motion } from 'framer-motion';

const URGENCY_STYLES: Record<string, string> = {
    High: 'bg-red-500/20 text-red-400 border-red-500/40',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
    Low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
};

const COST_STYLES: Record<string, string> = {
    High: 'text-red-400',
    Medium: 'text-yellow-400',
    Low: 'text-emerald-400',
};

const URGENCY_ICONS: Record<string, string> = {
    High: '🔴',
    Medium: '🟡',
    Low: '🟢',
};

export default function PolicyRecommendations({ data }: { data: RecommendationData[] }) {
    return (
        <div className="h-full glass-panel p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                    <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                        <span className="text-2xl">🏛️</span> Policy Generator
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">Recommended actions based on live data analysis</p>
                </div>
                <button
                    onClick={() => {
                        const content = data.map(r =>
                            `[${r.urgency} Priority] ${r.title}\n${r.action}\nEst. Cost: ${r.cost}\n`
                        ).join('\n---\n');
                        const blob = new Blob([content], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'policy-recommendations.txt';
                        a.click();
                        URL.revokeObjectURL(url);
                    }}
                    className="text-xs flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-[var(--text-muted)] hover:text-white"
                >
                    <span>⬇️</span> Export Recommendations
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {data.map((rec, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.08 }}
                        viewport={{ once: true }}
                        className="p-5 rounded-xl border border-white/5 bg-white/3 hover:border-[var(--color-primary)]/50 hover:bg-white/5 transition-all group flex flex-col gap-3"
                    >
                        <div className="flex justify-between items-start gap-2">
                            <h4 className="font-bold text-white group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                                {rec.title}
                            </h4>
                            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border flex-shrink-0 ${URGENCY_STYLES[rec.urgency] ?? 'bg-gray-500/20 text-gray-400'}`}>
                                {URGENCY_ICONS[rec.urgency]} {rec.urgency}
                            </span>
                        </div>

                        <p className="text-xs text-gray-400 leading-relaxed bg-black/20 p-3 rounded-lg border-l-2 border-white/10 flex-1">
                            {rec.action}
                        </p>

                        <div className="flex items-center justify-between pt-1">
                            <div className="text-xs text-[var(--text-muted)]">
                                Est. Cost:{' '}
                                <span className={`font-semibold ${COST_STYLES[rec.cost] ?? 'text-white'}`}>
                                    {rec.cost}
                                </span>
                            </div>
                            <button className="text-xs bg-white/8 hover:bg-[var(--color-primary)] hover:text-white transition-all px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5">
                                Initiate <span>→</span>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

