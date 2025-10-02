// src/components/Navbar.tsx - Updated with new theme
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingBag,
  FiHeart,
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { useCart } from "../../context/cartContext";
import { useWishlist } from "../../context/wishlistContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/about", label: "About" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#150027]/95 backdrop-blur-xl border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative w-12 h-12"
            >
          <img src="/src/assets/logo/logo.png" alt="Logo" className="w-10 h-10 object-cover" />  
            </motion.div>
            <span
              className="text-2xl font-bold text-gradient-gold"
              style={{ fontFamily: "var(--font-family-bebas)" }}
            >
              FRESHOFF
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="relative group">
                <span
                  className={`font-medium uppercase tracking-wider transition-all duration-300 ${
                    location.pathname === link.path
                      ? "text-[#FF1493]"
                      : "text-gray-300 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-family-space)" }}
                >
                  {link.label}
                </span>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF1493] to-[#00E5FF]"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-300 hover:text-[#00E5FF] transition-colors"
            >
              <FiSearch className="text-xl" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-300 hover:text-[#00E5FF] transition-colors"
            >
              <FiUser className="text-xl" />
            </motion.button>

            <Link
              to="/wishlist"
              className="relative p-2 text-gray-300 hover:text-[#FF1493] transition-colors"
            >
              <FiHeart className="text-xl" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#FF1493] to-[#E91E63] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative p-2 text-gray-300 hover:text-[#39FF14] transition-colors"
            >
              <FiShoppingBag className="text-xl" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#39FF14] to-[#00FF00] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? (
                <FiX className="text-xl" />
              ) : (
                <FiMenu className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for luxury bags..."
                  className="input-modern pr-12"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-[#FF1493] to-[#9D00FF] text-white rounded-lg hover:shadow-lg hover:shadow-[#FF1493]/30 transition-all">
                  <FiSearch />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4"
            >
              <div className="glass-effect rounded-2xl p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 px-4 rounded-lg transition-all ${
                      location.pathname === link.path
                        ? "bg-gradient-to-r from-[#FF1493]/20 to-[#9D00FF]/20 text-[#FF1493]"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
