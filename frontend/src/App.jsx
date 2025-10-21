import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { RefreshCw, Send, Download, Wand2 } from 'lucide-react';

import Header from './components/Header';
import StoryWithImages from './components/StoryWithImages';
import Loader from './components/Loader';
import { translations } from './utils/translations';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('mr'); // Default to Marathi
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [images, setImages] = useState([]);
  const [scenes, setScenes] = useState('');
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [error, setError] = useState('');

  const t = translations[language];

  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Language toggle
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'mr' : 'en');
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Generate story from prompt
  const generateStory = async () => {
    if (!prompt.trim()) {
      setError(t.enterPrompt);
      return;
    }

    setIsGeneratingStory(true);
    setError('');

    try {
      const response = await axios.post('/api/story', { prompt });
      
      if (response.data.success) {
        setStory(response.data.data.story);
        setScenes(response.data.data.scenes);
        // Auto-generate images after story is created
        generateImages(response.data.data.scenes);
      } else {
        throw new Error(response.data.error || 'Story generation failed');
      }
    } catch (error) {
      console.error('Error generating story:', error);
      setError(t.storyError);
    } finally {
      setIsGeneratingStory(false);
    }
  };

  // Generate images from story scenes
  const generateImages = async (storyScenes = scenes) => {
    if (!storyScenes) return;

    setIsGeneratingImages(true);
    
    try {
      const response = await axios.post('/api/image', { 
        scenes: storyScenes, 
        storyTitle: 'Marathi Story' 
      });
      
      if (response.data.success) {
        setImages(response.data.data.images);
      } else {
        throw new Error(response.data.error || 'Image generation failed');
      }
    } catch (error) {
      console.error('Error generating images:', error);
      setError(t.imageError);
    } finally {
      setIsGeneratingImages(false);
    }
  };

  // Regenerate story with same prompt
  const regenerateStory = () => {
    if (prompt) {
      setStory('');
      setImages([]);
      setScenes('');
      generateStory();
    }
  };

  // Download story as PDF
  const downloadPDF = async () => {
    if (!story) return;

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const textWidth = pageWidth - 2 * margin;
      
      // Add title
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('मराठी कथा', pageWidth / 2, 30, { align: 'center' });
      
      // Add story content
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      
      // Since jsPDF doesn't support Devanagari well, we'll use a fallback
      const storyLines = pdf.splitTextToSize(story, textWidth);
      pdf.text(storyLines, margin, 50);
      
      // Add images if available
      if (images.length > 0) {
        let currentPage = 1;
        const imagePromises = images.map(async (imageUrl, index) => {
          try {
            // For demo purposes, we'll add placeholder text for images
            pdf.addPage();
            pdf.setFontSize(14);
            pdf.text(`Image ${index + 1}`, pageWidth / 2, 30, { align: 'center' });
            pdf.setFontSize(10);
            pdf.text(imageUrl, margin, 50);
          } catch (error) {
            console.error(`Error adding image ${index + 1}:`, error);
          }
        });
        
        await Promise.all(imagePromises);
      }
      
      // Save the PDF
      pdf.save('marathi-story.pdf');
    } catch (error) {
      console.error('Error creating PDF:', error);
      setError(t.pdfError);
    }
  };

  // Set document title
  useEffect(() => {
    document.title = language === 'mr' ? 'मराठी कथा जनरेटर | AI Story Generator' : 'Marathi Story Generator | AI Story Generator';
  }, [language]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="relative min-h-screen floating-particles">
        <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
          <Header 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            language={language}
            toggleLanguage={toggleLanguage}
          />
          
          {/* Main Input Section */}
          <motion.div 
            className="story-card p-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className={`text-3xl font-bold text-gray-800 dark:text-white mb-3 ${language === 'mr' ? 'font-marathi' : ''}`}>
                {t.mainTitle}
              </h2>
              <p className={`text-gray-600 dark:text-gray-300 ${language === 'mr' ? 'font-marathi' : ''}`}>
                {t.mainSubtitle}
              </p>
            </motion.div>

            <div className="space-y-4">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={t.placeholder}
                  className={`w-full p-4 border border-gray-300 dark:border-gray-600 
                           rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent
                           bg-white dark:bg-gray-700 text-gray-800 dark:text-white
                           placeholder-gray-500 dark:placeholder-gray-400
                           ${language === 'mr' ? 'font-marathi' : ''} text-lg resize-none transition-all duration-300`}
                  rows="4"
                  disabled={isGeneratingStory || isGeneratingImages}
                />
              </motion.div>

              <div className="flex flex-wrap gap-3 justify-center">
                <motion.button
                  onClick={generateStory}
                  disabled={isGeneratingStory || isGeneratingImages || !prompt.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isGeneratingStory ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span className={language === 'mr' ? 'font-marathi' : ''}>{t.generating}</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span className={language === 'mr' ? 'font-marathi' : ''}>{t.generateBtn}</span>
                    </>
                  )}
                </motion.button>

                {story && (
                  <motion.button
                    onClick={regenerateStory}
                    disabled={isGeneratingStory || isGeneratingImages}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span className={language === 'mr' ? 'font-marathi' : ''}>{t.regenerateBtn}</span>
                  </motion.button>
                )}

                {story && (
                  <motion.button
                    onClick={downloadPDF}
                    className="btn-secondary flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Download className="w-4 h-4" />
                    <span className={language === 'mr' ? 'font-marathi' : ''}>{t.downloadBtn}</span>
                  </motion.button>
                )}
              </div>

              {/* Suggestion prompts */}
              {!story && (
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className={`text-sm text-gray-500 dark:text-gray-400 mb-3 ${language === 'mr' ? 'font-marathi' : ''}`}>
                    {t.suggestionsTitle}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {t.suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setPrompt(suggestion)}
                        className={`px-3 py-1 text-sm bg-primary-100 dark:bg-primary-800 
                                 text-primary-700 dark:text-primary-300 rounded-full
                                 hover:bg-primary-200 dark:hover:bg-primary-700
                                 transition-all duration-200 ${language === 'mr' ? 'font-marathi' : ''}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                className={`mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800
                           text-red-700 dark:text-red-300 rounded-xl ${language === 'mr' ? 'font-marathi' : ''}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading States */}
          <AnimatePresence>
            {isGeneratingStory && <Loader type="story" language={language} />}
            {isGeneratingImages && <Loader type="image" language={language} />}
          </AnimatePresence>

          {/* Story with Images */}
          <AnimatePresence>
            {story && (
              <StoryWithImages 
                story={story}
                images={images}
                onDownload={downloadPDF}
                language={language}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;