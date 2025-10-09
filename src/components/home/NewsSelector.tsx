import { motion } from "framer-motion";
import { GlowButton } from "../ui/shiny-button-1";

const NewsletterSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-[#150027]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 text-white leading-tight"
            style={{ fontFamily: "var(--font-family-playfair)" }}
          >
            JOIN THE ELITE
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 text-gray-400 max-w-2xl mx-auto px-4 sm:px-6 md:px-0">
            Subscribe to receive exclusive offers, early access to new
            collections, and VIP event invitations
          </p>
          <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto px-4 sm:px-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-professional flex-1 w-full text-sm sm:text-base px-5 py-3"
            />
            <div className="w-full sm:w-auto flex items-center justify-center">
              <GlowButton children="subscribe" />
            </div>
          </form>
          <p className="mt-4 sm:mt-5 md:mt-6 text-xs sm:text-sm text-gray-600 px-4 sm:px-0">
            Join 50,000+ fashion enthusiasts worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
