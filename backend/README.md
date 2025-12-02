# Dark Story AI - Backend

Backend API para Dark Story AI construido con Express.js.

## 🚀 Instalación Local

```bash
npm install
```

## 🔧 Configuración

Crea un archivo `.env`:

```
PORT=8080
GEMINI_API_KEY=tu_gemini_api_key
ELEVENLABS_API_KEY=tu_elevenlabs_api_key
```

## 🏃 Ejecutar

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 📡 Endpoints

### Health Check
```
GET /health
```

### Generar Historia
```
POST /api/generate
Body: { "prompt": "a haunted house" }
```

### Generar Audio
```
POST /api/tts
Body: { "text": "story text here" }
```

## 🚀 Deploy a Elastic Beanstalk

Ver [DEPLOYMENT.md](../DEPLOYMENT.md) en la raíz del proyecto.
