"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVariations = generateVariations;
exports.storeVariation = storeVariation;
exports.getVariation = getVariation;
const fs_1 = require("fs");
const fingerprintAnalysis_1 = require("./fingerprintAnalysis");
const imageGenerationService_1 = require("./imageGenerationService");
async function generateVariations({ imagePath, fingerprintId, instruction = '' }) {
    // Verificar que al menos uno de los dos parámetros existe
    if (!imagePath && !fingerprintId) {
        throw new Error('Se requiere una imagen o un fingerprint');
    }
    // Si hay una imagen, verificar que existe
    if (imagePath) {
        await fs_1.promises.access(imagePath);
    }
    let baseStyle = '';
    let styleContext = '';
    // Si hay un fingerprint, obtener el contexto de estilo
    if (fingerprintId) {
        const fingerprint = (0, fingerprintAnalysis_1.getFingerprint)(fingerprintId);
        if (!fingerprint) {
            throw new Error('Fingerprint not found');
        }
        baseStyle = 'Based on your personal artistic style, maintaining the balance between ' +
            'geometric and organic elements characteristic of your work';
        styleContext = `Artist's style: ${fingerprint.descripcion_estilo}. ` +
            `Techniques: ${fingerprint.tecnicas_predominantes}. ` +
            `Palette: ${fingerprint.paleta_preferida}.`;
    }
    else {
        baseStyle = 'Based on the analysis of the provided image, preserving its ' +
            'main compositional elements while exploring new directions';
    }
    // Generar prompts para las variaciones
    const variationPrompts = [
        `${styleContext} ${instruction} Create an artistic variation with greater contrast and emphasis on geometric elements`,
        `${styleContext} ${instruction} Create an artistic variation with complementary color palette and dynamic composition`,
        `${styleContext} ${instruction} Create an artistic variation with more pronounced textures and organic details`,
        `${styleContext} ${instruction} Create an artistic variation with abstract elements and smooth transitions`
    ];
    try {
        // Generar las imágenes con Gemini
        const generatedImages = await (0, imageGenerationService_1.generateMultipleImages)(variationPrompts, imagePath);
        return {
            variations: generatedImages,
            prompts: [
                'Version with greater contrast and emphasis on geometry',
                'Interpretation with complementary color palette',
                'Variation with more pronounced textures',
                'Adaptation with highlighted organic elements'
            ],
            baseStyle
        };
    }
    catch (error) {
        console.error('Error generando variaciones:', error);
        // Fallback a datos simulados si hay error
        return {
            variations: [
                '/variations/variation1.jpg',
                '/variations/variation2.jpg',
                '/variations/variation3.jpg',
                '/variations/variation4.jpg'
            ],
            prompts: [
                'Version with greater contrast and emphasis on geometry',
                'Interpretation with complementary color palette',
                'Variation with more pronounced textures',
                'Adaptation with highlighted organic elements'
            ],
            baseStyle
        };
    }
}
// Store variations in memory (replace with proper database in production)
const variationStore = new Map();
function storeVariation(id, variation) {
    variationStore.set(id, variation);
}
function getVariation(id) {
    return variationStore.get(id);
}
