import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Sparkles, Shield, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  // Clean empty inputs (no default pre-filled text)
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
      if (email.toLowerCase().includes('admin') || email.toLowerCase() === 'barathsuriya.s2025ece@sece.ac.in') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } else {
      setError(res.message);
    }
  };

  const handleDemoFill = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="max-w-md mx-auto my-12 space-y-6">
      <div className="glass-panel p-8 rounded-3xl space-y-6 bg-white border border-slate-200 shadow-sm">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Sign In to Account</h1>
          <p className="text-xs text-slate-500">Enter your email and password below</p>
        </div>

        {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-700 font-bold">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g. barathsuriya.s2025ece@sece.ac.in"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 mt-1 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="text-slate-700 font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 mt-1 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm py-2.5">
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Fill Helper Buttons */}
        <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
          <p className="text-slate-500 font-bold text-center">Fill Credentials Helper:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoFill('customer@example.com', 'password123')}
              className="btn-secondary py-2 justify-center text-xs text-indigo-700 bg-indigo-50 border-indigo-200 hover:bg-indigo-100"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Customer Credentials</span>
            </button>

            <button
              onClick={() => handleDemoFill('barathsuriya.s2025ece@sece.ac.in', 'barath12345')}
              className="btn-secondary py-2 justify-center text-xs text-amber-800 bg-amber-50 border-amber-200 hover:bg-amber-100"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Credentials</span>
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 pt-2">
          Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
