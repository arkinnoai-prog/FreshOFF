import { motion } from "framer-motion";
import {
  FiAward,
  FiUsers,
  FiTruck,
  FiHeart,
  FiTarget,
  FiTrendingUp,
  FiGlobe,
  FiZap,
} from "react-icons/fi";

const AboutPage = () => {
  const stats = [
    {
      icon: FiUsers,
      value: "100K+",
      label: "Happy Customers",
      color: "#957E5B",
    },
    { icon: FiAward, value: "25+", label: "Awards Won", color: "#957E5B" },
    {
      icon: FiTruck,
      value: "500K+",
      label: "Orders Delivered",
      color: "#957E5B",
    },
    {
      icon: FiHeart,
      value: "99.9%",
      label: "Satisfaction Rate",
      color: "#957E5B",
    },
  ];

  const team = [
    {
      name: "Alexandra Chen",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      bio: "Visionary leader with 20 years in luxury fashion",
    },
    {
      name: "Marcus Rivera",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      bio: "Award-winning designer from Paris Fashion Week",
    },
    {
      name: "Priya Sharma",
      role: "Head of Innovation",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      bio: "Tech pioneer revolutionizing fashion retail",
    },
  ];

  const values = [
    {
      icon: FiTarget,
      title: "Our Mission",
      desc: "To redefine luxury fashion with innovative designs that empower modern individuals.",
    },
    {
      icon: FiTrendingUp,
      title: "Our Vision",
      desc: "Becoming the global leader in sustainable luxury accessories by 2030.",
    },
    {
      icon: FiGlobe,
      title: "Our Reach",
      desc: "Serving fashion enthusiasts in over 50 countries worldwide.",
    },
    {
      icon: FiZap,
      title: "Our Innovation",
      desc: "Integrating cutting-edge technology with timeless craftsmanship.",
    },
  ];

  return (
    <div
      className="overflow-hidden relative"
      style={{ backgroundColor: "#160B26" }}
    >
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

      {/* Hero Section with Glass Effect */}
      <section
        className="relative overflow-hidden py-20 pt-32"
        style={{
          background: `linear-gradient(135deg, 
            #1a0f2e 0%, 
            #1e1232 15%, 
            #221436 30%, 
            #1c1030 50%, 
            #150d24 70%, 
            #160B26 100%)`,
        }}
      >
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

          {/* Radial light spots for glass effect */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.06) 0%, transparent 40%), 
                           radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.04) 0%, transparent 40%),
                           radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1
              className="text-6xl md:text-8xl font-light mb-6 text-white"
              style={{
                fontFamily:
                  "var(--font-family-playfair), 'Cormorant Garamond', serif",
                letterSpacing: "0.01em",
              }}
            >
              The FreshOff Story
            </h1>
            <p
              className="text-base md:text-lg text-white/70 mb-8 leading-relaxed tracking-wide"
              style={{
                fontFamily:
                  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
                lineHeight: "1.8",
              }}
            >
              Born from a passion for exceptional design and a commitment to
              sustainability, FreshOff is more than a brand – it's a movement
              towards conscious luxury.
            </p>
            <div className="inline-flex gap-4">
              <motion.div
                className="px-6 py-2 bg-[#957E5B]/20 rounded-full border border-[#957E5B]/30 glass-effect-dark"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-[#957E5B] font-medium text-sm tracking-wider">
                  EST. 2018
                </span>
              </motion.div>
              <motion.div
                className="px-6 py-2 bg-[#957E5B]/20 rounded-full border border-[#957E5B]/30 glass-effect-dark"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-[#957E5B] font-medium text-sm tracking-wider">
                  PREMIUM QUALITY
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="py-20 relative"
        style={{
          background: `linear-gradient(to bottom, 
            #160B26 0%, 
            #1a0f2e 30%, 
            #1e1232 60%, 
            #140a22 100%)`,
        }}
      >
        <div
          className="absolute inset-0 backdrop-blur-[0.5px]"
          style={{
            background: `linear-gradient(180deg, 
              rgba(255,255,255,0.02) 0%, 
              transparent 50%, 
              rgba(255,255,255,0.01) 100%)`,
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-[#957E5B]/20 glass-effect-dark">
                  <stat.icon className="text-3xl text-[#957E5B]" />
                </div>
                <div
                  className="text-4xl font-light mb-2 text-white"
                  style={{
                    fontFamily:
                      "var(--font-family-playfair), 'Cormorant Garamond', serif",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section
        className="py-20 relative"
        style={{
          background: `linear-gradient(135deg, 
            #1c1030 0%, 
            #1f1334 50%, 
            #1a0f2e 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `rgba(255,255,255,0.01)`,
            backdropFilter: "blur(0.5px)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-5xl font-light mb-6 text-white"
                style={{
                  fontFamily:
                    "var(--font-family-playfair), 'Cormorant Garamond', serif",
                }}
              >
                Crafting Excellence Since Day One
              </h2>
              <div
                className="space-y-4 text-white/70"
                style={{
                  fontFamily:
                    "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                <p>
                  FreshOff began in a small studio with a big dream: to create
                  bags that don't just carry your essentials, but elevate your
                  entire lifestyle. Our founders saw a gap in the market for
                  truly innovative, sustainable luxury accessories.
                </p>
                <p>
                  Today, we've grown into a global brand, but our core values
                  remain unchanged. Every FreshOff bag is a testament to our
                  commitment to quality, innovation, and environmental
                  responsibility.
                </p>
                <p>
                  From ethically sourced materials to carbon-neutral shipping,
                  we're proving that luxury and sustainability can coexist
                  beautifully.
                </p>
              </div>
              <button className="mt-6 px-8 py-3 bg-[#957E5B] text-white rounded-full hover:bg-[#7a6649] transition-colors duration-300 text-sm tracking-wider glass-effect-dark">
                LEARN MORE
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="p-4">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
                  alt="Our workshop"
                  className="w-full h-[500px] object-cover rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        className="py-20 relative"
        style={{
          background: `linear-gradient(135deg, 
            #1e1232 0%, 
            #1a0f2e 25%, 
            #150d24 50%, 
            #1c1030 75%, 
            #160B26 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(255,255,255,0.02) 50%, 
              transparent 100%)`,
            backdropFilter: "blur(0.3px)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-light text-center mb-12 text-white"
            style={{
              fontFamily:
                "var(--font-family-playfair), 'Cormorant Garamond', serif",
            }}
          >
            What Drives Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all glass-effect-dark"
              >
                <value.icon className="text-3xl text-[#957E5B] mb-4" />
                <h3
                  className="text-xl font-medium mb-2 text-white"
                  style={{
                    fontFamily:
                      "var(--font-family-playfair), 'Cormorant Garamond', serif",
                  }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-white/60 text-sm"
                  style={{
                    fontFamily:
                      "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
                    lineHeight: "1.6",
                  }}
                >
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        className="py-20 relative"
        style={{
          background: `linear-gradient(135deg, 
            #160B26 0%, 
            #1a0f2e 33%, 
            #1e1232 66%, 
            #140a22 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, 
              rgba(255,255,255,0.03) 0%, 
              transparent 70%)`,
            backdropFilter: "blur(0.5px)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-light text-center mb-12 text-white"
            style={{
              fontFamily:
                "var(--font-family-playfair), 'Cormorant Garamond', serif",
            }}
          >
            Meet The Visionaries
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md p-8 text-center group hover:bg-white/10 transition-all rounded-lg border border-white/10 glass-effect-dark"
              >
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3
                  className="text-2xl font-light mb-2 text-white"
                  style={{
                    fontFamily:
                      "var(--font-family-playfair), 'Cormorant Garamond', serif",
                  }}
                >
                  {member.name}
                </h3>
                <p className="text-[#957E5B] mb-3 text-sm tracking-wider uppercase">
                  {member.role}
                </p>
                <p
                  className="text-white/60 text-sm"
                  style={{
                    fontFamily:
                      "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
                    lineHeight: "1.6",
                  }}
                >
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 relative"
        style={{
          background: `linear-gradient(to bottom, 
            #160B26 0%, 
            #1a0f2e 50%, 
            #140a22 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, 
              rgba(255,255,255,0.02) 0%, 
              transparent 100%)`,
            backdropFilter: "blur(0.5px)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2
              className="text-5xl font-light mb-6 text-white"
              style={{
                fontFamily:
                  "var(--font-family-playfair), 'Cormorant Garamond', serif",
              }}
            >
              Join The FreshOff Family
            </h2>
            <p
              className="text-lg text-white/70 mb-8"
              style={{
                fontFamily:
                  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
              }}
            >
              Be part of a community that values quality, innovation, and
              conscious luxury.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-[#957E5B] text-white rounded-full hover:bg-[#7a6649] transition-colors duration-300 text-sm tracking-wider glass-effect-dark">
                SHOP NOW
              </button>
              <button className="px-8 py-3 bg-transparent text-[#957E5B] border-2 border-[#957E5B] rounded-full hover:bg-[#957E5B] hover:text-white transition-colors duration-300 text-sm tracking-wider glass-effect-dark">
                BECOME A MEMBER
              </button>
            </div>
          </motion.div>
        </div>
      </section>

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
      `}</style>
    </div>
  );
};

export default AboutPage;
