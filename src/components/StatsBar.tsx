'use client';

import { motion } from 'framer-motion';
import { SummaryStats } from '@/types';

function formatNumber(n: number): string {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
    return n.toString();
}

const KPI_CONFIG = [
    {
        label: 'Total Records',
        key: 'totalRecords' as keyof SummaryStats,
        icon: '📋',
        color: 'from-violet-500/20 to-violet-500/5',
        border: 'border-violet-500/20',
    },
    {
        label: 'Total Enrolments',
        key: 'totalEnrolments' as keyof SummaryStats,
        icon: '🆔',
        color: 'from-cyan-500/20 to-cyan-500/5',
        border: 'border-cyan-500/20',
    },
    {
        label: 'States / UTs Covered',
        key: 'totalStates' as keyof SummaryStats,
        icon: '🗺️',
        color: 'from-emerald-500/20 to-emerald-500/5',
        border: 'border-emerald-500/20',
    },
    {
        label: 'Districts Monitored',
        key: 'totalDistricts' as keyof SummaryStats,
        icon: '📍',
        color: 'from-amber-500/20 to-amber-500/5',
        border: 'border-amber-500/20',
    },
];

export default function StatsBar({ stats }: { stats: SummaryStats }) {
    return (
        <section id="stats" className="py-8 container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {KPI_CONFIG.map((kpi, i) => {
                    const raw = stats[kpi.key];
                    const value = typeof raw === 'number' ? formatNumber(raw) : String(raw);
                    return (
                        <motion.div
                            key={kpi.key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`glass-panel p-5 bg-gradient-to-br ${kpi.color} border ${kpi.border}`}
                        >
                            <div className="text-2xl mb-2">{kpi.icon}</div>
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</div>
                            <div className="text-sm text-[var(--text-muted)]">{kpi.label}</div>
                        </motion.div>
                    );
                })}
            </div>
            {stats.dateRange && (
                <p className="text-center text-xs text-[var(--text-dim)] mt-4">
                    Data period: {stats.dateRange.from} → {stats.dateRange.to}
                </p>
            )}
        </section>
    );
}
