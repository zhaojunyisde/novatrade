import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard'); // Assuming we'll have a dashboard later
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Elements */}
            <div style={{
                position: 'absolute',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '-1'
            }} />

            <div className="glass-card" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Link to="/" style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '-0.5px', textDecoration: 'none', color: 'white' }}>
                        Nova<span className="text-gradient">Trade</span>
                    </Link>
                    <h2 style={{ marginTop: '16px', fontSize: '20px' }}>Welcome back</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Enter your credentials to access your account</p>
                </div>

                {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                            }}
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                            }}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>Sign In</button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
