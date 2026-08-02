import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle2, Clock, MapPin, ExternalLink } from 'lucide-react';
import { orderAPI } from '../services/api';

const statusSteps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderAPI.getMyOrders();
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <div className="glass-panel p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 border-slate-800">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Package className="w-8 h-8 text-indigo-400" />
          <span>My Orders & Shipment Tracking</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">Track live order statuses, courier details, and estimated arrival times.</p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading your orders...</div>
      ) : orders.length === 0 ? (
        <div className="glass-panel p-12 text-center text-slate-400">No orders placed yet. Explore our catalog!</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const currentStepIdx = statusSteps.indexOf(order.orderStatus) >= 0 ? statusSteps.indexOf(order.orderStatus) : 1;

            return (
              <div key={order._id} className="glass-panel p-6 rounded-2xl space-y-6 border-slate-800">
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 text-xs gap-4">
                  <div>
                    <span className="text-slate-400">Order ID: </span>
                    <span className="font-mono font-bold text-indigo-300">#{order._id.toString().slice(-6)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Courier: </span>
                    <span className="font-semibold text-slate-200">{order.courierName || 'Express Logistics'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Tracking ID: </span>
                    <span className="font-mono font-semibold text-amber-400">{order.trackingNumber || 'TRK-98471203'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Total: </span>
                    <span className="font-bold text-white text-sm">₹{order.totalPrice?.toLocaleString()}</span>
                  </div>
                </div>

                {/* Progress Status Timeline */}
                <div className="py-2">
                  <div className="flex justify-between items-center relative max-w-xl mx-auto">
                    {statusSteps.map((step, idx) => {
                      const isDone = idx <= currentStepIdx;
                      return (
                        <div key={step} className="flex flex-col items-center z-10 space-y-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${isDone ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
                            {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          <span className={`text-[11px] font-semibold ${isDone ? 'text-indigo-300' : 'text-slate-500'}`}>{step}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3 pt-2">
                  {order.orderItems?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-slate-900/60 p-3 rounded-xl">
                      <img src={item.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800'} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-slate-950" />
                      <div className="flex-1 text-xs">
                        <h4 className="font-bold text-white">{item.name}</h4>
                        <p className="text-slate-400">Qty: {item.quantity} × ₹{item.price?.toLocaleString()}</p>
                      </div>
                      <div className="text-xs font-bold text-slate-200">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
