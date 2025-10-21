import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Download } from 'lucide-react';
import { translations } from '../utils/translations';

const StoryWithImages = ({ story, images = [], onDownload, language }) => {
  const t = translations[language];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(story);
  };

  return (
    <motion.div
      className="story-card p-8 mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <motion.h2 
          className={`text-2xl font-bold text-gray-800 dark:text-white ${language === 'mr' ? 'font-marathi' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t.yourStory}
        </motion.h2>
        
        <div className="flex space-x-3">
          <motion.button
            onClick={copyToClipboard}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 
                       dark:bg-gray-700 dark:hover:bg-gray-600
                       text-gray-600 dark:text-gray-300
                       transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={t.copyStory}
          >
            <Copy className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            onClick={onDownload}
            className="p-2 rounded-lg bg-primary-100 hover:bg-primary-200 
                       dark:bg-primary-800 dark:hover:bg-primary-700
                       text-primary-600 dark:text-primary-300
                       transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={t.downloadPDF}
          >
            <Download className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Story with first image on right */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed 
                         font-marathi text-lg whitespace-pre-wrap">
            {story.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  delay: 0.8 + (index * 0.01), 
                  duration: 0.05 
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* First image on right side */}
        {images.length > 0 && (
          <motion.div 
            className="lg:w-80 w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative overflow-hidden rounded-xl aspect-video bg-gray-100 dark:bg-gray-700">
              <img
                src={images[0]}
                alt="Story scene 1"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/320x180/f97316/ffffff?text=Scene+1`;
                }}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Remaining images on left side */}
      {images.length > 1 && (
        <div className="space-y-6">
          {images.slice(1).map((image, index) => (
            <motion.div
              key={index + 1}
              className="flex flex-col lg:flex-row gap-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (index * 0.2) }}
            >
              {/* Image on left */}
              <div className="lg:w-80 w-full lg:order-1 order-2">
                <div className="relative overflow-hidden rounded-xl aspect-video bg-gray-100 dark:bg-gray-700">
                  <img
                    src={image}
                    alt={`Story scene ${index + 2}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/320x180/f97316/ffffff?text=Scene+${index + 2}`;
                    }}
                  />
                </div>
              </div>
              
              {/* Spacer content on right */}
              <div className="flex-1 lg:order-2 order-1 flex items-center">
                <div className="text-center text-gray-500 dark:text-gray-400 font-marathi">
                  दृश्य {index + 2}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default StoryWithImages;