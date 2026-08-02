import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Scale } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAI } from '../context/AIContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const { setActiveCompareItems } = useAI();

  const isLiked = isInWishlist(product._id);

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="glass-panel group overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
      {/* Product Image & Badges */}
      <div className="relative aspect-square overflow-hidden bg-slate-900/50">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isFeatured && <span className="badge badge-featured">Featured</span>}
          {discount && <span className="badge bg-red-500 text-white font-bold">{discount}% OFF</span>}
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition ${
              isLiked ? 'bg-pink-500 text-white' : 'bg-slate-900/70 text-slate-300 hover:text-pink-400'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              setActiveCompareItems([product]);
            }}
            className="w-9 h-9 rounded-full bg-slate-900/70 text-slate-300 hover:text-indigo-400 backdrop-blur-md flex items-center justify-center transition"
            title="Compare Product"
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">{product.category}</span>
          <Link to={`/product/${product._id}`}>
            <h3 className="text-base font-semibold text-slate-100 hover:text-indigo-300 transition line-clamp-1 mt-0.5">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold ml-1 text-slate-200">{product.rating || 4.5}</span>
            </div>
            <span className="text-[11px] text-slate-400">({product.numReviews || 12} reviews)</span>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div>
            <div className="text-lg font-bold text-slate-100">
              ₹{product.price.toLocaleString()}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="btn-primary py-2 px-3 text-xs"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
