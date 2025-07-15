import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Plus, LogOut } from 'lucide-react';
import { AuthContext } from '../context/Authcontext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/gharkul.png" alt="Gharkul Logo" className="h-10 w-10 object-contain" />
            <span className="text-xl font-bold text-gray-800">Gharkul</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/home"
              className={`font-medium transition-colors ${
                isActive('/') || isActive('/home')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/listing"
              className={`font-medium transition-colors ${
                isActive('/listing')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Listing
            </Link>
            {/* <Link
              to="/features"
              className={`font-medium transition-colors ${
                isActive('/features')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Features
            </Link> */}
            <Link
                to="/subscription"
                className={`font-medium ${
                  isActive('/subscription')
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Subscription
              </Link>
            {/* <Link
              to="/about"
              className={`font-medium transition-colors ${
                isActive('/about')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contact Us
            </Link> */}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/signin"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-blue-600 border border-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm w-fit"
                >
                  <User className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="tracking-wide">My Profile</span>
                </Link>

                <Link
                  to="/postproperty"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Post Property</span>
                </Link>
                <Link
                  to="/postrequirement"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Post Requirement</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/home"
                className={`font-medium ${
                  isActive('/') || isActive('/home')
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/listing"
                className={`font-medium ${
                  isActive('/listing')
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Listing
              </Link>
              {/* <Link
                to="/features"
                className={`font-medium ${
                  isActive('/features')
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link> */}
              <Link
                to="/subscription"
                className={`font-medium ${
                  isActive('/subscription')
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Subscription
              </Link>
              <Link
                to="/about"
                className={`font-medium ${
                  isActive('/about')
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className={`font-medium ${
                  isActive('/contact')
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <div className="flex flex-col space-y-2 pt-3 border-t">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/signin"
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Sign Up</span>
                    </Link>
                  </>
                ) : (
                  <>
                  <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-blue-600 border border-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm w-fit"
                >
                  <User className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="tracking-wide">My Profile</span>
                </Link>
                    <Link
                      to="/postproperty"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 w-fit"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Post Property</span>
                    </Link>
                    <Link
                      to="/postrequirement"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 w-fit"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Post Requirement</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
