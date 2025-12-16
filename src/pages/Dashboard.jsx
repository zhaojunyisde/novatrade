import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { addToWishlist, removeFromWishlist, subscribeToWishlist } from '../services/wishlistService';
import { searchSymbols, getStockCandles, getStockProfile } from '../services/stockService';
import StockSearch from '../components/StockSearch';
import StockCard from '../components/StockCard';
import StockChart from '../components/StockChart';
import { LogOut, LayoutDashboard, Settings } from 'lucide-react';


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [selectedSymbol, setSelectedSymbol] = useState(null);
    const [selectedRange, setSelectedRange] = useState('1M');
    const [error, setError] = useState('');

    // Data State
    const [chartData, setChartData] = useState([]);
    const [marketStats, setMarketStats] = useState({ marketCap: '--', volume: '--', avgVolume: '--' });
    const [loadingChart, setLoadingChart] = useState(false);

    const navigate = useNavigate();

    // Responsive: On mobile, left panel might be full screen, but for now assuming desktop layout per "major overhaul" request

    // Authentication & Wishlist Subscription
    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const unsubscribeWishlist = subscribeToWishlist(currentUser.uid, (data) => {
                    setWishlist(data);
                    if (!selectedSymbol && data.length > 0) {
                        setSelectedSymbol(data[0]);
                    }
                });
                return () => unsubscribeWishlist();
            } else {
                navigate('/login');
            }
        });
        return () => unsubscribeAuth();
    }, [navigate, selectedSymbol]);

    // Update selected symbol if removed
    useEffect(() => {
        if (wishlist.length > 0 && !wishlist.includes(selectedSymbol)) {
            setSelectedSymbol(wishlist[0]);
        }
    }, [wishlist, selectedSymbol]);

    // Fetch Chart Data & Profile
    useEffect(() => {
        if (!selectedSymbol) return;

        const fetchData = async () => {
            setLoadingChart(true);
            try {
                // Fetch Chart Data
                const candles = await getStockCandles(selectedSymbol, selectedRange);
                if (candles) {
                    setChartData(candles);

                    // Calculate Volume Stats from candles
                    if (candles.length > 0) {
                        const latestVolume = candles[candles.length - 1].volume;

                        // Avg volume (last 30 points or all)
                        const avgVolPoints = candles.slice(-30);
                        const avgVolume = avgVolPoints.reduce((sum, p) => sum + (p.volume || 0), 0) / avgVolPoints.length;

                        setMarketStats(prev => ({
                            ...prev,
                            volume: formatNumber(latestVolume),
                            avgVolume: formatNumber(avgVolume)
                        }));
                    } else {
                        setMarketStats(prev => ({
                            ...prev,
                            volume: '--',
                            avgVolume: '--'
                        }));
                    }
                } else {
                    setChartData([]);
                    setMarketStats(prev => ({
                        ...prev,
                        volume: '--',
                        avgVolume: '--'
                    }));
                }

                // Fetch Profile Data (Market Cap)
                const profile = await getStockProfile(selectedSymbol);
                if (profile) {
                    setMarketStats(prev => ({
                        ...prev,
                        marketCap: profile.marketCapitalization ? `$${formatNumber(profile.marketCapitalization * 1000000)}` : '--' // Finnhub returns in millions
                    }));
                } else {
                    setMarketStats(prev => ({
                        ...prev,
                        marketCap: '--'
                    }));
                }

            } catch (err) {
                console.error("Error fetching stock data:", err);
                setError("Failed to fetch stock data.");
                setChartData([]);
                setMarketStats({ marketCap: '--', volume: '--', avgVolume: '--' });
            } finally {
                setLoadingChart(false);
            }
        };

        fetchData();
    }, [selectedSymbol, selectedRange]);

    const formatNumber = (num) => {
        if (num === null || num === undefined || isNaN(num)) return '--';
        if (num >= 1.0e+12) return (num / 1.0e+12).toFixed(2) + "T";
        if (num >= 1.0e+9) return (num / 1.0e+9).toFixed(2) + "B";
        if (num >= 1.0e+6) return (num / 1.0e+6).toFixed(2) + "M";
        if (num >= 1.0e+3) return (num / 1.0e+3).toFixed(2) + "K";
        return num.toFixed(2);
    }



    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    const handleSelectStock = async (symbol) => {
        setError('');
        try {
            await addToWishlist(user.uid, symbol);
            setSelectedSymbol(symbol);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRemoveStock = async (symbol, e) => {
        e.stopPropagation(); // Prevent card click
        setError('');
        try {
            await removeFromWishlist(user.uid, symbol);
        } catch (err) {
            setError(err.message);
        }
    }

    const ranges = ['1D', '1W', '1M', '3M', '1Y'];

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)', overflow: 'hidden' }}>

            {/* LEFT SIDEBAR */}
            <div style={{
                width: '350px',
                minWidth: '350px',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(3, 7, 18, 0.4)',
                backdropFilter: 'blur(20px)'
            }}>
                {/* Header */}
                <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '-0.5px', marginBottom: '20px' }}>
                        Nova<span className="text-gradient">Trade</span>
                    </div>
                    {/* Search is now permanently in the sidebar */}
                    <StockSearch onSelect={handleSelectStock} />
                </div>

                {/* Stock List Scroll Area */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', paddingLeft: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Watched Assets</div>

                    {wishlist.length === 0 && (
                        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
                            Search above to add stocks to your watchlist.
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {wishlist.map(symbol => (
                            <div
                                key={symbol}
                                onClick={() => setSelectedSymbol(symbol)}
                                style={{
                                    cursor: 'pointer',
                                    borderRadius: '12px',
                                    border: selectedSymbol === symbol ? '1px solid var(--primary-color)' : '1px solid transparent',
                                    background: selectedSymbol === symbol ? 'rgba(59, 130, 246, 0.05)' : 'transparent'
                                }}
                            >
                                <StockCard symbol={symbol} onRemove={(val) => handleRemoveStock(val, event)} />
                                {/* Note: We passed event to handleRemove but StockCard calls it directly. 
                                    We might need to adjust StockCard to modify how button click is propagated 
                                    or just wrap StockCard in a div like this.
                                    Actually StockCard has its own style, let's just use it as simple container content provider?
                                    Ideally StockCard should be "dumb" and just display, but it has the API fetch inside.
                                    For this sidebar list view, re-using StockCard is okay, but we might want a compact version later.
                                */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Footer */}
                <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                            {user?.email?.[0].toUpperCase()}
                        </div>
                        <div style={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>
                            {user?.email}
                        </div>
                    </div>
                    <button onClick={handleLogout} style={{ background: 'transparent', color: 'var(--text-secondary)', padding: '8px' }}>
                        <LogOut size={18} />
                    </button>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
                {selectedSymbol ? (
                    <div style={{ padding: '40px', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
                        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '40px' }}>
                            <div>
                                <h1 style={{ fontSize: '48px', fontWeight: '800', margin: 0 }}>{selectedSymbol}</h1>
                                <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Market Overview</p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                {ranges.map(range => (
                                    <button
                                        key={range}
                                        onClick={() => setSelectedRange(range)}
                                        className="btn-secondary"
                                        style={{
                                            fontSize: '14px',
                                            background: selectedRange === range ? 'var(--primary-glow)' : 'transparent',
                                            borderColor: selectedRange === range ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)',
                                            color: selectedRange === range ? 'white' : 'var(--text-secondary)'
                                        }}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </header>

                        {/* Main Chart Card */}
                        <div className="glass-card" style={{ padding: '32px', marginBottom: '32px' }}>
                            <StockChart data={chartData} loading={loadingChart} />
                        </div>

                        {/* Additional Stats Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                            <div className="glass-card" style={{ padding: '24px' }}>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Market Cap</div>
                                <div style={{ fontSize: '24px', fontWeight: '600' }}>
                                    {loadingChart ? <span style={{ opacity: 0.5, fontSize: '18px' }}>Loading...</span> : marketStats.marketCap}
                                </div>
                            </div>
                            <div className="glass-card" style={{ padding: '24px' }}>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Volume (24h)</div>
                                <div style={{ fontSize: '24px', fontWeight: '600' }}>
                                    {loadingChart ? <span style={{ opacity: 0.5, fontSize: '18px' }}>Loading...</span> : marketStats.volume}
                                </div>
                            </div>
                            <div className="glass-card" style={{ padding: '24px' }}>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Avg. Volume</div>
                                <div style={{ fontSize: '24px', fontWeight: '600' }}>
                                    {loadingChart ? <span style={{ opacity: 0.5, fontSize: '18px' }}>Loading...</span> : marketStats.avgVolume}
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="flex-center" style={{ flex: 1, flexDirection: 'column', color: 'var(--text-secondary)' }}>
                        <LayoutDashboard size={48} style={{ marginBottom: '16px', opacity: 0.2 }} />
                        <h2>Select a stock to view details</h2>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Dashboard;
