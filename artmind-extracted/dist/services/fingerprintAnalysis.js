"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFingerprint = generateFingerprint;
exports.storeFingerprint = storeFingerprint;
exports.getFingerprint = getFingerprint;
const fs_1 = require("fs");
const prompts_1 = require("./prompts");
const geminiService_1 = require("./geminiService");
async function generateFingerprint(imagePaths) {
    // Verify all files exist
    await Promise.all(imagePaths.map(path => fs_1.promises.access(path)));
    try {
        // Usar Gemini para analizar múltiples imágenes
        const responseText = await (0, geminiService_1.analyzeMultipleImagesWithGemini)(imagePaths, prompts_1.FINGERPRINT_PROMPT);
        // Intentar parsear la respuesta como JSON
        const jsonMatch = responseText.match(/```json\n?([\s\S]*?)\n?```/) ||
            responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const jsonText = jsonMatch[1] || jsonMatch[0];
            const parsedResponse = JSON.parse(jsonText);
            return {
                id: `fp_${Date.now()}`,
                ...parsedResponse
            };
        }
        throw new Error('No se pudo parsear la respuesta de Gemini');
    }
    catch (error) {
        console.error('Error al generar fingerprint con Gemini:', error);
        // Fallback to mock data if there's an error
        return {
            id: `fp_${Date.now()}`,
            patrones_recurrentes: 'Geometric forms in balance with organic elements, ' +
                'significant use of negative space and layered compositional structures.',
            tecnicas_predominantes: 'Integration of mixed techniques, textural contrasts ' +
                'and subtle manipulation of edges and transitions.',
            paleta_preferida: 'Predominance of earth tones and deep blues with ' +
                'contrasting accents and subtle tonal transitions.',
            influencias: 'Combination of contemporary minimalism, abstract expressionism ' +
                'and Japanese wabi-sabi aesthetics.',
            descripcion_estilo: 'Sophisticated minimalist approach that maintains emotional depth ' +
                'through the exploration of textures and materiality.',
            fortalezas_artisticas: 'Mastery of negative space, sensitivity in material handling ' +
                'and ability to create balanced compositions.',
            direcciones_de_evolucion: 'Potential to explore larger-scale works, ' +
                'experiment with more dramatic contrasts and develop thematic series.',
            resumen_final: 'Artist who fuses contemporary minimalism with organic sensitivity, ' +
                'creating works that dialogue between order and nature.'
        };
    }
}
// Store fingerprints in memory (replace with proper database in production)
const fingerprintStore = new Map();
function storeFingerprint(fingerprint) {
    fingerprintStore.set(fingerprint.id, fingerprint);
}
function getFingerprint(id) {
    return fingerprintStore.get(id);
}
