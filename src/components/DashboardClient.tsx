'use client';

import { useState } from 'react';
import { DashboardData } from '@/types';
import TrendExplorer from './TrendExplorer';
import InequalityHeatmap from './InequalityHeatmap';
import AnomalyRadar from './AnomalyRadar';
import PredictiveChart from './PredictiveChart';
import SocietalInsights from './SocietalInsights';
import PolicyRecommendations from './PolicyRecommendations';
import StoryVisualizer from './StoryVisualizer';
import StatsBar from './StatsBar';
import Footer from './Footer';
import styles from '@/app/page.module.css';

export default function DashboardClient({ data }: { data: DashboardData }) {
    const [showStory, setShowStory] = useState(false);

    return (
        <div className="min-h-screen pt-20 overflow-hidden bg-[var(--bg-app)] text-white">
            {showStory && <StoryVisualizer data={data} onClose={() => setShowStory(false)} />}

            {/* Main Hero */}
            <section className={`${styles.hero} container mx-auto px-4`}>
                <div className={styles.heroGlow} />
                {/* Subtle grid overlay */}
                <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="z-10 animate-slide-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 text-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span>System Operational</span>
                            <span className="text-white/20">|</span>
                            <span className="text-[var(--text-muted)]">v2.4.0</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                            Aadhaar <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-purple-400">Pulse</span>
                        </h1>
                        <p className="text-xl text-[var(--text-muted)] mb-10 max-w-lg leading-relaxed">
                            Visual intelligence for societal trends. Detect anomalies, predict demand, and generate policy insights in real-time.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <button onClick={() => setShowStory(true)} className="btn-primary group">
                                Start Story Mode
                                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                            </button>
                            <a
                                href="https://github.com/Vinaycoder153/Aadhaar-Pulse"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-medium"
                            >
                                View on GitHub
                            </a>
                        </div>

                        {/* Floating Info Badges */}
                        <div className="mt-10 flex flex-wrap gap-3">
                            {[
                                { icon: '🔒', text: 'Privacy-First Analytics' },
                                { icon: '⚡', text: 'Real-Time Processing' },
                                { icon: '🧠', text: 'AI-Powered Insights' },
                            ].map(b => (
                                <div
                                    key={b.text}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-[var(--text-muted)]"
                                >
                                    <span>{b.icon}</span>
                                    <span>{b.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative h-[450px] lg:h-[550px] w-full animate-fade-in delay-100">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/10 to-blue-500/10 rounded-3xl blur-3xl" />
                        <TrendExplorer data={data.trends} />
                    </div>
                </div>
            </section>

            {/* KPI Stats Bar */}
            <StatsBar data={data} />

            {/* Section Divider */}
            <div className="container mx-auto px-4 mb-4">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Core Intelligence Grid */}
            <section className="py-12 container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 text-xs text-[var(--text-muted)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                        Intelligence Modules
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        Full-Spectrum <span className="text-gradient">Analytics Dashboard</span>
                    </h2>
                    <p className="text-[var(--text-muted)] max-w-xl mx-auto">
                        Explore regional distributions, detect real-time anomalies, and forecast demand with AI-driven predictions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Top Row: Heatmap (8) + Anomaly (4) */}
                    <div id="heatmap" className="md:col-span-8 h-[400px]">
                        <InequalityHeatmap data={data.heatmap} />
                    </div>
                    <div id="anomaly" className="md:col-span-4 h-[400px]">
                        <AnomalyRadar data={data.topDistricts} />
                    </div>

                    {/* Middle Row: Prediction (8) + Insights (4) */}
                    <div id="predictions" className="md:col-span-8 h-[400px]">
                        <PredictiveChart data={data.predictions} />
                    </div>
                    <div className="md:col-span-4 h-[400px] overflow-y-auto custom-scrollbar" tabIndex={0}>
                        <SocietalInsights data={data.insights} />
                    </div>

                    {/* Bottom Row: Policy Recommendations (Full) */}
                    <div id="policy" className="md:col-span-12">
                        <PolicyRecommendations data={data.recommendations} />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

