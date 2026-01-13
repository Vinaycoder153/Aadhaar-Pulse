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
import styles from '@/app/page.module.css';

export default function DashboardClient({ data }: { data: DashboardData }) {
    const [showStory, setShowStory] = useState(false);

    return (
        <div className="min-h-screen pt-20 overflow-hidden bg-[var(--bg-app)] text-white">
            {showStory && <StoryVisualizer data={data} onClose={() => setShowStory(false)} />}

            {/* Main Hero */}
            <section className={`${styles.hero} container mx-auto px-4`}>
                <div className={styles.heroGlow} />
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
                        <div className="flex gap-4">
                            <button onClick={() => setShowStory(true)} className="btn-primary group">
                                Start Story Mode
                                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                            </button>
                            <button className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-medium">
                                View Documentation
                            </button>
                        </div>
                    </div>

                    <div className="relative h-[450px] lg:h-[550px] w-full animate-fade-in delay-100">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/10 to-blue-500/10 rounded-3xl blur-3xl" />
                        <TrendExplorer data={data.trends} />
                    </div>
                </div>
            </section>

            {/* Core Intelligence Grid */}
            <section className="py-20 container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Top Row: Heatmap (8) + Anomaly (4) */}
                    <div className="md:col-span-8 h-[400px]">
                        <InequalityHeatmap data={data.heatmap} />
                    </div>
                    <div className="md:col-span-4 h-[400px]">
                        <AnomalyRadar data={data.topDistricts} />
                    </div>

                    {/* Middle Row: Prediction (8) + Insights (4) */}
                    <div className="md:col-span-8 h-[400px]">
                        <PredictiveChart data={data.predictions} />
                    </div>
                    <div className="md:col-span-4 h-[400px]">
                        <SocietalInsights data={data.insights} />
                    </div>

                    {/* Bottom Row: Policy Recommendations (Full) */}
                    <div className="md:col-span-12">
                        <PolicyRecommendations data={data.recommendations} />
                    </div>
                </div>
            </section>
        </div>
    );
}
