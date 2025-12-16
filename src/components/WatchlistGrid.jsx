import React from 'react';
import StockCard from './StockCard';

const WatchlistGrid = ({ wishlist, onRemove }) => {
    if (wishlist.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📉</div>
                <h3>Your watchlist is empty</h3>
                <p>Search above to start tracking stocks.</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {wishlist.map((symbol) => (
                <StockCard key={symbol} symbol={symbol} onRemove={onRemove} />
            ))}
        </div>
    );
};

export default WatchlistGrid;

