'use client';

import { AnomalyData } from '@/types';
import { motion } from 'framer-motion';

export default function AnomalyRadar({ data }: { data: AnomalyData[] }) {

    return (
        <div className="glass-panel p-6 border-red-500/30 relative overflow-hidden h-full flex flex-col">
            {/* Background Radar Effect */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse" />

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </div>
                    <h3 className="text-xl font-bold text-gradient-alert">Anomaly Radar</h3>
                </div>
                <div className="text-xs font-mono text-red-400 border border-red-500/30 px-2 py-1 rounded bg-red-500/5">
                    LIVE MONITORING
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                {data.map((item, i) => (
                    <motion.div
                        key={item.district}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-red-500/50 transition-colors group"
                    >
                        <div>
                            <div className="font-semibold">{item.district}</div>
                            <div className="text-xs text-[var(--text-muted)]">{item.state}</div>
                        </div>

                        <div className="text-right">
                            <div className="text-red-400 font-mono font-bold">
                                +{item.total.toLocaleString()}
                            </div>
                            <div className="text-[10px] text-red-500/70 uppercase tracking-wider">
                                Spike Detected
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
