'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardData } from '@/types';
import TrendExplorer from './TrendExplorer';
import InequalityHeatmap from './InequalityHeatmap';
import PredictiveChart from './PredictiveChart';

export default function StoryVisualizer({ data, onClose }: { data: DashboardData; onClose: () => void }) {
    const [scene, setScene] = useState(0);
    const scenes = [
        {
            title: "The Big Picture",
            subtitle: "Aadhaar Enrolment Trends (2025)",
            component: <TrendExplorer data={data.trends} />,
            insight: "Overall enrolment has stabilized, but seasonal updates drive recent volume."
        },
        {
            title: "Regional Disparities",
            subtitle: "Inequality Heatmap",
            component: <InequalityHeatmap data={data.heatmap} />,
            insight: "Southern states show 3x higher update frequency than North-East regions."
        },
        {
            title: "Future Outlook",
            subtitle: "Predictive Analytics (Next 6 Months)",
            component: <PredictiveChart data={data.predictions} />,
            insight: "We project a 15% surge in biometric updates due to upcoming policy changes."
        }
    ];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') setScene(s => Math.min(s + 1, scenes.length - 1));
            if (e.key === 'ArrowLeft') setScene(s => Math.max(s - 1, 0));
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [scenes.length, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0f0f15] text-white flex flex-col"
        >
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold">AP</div>
                    <span className="font-mono text-sm tracking-widest uppercase text-white/50">Antigravity Mode</span>
                </div>
                <button onClick={onClose} className="rounded-full w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                    ✕
                </button>
            </div>

            <div className="flex-1 container mx-auto flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={scene}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1, y: -20 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6"
                    >
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50"
                            >
                                {scenes[scene].title}
                            </motion.h1>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-xl text-[var(--color-primary)] mb-8 font-mono"
                            >
                                {scenes[scene].subtitle}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-xl text-gray-400 border-l-4 border-white/20 pl-6 leading-relaxed"
                            >
                                {scenes[scene].insight}
                            </motion.p>

                            <div className="mt-12 flex gap-4">
                                <button
                                    onClick={() => setScene(s => Math.max(s - 1, 0))}
                                    disabled={scene === 0}
                                    className="px-6 py-3 rounded border border-white/10 hover:bg-white/5 disabled:opacity-30 transition-all"
                                >
                                    ← Previous
                                </button>
                                <button
                                    onClick={() => setScene(s => Math.min(s + 1, scenes.length - 1))}
                                    disabled={scene === scenes.length - 1}
                                    className="px-6 py-3 rounded bg-[var(--color-primary)] hover:opacity-90 disabled:opacity-30 disabled:hover:opacity-30 text-white transition-all"
                                >
                                    Next Insight →
                                </button>
                            </div>
                        </div>

                        <div className="relative h-[400px] bg-black/20 rounded-xl border border-white/10 p-4 shadow-2xl">
                            {scenes[scene].component}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="h-2 w-full bg-white/5">
                <motion.div
                    className="h-full bg-[var(--color-primary)]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((scene + 1) / scenes.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </motion.div>
    );
}
