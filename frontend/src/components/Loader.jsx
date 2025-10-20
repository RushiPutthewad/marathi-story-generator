import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Image } from 'lucide-react';
import { translations } from '../utils/translations';

const Loader = ({ type = 'story', language = 'mr' }) => {
  const t = translations[language];
  const icons = {
    story: BookOpen,
    image: Image,
    general: Sparkles
  };

  const Icon = icons[type];

  const messages = {
    story: t.generatingStory,
    image: t.generatingImages,
    general: t.pleaseWait
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated Icon */}
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="p-6 rounded-full gradient-bg shadow-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
        
        {/* Floating particles around the icon */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              x: Math.cos((i * 60 * Math.PI) / 180) * 40,
              y: Math.sin((i * 60 * Math.PI) / 180) * 40,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Loading Message */}
      <motion.p 
        className={`mt-6 text-lg font-medium text-gray-700 dark:text-gray-300 ${language === 'mr' ? 'font-marathi' : ''}`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {messages[type]}
      </motion.p>

      {/* Progress Dots */}
      <div className="flex space-x-2 mt-4">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary-500 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Loader;