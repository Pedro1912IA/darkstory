# 🚀 Deployment Guide

Este proyecto está dividido en dos partes:
- **Frontend**: Next.js (desplegado en AWS Amplify)
- **Backend**: Express.js (desplegado en AWS Elastic Beanstalk)

## 📦 Backend - AWS Elastic Beanstalk

### Paso 1: Preparar el Backend

```bash
cd backend
npm install
```

### Paso 2: Crear archivo .env

Crea un archivo `.env` en la carpeta `backend/`:

```
PORT=8080
GEMINI_API_KEY=tu_gemini_api_key
ELEVENLABS_API_KEY=tu_elevenlabs_api_key
```

### Paso 3: Crear aplicación en Elastic Beanstalk

1. Ve a [AWS Elastic Beanstalk Console](https://console.aws.amazon.com/elasticbeanstalk/)
2. Haz clic en "Create Application"
3. Configuración:
   - **Application name**: dark-story-backend
   - **Platform**: Node.js
   - **Platform branch**: Node.js 18
   - **Application code**: Upload your code

### Paso 4: Preparar el código para subir

```bash
cd backend
zip -r backend.zip . -x "node_modules/*" -x ".git/*"
```

En Windows PowerShell:
```powershell
Compress-Archive -Path backend\* -DestinationPath backend.zip -Force
```

### Paso 5: Subir el código

1. En Elastic Beanstalk, sube el archivo `backend.zip`
2. Espera a que se despliegue

### Paso 6: Configurar Variables de Entorno

1. En tu aplicación de Elastic Beanstalk, ve a "Configuration"
2. En "Software", haz clic en "Edit"
3. En "Environment properties", agrega:
   - `GEMINI_API_KEY`: tu_gemini_api_key
   - `ELEVENLABS_API_KEY`: tu_elevenlabs_api_key
   - `PORT`: 8080
4. Guarda los cambios

### Paso 7: Obtener la URL del Backend

Tu backend estará disponible en:
```
http://dark-story-backend.us-east-1.elasticbeanstalk.com
```

Copia esta URL, la necesitarás para el frontend.

---

## 🎨 Frontend - AWS Amplify

### Paso 1: Actualizar la URL del Backend

1. En el archivo `.env.production`, actualiza:

```
NEXT_PUBLIC_API_URL=http://tu-backend-url.elasticbeanstalk.com
```

2. Haz commit y push:

```bash
git add .env.production
git commit -m "Update backend URL for production"
git push origin main
```

### Paso 2: Desplegar en Amplify

1. Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Haz clic en "New app" > "Host web app"
3. Conecta tu repositorio de GitHub
4. Selecciona el repositorio `darkstory`
5. Amplify detectará automáticamente Next.js

### Paso 3: Configurar Build Settings

Amplify usará el archivo `amplify.yml` automáticamente. Si necesitas editarlo:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### Paso 4: Configurar Variables de Entorno

1. En Amplify Console, ve a "Environment variables"
2. Agrega:
   - `NEXT_PUBLIC_API_URL`: URL de tu backend de Elastic Beanstalk
3. Guarda

### Paso 5: Deploy

1. Haz clic en "Save and deploy"
2. Espera a que termine el despliegue
3. Tu app estará disponible en: `https://main.xxxxx.amplifyapp.com`

---

## 🔧 Configuración CORS

Si tienes problemas de CORS, actualiza el backend:

En `backend/server.js`, cambia:

```javascript
app.use(cors());
```

Por:

```javascript
app.use(cors({
  origin: 'https://main.xxxxx.amplifyapp.com', // Tu URL de Amplify
  credentials: true
}));
```

---

## ✅ Verificación

### Backend:
```bash
curl http://tu-backend-url.elasticbeanstalk.com/health
```

Deberías ver: `{"status":"ok","message":"Dark Story API is running"}`

### Frontend:
Visita tu URL de Amplify y prueba generar una historia.

---

## 📝 Notas Importantes

1. **Seguridad**: Las API keys están solo en el backend (Elastic Beanstalk)
2. **CORS**: Asegúrate de configurar CORS correctamente
3. **Costos**: Elastic Beanstalk y Amplify tienen costos asociados
4. **Logs**: Revisa los logs en CloudWatch si hay errores

---

## 🆘 Troubleshooting

### Error: "Failed to generate story"
- Verifica que las API keys estén configuradas en Elastic Beanstalk
- Revisa los logs en CloudWatch

### Error: CORS
- Actualiza la configuración de CORS en el backend
- Asegúrate de que la URL de Amplify esté permitida

### Backend no responde
- Verifica que el health check funcione: `/health`
- Revisa los logs en Elastic Beanstalk
