import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, ZoomIn } from 'lucide-react';
import { translations } from '../utils/translations';

const ImageGallery = ({ images = [], language }) => {
  const t = translations[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const downloadImage = (imageUrl, index) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `story-image-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!images.length) return null;

  return (
    <motion.div
      className="story-card p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <motion.h3 
        className={`text-xl font-bold text-gray-800 dark:text-white mb-6 ${language === 'mr' ? 'font-marathi' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {t.storyImages}
      </motion.h3>

      {/* Main Image Display */}
      <div className="relative mb-4">
        <motion.div
          className="relative overflow-hidden rounded-xl aspect-video bg-gray-100 dark:bg-gray-700"
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={images[currentIndex]}
            alt={`Story scene ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/800x450/f97316/ffffff?text=Scene+${currentIndex + 1}`;
            }}
          />
          
          {/* Image Controls Overlay */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 
                          flex items-center justify-center opacity-0 hover:opacity-100">
            <div className="flex space-x-3">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white
                           hover:bg-white/30 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={t.zoomIn}
              >
                <ZoomIn className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                onClick={() => downloadImage(images[currentIndex], currentIndex)}
                className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white
                           hover:bg-white/30 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={t.downloadImage}
              >
                <Download className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <motion.button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full 
                         bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                         text-gray-800 dark:text-white shadow-lg
                         hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full 
                         bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                         text-gray-800 dark:text-white shadow-lg
                         hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 px-3 py-1 rounded-full 
                        bg-black/50 backdrop-blur-sm text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex space-x-3 justify-center">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                index === currentIndex
                  ? 'border-primary-500 shadow-lg'
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-16 object-cover"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/64x64/f97316/ffffff?text=${index + 1}`;
                }}
              />
            </motion.button>
          ))}
        </div>
      )}

      {/* Modal for Full Size View */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[currentIndex]}
                alt={`Story scene ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              <motion.button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white
                           hover:bg-black/70 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImageGallery;