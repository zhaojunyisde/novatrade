import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
    <nav style={{
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 100,
        background: 'rgba(3, 7, 18, 0.8)',
        backdropFilter: 'blur(10px)'
    }}>
        <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
            Nova<span className="text-gradient">Trade</span>
        </Link>
        <div style={{ display: 'flex', gap: '32px', fontSize: '14px', fontWeight: '500' }}>
            <a href="/#markets">Markets</a>
            <a href="/#features">Exchange</a>
            <a href="/#learn">Learn</a>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/login">
                <button style={{ background: 'transparent', color: 'white', fontWeight: '600', padding: '0 12px' }}>Log In</button>
            </Link>
            <Link to="/signup">
                <button className="btn-primary" style={{ padding: '8px 24px', fontSize: '14px' }}>Sign Up</button>
            </Link>
        </div>
    </nav>
);

export default NavBar;
