'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardData } from '@/types';

function useCountUp(target: number, duration = 2000) {
    const [current, setCurrent] = useState(0);
    const ref = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const steps = 60;
        const increment = target / steps;
        const stepDuration = duration / steps;
        let count = 0;

        ref.current = setInterval(() => {
            count += increment;
            if (count >= target) {
                setCurrent(target);
                if (ref.current) clearInterval(ref.current);
            } else {
                setCurrent(Math.floor(count));
            }
        }, stepDuration);

        return () => {
            if (ref.current) clearInterval(ref.current);
        };
    }, [target, duration]);

    return current;
}

interface StatCardProps {
    label: string;
    value: number;
    suffix?: string;
    prefix?: string;
    icon: string;
    color: string;
    delay: number;
}

function StatCard({ label, value, suffix = '', prefix = '', icon, color, delay }: StatCardProps) {
    const count = useCountUp(value);

    const formatNumber = (n: number) => {
        if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
        if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
        if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
        return n.toString();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: 'easeOut' }}
            className="glass-panel p-6 flex items-center gap-5 group hover:border-white/20 transition-all"
        >
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${color}20`, border: `1px solid ${color}40` }}
            >
                {icon}
            </div>
            <div>
                <p className="text-sm text-[var(--text-dim)] mb-0.5 font-medium">{label}</p>
                <p className="text-2xl font-bold font-mono tracking-tight" style={{ color }}>
                    {prefix}{formatNumber(count)}{suffix}
                </p>
            </div>
        </motion.div>
    );
}

export default function StatsBar({ data }: { data: DashboardData }) {
    const totalEnrollments = data.trends.reduce((sum, t) => sum + (t.overall ?? t.value), 0);
    const totalBiometric = data.trends.reduce((sum, t) => sum + (t.biometric ?? 0), 0);
    const totalFemale = data.trends.reduce((sum, t) => sum + (t.female ?? 0), 0);
    const statesCovered = data.heatmap.length;

    const stats: StatCardProps[] = [
        {
            label: 'Total Enrollments',
            value: totalEnrollments,
            icon: '🆔',
            color: 'var(--color-primary)',
            delay: 0,
        },
        {
            label: 'States & UTs Covered',
            value: statesCovered,
            suffix: ' regions',
            icon: '🗺️',
            color: 'var(--color-secondary)',
            delay: 0.1,
        },
        {
            label: 'Biometric Updates',
            value: totalBiometric,
            icon: '🔬',
            color: '#a78bfa',
            delay: 0.2,
        },
        {
            label: 'Female Enrollment',
            value: totalFemale,
            icon: '♀️',
            color: '#f472b6',
            delay: 0.3,
        },
    ];

    return (
        <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>
        </section>
    );
}
