import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw, CheckCircle, Bot, MessageSquare } from 'lucide-react';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAI } from '../context/AIContext';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { setIsAiOpen, sendMessage } = useAI();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productAPI.getProductById(id);
        if (res.data.success) {
          setProduct(res.data.product);
        }
      } catch (err) {
        console.error('Error loading product details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-12 text-center text-slate-400">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="glass-panel p-12 text-center text-slate-300 space-y-4">
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <button onClick={() => navigate('/shop')} className="btn-primary">Back to Shop</button>
      </div>
    );
  }

  const isLiked = isInWishlist(product._id);

  return (
    <div className="space-y-12 pb-12">
      {/* Product Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Image Gallery */}
        <div className="glass-panel p-6 rounded-3xl space-y-4 bg-slate-900/60">
          <div className="aspect-square rounded-2xl overflow-hidden bg-slate-950">
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
            <span className="badge bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">{product.category}</span>
            <h1 className="text-3xl font-extrabold text-white">{product.name}</h1>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-400 text-sm">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold ml-1 text-white">{product.rating || 4.8}</span>
              </div>
              <span className="text-xs text-slate-400">({product.numReviews || 18} Customer Reviews)</span>
              <span className="text-slate-600">•</span>
              <span className="badge badge-stock">In Stock ({product.stock || 10} units)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-white">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-base text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">{product.description}</p>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold text-slate-300">Quantity:</label>
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-slate-300 hover:bg-slate-800 rounded-l-lg"
                >
                  -
                </button>
                <span className="px-4 py-1 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-slate-300 hover:bg-slate-800 rounded-r-lg"
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
                  isLiked ? 'bg-pink-500 text-white border-pink-500' : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-pink-400'
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
            className="w-full glass-panel p-3.5 rounded-xl border-indigo-500/40 text-indigo-300 flex items-center justify-center gap-2 text-xs font-semibold hover:bg-indigo-950/60 transition"
          >
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>Ask AI Assistant about this product's features</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
