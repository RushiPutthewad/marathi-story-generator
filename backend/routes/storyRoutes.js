import express from 'express';
import { generateStory, generateImages } from '../controllers/storyController.js';

const router = express.Router();

// POST /api/story - Generate Marathi story
router.post('/story', generateStory);



// POST /api/image - Generate story images
router.post('/image', generateImages);

export default router;