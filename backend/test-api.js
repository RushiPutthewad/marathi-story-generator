import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const testAPI = async () => {
  try {
    console.log('Testing Google AI API...');
    console.log('API Key exists:', !!process.env.GOOGLE_API_KEY);
    console.log('API Key length:', process.env.GOOGLE_API_KEY?.length);
    
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    
    // List available models
    console.log('\nListing available models...');
    const models = await genAI.listModels();
    console.log('Available models:');
    models.forEach(model => {
      console.log('- ' + model.name);
    });
    
  } catch (error) {
    console.error('❌ API Error:', error.message);
  }
};

testAPI();