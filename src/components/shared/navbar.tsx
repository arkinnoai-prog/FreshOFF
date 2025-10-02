// src/components/Navbar.tsx
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
          ? "bg-cyber-black/95 backdrop-blur-xl border-b border-neon-pink/20 py-4"
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
              <div className="absolute inset-0 bg-neon-pink rounded-lg opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
              <div className="relative w-full h-full bg-gradient-to-br from-neon-pink to-electric-purple rounded-lg flex items-center justify-center">
                <FiShoppingBag className="text-white text-xl" />
              </div>
            </motion.div>
            <span
              className="font-audiowide text-2xl text-gradient-cyber glitch"
              data-text="LUXE.CYBER"
            >
              LUXE.CYBER
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="relative group">
                <span
                  className={`font-orbitron font-medium uppercase tracking-wider transition-all duration-300 ${
                    location.pathname === link.path
                      ? "text-neon-pink"
                      : "text-gray-400 hover:text-neon-pink"
                  }`}
                >
                  {link.label}
                </span>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-neon-pink"
                    style={{ boxShadow: "0 0 10px #ff006e" }}
                  />
                )}
                <span
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-neon-pink opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ boxShadow: "0 0 10px #ff006e" }}
                />
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-400 hover:text-neon-pink transition-colors hover:bg-neon-pink/10 rounded-lg"
            >
              <FiSearch className="text-xl" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-neon-pink transition-colors hover:bg-neon-pink/10 rounded-lg"
            >
              <FiUser className="text-xl" />
            </motion.button>

            <Link
              to="/wishlist"
              className="relative p-2 text-gray-400 hover:text-neon-pink transition-colors hover:bg-neon-pink/10 rounded-lg"
            >
              <FiHeart className="text-xl" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-neon-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative p-2 text-gray-400 hover:text-neon-pink transition-colors hover:bg-neon-pink/10 rounded-lg"
            >
              <FiShoppingBag className="text-xl" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-neon-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-neon-pink transition-colors"
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
                  placeholder="Search for cyberpunk bags..."
                  className="input-cyber w-full"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-neon-pink to-electric-purple text-white p-2 rounded-lg hover:shadow-lg hover:shadow-neon-pink/50 transition-all">
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
              <div className="card-cyber p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block font-orbitron py-3 px-4 rounded-lg transition-all ${
                      location.pathname === link.path
                        ? "bg-neon-pink/20 text-neon-pink"
                        : "text-gray-400 hover:bg-neon-pink/10 hover:text-neon-pink"
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
