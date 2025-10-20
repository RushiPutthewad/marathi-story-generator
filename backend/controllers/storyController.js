import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Generate Marathi story using Google AI Studio
export const generateStory = async (req, res) => {
  try {
    console.log('API Key exists:', !!process.env.GOOGLE_API_KEY);
    console.log('API Key length:', process.env.GOOGLE_API_KEY?.length);
    
    const prompt = req.body.prompt;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required.' });
    }

    // Use gemini-1.5-flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const storyPrompt = `
वापरकर्त्याने दिलेल्या कल्पनेवर आधारित एक सुंदर, प्रेरणादायी मराठी गोष्ट तयार करा.
गोष्ट मध्ये नैतिकता असावी आणि सोप्या भाषेत सांगावी.
गोष्ट कमीत कमी 300 शब्द आणि जास्तीत जास्त 500 शब्दांची असावी.
गोष्ट रंजक आणि मुलांसाठी योग्य असावी.

महत्त्वाचे: फक्त मराठी भाषेत उत्तर द्या. इंग्रजी किंवा इतर कोणत्याही भाषेत उत्तर देऊ नका.

कल्पना: ${prompt}

मराठी गोष्ट:`;

    const result = await model.generateContent(storyPrompt);
    const response = await result.response;
    const story = response.text();

    // Extract key scenes for image generation
    const imagePrompt = `Based on this Marathi story, provide 3 key visual scenes in English that would make good illustrations. Just list them as: Scene 1: [description], Scene 2: [description], Scene 3: [description]\n\nStory: ${story}`;

    const imageResult = await model.generateContent(imagePrompt);
    const imageResponse = await imageResult.response;
    const scenes = imageResponse.text();

    res.json({
      success: true,
      data: {
        story: story.trim(),
        scenes: scenes.trim(),
        timestamp: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate story',
      message: error.message,
    });
  }
};

// Generate images based on story content
export const generateImages = async (req, res) => {
  try {
    const { scenes, storyTitle } = req.body;

    if (!scenes) {
      return res.status(400).json({
        success: false,
        error: 'Scenes are required for image generation',
      });
    }

    // For demo purposes, we'll return placeholder images
    // In production, you'd integrate with Google's Imagen API or similar
    const imageUrls = [
      `https://picsum.photos/800/600?random=1&text=${encodeURIComponent('Scene 1')}`,
      `https://picsum.photos/800/600?random=2&text=${encodeURIComponent('Scene 2')}`,
      `https://picsum.photos/800/600?random=3&text=${encodeURIComponent('Scene 3')}`,
    ];

    res.json({
      success: true,
      data: {
        images: imageUrls,
        scenes: scenes,
        timestamp: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Error generating images:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate images',
      message: error.message,
    });
  }
};