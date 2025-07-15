import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MapPin } from 'lucide-react';

const Footer = () => {

  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4 text-center sm:text-left">
            <Link to="/" className="flex justify-center sm:justify-start items-center space-x-3">
              <img src="/gharkul.png" alt="Gharkul Logo" className="h-10 w-10 object-contain" />
              <span className="text-xl font-bold text-white">Gharkul</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner in finding the perfect rental property. We make house hunting simple, fast, and reliable.
            </p>
            <div className="flex justify-center sm:justify-start items-center space-x-2 text-gray-300">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Wakad Road Hinjewadi</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white text-sm transition-colors">Home</a></li>
              <li><a href="/listing" className="text-gray-300 hover:text-white text-sm transition-colors">Listings</a></li>
              {/* <li><a href="/features" className="text-gray-300 hover:text-white text-sm transition-colors">Features</a></li> */}
              <li><a href="/about" className="text-gray-300 hover:text-white text-sm transition-colors">About</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white text-sm transition-colors">Contact</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Property Types */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold">Property Types</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-white text-sm transition-colors">Apartments</li>
              <li className="text-gray-300 hover:text-white text-sm transition-colors">Houses</li>
              <li className="text-gray-300 hover:text-white text-sm transition-colors">Villas</li>
              <li className="text-gray-300 hover:text-white text-sm transition-colors">Plots</li>
              <li className="text-gray-300 hover:text-white text-sm transition-colors">Commercials</li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-white text-sm transition-colors">Help Center</li>
              <li className="text-gray-300 hover:text-white text-sm transition-colors">Privacy Policy</li>
              <li className="text-gray-300 hover:text-white text-sm transition-colors">Terms of Service</li>
              {/* <li className="text-gray-300 hover:text-white text-sm transition-colors">FAQ</li>
              <li className="text-gray-300 hover:text-white text-sm transition-colors">Report Issue</li> */}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        {/* <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300 text-sm">Subscribe to get the latest property listings and updates.</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-600 w-full sm:w-64"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}
      </div>

      {/* Sub Footer */}
      <div className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 text-center md:text-center">
          <p className="text-gray-400 text-sm">© {currentYear} Gharkul. All rights reserved.</p>
        </div>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
