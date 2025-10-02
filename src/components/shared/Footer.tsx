import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiArrowRight,
  FiHeart,
} from "react-icons/fi";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#150027] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 neon-grid opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#150027] via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <motion.h3
              className="text-4xl font-bold mb-4 text-gradient-neon"
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
                { Icon: FiFacebook, color: "#00E5FF", link: "#" },
                { Icon: FiInstagram, color: "#FF1493", link: "#" },
                { Icon: FiTwitter, color: "#39FF14", link: "#" },
                { Icon: FiGithub, color: "#9D00FF", link: "#" },
              ].map(({ Icon, color, link }, index) => (
                <motion.a
                  key={index}
                  href={link}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                    border: `1px solid ${color}40`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 20px ${color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon className="text-gray-300" style={{ color }} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="text-xl font-bold mb-4 text-[#FFD700]"
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
                    className="text-gray-400 hover:text-[#39FF14] transition-all duration-300 flex items-center gap-2 group"
                    style={{ fontFamily: "var(--font-family-inter)" }}
                  >
                    <FiArrowRight className="text-[#39FF14] opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-xl font-bold mb-4 text-[#00E5FF]"
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
                { label: "FAQ", link: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.link}
                    className="text-gray-400 hover:text-[#00E5FF] transition-all duration-300 flex items-center gap-2 group"
                    style={{ fontFamily: "var(--font-family-inter)" }}
                  >
                    <FiArrowRight className="text-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
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
              className="text-xl font-bold mb-4 text-[#FF1493]"
              style={{ fontFamily: "var(--font-family-space)" }}
            >
              GET IN TOUCH
            </h4>
            <div className="space-y-3">
              <motion.div
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <FiMapPin className="text-[#FF1493] flex-shrink-0" />
                <span style={{ fontFamily: "var(--font-family-inter)" }}>
                  123 Fashion Ave, NY 10001
                </span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <FiPhone className="text-[#39FF14] flex-shrink-0" />
                <span style={{ fontFamily: "var(--font-family-inter)" }}>
                  +1 (555) 123-4567
                </span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <FiMail className="text-[#00E5FF] flex-shrink-0" />
                <span style={{ fontFamily: "var(--font-family-inter)" }}>
                  support@freshoff.com
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
      
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

            {/* Made with Love */}
            <motion.div
              className="flex items-center gap-2 text-gray-500 text-sm"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Made with
              <FiHeart className="text-[#FF1493] fill-current animate-pulse" />
              by FreshOff Team
            </motion.div>

            {/* Legal Links */}
            <div className="flex gap-4 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (link) => (
                  <Link
                    key={link}
                    to="#"
                    className="text-gray-500 hover:text-[#00E5FF] transition-colors"
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
            <div className="flex justify-center gap-3">
              {["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"].map(
                (method) => (
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
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
