# ✅ Backend Listo para Elastic Beanstalk

## 📦 Archivo Creado

**Archivo:** `darkstory-backend-eb.zip`  
**Ubicación:** `c:\Users\pedro\OneDrive\Escritorio\DarkStory\`  
**Tamaño:** ~18.8 KB  

## ✨ Configuración Incluida

### ✅ Backend ya configurado para tu frontend:
```javascript
// CORS configurado en server.js
origin: [
  'https://main.d1zg38s9plz0es.amplifyapp.com',  // ✅ Tu frontend de Amplify
  'http://localhost:3000'                         // Para desarrollo local
]
```

### 📁 Contenido del ZIP:
- ✅ `server.js` - Servidor Express (puerto 8080)
- ✅ `package.json` - Dependencias Node.js
- ✅ `Procfile` - Comando de inicio
- ✅ `.ebextensions/nodecommand.config` - Configuración EB
- ✅ `routes/generate.js` - Endpoint de generación de historias
- ✅ `routes/tts.js` - Endpoint de text-to-speech
- ✅ `.env.example` - Ejemplo de variables de entorno
- ✅ Archivos de configuración

### ❌ Excluido (correcto):
- `node_modules/` - Se instalarán en EB
- `.env` - Variables de entorno (configurar en EB)

## 🚀 Pasos Rápidos para Desplegar

### 1. Subir a Elastic Beanstalk
1. Ve a: https://console.aws.amazon.com/elasticbeanstalk
2. Click en "Create Application"
3. **Platform:** Node.js 18
4. **Upload:** Selecciona `darkstory-backend-eb.zip`

### 2. Configurar Variables de Entorno
En **Configuration → Software → Environment properties**:
```
PORT=8080
NODE_ENV=production
GEMINI_API_KEY=tu_clave_aqui
ELEVENLABS_API_KEY=tu_clave_aqui
```

### 3. Obtener URL del Backend
Después del despliegue obtendrás algo como:
```
http://darkstory-backend.us-east-1.elasticbeanstalk.com
```

### 4. Probar Endpoints
```bash
# Health check
curl http://tu-url.elasticbeanstalk.com/health

# Debería responder:
{"status":"ok","message":"Dark Story API is running"}
```

## 🔗 Conectar Frontend con Backend

Tu frontend en Amplify ya está configurado para usar este backend. Una vez desplegado en EB, el frontend podrá comunicarse con él automáticamente gracias a la configuración CORS.

## 📋 Checklist de Despliegue

- [x] ZIP creado sin `node_modules`
- [x] ZIP creado sin `.env` (seguridad)
- [x] CORS configurado para frontend de Amplify
- [x] Puerto 8080 configurado
- [x] Procfile incluido
- [x] Configuración EB incluida
- [ ] Subir a Elastic Beanstalk
- [ ] Configurar variables de entorno (API keys)
- [ ] Verificar health check
- [ ] Probar endpoints de API

## 📖 Documentación Completa

Para instrucciones detalladas, consulta:
`ELASTIC_BEANSTALK_DEPLOY_INSTRUCTIONS.md`

## 🎯 Resultado Final

Una vez desplegado tendrás:
- ✅ Backend en AWS Elastic Beanstalk
- ✅ Frontend en AWS Amplify
- ✅ Comunicación CORS configurada
- ✅ APIs funcionando (generate + tts)
- ✅ Aplicación completamente en la nube

---

**¡Todo listo para subir a Elastic Beanstalk!** 🚀
