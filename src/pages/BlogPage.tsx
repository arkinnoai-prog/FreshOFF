// src/pages/BlogPage.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";
import { blogPosts } from "../data/blog";

const BlogPage = () => {
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
            CYBER BLOG
          </h1>
          <p className="text-xl text-gray-400">
            Fashion insights from the future
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-cyber group overflow-hidden"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{ filter: "brightness(0.9) contrast(1.1)" }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="text-[var(--color-neon-pink)]" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="text-[var(--color-neon-pink)]" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-3 text-[var(--color-neon-pink)] group-hover:text-[var(--color-hot-pink)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiUser className="text-gray-500" />
                    <span className="text-sm text-gray-500">{post.author}</span>
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-[var(--color-neon-pink)] hover:text-[var(--color-hot-pink)] font-bold text-sm"
                  >
                    READ MORE →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
