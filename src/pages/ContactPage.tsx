// src/pages/ContactPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
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
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="pt-24 pb-20 min-h-screen"
      style={{ background: "var(--color-cyber-black)" }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient-cyber">
            CONTACT US
          </h1>
          <p className="text-xl text-gray-400">
            Get in touch with our cyber support team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit} className="card-cyber p-8">
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-neon-pink)]">
                Send us a Message
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-cyber w-full"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-cyber w-full"
                  required
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-cyber w-full"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="input-cyber w-full resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-cyber mt-6 flex items-center gap-2"
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
            <div className="card-cyber p-8">
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-neon-pink)]">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--color-cyber-gray)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-[var(--color-neon-pink)]" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Visit Us</h3>
                    <p className="text-gray-400">
                      123 Cyber Street, Neo Tokyo
                      <br />
                      Digital District, NT 10001
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--color-cyber-gray)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiPhone className="text-[var(--color-neon-pink)]" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Call Us</h3>
                    <p className="text-gray-400">
                      +1 (555) CYBER-01
                      <br />
                      Mon-Fri 9AM-6PM EST
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--color-cyber-gray)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiMail className="text-[var(--color-neon-pink)]" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email Us</h3>
                    <p className="text-gray-400">
                      support@luxecyber.io
                      <br />
                      business@luxecyber.io
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="card-cyber p-4 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-[var(--color-cyber-gray)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMapPin className="text-3xl text-[var(--color-neon-pink)]" />
                </div>
                <p className="text-gray-500">Interactive Map Coming Soon</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
