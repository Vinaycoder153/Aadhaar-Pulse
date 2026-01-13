'use client';

import { RecommendationData } from '@/types';
import { motion } from 'framer-motion';

export default function PolicyRecommendations({ data }: { data: RecommendationData[] }) {
    return (
        <div className="h-full">
            <div className="mb-6">
                <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                    <span className="text-2xl">🏛️</span> Policy Generator
                </h3>
                <p className="text-sm text-[var(--text-muted)]">Recommended Actions based on Data</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {data.map((rec, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="glass-panel p-5 border border-white/5 hover:border-[var(--color-primary)]/50 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-bold text-white group-hover:text-[var(--color-primary)] transition-colors">
                                {rec.title}
                            </h4>
                            <div className="flex gap-2">
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${rec.urgency === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                    {rec.urgency} Priority
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-300 mb-4 bg-black/20 p-3 rounded border-l-2 border-white/20">
                            {rec.action}
                        </p>

                        <div className="flex items-center justify-between mt-4">
                            <div className="text-xs text-[var(--text-muted)]">
                                Est. Cost: <span className="text-white">{rec.cost}</span>
                            </div>
                            <button className="text-xs bg-white/10 hover:bg-[var(--color-primary)] hover:text-white transition-all px-4 py-2 rounded-md font-medium flex items-center gap-2">
                                Initiate Action
                                <span>→</span>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
