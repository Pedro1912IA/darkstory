"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const artAnalysis_1 = require("../services/artAnalysis");
const collectionService_1 = require("../services/collectionService");
const variationService_1 = require("../services/variationService");
const fingerprintAnalysis_1 = require("../services/fingerprintAnalysis");
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
});
// Analyze artwork
router.post('/analyze-art', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image provided' });
        }
        const analysis = await (0, artAnalysis_1.analyzeArtwork)(req.file.path);
        res.json(analysis);
    }
    catch (error) {
        res.status(500).json({ error: 'Error analyzing artwork' });
    }
});
// Create artistic fingerprint
router.post('/fingerprint', upload.array('images', 10), async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No images provided' });
        }
        const { generateFingerprint } = await Promise.resolve().then(() => __importStar(require('../services/fingerprintAnalysis')));
        const imagePaths = files.map(file => file.path);
        const fingerprint = await generateFingerprint(imagePaths);
        // Store the fingerprint for later use
        (0, fingerprintAnalysis_1.storeFingerprint)(fingerprint);
        res.json(fingerprint);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating fingerprint' });
    }
});
// Generate variations
router.post('/variations', upload.single('image'), async (req, res) => {
    try {
        const { fingerprintId, instruction } = req.body;
        if (!req.file && !fingerprintId) {
            return res.status(400).json({ error: 'Se requiere una imagen o un fingerprint' });
        }
        const variations = await (0, variationService_1.generateVariations)({
            imagePath: req.file?.path,
            fingerprintId,
            instruction
        });
        res.json(variations);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Fingerprint no encontrado') {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: error.message });
            }
        }
        else {
            res.status(500).json({ error: 'Error generando variaciones' });
        }
    }
});
// Create collection
router.post('/create-collection', async (req, res) => {
    try {
        const { fingerprintId, quantity } = req.body;
        if (!fingerprintId) {
            return res.status(400).json({ error: 'Missing fingerprint ID' });
        }
        const collection = await (0, collectionService_1.createCollection)(fingerprintId, quantity);
        res.json(collection);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Fingerprint not found') {
            res.status(404).json({ error: 'Fingerprint not found' });
        }
        else {
            res.status(500).json({ error: 'Error creating collection' });
        }
    }
});
