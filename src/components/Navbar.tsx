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
                    <Link href="#forecast" className={styles.navLink}>Foresight</Link>
                </div>

                <button className="btn-primary">
                    Launch Dashboard
                </button>
            </div>
        </nav>
    );
}
