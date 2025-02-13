const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* About Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Jai Hanuman Furniture</h3>
            <p className="text-gray-400">
              Crafting your perfect space with bespoke furniture designs. We bring comfort, style, and functionality to your home.
            </p>
            
            {/* Social Icons */}
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="https://www.facebook.com/jaihanuman.furniture.18" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/JHFinterior" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/jaihanumanfurniture" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="/about" className="hover:text-indigo-600">About Us</a></li>
              <li><a href="/products" className="hover:text-indigo-600">Products</a></li>
              <li><a href="/gallery" className="hover:text-indigo-600">Gallery</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <p className="text-gray-400">
              Feel free to reach out with any inquiries or requests. We're here to help you create your dream space!
            </p>
            <ul className="space-y-4 text-gray-400">
            <li>
  📞 <a href="tel:+919986423709" className="text-indigo-600 hover:underline">+91 9986423709</a>
</li>
<li>
  📞 <a href="tel:+919886832809" className="text-indigo-600 hover:underline">+91 9886832809</a>
</li>

              <li>📜 GSTIN: 29AAMFJ6229Q1ZF</li>
              <li>
                📧 <a href="mailto:jaihanumanfurniture@gmail.com" className="text-indigo-600 hover:underline">
                  jaihanumanfurniture@gmail.com
                </a>
              </li>
              <li>
                🏢 <a href="https://www.google.com/maps/place/JAI+HANUMAN+FURNITURE-INTERIOR+IN+CLAASIC+LAYOUT+Bengaluru+Urban,+Karnataka,+560068/@12.8777144,77.6204399,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae156929a77e8d:0xd49f04215044761f!8m2!3d12.8777144!4d77.6230148!16s%2Fg%2F11gs8f3r93?entry=ttu&g_ep=EgoyMDI1MDIxMS4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
                  target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  VJH9+4JM, Classic Paradise Layout, Begur, Bengaluru, Karnataka 560068
                </a>
              </li>
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
