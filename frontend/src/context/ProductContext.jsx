import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { productAPI } from '../services/api';
import { sampleProducts } = require ? {} : { sampleProducts: [] };

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      _id: '650000000000000000000001',
      name: 'MacBook Air M3 Pro Edition',
      description: 'Ultra-thin, blistering performance with Apple M3 chip, 16GB Unified Memory, 512GB SSD.',
      price: 114900,
      originalPrice: 129900,
      category: 'Electronics & Laptops',
      brand: 'Apple',
      stock: 15,
      images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'],
      isFeatured: true,
      rating: 4.9,
      numReviews: 48,
    },
    {
      _id: '650000000000000000000002',
      name: 'Asus ROG Strix Gaming Laptop',
      description: 'NVIDIA GeForce RTX 4060, Intel Core i7-13650HX, 16GB DDR5, 1TB SSD.',
      price: 68990,
      originalPrice: 79990,
      category: 'Electronics & Laptops',
      brand: 'ASUS',
      stock: 8,
      images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800'],
      isFeatured: true,
      rating: 4.7,
      numReviews: 32,
    },
    {
      _id: '650000000000000000000003',
      name: 'Sony WH-1000XM5 Wireless Headphones',
      description: 'Industry-leading noise canceling with two processors, 30-hour battery life.',
      price: 26990,
      originalPrice: 34990,
      category: 'Audio & Wearables',
      brand: 'Sony',
      stock: 25,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
      isFeatured: true,
      rating: 4.8,
      numReviews: 89,
    },
    {
      _id: '650000000000000000000004',
      name: 'Nike ZoomX Vaporfly Running Shoes',
      description: 'Engineered for marathons and fast road racing with responsive carbon fiber plate.',
      price: 2899,
      originalPrice: 4999,
      category: 'Apparel & Footwear',
      brand: 'Nike',
      stock: 40,
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
      isFeatured: true,
      rating: 4.6,
      numReviews: 64,
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Background async fetch to sync with remote API without blocking UI
    const syncProducts = async () => {
      try {
        const res = await productAPI.getProducts({});
        if (res.data.success && res.data.products?.length > 0) {
          setProducts(res.data.products);
        }
      } catch (err) {
        // Fallback already pre-loaded for O(1) instant speed
      }
    };
    syncProducts();
  }, []);

  // O(1) Map cache lookup by ID
  const productMap = useMemo(() => {
    const map = new Map();
    products.forEach((p) => map.set(p._id.toString(), p));
    return map;
  }, [products]);

  const getProductById = (id) => productMap.get(id?.toString()) || products[0];

  return (
    <ProductContext.Provider value={{ products, loading, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
