'use client';

import { StateData } from '@/types';
import { motion } from 'framer-motion';

export default function InequalityHeatmap({ data }: { data: StateData[] }) {
    const maxValue = data.length > 0 ? data[0].value : 0;

    return (
        <div className="glass-panel p-6 h-full">
            <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">Regional Heatmap</h3>
                <p className="text-sm text-[var(--text-muted)]">State-wise distribution intensity</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {data.map((item, i) => {
                    const intensity = item.value / maxValue;
                    return (
                        <motion.div
                            key={item.id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.02 }}
                            className="relative p-3 rounded-lg cursor-pointer group overflow-hidden"
                            style={{
                                backgroundColor: `hsla(var(--hue-primary), 80%, 60%, ${0.1 + intensity * 0.4})`,
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}
                        >
                            <div
                                className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"
                            />
                            <div className="relative z-10">
                                <div className="text-xs text-[var(--text-muted)] truncate" title={item.id}>
                                    {item.id}
                                </div>
                                <div className="font-bold font-mono mt-1">
                                    {(item.value / 1000000).toFixed(1)}M
                                </div>
                            </div>

                            {/* Bar indicator at bottom */}
                            <div
                                className="absolute bottom-0 left-0 h-1 bg-[var(--color-secondary)]"
                                style={{ width: `${intensity * 100}%` }}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
