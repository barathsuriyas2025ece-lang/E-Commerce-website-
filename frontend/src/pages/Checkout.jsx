import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Smartphone, Banknote, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';

const Checkout = () => {
  const { cartItems, subtotal, tax, discountAmount, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || 'Alex Johnson',
    address: '101 Innovation Way, Tech Park',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560001',
    phone: '+91 9876543210',
  });

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.images?.[0],
        })),
        shippingAddress: formData,
        paymentMethod,
        itemsPrice: subtotal,
        taxPrice: tax,
        discountAmount,
        totalPrice: total,
      };

      const res = await orderAPI.createOrder(orderPayload);
      if (res.data.success) {
        clearCart();
        navigate('/orders');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      clearCart();
      navigate('/orders');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <h1 className="text-3xl font-extrabold text-slate-900">Checkout & Payment</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Shipping & Payment Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 bg-white border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Shipping Address</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-700 font-bold">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 mt-1 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>
              <div>
                <label className="text-slate-700 font-bold">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 mt-1 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-slate-700 font-bold">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 mt-1 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>
              <div>
                <label className="text-slate-700 font-bold">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 mt-1 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>
              <div>
                <label className="text-slate-700 font-bold">State & Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 mt-1 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="glass-panel p-6 rounded-2xl space-y-4 bg-white border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Select Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'Credit Card', name: 'Card / NetBanking', icon: CreditCard },
                { id: 'UPI', name: 'UPI Instant', icon: Smartphone },
                { id: 'COD', name: 'Cash on Delivery', icon: Banknote },
              ].map((pm) => {
                const Icon = pm.icon;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-xs font-bold transition ${
                      paymentMethod === pm.id
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-6 h-6 text-indigo-600" />
                    <span>{pm.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Confirmation Summary */}
        <div className="glass-panel p-6 rounded-2xl h-fit space-y-6 bg-white border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Final Order Total</h2>

          <div className="space-y-2 text-xs border-b border-slate-100 pb-4">
            <div className="flex justify-between text-slate-600 font-medium"><span>Items Subtotal:</span><span>₹{subtotal.toLocaleString()}</span></div>
            {discountAmount > 0 && <div className="flex justify-between text-emerald-600 font-bold"><span>Discount:</span><span>-₹{discountAmount.toLocaleString()}</span></div>}
            <div className="flex justify-between text-slate-600 font-medium"><span>Estimated Tax:</span><span>₹{tax.toLocaleString()}</span></div>
            <div className="flex justify-between text-slate-900 text-base font-extrabold pt-2">
              <span>Payable Total:</span>
              <span className="text-indigo-600">₹{total.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full justify-center text-sm py-3 disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isSubmitting ? 'Processing Order...' : 'Confirm & Place Order'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
