import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles, Languages } from 'lucide-react';
import { translations } from '../utils/translations';

const Header = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const t = translations[language];
  return (
    <motion.header 
      className="relative z-10 flex items-center justify-between p-6"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="flex items-center space-x-3"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div
          className="p-2 rounded-full gradient-bg"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold text-gray-800 dark:text-white ${language === 'mr' ? 'font-marathi' : ''}`}>
            {t.appTitle}
          </h1>
          <p className={`text-sm text-gray-600 dark:text-gray-300 ${language === 'mr' ? 'font-marathi' : ''}`}>
            {t.appSubtitle}
          </p>
        </div>
      </motion.div>

      <div className="flex items-center space-x-3">
        {/* Language Toggle */}
        <motion.button
          onClick={toggleLanguage}
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                     hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={language === 'en' ? 'Switch to Marathi' : 'Switch to English'}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: language === 'en' ? 0 : 180 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-1"
          >
            <Languages className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'मर' : 'EN'}
            </span>
          </motion.div>
        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          onClick={toggleDarkMode}
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                     hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: darkMode ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </motion.div>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;