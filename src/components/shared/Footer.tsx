// src/components/Footer.tsx
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
} from "react-icons/fi";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-cyber-black border-t border-neon-pink/20 pt-16 pb-8 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-audiowide text-3xl text-gradient-cyber mb-4">
              FRESHOFF
            </h3>
            <p className="text-gray-500 mb-6 font-rajdhani">
              Next-gen fashion for the digital revolution. Step into the future.
            </p>
            <div className="flex space-x-3">
              {[FiFacebook, FiInstagram, FiTwitter, FiGithub].map(
                (Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 bg-cyber-gray border border-neon-pink/30 rounded flex items-center justify-center text-gray-400 hover:text-neon-pink hover:border-neon-pink hover:shadow-lg hover:shadow-neon-pink/30 transition-all"
                  >
                    <Icon />
                  </motion.a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron text-xl font-bold mb-4 text-neon-pink">
              QUICK ACCESS
            </h4>
            <ul className="space-y-2">
              {[
                "New Drops",
                "Cyber Sale",
                "Limited Edition",
                "NFT Collection",
                "Virtual Try-On",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="text-gray-500 hover:text-neon-pink transition-colors font-rajdhani flex items-center gap-2 group"
                  >
                    <span className="text-neon-pink opacity-0 group-hover:opacity-100 transition-opacity">
                      ›
                    </span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-orbitron text-xl font-bold mb-4 text-neon-pink">
              SUPPORT
            </h4>
            <ul className="space-y-2">
              {[
                "Track Order",
                "Returns Portal",
                "Size Matrix",
                "FAQ Database",
                "Live Chat",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/contact"
                    className="text-gray-500 hover:text-neon-pink transition-colors font-rajdhani flex items-center gap-2 group"
                  >
                    <span className="text-neon-pink opacity-0 group-hover:opacity-100 transition-opacity">
                      ›
                    </span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-orbitron text-xl font-bold mb-4 text-neon-pink">
              CONNECT
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-500 font-rajdhani">
                <FiMapPin className="text-neon-pink" />
                <span>Neo Tokyo, Sector 7</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-500 font-rajdhani">
                <FiPhone className="text-neon-pink" />
                <span>+1 (555) CYBER-01</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-500 font-rajdhani">
                <FiMail className="text-neon-pink" />
                <span>hello@luxecyber.io</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-neon-pink/20 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="font-orbitron text-2xl mb-4 text-gradient-cyber">
              NEURAL LINK NEWSLETTER
            </h4>
            <p className="text-gray-500 mb-6 font-rajdhani">
              Direct updates to your neural feed
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="neural.id@cyber.net"
                className="input-cyber flex-1"
              />
              <button className="btn-cyber">CONNECT</button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neon-pink/20 pt-8 text-center">
          <p className="text-gray-600 font-share-tech">
            © 2024 FRESHOFF| All systems operational | Made with
            <span className="text-neon-pink animate-pulse mx-1">♥</span>
            in the Metaverse
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
