import React, { useState, useEffect, useRef } from "react";
import type { ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Users,
  User2,
  Loader2,
  Info,
  Star,
  TrendingUp,
  Search,
  Filter,
  X,
  Upload,
  Camera,
  ImagePlus,
  CheckCircle,
  Plus,
} from "lucide-react";
import { useModels } from "@/hooks/useModel";
import { modelsApi } from "@/services/api";

interface Model {
  id: string | number;
  name?: string;
  gender: "male" | "female" | "unisex";
  size?: string;
  image_url: string;
}

interface UploadForm {
  name: string;
  gender: "male" | "female" | "unisex";
  size: string;
  image: File | null;
}

interface ModelSelectorProps {
  onSelectModel: (model: Model) => void;
}

interface GroupedModels {
  [key: string]: Model[];
}

interface Stats {
  total: number;
  male: number;
  female: number;
  unisex: number;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ onSelectModel }) => {
  const { data: models, isLoading, error, refetch } = useModels();
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterGender, setFilterGender] = useState<string>("all");
  const [showTips, setShowTips] = useState<boolean>(true);
  const [hoveredModel, setHoveredModel] = useState<string | number | null>(
    null
  );
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadForm, setUploadForm] = useState<UploadForm>({
    name: "",
    gender: "female",
    size: "",
    image: null,
  });
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleSelectModel = (model: Model): void => {
    if (isTransitioning) return;

    setSelectedModel(model);
    setIsTransitioning(true);

    setTimeout(() => {
      onSelectModel(model);
    }, 600);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setUploadForm({ ...uploadForm, image: file });
      setUploadError("");
    } else {
      setUploadError("Please select a valid image file");
    }
  };

  const handleUploadSubmit = async (): Promise<void> => {
    if (!uploadForm.name || !uploadForm.gender || !uploadForm.image) {
      setUploadError("Please fill in all required fields");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("name", uploadForm.name);
      formData.append("gender", uploadForm.gender);
      if (uploadForm.size) {
        formData.append("size", uploadForm.size);
      }
      formData.append("image", uploadForm.image);

      await modelsApi.createModel(formData);

      setUploadForm({
        name: "",
        gender: "female",
        size: "",
        image: null,
      });
      setShowUploadModal(false);

      // Refresh models list
      refetch();
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Failed to upload model. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const filteredModels: Model[] | undefined = models?.filter((model: Model) => {
    const matchesSearch = model.id
      .toString()
      .includes(searchTerm.toLowerCase());
    const matchesGender =
      filterGender === "all" || model.gender === filterGender;
    return matchesSearch && matchesGender;
  });

  const groupedModels: GroupedModels | undefined = filteredModels?.reduce(
    (acc: GroupedModels, model: Model) => {
      const gender = model.gender || "unisex";
      if (!acc[gender]) acc[gender] = [];
      acc[gender].push(model);
      return acc;
    },
    {} as GroupedModels
  );

  const stats: Stats = {
    total: models?.length || 0,
    male: models?.filter((m: Model) => m.gender === "male").length || 0,
    female: models?.filter((m: Model) => m.gender === "female").length || 0,
    unisex: models?.filter((m: Model) => m.gender === "unisex").length || 0,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-violet-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Loader2 className="w-16 h-16 text-violet-400" />
          </motion.div>
          <p className="mt-4 text-gray-300 font-medium">Loading models...</p>
          <p className="mt-2 text-sm text-gray-400">
            Preparing your virtual try-on experience
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl max-w-md border border-violet-900/30"
        >
          <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">⚠️</span>
          </div>
          <p className="text-gray-200 font-semibold text-lg mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-gray-400 mb-6">
            We couldn't load the models. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {!isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="min-h-screen bg-[#150027]"
        >
          {/* Header */}

          <div className="max-w-7xl mx-auto px-6 py-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8 mt-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
                Choose Your Perfect Model
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
                Select a model that matches your style preference or upload your
                own to expand the collection.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-md p-4 border border-violet-900/30">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by model ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-violet-900/30 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder-gray-500"
                    />
                  </div>

                  {/* Gender Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    {["all", "male", "female", "unisex"].map((gender) => (
                      <button
                        key={gender}
                        onClick={() => setFilterGender(gender)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${
                          filterGender === gender
                            ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md"
                            : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                        }`}
                      >
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results Count */}
                {searchTerm && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-sm text-gray-400"
                  >
                    Found {filteredModels?.length} model(s) matching "
                    {searchTerm}"
                  </motion.p>
                )}
              </div>
            </motion.div>

            {filteredModels?.length === 0 && !showUploadModal ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  No models found
                </h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterGender("all");
                  }}
                  className="px-6 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              Object.entries(groupedModels || {}).map(
                ([gender, genderModels], groupIndex) => (
                  <motion.div
                    key={gender}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: groupIndex * 0.1 }}
                    className="mb-12"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className={`p-2 rounded-lg ${
                          gender === "male"
                            ? "bg-blue-900/20"
                            : gender === "female"
                            ? "bg-pink-900/20"
                            : "bg-purple-900/20"
                        }`}
                      >
                        <User2
                          className={`w-5 h-5 ${
                            gender === "male"
                              ? "text-blue-400"
                              : gender === "female"
                              ? "text-pink-400"
                              : "text-purple-400"
                          }`}
                        />
                      </div>
                      <h3 className="text-xl font-semibold capitalize text-gray-200">
                        {gender} Models
                      </h3>
                      <span className="px-3 py-1 bg-slate-700 rounded-full text-sm text-gray-400 font-medium">
                        {genderModels.length}
                      </span>
                      <div className="h-px bg-violet-900/30 flex-1" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {genderModels.map((model: Model, index: number) => (
                        <motion.div
                          key={model.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectModel(model)}
                          onMouseEnter={() => setHoveredModel(model.id)}
                          onMouseLeave={() => setHoveredModel(null)}
                          className={`group relative cursor-pointer transition-all ${
                            selectedModel?.id === model.id
                              ? "ring-4 ring-violet-500 ring-offset-4 ring-offset-slate-900"
                              : ""
                          }`}
                        >
                          {/* Card */}
                          <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-violet-900/20 transition-all border border-violet-900/30">
                            {/* Image Container */}
                            <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-b from-slate-700 to-slate-800">
                              <img
                                src={model.image_url}
                                alt={`Model ${model.id}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                              {hoveredModel === model.id && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="absolute bottom-12 left-0 right-0 px-4 text-center text-white"
                                >
                                  <p className="text-sm font-medium">
                                    Click to select
                                  </p>
                                </motion.div>
                              )}

                              {selectedModel?.id === model.id && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  className="absolute top-3 right-3 bg-violet-600 text-white rounded-full p-2 shadow-lg"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </motion.div>
                              )}

                              {/* Gender Badge */}
                              <div className="absolute bottom-3 left-3">
                                <motion.div
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: index * 0.05 + 0.2 }}
                                  className={`px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-medium flex items-center gap-1.5 ${
                                    gender === "male"
                                      ? "bg-blue-500/90 text-white"
                                      : gender === "female"
                                      ? "bg-pink-500/90 text-white"
                                      : "bg-purple-500/90 text-white"
                                  }`}
                                >
                                  <User2 className="w-3.5 h-3.5" />
                                  <span className="capitalize">{gender}</span>
                                </motion.div>
                              </div>

                              {/* Model ID */}
                              <div className="absolute top-3 left-3">
                                <div className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-xs text-white font-mono">
                                  #{model.id}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Hover Effect Border */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
                        </motion.div>
                      ))}

                      {/* Upload New Model Card - Only show in first group */}
                      {groupIndex === 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: genderModels.length * 0.05 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowUploadModal(true)}
                          className="group relative cursor-pointer transition-all"
                        >
                          <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-violet-900/20 transition-all border-2 border-dashed border-violet-900/50 hover:border-violet-500">
                            <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-slate-800 to-violet-950/30 flex flex-col items-center justify-center">
                              <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center shadow-lg mb-4"
                              >
                                <Plus className="w-10 h-10 text-violet-400" />
                              </motion.div>
                              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                                Add New Model
                              </h3>
                              <p className="text-sm text-gray-400 px-4 text-center">
                                Upload your own model to the collection
                              </p>
                            </div>
                          </div>
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )
              )
            )}
          </div>

          {/* Upload Modal */}
          <AnimatePresence>
            {showUploadModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setShowUploadModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-md w-full border border-violet-900/30"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-100">
                      Add New Model
                    </h3>
                    <button
                      onClick={() => setShowUploadModal(false)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {uploadError && (
                    <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">
                      {uploadError}
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Model Name *
                      </label>
                      <input
                        type="text"
                        value={uploadForm.name}
                        onChange={(e) =>
                          setUploadForm({ ...uploadForm, name: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-slate-700 border border-violet-900/30 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-500"
                        placeholder="Enter model name"
                      />
                    </div>

                    {/* Gender Select */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Gender *
                      </label>
                      <select
                        value={uploadForm.gender}
                        onChange={(e) =>
                          setUploadForm({
                            ...uploadForm,
                            gender: e.target.value as
                              | "male"
                              | "female"
                              | "unisex",
                          })
                        }
                        className="w-full px-4 py-2 bg-slate-700 border border-violet-900/30 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="unisex">Unisex</option>
                      </select>
                    </div>

                    {/* Size Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Size (Optional)
                      </label>
                      <input
                        type="text"
                        value={uploadForm.size}
                        onChange={(e) =>
                          setUploadForm({ ...uploadForm, size: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-slate-700 border border-violet-900/30 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-500"
                        placeholder="e.g., M, L, XL"
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Model Image *
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="model-image-upload"
                      />
                      <label
                        htmlFor="model-image-upload"
                        className="block w-full cursor-pointer"
                      >
                        <div className="border-2 border-dashed border-violet-900/50 rounded-lg p-6 text-center hover:border-violet-500 transition-colors">
                          {uploadForm.image ? (
                            <div className="flex items-center justify-center gap-2 text-green-400">
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-medium">
                                {uploadForm.image.name}
                              </span>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                              <p className="text-sm text-gray-400">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG, WebP (Max 10MB)
                              </p>
                            </>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setShowUploadModal(false)}
                      className="flex-1 px-4 py-2 border border-violet-900/30 text-gray-300 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUploadSubmit}
                      disabled={isUploading}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Upload Model
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Selection Feedback */}
          <AnimatePresence>
            {selectedModel && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20"
              >
                <div className="bg-slate-800 rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-3 border border-violet-900/30">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <div>
                    <p className="text-gray-200 font-medium">
                      Model #{selectedModel.id} Selected
                    </p>
                    <p className="text-sm text-gray-400">
                      Loading your virtual fitting room...
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Help Button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-violet-500/25 transition-all z-10"
            onClick={() => setShowTips(true)}
          >
            <Info className="w-6 h-6" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModelSelector;
