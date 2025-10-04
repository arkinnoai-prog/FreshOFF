import { motion } from "framer-motion";
import { GlowButton } from "../ui/shiny-button-1";

const NewsletterSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#150027]">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
            style={{ fontFamily: "var(--font-family-playfair)" }}
          >
            JOIN THE ELITE
          </h2>
          <p className="text-xl mb-10 text-gray-400 max-w-2xl mx-auto">
            Subscribe to receive exclusive offers, early access to new
            collections, and VIP event invitations
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-professional flex-1"
            />
            <GlowButton children="subscribe" />
          </form>
          <p className="mt-6 text-sm text-gray-600">
            Join 50,000+ fashion enthusiasts worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
