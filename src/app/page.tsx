import { promises as fs } from 'fs';
import path from 'path';
import Navbar from '@/components/Navbar';
import TrendExplorer from '@/components/TrendExplorer';
import InequalityHeatmap from '@/components/InequalityHeatmap';
import AnomalyRadar from '@/components/AnomalyRadar';
import styles from './page.module.css';
import { DashboardData } from '@/types';

async function getDashboardData(): Promise<DashboardData> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'summary.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function Home() {
  const data = await getDashboardData();

  return (
    <main className="min-h-screen pt-20 overflow-hidden bg-[var(--bg-app)]">
      <Navbar />

      {/* Hero Section */}
      <section className={`${styles.hero} container mx-auto px-4`}>
        <div className={styles.heroGlow} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in z-10">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 hidden-h1">
              Decoding India&apos;s <br />
              <span className="text-gradient">Digital Pulse</span>
            </h1>
            <p className="text-xl text-[var(--text-muted)] mb-10 max-w-lg">
              Transforming Aadhaar enrolment and update data into actionable societal insights,
              real-time anomaly detection, and predictive foresight.
            </p>
            <div className="flex gap-4">
              <button className="btn-primary group">
                Explore Trends
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
              </button>
              <button className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[500px] w-full animate-fade-in delay-100">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-3xl blur-2xl" />
            <div className="relative h-full w-full glass-panel overflow-hidden p-1">
              <TrendExplorer data={data.trends} />
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-20 container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16">Intelligence Modules</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div id="heatmap" className="h-[450px]">
            <InequalityHeatmap data={data.heatmap} />
          </div>

          <div id="anomaly" className="h-[450px]">
            <AnomalyRadar data={data.topDistricts} />
          </div>
        </div>
      </section>

    </main>
  );
}
