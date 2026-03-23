import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 mt-16 py-10 bg-[var(--bg-surface)]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="font-bold text-lg mb-3">
                            Aadhaar<span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)]">Pulse</span>
                        </h3>
                        <p className="text-sm text-[var(--text-muted)] max-w-xs">
                            Visual intelligence for societal trends — real-time Aadhaar enrolment monitoring and predictive analytics.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-[var(--text-dim)] mb-3">Dashboard</h4>
                        <ul className="space-y-2">
                            {[
                                { label: 'Trend Explorer', href: '#trends' },
                                { label: 'Regional Heatmap', href: '#heatmap' },
                                { label: 'Anomaly Radar', href: '#anomaly' },
                                { label: 'Predictive Analytics', href: '#predictions' },
                                { label: 'Policy Generator', href: '#policy' },
                            ].map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-[var(--text-muted)] hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Data Info */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-[var(--text-dim)] mb-3">Data Source</h4>
                        <p className="text-sm text-[var(--text-muted)]">
                            Data is sourced from the UIDAI Aadhaar demographic dataset covering all 37 states and Union Territories of India.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--text-dim)]">UIDAI</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--text-dim)]">2025 Dataset</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--text-dim)]">2M+ Records</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-[var(--text-dim)]">
                        © {currentYear} AadhaarPulse. Built with Next.js & Recharts. MIT License.
                    </p>
                    <p className="text-xs text-[var(--text-dim)]">
                        Maintained by{' '}
                        <a href="https://github.com/Vinaycoder153" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline underline-offset-2">
                            Vinaycoder153
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
