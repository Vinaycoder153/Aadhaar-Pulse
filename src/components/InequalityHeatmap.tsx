'use client';

import { StateData } from '@/types';
import { motion } from 'framer-motion';

export default function InequalityHeatmap({ data }: { data: StateData[] }) {
    const maxValue = data.length > 0 ? data[0].value : 1;
    const minValue = data.length > 0 ? data[data.length - 1].value : 0;

    return (
        <div className="glass-panel p-6 h-full flex flex-col">
            <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold mb-1">Regional Heatmap</h3>
                    <p className="text-sm text-[var(--text-muted)]">State-wise distribution intensity — {data.length} regions</p>
                </div>
                <div className="flex-shrink-0 text-right">
                    <p className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider mb-1">Intensity Scale</p>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[var(--text-dim)]">{(minValue / 1_000_000).toFixed(1)}M</span>
                        <div
                            className="w-24 h-2 rounded-full"
                            style={{
                                background: `linear-gradient(to right, hsla(var(--hue-primary), 80%, 60%, 0.1), hsla(var(--hue-primary), 80%, 60%, 0.55))`,
                            }}
                        />
                        <span className="text-[10px] text-[var(--text-dim)]">{(maxValue / 1_000_000).toFixed(1)}M</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                {data.map((item, i) => {
                    const intensity = maxValue > 0 ? item.value / maxValue : 0;
                    return (
                        <motion.div
                            key={item.id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.02 }}
                            className="relative p-3 rounded-lg cursor-pointer group overflow-hidden"
                            style={{
                                backgroundColor: `hsla(var(--hue-primary), 80%, 60%, ${0.08 + intensity * 0.45})`,
                                border: `1px solid hsla(var(--hue-primary), 80%, 60%, ${0.05 + intensity * 0.2})`,
                            }}
                            title={`${item.id}: ${(item.value / 1_000_000).toFixed(2)}M`}
                        >
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                            <div className="relative z-10">
                                <div className="text-xs text-[var(--text-muted)] truncate">{item.id}</div>
                                <div className="font-bold font-mono mt-1 text-sm">
                                    {(item.value / 1_000_000).toFixed(1)}M
                                </div>
                                {/* Intensity pill */}
                                <div className="mt-1.5 flex items-center gap-1">
                                    <div
                                        className="h-1 rounded-full bg-[var(--color-secondary)]"
                                        style={{ width: `${Math.max(intensity * 100, 5)}%` }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

