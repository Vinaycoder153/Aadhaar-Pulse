import Navbar from '@/components/Navbar';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={`container ${styles.heroContent}`}>
          <div className="animate-fade-in">
            <h1 className={styles.heroTitle}>
              Decoding India's <br />
              <span className="text-gradient">Digital Pulse</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Transforming Aadhaar enrolment and update data into actionable societal insights,
              real-time anomaly detection, and predictive foresight.
            </p>
            <div className={styles.heroActions}>
              <button className="btn-primary">Explore Trends</button>
              <button className={styles.btnSecondary}>Watch Demo</button>
            </div>
          </div>

          <div className={`${styles.heroVisual} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
            <div className="glass-panel" style={{ padding: '2rem', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Abstract Data Visualization */}
              <div className={styles.visualGraph}>
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={styles.bar} style={{
                    height: `${Math.random() * 60 + 20}%`,
                    animationDelay: `${i * 0.1}s`
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className={styles.modules}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Intelligence Modules</h2>
          <div className="grid-cols-2">

            {/* 1. Trend Explorer */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox} style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>
                  📊
                </div>
                <h3>Societal Trend Explorer</h3>
              </div>
              <p className={styles.cardDesc}>
                Visualize enrolment growth and update patterns across demographics.
                See how migration trends shift post-2020.
              </p>
              <div className={styles.demoVisual}>
                <div className={styles.trendLine} />
              </div>
            </div>

            {/* 2. Heatmap */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox} style={{ background: 'rgba(232, 121, 249, 0.1)', color: '#e879f9' }}>
                  🗺️
                </div>
                <h3>Regional Inequality Heatmap</h3>
              </div>
              <p className={styles.cardDesc}>
                Identify digital divides and low-enrolment clusters.
                Zoom from national view to district level instantly.
              </p>
            </div>

            {/* 3. Anomaly Radar */}
            <div className="glass-panel" style={{ padding: '2rem', borderColor: 'rgba(255, 99, 99, 0.3)' }}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox} style={{ background: 'rgba(255, 99, 99, 0.1)', color: '#ff6363' }}>
                  🚨
                </div>
                <h3 className="text-gradient-alert">Anomaly Radar</h3>
              </div>
              <p className={styles.cardDesc}>
                Detect sudden enrolment drops or unusual update spikes.
                "District X shows 3.4x address updates."
              </p>
            </div>

            {/* 4. Predictive Foresight */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox} style={{ background: 'rgba(167, 139, 250, 0.1)', color: '#a78bfa' }}>
                  🔮
                </div>
                <h3>Predictive Foresight</h3>
              </div>
              <p className={styles.cardDesc}>
                Forecast resource pressure points for the next 3-6 months.
                Plan centers and staffing proactively.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
