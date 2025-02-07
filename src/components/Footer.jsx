// Home.jsx or Footer.jsx
const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Jai Hanuman Furniture</h3>
              <p className="text-gray-400">Crafting your perfect space with bespoke furniture designs. We bring comfort, style, and functionality to your home.</p>
              <div className="flex space-x-6">
                {/* Social Icons */}
                <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                  <i className="fab fa-facebook-f"></i> {/* You can use Font Awesome or other icon libraries */}
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
  
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Quick Links</h3>
              <ul className="space-y-4 text-gray-400">
                <li><a href="/about" className="hover:text-indigo-600">About Us</a></li>
                <li><a href="/products" className="hover:text-indigo-600">Products</a></li>
                <li><a href="/contact" className="hover:text-indigo-600">Contact</a></li>
                <li><a href="/privacy" className="hover:text-indigo-600">Privacy Policy</a></li>
              </ul>
            </div>
  
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <p className="text-gray-400">Feel free to reach out with any inquiries or requests. We're here to help you create your dream space!</p>
              <ul className="space-y-4 text-gray-400">
                <li>📞 +1 (555) 123-4567</li>
                <li>📧 contact@jaihanumanfurniture.com</li>
                <li>🏢 1234 Street, City, Country</li>
              </ul>
            </div>
          </div>
  
          {/* Footer Bottom Section */}
          <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-400">
            <p>&copy; 2025 Jai Hanuman Furniture. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  