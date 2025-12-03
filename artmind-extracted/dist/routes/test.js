"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const imageGenerationService_1 = require("../services/imageGenerationService");
const router = (0, express_1.Router)();
exports.router = router;
// Endpoint de prueba para generación de imágenes
router.get('/test-image-gen', async (req, res) => {
    try {
        console.log('Iniciando prueba de generación de imagen...');
        const imagePath = await (0, imageGenerationService_1.generateImage)({
            prompt: 'Create a simple abstract painting with geometric shapes in vibrant colors',
            outputPath: 'test-generation.png'
        });
        console.log('Imagen generada exitosamente:', imagePath);
        res.json({
            success: true,
            message: 'Imagen generada exitosamente',
            imagePath: imagePath,
            imageUrl: `http://localhost:3001${imagePath}`
        });
    }
    catch (error) {
        console.error('Error en prueba de generación:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
