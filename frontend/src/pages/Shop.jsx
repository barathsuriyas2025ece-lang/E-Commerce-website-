import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';

const categoriesList = [
  { id: 'all', name: 'All Categories' },
  { id: 'electronics', name: 'Electronics & Laptops' },
  { id: 'audio', name: 'Audio & Wearables' },
  { id: 'apparel', name: 'Apparel & Footwear' },
  { id: 'home', name: 'Home & Living' },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [maxPrice, setMaxPrice] = useState(150000);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory !== 'all') params.category = selectedCategory;
        if (searchQuery) params.keyword = searchQuery;
        if (maxPrice < 150000) params.maxPrice = maxPrice;
        if (sortBy) params.sort = sortBy;

        const res = await productAPI.getProducts(params);
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (err) {
        console.error('Error fetching catalog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery, maxPrice, sortBy]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 border-slate-800">
        <h1 className="text-3xl font-extrabold text-white">Product Catalog</h1>
        <p className="text-sm text-slate-400 mt-1">Browse our complete collection of gadgets, footwear, and accessories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="glass-panel p-6 rounded-2xl h-fit space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Filter className="w-4 h-4 text-indigo-400" />
            <h2 className="font-bold text-white text-sm">Filters & Search</h2>
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Keyword Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Category</label>
            <div className="space-y-1">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                    selectedCategory === cat.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Max Price:</span>
              <span className="font-bold text-indigo-400">₹{maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="150000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </aside>

        {/* Catalog Section */}
        <main className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="glass-panel p-4 rounded-xl flex items-center justify-between text-xs text-slate-300">
            <div>
              Showing <span className="font-bold text-white">{products.length}</span> products
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <SkeletonLoader count={6} />
          ) : products.length === 0 ? (
            <div className="glass-panel p-12 text-center text-slate-400 space-y-3">
              <p className="text-base font-semibold">No products found matching your filter criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setMaxPrice(150000);
                }}
                className="btn-secondary py-2 px-4 text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
