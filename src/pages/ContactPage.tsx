// src/pages/ContactPage.tsx - Updated with new theme
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
      color: "#FF1493",
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Mon-Fri 9AM-6PM EST", "Sat 10AM-4PM EST"],
      color: "#39FF14",
    },
    {
      icon: FiMail,
      title: "Email Us",
      details: [
        "support@freshoff.com",
        "wholesale@freshoff.com",
        "press@freshoff.com",
      ],
      color: "#00E5FF",
    },
    {
      icon: FiClock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9AM - 6PM",
        "Saturday: 10AM - 4PM",
        "Sunday: Closed",
      ],
      color: "#FFD700",
    },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#150027]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className="text-6xl md:text-7xl font-bold mb-4 text-gradient-neon"
            style={{ fontFamily: "var(--font-family-bebas)" }}
          >
            GET IN TOUCH
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
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
            <form onSubmit={handleSubmit} className="card-modern p-8">
              <h2 className="text-3xl font-bold mb-6 text-gradient-gold flex items-center gap-2">
                <FiMessageCircle />
                Send Message
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-modern w-full"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-modern w-full"
                  required
                />
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-modern w-full"
                  required
                  style={{ background: "rgba(21, 0, 39, 0.6)" }}
                >
                  <option value="" style={{ background: "#150027" }}>
                    Select Subject
                  </option>
                  <option value="general" style={{ background: "#150027" }}>
                    General Inquiry
                  </option>
                  <option value="order" style={{ background: "#150027" }}>
                    Order Support
                  </option>
                  <option value="wholesale" style={{ background: "#150027" }}>
                    Wholesale
                  </option>
                  <option value="press" style={{ background: "#150027" }}>
                    Press & Media
                  </option>
                </select>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="input-modern w-full resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-neon mt-6 w-full flex items-center justify-center gap-2"
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
                className="card-modern p-6 hover:scale-105 transition-transform"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${info.color}20, ${info.color}10)`,
                      border: `2px solid ${info.color}40`,
                    }}
                  >
                    <info.icon
                      className="text-xl"
                      style={{ color: info.color }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-400 text-sm">
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
          className="mt-20 card-modern p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-gradient-neon">
            FIND US
          </h2>
          <div className="h-96 bg-gradient-to-br from-[#150027] to-[#1a0033] rounded-xl flex items-center justify-center">
            <div>
              <FiMapPin className="text-6xl text-[#FF1493] mx-auto mb-4" />
              <p className="text-gray-400">Interactive map coming soon</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
