import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Bot } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAI } from '../context/AIContext';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { setIsAiOpen, sendMessage } = useAI();

  if (!product) {
    return (
      <div className="glass-panel p-12 text-center text-slate-700 space-y-4 max-w-md mx-auto my-12 bg-white border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Product Not Found</h2>
        <button onClick={() => navigate('/shop')} className="btn-primary">Back to Shop</button>
      </div>
    );
  }

  const isLiked = isInWishlist(product._id);

  return (
    <div className="space-y-12 pb-16">
      {/* Product Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Image Gallery */}
        <div className="glass-panel p-6 rounded-3xl space-y-4 bg-white border border-slate-200 shadow-sm">
          <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Details & Buying Controls */}
        <div className="space-y-6">
          <div>
            <span className="badge bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">{product.category}</span>
            <h1 className="text-3xl font-extrabold text-slate-900">{product.name}</h1>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-500 text-sm">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold ml-1 text-slate-900">{product.rating || 4.8}</span>
              </div>
              <span className="text-xs text-slate-500">({product.numReviews || 18} Customer Reviews)</span>
              <span className="text-slate-300">•</span>
              <span className="badge badge-stock">In Stock ({product.stock || 10} units)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-slate-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-base text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold text-slate-700">Quantity:</label>
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-slate-700 hover:bg-slate-200 rounded-l-lg font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1 text-xs font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-slate-700 hover:bg-slate-200 rounded-r-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => addToCart(product, quantity)}
                className="btn-primary py-3 px-8 text-sm flex-1 justify-center"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-full border transition ${
                  isLiked ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-slate-700 border-slate-200 hover:text-pink-600 shadow-sm'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Ask AI about this product */}
          <button
            onClick={() => {
              setIsAiOpen(true);
              sendMessage(`What are the key advantages and alternative recommendations for ${product.name}?`, [product]);
            }}
            className="w-full glass-panel p-3.5 rounded-xl border-indigo-200 text-indigo-700 bg-indigo-50/50 flex items-center justify-center gap-2 text-xs font-bold hover:bg-indigo-100/50 transition"
          >
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>Ask AI Assistant about this product's features</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
