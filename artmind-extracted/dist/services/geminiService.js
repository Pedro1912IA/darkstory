"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeImageWithGemini = analyzeImageWithGemini;
exports.analyzeMultipleImagesWithGemini = analyzeMultipleImagesWithGemini;
exports.generateTextWithGemini = generateTextWithGemini;
const genai_1 = require("@google/genai");
const fs_1 = require("fs");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ai = new genai_1.GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || ''
});
async function analyzeImageWithGemini(imagePath, prompt) {
    try {
        console.log('Analyzing image with Gemini Vision...');
        console.log('Image path:', imagePath);
        // Read the image and convert to base64
        const imageBuffer = await fs_1.promises.readFile(imagePath);
        const base64Image = imageBuffer.toString('base64');
        const mimeType = getMimeType(imagePath);
        console.log('Image loaded, sending to Gemini...');
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: [
                {
                    inlineData: {
                        data: base64Image,
                        mimeType: mimeType,
                    },
                },
                { text: prompt }
            ],
        });
        console.log('Response received from Gemini');
        return response.text || '';
    }
    catch (error) {
        console.error('Error calling Gemini API:', error);
        throw new Error('Error analyzing image with Gemini');
    }
}
async function analyzeMultipleImagesWithGemini(imagePaths, prompt) {
    try {
        console.log('Analyzing multiple images with Gemini Vision...');
        // Prepare all images
        const imageParts = await Promise.all(imagePaths.map(async (imagePath) => {
            const imageBuffer = await fs_1.promises.readFile(imagePath);
            const base64Image = imageBuffer.toString('base64');
            const mimeType = getMimeType(imagePath);
            return {
                inlineData: {
                    data: base64Image,
                    mimeType: mimeType,
                },
            };
        }));
        console.log(`Loaded ${imageParts.length} images, sending to Gemini...`);
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: [...imageParts, { text: prompt }],
        });
        console.log('Response received from Gemini');
        return response.text || '';
    }
    catch (error) {
        console.error('Error calling Gemini API:', error);
        throw new Error('Error analyzing images with Gemini');
    }
}
async function generateTextWithGemini(prompt) {
    try {
        console.log('Generating text with Gemini...');
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: prompt,
        });
        console.log('Response received from Gemini');
        return response.text || '';
    }
    catch (error) {
        console.error('Error calling Gemini API:', error);
        throw new Error('Error generating text with Gemini');
    }
}
function getMimeType(filePath) {
    const extension = filePath.split('.').pop()?.toLowerCase();
    const mimeTypes = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
    };
    return mimeTypes[extension || ''] || 'image/jpeg';
}
