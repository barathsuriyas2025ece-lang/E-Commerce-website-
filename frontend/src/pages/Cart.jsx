import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Tag, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { couponAPI } from '../services/api';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal, tax, discountAmount, total, appliedCoupon, setAppliedCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    try {
      const res = await couponAPI.validate({ code: couponCode, cartTotal: subtotal });
      if (res.data.success) {
        setAppliedCoupon(res.data.coupon);
        setCouponMsg(res.data.message);
      }
    } catch (err) {
      setCouponMsg(err.response?.data?.message || 'Invalid coupon code');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="glass-panel p-12 text-center text-slate-300 space-y-4 max-w-lg mx-auto my-12">
        <ShoppingBag className="w-16 h-16 text-indigo-400 mx-auto opacity-70" />
        <h2 className="text-2xl font-bold text-white">Your Shopping Cart is Empty</h2>
        <p className="text-sm text-slate-400">Discover our collection and start adding your favorite products!</p>
        <Link to="/shop" className="btn-primary inline-flex">Explore Catalog</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <h1 className="text-3xl font-extrabold text-white">Shopping Cart ({cartItems.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="glass-panel p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img src={item.images?.[0]} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-slate-900 shrink-0" />
                <div>
                  <h3 className="font-bold text-white text-sm line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-indigo-400 font-semibold">₹{item.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                {/* Quantity adjustment */}
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-2.5 py-1 text-slate-300 hover:bg-slate-800">-</button>
                  <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-2.5 py-1 text-slate-300 hover:bg-slate-800">+</button>
                </div>

                <div className="text-sm font-bold text-white">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>

                <button onClick={() => removeFromCart(item._id)} className="p-2 text-slate-400 hover:text-red-400 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="glass-panel p-6 rounded-2xl h-fit space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Order Summary</h2>

          {/* Coupon Form */}
          <form onSubmit={handleApplyCoupon} className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-400" />
              <span>Have a Promo Coupon?</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. SAVE10"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-indigo-500"
              />
              <button type="submit" className="btn-secondary py-1.5 px-3 text-xs">Apply</button>
            </div>
            {couponMsg && <p className="text-xs text-indigo-300">{couponMsg}</p>}
          </form>

          {/* Financial Totals */}
          <div className="space-y-2 text-xs border-t border-slate-800 pt-4">
            <div className="flex justify-between text-slate-400"><span>Subtotal:</span><span>₹{subtotal.toLocaleString()}</span></div>
            {appliedCoupon && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Discount ({appliedCoupon.code}):</span>
                <span>-₹{discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400"><span>Estimated Tax (5%):</span><span>₹{tax.toLocaleString()}</span></div>
            <div className="flex justify-between text-white font-extrabold text-base pt-3 border-t border-slate-800">
              <span>Total:</span>
              <span className="text-indigo-400">₹{total.toLocaleString()}</span>
            </div>
          </div>

          <button onClick={() => navigate('/checkout')} className="btn-primary w-full justify-center text-sm py-3">
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
