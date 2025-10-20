import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Download } from 'lucide-react';
import { translations } from '../utils/translations';

const StoryDisplay = ({ story, onDownload, language }) => {
  const t = translations[language];
  const copyToClipboard = () => {
    navigator.clipboard.writeText(story);
    // You could add a toast notification here
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

      <motion.div 
        className="prose prose-lg max-w-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="text-gray-700 dark:text-gray-300 leading-relaxed 
                     font-marathi text-lg whitespace-pre-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
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
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div 
        className="absolute top-4 right-4 w-20 h-20 opacity-10"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-full h-full rounded-full border-4 border-primary-300 border-dashed" />
      </motion.div>
    </motion.div>
  );
};

export default StoryDisplay;