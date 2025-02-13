import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Star, Truck, Shield, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase'; 
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const FeaturedCategory = ({ image, title, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeIn}
      transition={{ duration: 0.6, delay }}
      className="relative group cursor-pointer"
    >
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="flex items-center mt-2 text-sm">
          Shop Now <ArrowRight className="ml-2 h-4 w-4" />
        </p>
      </div>
    </motion.div>
  );
};

const Feature = ({ Icon, title, description }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeIn}
    className="flex flex-col items-center text-center p-6"
  >
    <div className="rounded-full bg-indigo-100 p-3 mb-4">
      <Icon className="h-6 w-6 text-indigo-600" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default function Home() {
  // Quote form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requirements, setRequirements] = useState('');
  // Address form states
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [stateAddress, setStateAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  const handleQuoteSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data, error } = await supabase.from('quotes').insert([
        {
          name,
          email,
          phone,
          requirements,
          street_address: streetAddress, // Correct field name
          city,
          district,
          state: stateAddress, // Correct field name
          created_at: new Date(),
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      toast.success('Your quote request has been submitted!');
      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setRequirements('');
      setStreetAddress('');
      setCity('');
      setDistrict('');
      setStateAddress('');
    } catch (error) {
      toast.error('Failed to submit quote request: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen"
      >
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="../public/images/maincoursal.avif"
            alt="Modern living room"
          />
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Crafting Your Perfect Space
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 mb-8"
            >
              Discover handcrafted furniture that transforms your home into a masterpiece
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg transition-all duration-300 transform hover:scale-105"
              >
                Explore Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900"
            >
              Why Choose Us
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Feature
              Icon={Star}
              title="Premium Quality"
              description="Handcrafted with the finest materials for lasting beauty"
            />
            <Feature
              Icon={Truck}
              title="Free Shipping"
              description="Free delivery on all orders"
            />
            <Feature
              Icon={Shield}
              title="10 Year Warranty"
              description="Every piece comes with our quality guarantee"
            />
            <Feature
              Icon={Clock}
              title="24/7 Support"
              description="Our team is here to help you anytime"
            />
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-gray-900 text-center mb-12"
        >
          Featured Collections
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/products/Living Room" >
          <FeaturedCategory
            title="Living Room"
            image="/images/livingrooms.jpg"
            delay={0.2}
          />
          </Link>
          <Link to="/products/bedroom" >
          <FeaturedCategory
            title="Bedroom"
            image="/images/bedroom.jpg"
            delay={0.4}
          />
          </Link>
          <Link to="/products/kitchen" >
          <FeaturedCategory
            title="Kitchen"
            image="/images/Kitchen.jpg"
            delay={0.6}
          />
          </Link>
          
        </div>
      </div>

      {/* Get a Quote Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="bg-gray-100 py-16"
      >
        <div id="Get_Quote" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get a Quote
            </h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below, and we'll get back to you with a custom quote for your project.
            </p>
            <form onSubmit={handleQuoteSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Describe your requirements"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />

                {/* Address Section */}
                <div className="flex flex-col gap-4">
                  <textarea
                    placeholder="Enter your street address (e.g., house no, street name)"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="District"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={stateAddress}
                      onChange={(e) => setStateAddress(e.target.value)}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  {loading ? 'Submitting...' : 'Submit Quote'}
                </button>
              </div>
            </form>
          </div>
          
        
      
        </div>
        
      </motion.div>
      <div>
        <Footer/>
      </div>
    </div>
    
  );
}
