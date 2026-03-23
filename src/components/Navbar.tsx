import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <div className={styles.pulse} />
                    </div>
                    <span className={styles.logoText}>Aadhaar<span className={styles.highlight}>Pulse</span></span>
                </Link>

                <div className={styles.navLinks}>
                    <Link href="#trends" className={styles.navLink}>Explorer</Link>
                    <Link href="#heatmap" className={styles.navLink}>Heatmap</Link>
                    <Link href="#anomaly" className={styles.navLink}>Anomalies</Link>
                    <Link href="#predictions" className={styles.navLink}>Forecast</Link>
                    <Link href="#policy" className={styles.navLink}>Policy</Link>
                </div>

                <a href="#stats" className="btn-primary">
                    View Stats
                </a>
            </div>
        </nav>
    );
}
