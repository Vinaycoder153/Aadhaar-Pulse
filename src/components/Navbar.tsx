import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <div className={styles.pulse} />
                    </div>
                    <span className={styles.logoText}>Aadhaar<span className={styles.highlight}>Pulse</span></span>
                </div>

                <div className={styles.navLinks}>
                    <Link href="#trends" className={styles.navLink}>Explorer</Link>
                    <Link href="#heatmap" className={styles.navLink}>Heatmap</Link>
                    <Link href="#anomaly" className={styles.navLink}>Anomalies</Link>
                    <Link href="#predictions" className={styles.navLink}>Predictions</Link>
                    <Link href="#policy" className={styles.navLink}>Policy</Link>
                </div>

                <div className={styles.navRight}>
                    <span className={styles.badge}>
                        <span className={styles.badgeDot} />
                        Live
                    </span>
                    <a
                        href="https://github.com/Vinaycoder153/Aadhaar-Pulse"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn-primary ${styles.launchBtn}`}
                    >
                        Launch Dashboard
                    </a>
                </div>
            </div>
        </nav>
    );
}

