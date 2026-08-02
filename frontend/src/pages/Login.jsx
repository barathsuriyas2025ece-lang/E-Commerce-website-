import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Sparkles, Shield, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
  };

  const handleDemoLogin = async (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    const res = await login(demoEmail, demoPass);
    if (res.success) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 space-y-6">
      <div className="glass-panel p-8 rounded-3xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-xs text-slate-400">Sign in to your NexusMart account</p>
        </div>

        {error && <div className="p-3 bg-red-500/20 border border-red-500/40 text-red-300 text-xs rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g. customer@example.com"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 mt-1 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 mt-1 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm py-2.5">
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Instant Demo Accounts Buttons */}
        <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
          <p className="text-slate-400 font-semibold text-center">Quick Demo Login Shortcuts:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoLogin('customer@example.com', 'password123')}
              className="btn-secondary py-2 justify-center text-xs text-indigo-300"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Customer Demo</span>
            </button>

            <button
              onClick={() => handleDemoLogin('admin@example.com', 'admin123')}
              className="btn-secondary py-2 justify-center text-xs text-amber-300"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400 pt-2">
          Don't have an account? <Link to="/register" className="text-indigo-400 hover:underline">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
