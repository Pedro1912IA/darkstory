"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const art_1 = require("./routes/art");
const test_1 = require("./routes/test");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Configure multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
// Middleware
app.use((0, cors_1.default)({
    origin: ['https://main.d3cwtmj2n19m0s.amplifyapp.com', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Disposition'],
    credentials: true
}));
app.use(express_1.default.json());
// Servir archivos estáticos con headers apropiados para descarga
app.use('/uploads', express_1.default.static('uploads', {
    setHeaders: (res, path) => {
        res.setHeader('Content-Disposition', 'attachment');
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
}));
app.use('/generated', express_1.default.static('uploads/generated', {
    setHeaders: (res, path) => {
        res.setHeader('Content-Disposition', 'attachment');
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
}));
// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Art Mind API',
        status: 'running',
        version: '1.0.0',
        endpoints: {
            api: '/api',
            test: '/test',
            health: '/health'
        }
    });
});
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});
app.use('/api', art_1.router);
app.use('/test', test_1.router);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// Aumentar el timeout del servidor para operaciones largas como generación de imágenes
// 5 minutos (300000ms) para permitir la generación de múltiples imágenes
server.timeout = 300000;
server.keepAliveTimeout = 310000; // Debe ser mayor que timeout
