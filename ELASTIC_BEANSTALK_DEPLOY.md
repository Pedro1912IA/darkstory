# 🚀 Desplegar Backend en Elastic Beanstalk

## 📦 Archivo Preparado

El archivo **`backend-deploy.zip`** está listo para subir a AWS Elastic Beanstalk.

### ✅ Incluye:
- ✅ Servidor Express.js configurado
- ✅ CORS configurado para: `https://main.d1zg38s9plz0es.amplifyapp.com`
- ✅ API keys incluidas
- ✅ Rutas de API: `/api/generate` y `/api/tts`
- ✅ Health check: `/health`
- ✅ Configuración de Elastic Beanstalk

---

## 🚀 PASOS PARA DESPLEGAR

### 1️⃣ Ir a AWS Elastic Beanstalk

Abre: https://console.aws.amazon.com/elasticbeanstalk/

### 2️⃣ Crear Nueva Aplicación

1. Haz clic en **"Create Application"**
2. Completa:
   - **Application name**: `dark-story-backend`
   - **Platform**: Node.js
   - **Platform branch**: Node.js 18 running on 64bit Amazon Linux 2023
   - **Application code**: Upload your code

### 3️⃣ Subir el ZIP

1. Selecciona **"Upload your code"**
2. Haz clic en **"Choose file"**
3. Selecciona: **`backend-deploy.zip`** (está en la raíz del proyecto)
4. **Version label**: `v1.0` (o el nombre que prefieras)

### 4️⃣ Configurar (Opcional)

En **"Configure more options"**:
- **Presets**: Single instance (free tier eligible)
- **Environment properties**: Ya están en el `.env` del ZIP

### 5️⃣ Crear Aplicación

1. Haz clic en **"Create application"**
2. Espera 5-10 minutos mientras se despliega
3. Verás el progreso en tiempo real

### 6️⃣ Obtener la URL

Una vez completado, verás:
```
✅ Environment health: Ok
URL: http://dark-story-backend-env.eba-xxxxxxxx.us-east-1.elasticbeanstalk.com
```

**¡COPIA ESTA URL!**

---

## ✅ Verificar que Funciona

### Probar Health Check:

Abre en tu navegador o usa curl:
```
http://tu-backend-url.elasticbeanstalk.com/health
```

Deberías ver:
```json
{"status":"ok","message":"Dark Story API is running"}
```

---

## 🔄 Actualizar el Frontend en Amplify

### Paso 1: Ir a Amplify Console

https://console.aws.amazon.com/amplify/

### Paso 2: Configurar Variable de Entorno

1. Selecciona tu app: `dark-story-ai`
2. Ve a **"Environment variables"** (menú izquierdo)
3. Haz clic en **"Manage variables"**
4. Agrega o actualiza:
   - **Variable**: `NEXT_PUBLIC_API_URL`
   - **Value**: `http://tu-backend-url.elasticbeanstalk.com` (la URL que copiaste)
5. Haz clic en **"Save"**

### Paso 3: Redesplegar Frontend

1. Ve a la pestaña **"Deployments"**
2. Haz clic en **"Redeploy this version"**
3. O simplemente haz un push a GitHub y se redesplegará automáticamente

---

## 🎉 ¡LISTO!

Tu aplicación completa está funcionando:

- **Frontend**: https://main.d1zg38s9plz0es.amplifyapp.com
- **Backend**: http://tu-backend-url.elasticbeanstalk.com

### Probar la Aplicación:

1. Abre el frontend en tu navegador
2. Selecciona una categoría de terror
3. Haz clic en "Generate Story"
4. Deberías ver:
   - ✅ Historia generada
   - ✅ Audio narrado
   - ✅ 3 imágenes de terror

---

## 🔧 Troubleshooting

### ❌ Error: "Application failed to start"

**Solución:**
1. Ve a Elastic Beanstalk Console
2. Haz clic en tu aplicación
3. Ve a **"Logs"** → **"Request Logs"** → **"Last 100 Lines"**
4. Revisa los errores

### ❌ Error: CORS en el navegador

**Solución:**
1. Verifica que la URL del frontend en `server.js` sea correcta
2. Asegúrate de que no haya espacios o caracteres extra
3. Redespliega el backend si hiciste cambios

### ❌ Error: "Cannot connect to backend"

**Solución:**
1. Verifica que el health check funcione
2. Asegúrate de que `NEXT_PUBLIC_API_URL` esté en Amplify
3. Revisa que la URL no tenga `/` al final

### ❌ Error: "Failed to generate story"

**Solución:**
1. Verifica que las API keys sean correctas
2. Revisa los logs en CloudWatch
3. Asegúrate de que las APIs de Gemini y ElevenLabs estén activas

---

## 💰 Costos Estimados

- **Elastic Beanstalk**: ~$15-30/mes (t2.micro)
- **Amplify**: Tier gratuito generoso, luego ~$0.01/GB
- **APIs**:
  - Gemini: Según uso
  - ElevenLabs: Según uso

**Tip**: Usa el tier gratuito de AWS para el primer año.

---

## 🔒 Seguridad

✅ API keys solo en el backend (no expuestas)
✅ CORS configurado correctamente
✅ Variables de entorno protegidas
✅ HTTPS recomendado para producción

---

## 📝 Próximos Pasos (Opcional)

1. **Configurar HTTPS**: Usa AWS Certificate Manager
2. **Dominio personalizado**: Configura Route 53
3. **Monitoreo**: Configura CloudWatch Alarms
4. **Backup**: Configura snapshots automáticos

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Elastic Beanstalk
2. Verifica la consola del navegador (F12)
3. Prueba el health check del backend
4. Asegúrate de que las API keys sean válidas
