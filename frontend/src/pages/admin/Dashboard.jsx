import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, ShoppingBag, Package, Users, AlertTriangle, TrendingUp, Shield, Plus, Tag } from 'lucide-react';
import { adminAPI } from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 284950,
    totalOrders: 42,
    totalProducts: 18,
    totalCustomers: 156,
    lowStockAlerts: 3,
    salesData: [
      { month: 'Jan', revenue: 35000 },
      { month: 'Feb', revenue: 48000 },
      { month: 'Mar', revenue: 62000 },
      { month: 'Apr', revenue: 54000 },
      { month: 'May', revenue: 85950 },
    ],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminAPI.getStats();
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error('Error fetching admin statistics:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>Admin Control Panel</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Analytics Overview</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/products" className="btn-primary text-xs py-2 px-4">
            <Plus className="w-3.5 h-3.5" />
            <span>Manage Products</span>
          </Link>
          <Link to="/admin/orders" className="btn-secondary text-xs py-2 px-4">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Fulfill Orders</span>
          </Link>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs">
        <Link to="/admin/dashboard" className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold">Overview</Link>
        <Link to="/admin/products" className="px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white">Products</Link>
        <Link to="/admin/orders" className="px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white">Orders</Link>
        <Link to="/admin/coupons" className="px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white">Coupons</Link>
        <Link to="/admin/users" className="px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white">Users</Link>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Total Revenue</p>
            <h3 className="text-2xl font-extrabold text-white mt-1">₹{stats.totalRevenue.toLocaleString()}</h3>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +18.4% this month
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Total Orders</p>
            <h3 className="text-2xl font-extrabold text-white mt-1">{stats.totalOrders}</h3>
            <span className="text-[11px] text-indigo-300 font-semibold mt-1">4 pending fulfillment</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Catalog Products</p>
            <h3 className="text-2xl font-extrabold text-white mt-1">{stats.totalProducts}</h3>
            <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1 mt-1">
              <AlertTriangle className="w-3 h-3" /> {stats.lowStockAlerts} low stock alerts
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Registered Users</p>
            <h3 className="text-2xl font-extrabold text-white mt-1">{stats.totalCustomers}</h3>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1">+12 new this week</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Visual Revenue Bar Graph */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h2 className="text-lg font-bold text-white">Monthly Sales Breakdown</h2>
        <div className="h-44 flex items-end justify-between gap-4 pt-8 px-4 border-b border-slate-800">
          {stats.salesData.map((d, i) => {
            const heightPercent = Math.round((d.revenue / 90000) * 100);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] text-indigo-300 font-bold opacity-0 group-hover:opacity-100 transition">
                  ₹{(d.revenue / 1000).toFixed(0)}k
                </span>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-lg transition-all duration-500 group-hover:from-indigo-500 group-hover:to-pink-500"
                ></div>
                <span className="text-xs text-slate-400 font-semibold">{d.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
