export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 mt-20 py-12 bg-[var(--bg-surface)]/40">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-xs font-bold">
                                AP
                            </div>
                            <span className="text-lg font-bold font-[var(--font-outfit)]">
                                Aadhaar<span className="text-gradient">Pulse</span>
                            </span>
                        </div>
                        <p className="text-sm text-[var(--text-dim)] leading-relaxed max-w-xs">
                            Visual intelligence platform for Aadhaar enrolment analytics, anomaly detection,
                            and policy recommendations.
                        </p>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-4">
                            Resources
                        </h4>
                        <ul className="space-y-2 text-sm text-[var(--text-dim)]">
                            <li>
                                <a
                                    href="https://uidai.gov.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    UIDAI Official
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://data.gov.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    data.gov.in
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/Vinaycoder153/Aadhaar-Pulse"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    GitHub Repository
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h4 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-4">
                            Built With
                        </h4>
                        <div className="flex flex-wrap gap-2 text-xs">
                            {['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Framer Motion'].map((t) => (
                                <span
                                    key={t}
                                    className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--text-muted)]"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-dim)]">
                    <p>© {year} Aadhaar Pulse — Built by Vinaycoder153. All rights reserved.</p>
                    <p className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        All systems operational
                    </p>
                </div>
            </div>
        </footer>
    );
}
