import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { searchSymbols } from '../services/stockService';

const StockSearch = ({ onSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const searchTimeoutRef = useRef(null);
    const wrapperRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (!query.trim()) {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }

        setIsSearching(true);
        // Debounce API calls (300ms)
        searchTimeoutRef.current = setTimeout(async () => {
            try {
                const results = await searchSymbols(query);
                setSearchResults(results.slice(0, 5)); // Limit to 5 results
                setShowDropdown(true);
            } catch (err) {
                console.error(err);
            } finally {
                setIsSearching(false);
            }
        }, 300);
    };

    const handleSelect = (symbol) => {
        onSelect(symbol);
        setSearchQuery('');
        setSearchResults([]);
        setShowDropdown(false);
    };


    return (
        <div ref={wrapperRef} style={{ position: 'relative', zIndex: 50, width: '100%' }}>
            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
                <div style={{ paddingLeft: '16px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                    <Search size={18} />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search stocks..."
                    style={{
                        width: '100%',
                        padding: '14px 16px 14px 12px',
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        outline: 'none',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}
                    onFocus={(e) => e.target.parentElement.style.borderColor = 'var(--primary-color)'}
                    onBlur={(e) => e.target.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                />
                {isSearching && (
                    <div style={{ paddingRight: '16px', color: 'var(--text-secondary)' }}>
                        <div className="animate-spin" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary-color)', borderRadius: '50%' }} />
                    </div>
                )}
            </div>

            {/* Dropdown Results */}
            {showDropdown && searchResults.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    right: 0,
                    background: '#1a1f2e', // Solid, dark background for readability
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)', // deep shadow
                    overflow: 'hidden',
                    zIndex: 100
                }}>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {searchResults.map((result) => (
                            <div
                                key={result.symbol}
                                onClick={() => handleSelect(result.symbol)}
                                className="search-result-item"
                                style={{
                                    padding: '12px 16px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        background: 'rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '10px',
                                        fontWeight: 'bold',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        {result.symbol.substring(0, 2)}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', color: 'white', fontSize: '14px' }}>{result.symbol}</div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
                                            {result.description}
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    fontSize: '10px',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text-secondary)',
                                    textTransform: 'uppercase'
                                }}>
                                    {result.type}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

};

export default StockSearch;
