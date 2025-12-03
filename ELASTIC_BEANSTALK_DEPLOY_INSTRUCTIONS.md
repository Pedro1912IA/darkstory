# Instrucciones de Despliegue - Elastic Beanstalk

## 📦 Archivo ZIP Creado
**Archivo:** `darkstory-backend-eb.zip` (~19 KB)
**Ubicación:** `c:\Users\pedro\OneDrive\Escritorio\DarkStory\`

## ✅ Configuración Incluida

El backend ya está configurado para conectarse con tu frontend de Amplify:
- **Frontend URL:** https://main.d1zg38s9plz0es.amplifyapp.com

### Archivos Incluidos en el ZIP:
- ✅ `server.js` - Servidor Express configurado
- ✅ `package.json` - Dependencias y scripts
- ✅ `Procfile` - Comando de inicio para EB
- ✅ `.ebextensions/nodecommand.config` - Configuración de Node.js
- ✅ `routes/` - Rutas de la API (generate.js, tts.js)
- ✅ `.env.example` - Ejemplo de variables de entorno
- ✅ `.gitignore` - Archivos excluidos

### ❌ Archivos NO Incluidos (correcto):
- `node_modules/` - Se instalarán automáticamente en EB
- `.env` - Variables de entorno (se configuran en EB)

## 🚀 Pasos para Desplegar en Elastic Beanstalk

### 1. Acceder a AWS Elastic Beanstalk
1. Ve a la consola de AWS: https://console.aws.amazon.com/
2. Busca "Elastic Beanstalk" en los servicios
3. Haz clic en "Create Application"

### 2. Configurar la Aplicación
- **Application name:** `darkstory-backend`
- **Platform:** Node.js
- **Platform branch:** Node.js 18 running on 64bit Amazon Linux 2023
- **Application code:** Upload your code
- **Source code origin:** Local file
- **Choose file:** Selecciona `darkstory-backend-eb.zip`

### 3. Configurar Variables de Entorno
Antes o después de crear el entorno, ve a:
**Configuration → Software → Environment properties**

Agrega estas variables:
```
PORT=8080
NODE_ENV=production
GEMINI_API_KEY=tu_api_key_de_gemini
ELEVENLABS_API_KEY=tu_api_key_de_elevenlabs
```

### 4. Configurar el Dominio (Opcional)
Si quieres un dominio personalizado:
1. Ve a **Configuration → Load balancer**
2. Agrega un certificado SSL
3. Configura tu dominio en Route 53

### 5. Crear el Entorno
1. Haz clic en "Create application"
2. Espera 5-10 minutos mientras EB:
   - Crea la instancia EC2
   - Instala Node.js
   - Ejecuta `npm install`
   - Inicia el servidor

### 6. Verificar el Despliegue
Una vez completado, obtendrás una URL como:
```
http://darkstory-backend.us-east-1.elasticbeanstalk.com
```

Prueba estos endpoints:
- **Health check:** `http://tu-url.elasticbeanstalk.com/health`
- **API Generate:** `http://tu-url.elasticbeanstalk.com/api/generate`
- **API TTS:** `http://tu-url.elasticbeanstalk.com/api/tts`

## 🔄 Actualizar el Frontend

Una vez que tengas la URL de Elastic Beanstalk, debes actualizar el frontend para que apunte a tu nuevo backend:

1. En tu proyecto frontend, busca donde se define la URL del backend
2. Reemplaza con tu URL de EB: `http://tu-url.elasticbeanstalk.com`
3. Redespliega el frontend en Amplify

## 🔧 Solución de Problemas

### Si el despliegue falla:
1. Ve a **Logs → Request Logs → Last 100 Lines**
2. Descarga los logs para ver errores
3. Verifica que las variables de entorno estén configuradas

### Si hay errores 502:
- Verifica que el puerto sea 8080
- Asegúrate de que el servidor escuche en `0.0.0.0`
- Revisa los logs de la aplicación

### Si hay errores de CORS:
- El backend ya está configurado para aceptar requests de tu frontend
- Si cambias el dominio del frontend, actualiza `server.js` línea 15

## 📝 Notas Importantes

1. **Node Modules:** No incluyas `node_modules` en el ZIP. EB los instalará automáticamente.
2. **Variables de Entorno:** Nunca incluyas `.env` en el ZIP. Configúralas en EB.
3. **Puerto:** El backend usa el puerto 8080 (requerido por EB).
4. **CORS:** Ya está configurado para tu frontend de Amplify.
5. **Costos:** Elastic Beanstalk tiene capa gratuita, pero revisa los límites.

## 🎯 Próximos Pasos

1. ✅ Sube `darkstory-backend-eb.zip` a Elastic Beanstalk
2. ⚙️ Configura las variables de entorno (API keys)
3. 🚀 Despliega y obtén la URL
4. 🔗 Actualiza el frontend con la nueva URL del backend
5. ✨ ¡Tu app estará completamente desplegada!

---

**¿Necesitas ayuda?** Si encuentras algún problema durante el despliegue, revisa los logs de EB o contacta con soporte.
