import React, { useState, useEffect } from 'react';
import { getStockQuote } from '../services/stockService';

const StockCard = ({ symbol, onRemove }) => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            const data = await getStockQuote(symbol);
            if (isMounted && data) {
                setQuote(data);
            }
            if (isMounted) setLoading(false);
        };
        fetchData();
        return () => { isMounted = false; };
    }, [symbol]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    const formatPercent = (percent) => {
        return `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`;
    };

    const isPositive = quote?.dp >= 0;

    return (
        <div className="glass-card" style={{ padding: '24px', position: 'relative', transition: 'transform 0.2s', cursor: 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold' }}>
                        {symbol[0]}
                    </div>
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', lineHeight: 1 }}>{symbol}</h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>USD</p>
                    </div>
                </div>
                <button
                    onClick={() => onRemove(symbol)}
                    style={{
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        padding: '4px',
                        fontSize: '18px',
                        lineHeight: 1
                    }}
                    title="Remove"
                >
                    ×
                </button>
            </div>

            {loading || !quote ? (
                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', opacity: 0.5 }}>
                    {loading ? 'Loading...' : 'Unavailable'}
                </div>
            ) : (
                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: '600' }}>{formatPrice(quote.c)}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{
                            color: isPositive ? '#10B981' : '#EF4444',
                            fontWeight: '600',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            {isPositive ? '↑' : '↓'} {formatPercent(quote.dp)}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Today</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockCard;
