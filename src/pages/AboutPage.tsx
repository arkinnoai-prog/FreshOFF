// src/pages/AboutPage.tsx
import { motion } from "framer-motion";
import { FiAward, FiUsers, FiTruck, FiHeart } from "react-icons/fi";

const AboutPage = () => {
  const stats = [
    { icon: FiUsers, value: "50K+", label: "Happy Customers" },
    { icon: FiAward, value: "15+", label: "Awards Won" },
    { icon: FiTruck, value: "100K+", label: "Orders Delivered" },
    { icon: FiHeart, value: "99%", label: "Satisfaction Rate" },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      bio: "Visionary leader with 15 years in fashion tech",
    },
    {
      name: "Alex Rivera",
      role: "Head of Design",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      bio: "Award-winning designer from Milan",
    },
    {
      name: "Maya Patel",
      role: "Tech Director",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      bio: "Pioneering smart fashion integration",
    },
  ];

  return (
    <div
      className="pt-24 pb-20 min-h-screen"
      style={{ background: "var(--color-cyber-black)" }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-cyber">
              ABOUT LUXE.CYBER
            </h1>
            <p
              className="text-xl text-gray-400 mb-8"
              style={{ fontFamily: "var(--font-family-rajdhani)" }}
            >
              Where cutting-edge technology meets timeless elegance. We're
              redefining fashion for the digital age with smart, sustainable,
              and stunning accessories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gradient-cyber">
                OUR STORY
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  Founded in 2020 in the heart of Neo Tokyo, LUXE.CYBER emerged
                  from a simple vision: to create bags that don't just carry
                  your essentials, but enhance your digital lifestyle.
                </p>
                <p>
                  Our founders, a team of fashion designers and tech innovators,
                  saw a gap in the market for accessories that could seamlessly
                  integrate with our increasingly connected world.
                </p>
                <p>
                  Today, we're proud to offer a collection that features
                  built-in wireless charging, RFID protection, smart tracking,
                  and sustainable materials - all wrapped in stunning cyberpunk
                  aesthetics.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="card-cyber p-4">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
                  alt="Our workshop"
                  className="w-full h-[400px] object-cover rounded"
                  style={{
                    filter: "hue-rotate(280deg) saturate(1.5) brightness(0.8)",
                  }}
                />
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-[var(--color-neon-pink)]/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-neon-pink)]/10 via-transparent to-[var(--color-electric-purple)]/10" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-[var(--color-cyber-gray)] rounded-lg flex items-center justify-center border border-[var(--color-neon-pink)]/30">
                  <stat.icon className="text-3xl text-[var(--color-neon-pink)]" />
                </div>
                <div className="text-3xl font-bold text-gradient-cyber mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-12 text-gradient-cyber"
          >
            MEET THE TEAM
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-cyber p-6 text-center group"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                    style={{ filter: "grayscale(100%) contrast(1.2)" }}
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-neon-pink)]/20 to-[var(--color-electric-purple)]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold mb-1 text-[var(--color-neon-pink)]">
                  {member.name}
                </h3>
                <p className="text-gray-400 mb-3">{member.role}</p>
                <p className="text-sm text-gray-500">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="card-cyber p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-gradient-cyber">
              OUR MISSION
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              To create innovative accessories that empower the modern digital
              nomad, combining cutting-edge technology with sustainable
              practices and timeless design.
            </p>
            <button className="btn-cyber">JOIN OUR JOURNEY</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
