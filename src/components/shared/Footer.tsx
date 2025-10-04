import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";
import { FaPinterest } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#150027] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 neon-grid opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#150027] via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <motion.h3
              className="text-4xl font-bold mb-4 text-white"
              style={{ fontFamily: "var(--font-family-bebas)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              FRESHOFF
            </motion.h3>
            <p
              className="text-gray-400 mb-6"
              style={{ fontFamily: "var(--font-family-montserrat)" }}
            >
              Premium fashion for the modern lifestyle. Where elegance meets
              innovation.
            </p>
            <div className="flex space-x-3">
              {[
                { Icon: FiFacebook, link: "#" },
                { Icon: FiInstagram, link: "#" },
                { Icon: FiTwitter, link: "#" },
                { Icon: FaPinterest, link: "#" },
                { Icon: FiYoutube, link: "#" },
              ].map(({ Icon, link }, index) => (
                <motion.a
                  key={index}
                  href={link}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30"
                >
                  <Icon className="text-gray-300 hover:text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-xl font-bold mb-4 text-white"
              style={{ fontFamily: "var(--font-family-space)" }}
            >
              QUICK LINKS
            </h4>
            <ul className="space-y-2">
              {[
                { label: "New Arrivals", link: "/shop" },
                { label: "Best Sellers", link: "/shop" },
                { label: "Sale Items", link: "/shop" },
                { label: "Gift Cards", link: "/shop" },
                { label: "Collections", link: "/shop" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.link}
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                    style={{ fontFamily: "var(--font-family-inter)" }}
                  >
                    <FiArrowRight className="text-white/50 opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4
              className="text-xl font-bold mb-4 text-white"
              style={{ fontFamily: "var(--font-family-space)" }}
            >
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Track Order", link: "/contact" },
                { label: "Returns & Exchanges", link: "/contact" },
                { label: "Shipping Info", link: "/contact" },
                { label: "Size Guide", link: "/contact" },
                { label: "Care Instructions", link: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.link}
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                    style={{ fontFamily: "var(--font-family-inter)" }}
                  >
                    <FiArrowRight className="text-white/50 opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="text-xl font-bold mb-4 text-white"
              style={{ fontFamily: "var(--font-family-space)" }}
            >
              GET IN TOUCH
            </h4>
            <div className="space-y-3">
              <motion.div
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <FiMapPin className="text-white/70 flex-shrink-0" />
                <span style={{ fontFamily: "var(--font-family-inter)" }}>
                  123 Fashion Ave, NY 10001
                </span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <FiPhone className="text-white/70 flex-shrink-0" />
                <span style={{ fontFamily: "var(--font-family-inter)" }}>
                  +1 (555) 123-4567
                </span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <FiMail className="text-white/70 flex-shrink-0" />
                <span style={{ fontFamily: "var(--font-family-inter)" }}>
                  support@freshoff.com
                </span>
              </motion.div>
            </div>

            {/* Business Hours */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-2">Business Hours</p>
              <p className="text-sm text-gray-500">Mon - Fri: 9AM - 8PM</p>
              <p className="text-sm text-gray-500">Sat - Sun: 10AM - 6PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p
              className="text-gray-500 text-sm"
              style={{ fontFamily: "var(--font-family-inter)" }}
            >
              © 2024 FRESHOFF. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex gap-4 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (link) => (
                  <Link
                    key={link}
                    to="#"
                    className="text-gray-500 hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-family-inter)" }}
                  >
                    {link}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-xs mb-3">Secure Payment Methods</p>
            <div className="flex justify-center gap-3 flex-wrap">
              {[
                "Visa",
                "Mastercard",
                "PayPal",
                "Apple Pay",
                "Google Pay",
                "Amex",
              ].map((method) => (
                <span
                  key={method}
                  className="px-3 py-1 text-xs rounded-lg"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
