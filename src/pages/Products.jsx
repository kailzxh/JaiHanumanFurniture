// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { NavLink, useParams } from 'react-router-dom';
// import { supabase } from '../lib/supabase';

// const ProductCard = ({ product }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     className="bg-white rounded-lg shadow-md overflow-hidden group"
//   >
//     <div className="relative">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
//       />
//     </div>
//     <div className="p-4">
//       <div className="text-sm text-gray-500 mb-1">{product.category}</div>
//       <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
//       <div className="flex items-center justify-between">
//         <span className="text-xl font-bold">₹{product.price}</span>
//         <NavLink to="/#Get_Quote" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200">
//           Order Now
//         </NavLink>
//       </div>
//     </div>
//   </motion.div>
// );

// const Products = () => {
//   const { category } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch products from Supabase
//   useEffect(() => {
//     const fetchProducts = async () => {
//       let { data, error } = await supabase.from('products').select('*');

//       if (error) {
//         console.error('Error fetching products:', error);
//       } else {
//         setProducts(data);
//       }
//       setLoading(false);
//     };

//     fetchProducts();
//   }, []);

//   // Filter products by category
//   const filteredProducts = category
//     ? products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
//     : products;

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>

//       {/* Category Filters */}
//       <div className="flex flex-wrap gap-4 mb-8">
//         {['All', 'Living Room', 'Bedroom', 'Office', 'Kitchen'].map((cat) => (
//           <NavLink
//             key={cat}
//             to={cat === 'All' ? '/products' : `/products/${cat.toLowerCase()}`}
//             className={({ isActive }) =>
//               `px-4 py-2 rounded-md transition-colors duration-200 ${
//                 isActive ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
//               }`
//             }
//           >
//             {cat}
//           </NavLink>
//         ))}
//       </div>

//       {loading ? (
//         <p className="text-center">Loading products...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
//           ) : (
//             <p>No products found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [mediaIndex, setMediaIndex] = useState(0);
  const images = JSON.parse(product.images || '[]');

  const navigateMedia = (direction) => {
    let newIndex = direction === 'prev' ? mediaIndex - 1 : mediaIndex + 1;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    setMediaIndex(newIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-md overflow-hidden group"
    >
      <div className="relative bg-gray-200 flex items-center justify-center overflow-hidden h-64">
        {images.length > 0 && (
          <img
            src={images[mediaIndex]}
            alt={product.name}
            className="w-auto h-full max-h-64 object-contain bg-gray-200"
          />
        )}
        {images.length > 1 && (
          <>
            <button
              onClick={() => navigateMedia('prev')}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateMedia('next')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
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
};

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = ['All', 'Living Room', 'Bedroom', 'Office', 'Kitchen'];

  useEffect(() => {
    const fetchProducts = async () => {
      let { data, error } = await supabase.from('products').select('id, name, price, images, category, created_at');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = category && category !== 'all'
    ? products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>
      
      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((cat) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;

/* SQL Query to Insert Multiple Images into Products Table */
/*
ALTER TABLE products RENAME COLUMN image TO legacy_image; 
ALTER TABLE products ADD COLUMN images TEXT;

UPDATE products SET images = jsonb_build_array(legacy_image) WHERE legacy_image IS NOT NULL;

INSERT INTO products (name, category, price, images) VALUES
('Sofa Set', 'Living Room', 25000, '["image1.jpg", "image2.jpg", "image3.jpg"]'),
('Bed Frame', 'Bedroom', 18000, '["image4.jpg", "image5.jpg"]');
*/
