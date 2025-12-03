# 📦 Frontend y Backend Separados

## ✅ Estructura Actual

### Frontend (Amplify)
- **Ubicación**: Raíz del proyecto
- **Tecnología**: Next.js 14
- **Archivos principales**:
  - `/app` - Páginas y componentes
  - `/components` - Componentes React
  - `/public` - Archivos estáticos
  - `amplify.yml` - Configuración de Amplify
  - `.amplifyignore` - Ignora carpeta backend

### Backend (Elastic Beanstalk)
- **Ubicación**: `/backend`
- **Tecnología**: Express.js
- **Archivos principales**:
  - `server.js` - Servidor Express
  - `/routes` - API endpoints
  - `package.json` - Dependencias del backend

## 🔄 Flujo de Datos

```
Usuario → Frontend (Amplify) → Backend (Elastic Beanstalk) → APIs (Gemini, ElevenLabs)
```

## 🚀 Despliegue

### 1. Backend Primero (Elastic Beanstalk)

```bash
cd backend
npm install
```

Crear `.env`:
```
PORT=8080
GEMINI_API_KEY=tu_key
ELEVENLABS_API_KEY=tu_key
```

Comprimir:
```powershell
Compress-Archive -Path backend\* -DestinationPath backend.zip -Force
```

Subir a Elastic Beanstalk y obtener URL.

### 2. Frontend Después (Amplify)

1. Actualizar `.env.production`:
```
NEXT_PUBLIC_API_URL=http://tu-backend.elasticbeanstalk.com
```

2. Push a GitHub:
```bash
git add .env.production
git commit -m "Update backend URL"
git push origin main
```

3. Amplify desplegará automáticamente

## ⚠️ Importante

- **NO** hay API routes en el frontend (`/app/api` está vacío)
- **Todas** las llamadas a APIs externas se hacen desde el backend
- **Las API keys** solo están en el backend
- **El frontend** solo hace fetch al backend

## 🔒 Seguridad

✅ API keys protegidas en el backend
✅ Frontend no tiene acceso directo a APIs
✅ CORS configurado correctamente
✅ Variables de entorno separadas

## 📝 Variables de Entorno

### Frontend (.env.production)
```
NEXT_PUBLIC_API_URL=http://backend-url
```

### Backend (.env)
```
PORT=8080
GEMINI_API_KEY=xxx
ELEVENLABS_API_KEY=xxx
```
