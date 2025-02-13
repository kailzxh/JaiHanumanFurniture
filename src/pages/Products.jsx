import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ProductCard = ({ product }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-lg shadow-md overflow-hidden group"
  >
    <div className="relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <div className="text-sm text-gray-500 mb-1">{product.category}</div>
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">₹{product.price}</span>
        <NavLink to="/#Get_Quote" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200">
          Order Now
        </NavLink>
      </div>
    </div>
  </motion.div>
);

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      let { data, error } = await supabase.from('products').select('*');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Filter products by category
  const filteredProducts = category
    ? products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {['All', 'Living Room', 'Bedroom', 'Office', 'Kitchen'].map((cat) => (
          <NavLink
            key={cat}
            to={cat === 'All' ? '/products' : `/products/${cat.toLowerCase()}`}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            {cat}
          </NavLink>
        ))}
      </div>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
