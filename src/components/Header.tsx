// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ShoppingCart, User, Menu, X } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { FaWhatsapp } from "react-icons/fa";

// export function Header() {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
//   const { user, signOut } = useAuth();
//   const navigate = useNavigate();

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       navigate('/');
//     } catch (error) {
//       console.error('Error during sign-out:', error);
//     }
//   };

//   return (
//     <header className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           <div className="flex items-center space-x-2">
//             <img src="../../images/logoo.webp" alt="Logo" className="h-10 w-10 rounded-full" />
//             <Link to="/" className="text-2xl font-bold text-gray-900">
//               Jai Hanuman Furniture
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             <Link to="/" className="text-gray-700 hover:text-gray-900">
//               Home
//             </Link>
//             <Link to="/products" className="text-gray-700 hover:text-gray-900">
//               Products
//             </Link>
//             <Link to="/about" className="text-gray-700 hover:text-gray-900">
//               About
//             </Link>
//             <Link
//               to="https://wa.me/9986423709?text=Hi"
//               className="text-gray-700 hover:text-gray-900 text-2xl"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaWhatsapp />
//             </Link>
//           </nav>

//           {/* Desktop Actions */}
//           <div className="hidden md:flex items-center space-x-4">
//             {user ? (
//               <div className="relative group">
//                 <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
//                   <User className="h-6 w-6" />
//                 </button>
//                 <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                   <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                     Profile
//                   </Link>
//                   <button
//                     onClick={handleSignOut}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Sign Out
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//               >
//                 Sign In
//               </Link>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-gray-700 hover:text-gray-900"
//             >
//               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <Link
//               to="/"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
//             >
//               Home
//             </Link>
//             <Link
//               to="/products"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
//             >
//               Products
//             </Link>
//             <Link
//               to="/about"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
//             >
//               About
//             </Link>
//             <Link
//               to="https://wa.me/9986423709?text=Hi"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Whatsapp
//             </Link>

//             {user ? (
//               <>
//                 <Link
//                   to="/profile"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
//                 >
//                   Profile
//                 </Link>

//                 <button
//                   onClick={handleSignOut}
//                   className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
//                 >
//                   Sign Out
//                 </button>
//               </>
//             ) : (
//               <Link
//                 to="/login"
//                 className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
//               >
//                 Sign In
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { FaWhatsapp } from "react-icons/fa";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="../../images/logoo.webp" alt="Logo" className="h-10 w-10 rounded-full" />
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Jai Hanuman Furniture
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-gray-900">
              Products
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-gray-900">
              Gallery
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link
  to="https://wa.me/919986423709?text=Hi"
  className="text-green-500 hover:text-green-600 text-2xl transition duration-200"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaWhatsapp />
</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                {/* User Icon */}
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                >
                  <User className="h-6 w-6" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/gallery"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
  to="https://wa.me/919986423709?text=Hi"
  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-white bg-green-500 hover:bg-green-600 transition duration-200"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => setIsMenuOpen(false)}
>
  <i className="fab fa-whatsapp text-lg"></i>
  <span>WhatsApp</span>
</Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
