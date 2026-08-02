import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Laptop, Headphones, Shirt, Home as HomeIcon, Zap, Bot } from 'lucide-react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { useAI } from '../context/AIContext';

const categories = [
  { name: 'Electronics & Laptops', slug: 'electronics', icon: Laptop, color: 'from-blue-500 to-indigo-600' },
  { name: 'Audio & Wearables', slug: 'audio', icon: Headphones, color: 'from-purple-500 to-pink-600' },
  { name: 'Apparel & Footwear', slug: 'apparel', icon: Shirt, color: 'from-amber-500 to-orange-600' },
  { name: 'Home & Living', slug: 'home', icon: HomeIcon, color: 'from-emerald-500 to-teal-600' },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setIsAiOpen, sendMessage } = useAI();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await productAPI.getProducts({ featured: 'true' });
        if (res.data.success) {
          setFeaturedProducts(res.data.products);
        }
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 sm:p-14 text-white shadow-xl">
        {/* Decorative Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-200 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>Next-Gen Enterprise MERN Storefront</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Shop Smarter with <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">AI Intelligence</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed">
            Discover curated electronics, luxury apparel, and wearables. Ask our floating AI shopping assistant to compare products, match your budget, and auto-apply discount coupons!
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/shop" className="btn-primary text-sm py-3 px-6">
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                setIsAiOpen(true);
                sendMessage("Suggest gaming laptops under ₹70,000", featuredProducts);
              }}
              className="btn-secondary text-sm py-3 px-6 border-white/20 text-white hover:bg-white/10"
            >
              <Bot className="w-4 h-4 text-indigo-300" />
              <span>Ask AI for Laptops</span>
            </button>
          </div>
        </div>
      </section>

      {/* Category Quick Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Shop by Category</h2>
            <p className="text-xs text-slate-500">Explore items tailored to your lifestyle</p>
          </div>
          <Link to="/shop" className="text-xs font-bold text-indigo-600 hover:underline">View All →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                to={`/shop?category=${cat.slug}`}
                className="glass-panel p-6 group hover:-translate-y-1 transition duration-300 flex items-center justify-between bg-white border border-slate-200 shadow-sm hover:shadow-md"
              >
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition text-base">{cat.name}</h3>
                  <p className="text-xs text-slate-500">Browse Catalog</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.color} flex items-center justify-center shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products Catalog */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>Trending & Featured Products</span>
              <Zap className="w-5 h-5 text-amber-500 fill-current" />
            </h2>
            <p className="text-xs text-slate-500">Top customer picks with high ratings & fast delivery</p>
          </div>
          <Link to="/shop" className="btn-secondary py-2 px-4 text-xs">Browse Shop</Link>
        </div>

        {loading ? (
          <SkeletonLoader count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* AI Capabilities Promo Section */}
      <section className="glass-panel p-8 sm:p-12 rounded-3xl bg-white border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <span className="badge bg-indigo-50 text-indigo-700 border border-indigo-200">Action-Oriented AI</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Experience AI Voice & Action Shopping</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our floating assistant doesn't just talk — it takes actions for you! Compare specs, add items to cart, track packages, and apply promo codes through voice or text commands.
          </p>
          <button onClick={() => setIsAiOpen(true)} className="btn-primary text-sm py-2.5 px-6">
            <Bot className="w-4 h-4" />
            <span>Launch AI Assistant</span>
          </button>
        </div>
        <div className="w-full md:w-80 glass-panel p-6 bg-slate-50 border-slate-200 shadow-sm rounded-2xl text-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-700 font-bold">
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>Try these AI Prompts:</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-medium cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition" onClick={() => { setIsAiOpen(true); sendMessage("Compare first two laptops"); }}>
            "Compare the first two laptops"
          </div>
          <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-medium cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition" onClick={() => { setIsAiOpen(true); sendMessage("Apply coupon SAVE10"); }}>
            "Apply coupon SAVE10 to my cart"
          </div>
          <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-medium cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition" onClick={() => { setIsAiOpen(true); sendMessage("Where is my order?"); }}>
            "Where is my order #10231?"
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
