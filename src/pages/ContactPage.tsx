// src/pages/ContactPage.tsx - Updated with luxury theme
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiClock,
  FiMessageCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Visit Our Store",
      details: ["123 Fashion Avenue", "New York, NY 10001", "United States"],
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Mon-Fri 9AM-6PM EST", "Sat 10AM-4PM EST"],
    },
    {
      icon: FiMail,
      title: "Email Us",
      details: [
        "support@freshoff.com",
        "wholesale@freshoff.com",
        "press@freshoff.com",
      ],
    },
    {
      icon: FiClock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9AM - 6PM",
        "Saturday: 10AM - 4PM",
        "Sunday: Closed",
      ],
    },
  ];

  return (
    <div className="overflow-hidden bg-black relative">
      {/* Global Glass Shine Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Main diagonal shine effect */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(115deg, 
              transparent 0%,
              transparent 40%,
              rgba(255,255,255,0.03) 45%,
              rgba(255,255,255,0.08) 50%,
              rgba(255,255,255,0.03) 55%,
              transparent 60%,
              transparent 100%)`,
            backgroundSize: "200% 200%",
            animation: "diagonalGlassShine 15s ease-in-out infinite",
          }}
        />

        {/* Secondary shimmer effect */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              transparent 0%,
              transparent 35%,
              rgba(255,255,255,0.02) 40%,
              rgba(255,255,255,0.05) 45%,
              rgba(255,255,255,0.02) 50%,
              transparent 55%,
              transparent 100%)`,
            backgroundSize: "250% 250%",
            animation: "diagonalGlassShine 20s ease-in-out infinite reverse",
          }}
        />

        {/* Subtle glass reflection */}
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 45deg at 30% 30%, 
              transparent 0deg, 
              rgba(255,255,255,0.02) 45deg, 
              transparent 90deg,
              transparent 180deg,
              rgba(255,255,255,0.01) 270deg,
              transparent 360deg)`,
            animation: "rotateShine 30s linear infinite",
          }}
        />
      </div>

      {/* Main Content with Background Gradient */}
      <div
        className="pt-24 pb-20 min-h-screen relative"
        style={{
          background: `linear-gradient(135deg, 
            #0a0a0a 0%, 
            #141414 15%, 
            #1a1a1a 30%, 
            #0f0f0f 50%, 
            #080808 70%, 
            #000000 100%)`,
        }}
      >
        {/* Glass-like overlay with blur */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 backdrop-blur-[0.5px]"
            style={{
              background: `linear-gradient(45deg, 
                rgba(255,255,255,0.02) 0%, 
                rgba(255,255,255,0.04) 25%, 
                rgba(255,255,255,0.01) 50%, 
                rgba(255,255,255,0.03) 75%, 
                rgba(255,255,255,0.01) 100%)`,
            }}
          />

          {/* Animated light streak */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(105deg, 
                transparent 0%,
                transparent 40%, 
                rgba(255,255,255,0.05) 45%, 
                rgba(255,255,255,0.1) 50%, 
                rgba(255,255,255,0.05) 55%, 
                transparent 60%,
                transparent 100%)`,
              animation: "lightStreak 8s ease-in-out infinite",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1
              className="text-6xl md:text-7xl font-light mb-4 text-white"
              style={{
                fontFamily:
                  "var(--font-family-playfair), 'Cormorant Garamond', serif",
                letterSpacing: "0.01em",
              }}
            >
              Get In Touch
            </h1>
            <p
              className="text-lg text-white/60 max-w-2xl mx-auto"
              style={{
                fontFamily:
                  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
              }}
            >
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8 glass-effect-dark"
              >
                <h2
                  className="text-3xl font-light mb-6 text-white flex items-center gap-3"
                  style={{
                    fontFamily:
                      "var(--font-family-playfair), 'Cormorant Garamond', serif",
                  }}
                >
                  <FiMessageCircle className="text-[#957E5B]" />
                  Send Message
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none transition-all"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none transition-all"
                    required
                  />
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#957E5B]/50 focus:outline-none transition-all appearance-none cursor-pointer"
                    required
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff60' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: "right 0.5rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1.5em 1.5em",
                      paddingRight: "2.5rem",
                    }}
                  >
                    <option value="" className="bg-black">
                      Select Subject
                    </option>
                    <option value="general" className="bg-black">
                      General Inquiry
                    </option>
                    <option value="order" className="bg-black">
                      Order Support
                    </option>
                    <option value="wholesale" className="bg-black">
                      Wholesale
                    </option>
                    <option value="press" className="bg-black">
                      Press & Media
                    </option>
                  </select>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none transition-all resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full px-8 py-3 bg-[#957E5B] text-white rounded-full hover:bg-[#7a6649] transition-colors text-sm tracking-wider flex items-center justify-center gap-2"
                >
                  <FiSend />
                  SEND MESSAGE
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 hover:scale-105 transition-transform glass-effect-dark"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#957E5B]/20 border-2 border-[#957E5B]/40">
                      <info.icon className="text-xl text-[#957E5B]" />
                    </div>
                    <div>
                      <h3
                        className="font-medium text-lg mb-2 text-white"
                        style={{
                          fontFamily:
                            "var(--font-family-playfair), 'Cormorant Garamond', serif",
                        }}
                      >
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p
                          key={idx}
                          className="text-white/50 text-sm"
                          style={{
                            fontFamily:
                              "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
                            lineHeight: "1.6",
                          }}
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8 text-center glass-effect-dark"
          >
            <h2
              className="text-3xl font-light mb-6 text-white"
              style={{
                fontFamily:
                  "var(--font-family-playfair), 'Cormorant Garamond', serif",
              }}
            >
              Find Us
            </h2>
            <div className="h-96 bg-gradient-to-br from-white/5 to-white/10 rounded-xl flex items-center justify-center border border-white/10">
              <div>
                <FiMapPin className="text-6xl text-[#957E5B] mx-auto mb-4" />
                <p className="text-white/40">Interactive map coming soon</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes diagonalGlassShine {
          0% {
            background-position: -100% -100%;
            opacity: 0;
          }
          15% {
            opacity: 0.4;
          }
          50% {
            background-position: 50% 50%;
            opacity: 0.6;
          }
          85% {
            opacity: 0.4;
          }
          100% {
            background-position: 200% 200%;
            opacity: 0;
          }
        }

        @keyframes lightStreak {
          0% {
            transform: translateX(-150%) translateY(-150%) rotate(45deg);
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          50% {
            transform: translateX(0%) translateY(0%) rotate(45deg);
            opacity: 0.5;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            transform: translateX(150%) translateY(150%) rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes rotateShine {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Glass morphism effect for dark theme */
        .glass-effect-dark {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Custom select dropdown arrow color fix for dark theme */
        select option {
          background-color: #000;
          color: #fff;
        }

        /* Focus styles for form elements */
        input:focus, textarea:focus, select:focus {
          border-color: rgba(149, 126, 91, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
