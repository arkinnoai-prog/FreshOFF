import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wand2,
  Download,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  ScanLine,
  Eye,
} from "lucide-react";
import { modelsApi } from "@/services/api";
import OutfitLibrary from "./outfitLibaray";

interface Model {
  id: number;
  image_url: string;
}

interface Outfit {
  id?: string | number;
  name: string;
  category?: string;
  url?: string;
  file?: File;
}

interface TryOnCanvasProps {
  model: Model;
  onBack: () => void;
}

const TryOnCanvas: React.FC<TryOnCanvasProps> = ({ model, onBack }) => {
  const canvasRef = useRef<any>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [pendingOutfit, setPendingOutfit] = useState<Outfit | null>(null);
  const [scanPosition, setScanPosition] = useState<number>(50);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const scannerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showMobileOutfits, setShowMobileOutfits] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (!showResult && canvasRef.current) {
      cleanup = initializeCanvas();
    }

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [model, showResult, isMobile]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const initializeCanvas = (): (() => void) => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
      fabricCanvasRef.current = null;
    }

    const canvasContainer = document.getElementById("canvas-container");
    if (!canvasContainer || !canvasRef.current) {
      return () => {};
    }

    const padding = isMobile ? 24 : 48;
    const containerWidth = canvasContainer.offsetWidth - padding;
    const aspectRatio = 3 / 4;
    const maxHeight = isMobile
      ? window.innerHeight * 0.5
      : window.innerHeight * 0.7;
    const canvasHeight = Math.min(containerWidth * aspectRatio, maxHeight);
    const canvasWidth = canvasHeight / aspectRatio;

    const existingCanvas = (canvasRef.current as any).__canvas;
    if (existingCanvas) {
      existingCanvas.dispose();
    }

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#160B26",
    });

    fabricCanvasRef.current = canvas;

    fabric.Image.fromURL(model.image_url)
      .then((img) => {
        if (!fabricCanvasRef.current) return;

        const scale = Math.min(
          (canvasWidth * 0.9) / (img.width || 1),
          (canvasHeight * 0.9) / (img.height || 1)
        );

        img.set({
          left: canvasWidth / 2,
          top: canvasHeight / 2,
          originX: "center",
          originY: "center",
          scaleX: scale,
          scaleY: scale,
          selectable: false,
          evented: false,
        });

        fabricCanvasRef.current.add(img);
        fabricCanvasRef.current.renderAll();
      })
      .catch((error) => {
        console.error("Error loading model image:", error);
      });

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  };

  const prepareImageFile = async (outfit: Outfit): Promise<File> => {
    try {
      if (outfit.file instanceof File) {
        return outfit.file;
      }

      if (outfit.url) {
        const response = await fetch(outfit.url);
        const blob = await response.blob();
        const fileName = outfit.name || `outfit_${Date.now()}.jpg`;
        const file = new File([blob], fileName, { type: "image/jpeg" });
        return file;
      }

      throw new Error("No valid image source found");
    } catch (error) {
      console.error("Error preparing image file:", error);
      throw error;
    }
  };

  const confirmAndApply = (outfit: Outfit): void => {
    setPendingOutfit(outfit);
    setShowConfirmDialog(true);
    if (isMobile) {
      setShowMobileOutfits(false);
    }
  };

  const handleConfirmApply = async (): Promise<void> => {
    setShowConfirmDialog(false);
    if (pendingOutfit) {
      await handleApply(pendingOutfit);
      setPendingOutfit(null);
    }
  };

  const handleCancelApply = (): void => {
    setShowConfirmDialog(false);
    setPendingOutfit(null);
  };

  const handleApply = async (outfit: Outfit): Promise<void> => {
    if (!outfit) return;

    setIsProcessing(true);
    setSelectedOutfit(outfit);

    try {
      const imageFile = await prepareImageFile(outfit);
      const formData = new FormData();
      formData.append("model_id", model.id.toString());
      formData.append("clothing_image", imageFile);

      const result = await modelsApi.tryOnOutfit(formData);

      const imageUrl = result.image_base64
        ? `data:${result.content_type};base64,${result.image_base64}`
        : result.image_url || result;

      setResultImage(imageUrl);
      setShowResult(true);
      setScanPosition(50);
    } catch (error) {
      console.error("Try-on failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToEdit = (): void => {
    setShowResult(false);
    setResultImage(null);
    setSelectedOutfit(null);
    setScanPosition(50);
    setIsScanning(false);
  };

  const handleDownload = (): void => {
    if (resultImage) {
      const link = document.createElement("a");
      link.download = "virtual-tryon-result.jpg";
      link.href = resultImage;
      link.click();
    }
  };

  const handleOutfitSelect = (outfit: Outfit): void => {
    confirmAndApply(outfit);
  };

  const handleCanvasDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);

    try {
      const outfitData = e.dataTransfer.getData("outfit");
      if (outfitData) {
        const outfit = JSON.parse(outfitData);
        confirmAndApply(outfit);
      }
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const modelTop = rect.height * 0.3;

    if (y > modelTop) {
      e.dataTransfer.dropEffect = "copy";
      setIsDragging(true);
    } else {
      e.dataTransfer.dropEffect = "none";
      setIsDragging(false);
    }
  };

  const handleScanStart = (e: React.MouseEvent | React.TouchEvent): void => {
    e.preventDefault();
    setIsScanning(true);
  };

  const handleScanMove = (e: MouseEvent | TouchEvent): void => {
    if (!isScanning || !scannerRef.current) return;

    const rect = scannerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setScanPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleScanEnd = (): void => {
    setIsScanning(false);
  };

  useEffect(() => {
    if (isScanning) {
      const handleMove = (e: MouseEvent | TouchEvent) => handleScanMove(e);
      const handleEnd = () => handleScanEnd();

      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove);
      document.addEventListener("touchend", handleEnd);

      return () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }
  }, [isScanning]);

  return (
    <div className="h-screen flex flex-col bg-[#150027] overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#150027] backdrop-blur-md border-b border-violet-900/30 flex-shrink-0 z-100 mt-1 lg:mt-[-20px] md:mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3 pt-14">
              <button
                onClick={onBack}
                className="p-1.5 md:p-2 hover:bg-slate-800 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
              </button>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-base md:text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                    Virtual Fitting Room
                  </h1>
                  <p className="text-xs text-gray-400">Model #{model.id}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:mt-17">
              {showResult && !isMobile && (
                <>
                  <button
                    onClick={handleBackToEdit}
                    className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Edit Again
                  </button>
                  <button
                    onClick={onBack}
                    className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-gray-200 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Change Model
                  </button>
                </>
              )}
              {isMobile && !showResult && (
                <button
                  onClick={() => setShowMobileOutfits(true)}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl mt-14"
                >
                  Select Outfit
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-3">
          <div
            className={`h-full ${
              isMobile ? "" : "grid grid-cols-1 lg:grid-cols-3 gap-6"
            }`}
          >
            {/* Canvas Area */}
            <div
              className={`${
                isMobile ? "h-full" : "lg:col-span-2 h-full"
              } overflow-auto`}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                style={{
                  background:
                    "linear-gradient(135deg, #0F0A1F, #160B26, #1A0B30)",
                }}
                className="backdrop-blur-md border border-violet-900/30 rounded-2xl shadow-xl overflow-hidden h-fit lg:mt-0 mt-20 "
                id="canvas-container"
              >
                {!showResult ? (
                  <>
                    <div
                      style={{
                        background:
                          "linear-gradient(to bottom, #0D0619, #160B26, #1F1333)",
                      }}
                      className="p-4 md:p-6 border-b border-violet-900/30"
                    >
                      <div className="flex items-center justify-center">
                        <h3 className="font-semibold text-gray-200 text-sm md:text-base">
                          {isMobile
                            ? "Select outfit to try on"
                            : "Drag & Drop to Try On"}
                        </h3>
                      </div>
                    </div>

                    <div
                      className="relative bg-gradient-to-b from-slate-800 to-slate-900 p-3 md:p-6"
                      onDragOver={handleDragOver}
                      onDragEnter={(e) => e.preventDefault()}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        if (
                          !e.currentTarget.contains(e.relatedTarget as Node)
                        ) {
                          setIsDragging(false);
                        }
                      }}
                      onDrop={handleCanvasDrop}
                    >
                      <canvas
                        ref={canvasRef}
                        className="mx-auto rounded-lg shadow-inner shadow-violet-900/20"
                      />

                      <AnimatePresence>
                        {isDragging && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-3 md:inset-6 pointer-events-none"
                          >
                            <div className="h-full border-4 border-dashed border-violet-400 rounded-xl bg-violet-900/30 flex items-center justify-center">
                              <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-center bg-slate-800 p-4 md:p-6 rounded-2xl shadow-xl"
                              >
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <Wand2 className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                </div>
                                <p className="text-sm md:text-lg font-semibold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                  Release to Try On!
                                </p>
                                <p className="text-xs md:text-sm text-gray-400 mt-1">
                                  AI will process automatically
                                </p>
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {isProcessing && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center z-10"
                          >
                            <div className="text-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="inline-block mb-4"
                              >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                                  <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                </div>
                              </motion.div>
                              <p className="text-lg md:text-xl font-semibold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                Creating Your Look
                              </p>
                              <p className="text-gray-400 text-xs md:text-sm mt-2">
                                AI is processing your try-on...
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 md:p-6"
                  >
                    <div className="mb-3 text-center">
                      <h3 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-1">
                        Your Virtual Try-On Result
                      </h3>
                      <p className="text-gray-400 flex items-center justify-center gap-2 text-xs md:text-base">
                        <ScanLine className="w-3 h-3 md:w-4 md:h-4" />
                        {isMobile
                          ? "Touch and drag to compare"
                          : "Drag to compare before & after"}
                      </p>
                    </div>

                    <div
                      ref={scannerRef}
                      className="relative rounded-xl overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 cursor-ew-resize"
                      onMouseDown={handleScanStart}
                      onTouchStart={handleScanStart}
                    >
                      <div
                        className="relative rounded-lg overflow-hidden"
                        style={{ userSelect: "none" }}
                      >
                        {/* Container to maintain aspect ratio */}
                        <div
                          className="relative w-full"
                          style={{ paddingBottom: "133.33%" }}
                        >
                          {/* Original Image (Before) */}
                          <img
                            src={model.image_url}
                            alt="Original"
                            className="absolute inset-0 w-full h-full object-contain bg-slate-900 rounded-lg"
                            draggable={false}
                          />

                          {/* Result Image (After) - Clipped */}
                          <div
                            className="absolute inset-0 overflow-hidden"
                            style={{
                              clipPath: `inset(0 ${100 - scanPosition}% 0 0)`,
                            }}
                          >
                            <img
                              src={resultImage!}
                              alt="Try-on result"
                              className="absolute inset-0 w-full h-full object-contain bg-slate-900 rounded-lg"
                              draggable={false}
                            />
                          </div>
                        </div>

                        {/* Scanner Line */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-r from-violet-500 to-purple-500 shadow-xl"
                          style={{
                            left: `${scanPosition}%`,
                            transform: "translateX(-50%)",
                          }}
                        >
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="w-8 h-8 md:w-10 md:h-10 bg-slate-800 rounded-full shadow-lg border-2 border-violet-500 flex items-center justify-center"
                            >
                              <Eye className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
                            </motion.div>
                          </div>

                          {/* Labels */}
                          <div className="absolute -left-10 md:-left-12 top-4 bg-slate-800/90 backdrop-blur-sm px-1.5 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-medium text-gray-300 shadow-md">
                            Before
                          </div>
                          <div className="absolute -right-8 md:-right-10 top-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-medium shadow-md">
                            After
                          </div>
                        </div>
                      </div>

                      {/* Percentage Indicator */}
                      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-white px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-medium backdrop-blur-sm">
                        {Math.round(scanPosition)}% New Look
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3 justify-center">
                      <button
                        onClick={handleDownload}
                        className="flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all text-xs md:text-base"
                      >
                        <Download className="w-3 h-3 md:w-4 md:h-4" />
                        Download
                      </button>

                      <button
                        onClick={handleBackToEdit}
                        className="flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-slate-700 text-gray-300 rounded-xl hover:bg-slate-600 transition-all text-xs md:text-base"
                      >
                        <RotateCcw className="w-3 h-3 md:w-4 md:h-4" />
                        Try Another
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Desktop Outfit Library */}
            {!isMobile && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1 h-full min-h-0"
              >
                <OutfitLibrary
                  onSelectOutfit={handleOutfitSelect}
                  onUploadOutfit={handleOutfitSelect}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Outfit Drawer */}
      <AnimatePresence>
        {isMobile && showMobileOutfits && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={() => setShowMobileOutfits(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 bg-slate-800 rounded-t-3xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-700">
                <div className="w-12 h-1 bg-slate-600 rounded-full mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white text-center">
                  Select Outfit
                </h3>
              </div>
              <div className="overflow-auto max-h-[calc(80vh-80px)]">
                <OutfitLibrary
                  onSelectOutfit={handleOutfitSelect}
                  onUploadOutfit={handleOutfitSelect}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleCancelApply}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl shadow-2xl p-4 md:p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-100 mb-1 md:mb-2">
                  Ready to Try On?
                </h3>
                <p className="text-gray-400 text-xs md:text-base">
                  AI will process this outfit on your selected model
                </p>
              </div>

              {pendingOutfit && (
                <div className="mb-4 md:mb-6 p-2.5 md:p-3 bg-slate-700 rounded-xl flex items-center gap-2 md:gap-3">
                  <img
                    src={pendingOutfit.url}
                    alt={pendingOutfit.name}
                    className="w-12 h-16 md:w-16 md:h-20 object-contain bg-slate-600 rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-200 text-xs md:text-sm">
                      {pendingOutfit.name}
                    </p>
                    <p className="text-[10px] md:text-xs text-gray-400 capitalize">
                      {pendingOutfit.category || "Custom"}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 md:gap-3">
                <button
                  onClick={handleCancelApply}
                  className="flex-1 px-3 md:px-4 py-2 md:py-2.5 bg-slate-700 text-gray-300 rounded-xl hover:bg-slate-600 transition-all font-medium text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmApply}
                  className="flex-1 px-3 md:px-4 py-2 md:py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all font-medium text-sm md:text-base"
                >
                  Apply Try-On
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TryOnCanvas;
