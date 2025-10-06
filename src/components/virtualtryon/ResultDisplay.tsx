import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, ArrowLeft, Sparkles, Heart } from "lucide-react";

const ResultDisplay = ({
  result,
  model,
  onBackToCanvas,
  onStartOver,
}: {
  result: any;
  model: any;
  onBackToCanvas: () => void;
  onStartOver: () => void;
}) => {
  const [showResult, setShowResult] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState("");

  useEffect(() => {
    if (result) {
      if (result.image_base64 && result.content_type) {
        const dataUrl = `data:${result.content_type};base64,${result.image_base64}`;
        setResultImageUrl(dataUrl);
      } else if (result.image_url) {
        setResultImageUrl(result.image_url);
      } else if (typeof result === "string") {
        setResultImageUrl(result);
      }
    }

    setTimeout(() => {
      setShowResult(true);
    }, 1500);
  }, [result]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "virtual-tryon-result.jpg";
    link.href = resultImageUrl;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        if (resultImageUrl.startsWith("data:")) {
          const response = await fetch(resultImageUrl);
          const blob = await response.blob();
          const file = new File([blob], "tryon-result.jpg", {
            type: result.content_type || "image/jpeg",
          });

          await navigator.share({
            title: "My Virtual Try-On",
            text: "Check out my virtual try-on result!",
            files: [file],
          });
        } else {
          await navigator.share({
            title: "My Virtual Try-On",
            text: "Check out my virtual try-on result!",
            url: window.location.href,
          });
        }
      } catch (err) {
        console.log("Share failed:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-violet-950 p-4">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Sparkles className="w-16 h-16 text-purple-600 dark:text-violet-400" />
            </motion.div>
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-4 text-lg text-gray-600 dark:text-gray-400"
            >
              Creating your perfect look...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-6xl mx-auto"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                Your Virtual Try-On is Ready!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Here's how amazing you look
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600">
                    <h3 className="text-center font-semibold text-gray-700 dark:text-gray-300">
                      Before
                    </h3>
                  </div>
                  <div className="p-4">
                    <img
                      src={model.image_url}
                      alt="Original model"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-violet-500 dark:to-purple-500">
                    <h3 className="text-center font-semibold text-white">
                      After
                    </h3>
                  </div>
                  <div className="p-4">
                    <motion.img
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      src={resultImageUrl}
                      alt="Try-on result"
                      className="w-full h-auto rounded-lg"
                      onError={(e: any) => {
                        console.error("Error loading result image");
                        e.target.src = model.image_url; // Fallback to original
                      }}
                    />
                  </div>
                </div>

                {/* Sparkle Effects */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -top-4 -right-4"
                >
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute -bottom-4 -left-4"
                >
                  <Sparkles className="w-6 h-6 text-pink-400 dark:text-violet-400" />
                </motion.div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-4 justify-center"
            >
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-violet-500 dark:to-purple-500 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all"
              >
                <Download className="w-5 h-5" />
                Download Result
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-purple-600 dark:text-violet-400 border-2 border-purple-600 dark:border-violet-500 rounded-full hover:bg-purple-50 dark:hover:bg-slate-700 transition-all"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  isLiked
                    ? "bg-red-500 text-white"
                    : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-violet-900/30"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Liked!" : "Like"}
              </button>

              <button
                onClick={onBackToCanvas}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Try Another Outfit
              </button>

              <button
                onClick={onStartOver}
                className="px-6 py-3 text-purple-600 dark:text-violet-400 hover:text-purple-700 dark:hover:text-violet-300 transition-all"
              >
                Start Over with New Model
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultDisplay;
