import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-[60] transition-all duration-300 bg-brand-cream/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 @lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer group">
            <img src="/logo.png" alt="WanderOn" className="h-14 @@md:h-16 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>

          <div className="hidden @@lg:flex space-x-8 items-center font-display font-medium text-sm text-gray-600">
            <Link to="/search" className="hover:text-brand-cyan transition-colors">Trips</Link>
            <a href="#" className="hover:text-brand-cyan transition-colors">Corporate</a>
            <a href="#" className="hover:text-brand-cyan transition-colors">Blogs</a>
            <a href="#" className="hover:text-brand-cyan transition-colors">About</a>
          </div>

          <div className="hidden @@md:flex items-center space-x-6 font-display font-semibold text-sm">
            <Link to="/profile" className="text-gray-600 hover:text-brand-cyan transition-colors">Log In</Link>
            <button className="bg-brand-dark text-white px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:bg-brand-cyan hover:-translate-y-0.5 transition-all">
              Submit Enquiry
            </button>
          </div>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="@@lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <i className={`fa-solid ${mobileMenu ? 'fa-xmark' : 'fa-bars'} text-lg text-gray-700`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="@@lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4 font-display font-semibold text-sm">
              <Link to="/search" className="block text-gray-700 hover:text-brand-cyan py-2" onClick={() => setMobileMenu(false)}>Trips</Link>
              <a href="#" className="block text-gray-700 hover:text-brand-cyan py-2">Corporate</a>
              <a href="#" className="block text-gray-700 hover:text-brand-cyan py-2">Blogs</a>
              <a href="#" className="block text-gray-700 hover:text-brand-cyan py-2">About</a>
              <hr className="border-gray-100" />
              <Link to="/profile" className="block text-gray-700 hover:text-brand-cyan py-2" onClick={() => setMobileMenu(false)}>Log In</Link>
              <button className="w-full bg-brand-dark text-white px-6 py-3 rounded-full shadow-lg hover:bg-brand-cyan transition-all text-center">
                Submit Enquiry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}


