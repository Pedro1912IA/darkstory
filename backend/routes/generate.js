const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Generate story with Gemini
    const storyModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const storyPrompt = `You are a master horror writer. Create a terrifying, atmospheric, and immersive horror story about: ${prompt}. 

Write EXACTLY 1 paragraph. Use vivid descriptions, build tension gradually, and create an impactful ending. Write in English with a literary and terrifying style. Make it concise but powerful.`;

    const storyResult = await storyModel.generateContent(storyPrompt);
    const story = storyResult.response.text();

    // Generate 3 images based on the story using Gemini Imagen
    const imageModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image' });
    
    const imagePrompts = [
      `Create a dark horror scene based on this story: ${story.substring(0, 500)}. Style: cinematic, dark atmosphere, horror movie aesthetic, dramatic lighting`,
      `Create a terrifying illustration inspired by: ${story.substring(0, 500)}. Style: gothic horror, ominous, shadows, eerie atmosphere`,
      `Create a nightmare scene from: ${story.substring(0, 500)}. Style: dark fantasy, haunting, mysterious, horror art`
    ];

    const imagePromises = imagePrompts.map(async (imagePrompt) => {
      try {
        const imageResult = await imageModel.generateContent(imagePrompt);
        const response = imageResult.response;
        
        // Extract base64 image data from response
        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            const imageData = part.inlineData.data;
            return `data:image/png;base64,${imageData}`;
          }
        }
        return null;
      } catch (err) {
        console.error('Error generating image:', err);
        return null;
      }
    });

    const images = await Promise.all(imagePromises);
    const validImages = images.filter((img) => img !== null);

    res.json({
      story,
      images: validImages,
    });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: error.message || 'Failed to generate content' });
  }
});

module.exports = router;
