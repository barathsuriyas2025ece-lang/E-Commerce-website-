import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Package, Search } from 'lucide-react';
import { productAPI } from '../../services/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics & Laptops',
    brand: 'Generic',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800',
  });

  const fetchProducts = async () => {
    try {
      const res = await productAPI.getProducts({});
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error('Error fetching admin products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await productAPI.createProduct({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: [formData.imageUrl],
      });

      if (res.data.success) {
        setIsAddModalOpen(false);
        setFormData({
          name: '',
          description: '',
          price: '',
          category: 'Electronics & Laptops',
          brand: 'Generic',
          stock: 10,
          imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800',
        });
        fetchProducts();
      }
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(id);
        fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Product Management</h1>
          <p className="text-xs text-slate-400">Add, edit, or remove store products from catalog</p>
        </div>

        <button onClick={() => setIsAddModalOpen(true)} className="btn-primary text-xs py-2.5 px-4">
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="glass-panel rounded-2xl overflow-x-auto text-xs text-slate-200">
        <table className="w-full text-left">
          <thead className="bg-slate-900/80 uppercase text-[10px] text-slate-400 font-bold border-b border-slate-800">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-slate-900/40 transition">
                <td className="p-4 flex items-center gap-3">
                  <img src={p.images?.[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-slate-950" />
                  <span className="font-bold text-white line-clamp-1">{p.name}</span>
                </td>
                <td className="p-4 text-indigo-300 font-semibold">{p.category}</td>
                <td className="p-4 font-bold text-slate-100">₹{p.price?.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`badge ${p.stock < 5 ? 'bg-red-500/20 text-red-300' : 'badge-stock'}`}>
                    {p.stock} units
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDeleteProduct(p._id)} className="p-1.5 text-slate-400 hover:text-red-400 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg p-6 rounded-2xl space-y-4 text-xs text-slate-200">
            <h2 className="text-lg font-bold text-white">Create New Catalog Product</h2>
            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="text-slate-300 font-medium">Product Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 mt-1 text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium">Price (₹)</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 mt-1 text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Stock Count</label>
                  <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} required className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 mt-1 text-white focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div>
                <label className="text-slate-300 font-medium">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 mt-1 text-white focus:outline-none focus:border-indigo-500">
                  <option>Electronics & Laptops</option>
                  <option>Audio & Wearables</option>
                  <option>Apparel & Footwear</option>
                  <option>Home & Living</option>
                </select>
              </div>
              <div>
                <label className="text-slate-300 font-medium">Image URL</label>
                <input type="text" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} required className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 mt-1 text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="text-slate-300 font-medium">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows={3} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 mt-1 text-white focus:outline-none focus:border-indigo-500"></textarea>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
