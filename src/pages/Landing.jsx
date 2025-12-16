import React from 'react';
import NavBar from '../components/NavBar';

const Hero = () => (
    <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'var(--nav-height)',
        position: 'relative',
        overflow: 'hidden'
    }}>
        {/* Background Glows */}
        <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: 'var(--primary-color)',
            borderRadius: '50%',
            filter: 'blur(150px)',
            opacity: '0.15',
            top: '-10%',
            left: '-10%',
            zIndex: '-1'
        }} />
        <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            background: 'var(--accent-color)',
            borderRadius: '50%',
            filter: 'blur(150px)',
            opacity: '0.15',
            bottom: '10%',
            right: '-5%',
            zIndex: '-1'
        }} />

        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div className="animate-fade-in">
                <div style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '30px',
                    color: '#60A5FA',
                    fontSize: '13px',
                    fontWeight: '600',
                    marginBottom: '24px',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                    NEW: 0% Fees on your first trade
                </div>
                <h1 style={{ fontSize: '64px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px' }}>
                    Trade the Future. <br />
                    <span className="text-gradient">Without Limits.</span>
                </h1>
                <p style={{ fontSize: '18px', marginBottom: '40px', maxWidth: '500px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Experience the next generation of stock trading. Lightning-fast execution, bank-grade encryption, and AI-powered insights.
                </p>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <button className="btn-primary">Get Started</button>
                    <button className="btn-secondary">View Demo</button>
                </div>

                <div style={{ marginTop: '60px', display: 'flex', gap: '40px' }}>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: '700' }}>$10B+</div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Quarterly Volume</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: '700' }}>500K+</div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Verified Users</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: '700' }}>0.05s</div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Latency</div>
                    </div>
                </div>
            </div>

            <div style={{ position: 'relative' }}>
                {/* Abstract Interface Visualization */}
                <div className="glass-card" style={{
                    padding: '24px',
                    height: '520px',
                    width: '100%',
                    position: 'relative',
                    animation: 'float 6s ease-in-out infinite',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}>
                    {/* Mock UI Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Balance</div>
                            <div style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-1px' }}>$124,592.00</div>
                        </div>
                        <div style={{
                            padding: '4px 12px',
                            background: 'rgba(16, 185, 129, 0.1)',
                            color: '#10B981',
                            height: 'fit-content',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600'
                        }}>+2.4%</div>
                    </div>

                    {/* Mock Chart Area */}
                    <div style={{
                        height: '240px',
                        background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0) 100%)',
                        borderTop: '2px solid #3B82F6',
                        position: 'relative',
                        borderRadius: '4px'
                    }}>
                        {/* Simple SVG Line Chart */}
                        <svg viewBox="0 0 100 50" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,50 L0,30 Q10,25 20,35 T40,20 T60,30 T80,10 T100,5 V50 Z" fill="url(#gradient)" />
                            <path d="M0,30 Q10,25 20,35 T40,20 T60,30 T80,10 T100,5" fill="none" stroke="#3B82F6" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                        </svg>
                    </div>

                    {/* Mock List */}
                    <div style={{ marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>B</div>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '14px' }}>Bitcoin</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>BTC</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: '600', fontSize: '14px' }}>$42,300.00</div>
                                <div style={{ fontSize: '12px', color: '#10B981' }}>+1.2%</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>E</div>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '14px' }}>Ethereum</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>ETH</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: '600', fontSize: '14px' }}>$2,200.00</div>
                                <div style={{ fontSize: '12px', color: '#EF4444' }}>-0.5%</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Floating Element */}
                <div className="glass-card" style={{
                    position: 'absolute',
                    bottom: '-30px',
                    right: '-30px',
                    padding: '20px',
                    width: '200px',
                    animation: 'float 8s ease-in-out infinite reverse',
                    background: 'rgba(21, 26, 35, 0.9)'
                }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>New Trade Executed</div>
                    <div style={{ fontWeight: '600' }}>AAPL Buy Order</div>
                    <div style={{ fontSize: '12px', color: '#10B981', marginTop: '4px' }}>Successful • 2s ago</div>
                </div>
            </div>
        </div>
    </section>
);

const Features = () => (
    <section id="features" style={{ padding: '100px 0', position: 'relative' }}>
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
            zIndex: -1
        }}></div>
        <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h2 style={{ fontSize: '42px', marginBottom: '20px' }}>Built for <span className="text-gradient">Pro Traders</span></h2>
                <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '18px', color: 'var(--text-secondary)' }}>
                    Everything you need to trade with confidence, speed, and precision.
                </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                {[
                    { title: 'Real-time Data', desc: 'Direct market access with millisecond precision to ensure you never miss a beat.', icon: '⚡' },
                    { title: 'Advanced Charts', desc: 'Professional markers, indicators, and drawing tools powered by proprietary tech.', icon: '📊' },
                    { title: 'Bank Security', desc: '256-bit encryption, cold storage, and bio-authentication for all assets.', icon: '🛡️' }
                ].map((f, i) => (
                    <div key={i} className="glass-card" style={{ padding: '40px', background: 'rgba(255,255,255,0.02)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <div style={{ fontSize: '40px', marginBottom: '20px' }}>{f.icon}</div>
                        <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>{f.title}</h3>
                        <p style={{ lineHeight: '1.6' }}>{f.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Landing = () => (
    <div>
        <NavBar />
        <Hero />
        <Features />
    </div>
);

export default Landing;
