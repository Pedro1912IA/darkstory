# 🚀 Cómo Subir el Backend a Elastic Beanstalk - CORREGIDO

## ✅ Archivo ZIP Listo

**Archivo:** `darkstory-backend-eb.zip` (~18.5 KB)  
**Ubicación:** `c:\Users\pedro\OneDrive\Escritorio\DarkStory\`

✅ **ZIP CORREGIDO** - Archivos en la raíz (no en carpetas)

## 📋 Contenido Verificado

```
darkstory-backend-eb.zip
├── server.js                    ✅ Servidor principal
├── package.json                 ✅ Dependencias
├── package-lock.json            ✅ Lock file
├── Procfile                     ✅ Comando de inicio
├── .ebextensions/
│   └── nodecommand.config       ✅ Configuración EB
├── routes/
│   ├── generate.js              ✅ API de historias
│   └── tts.js                   ✅ API de audio
├── .env.example                 ✅ Ejemplo de variables
├── .gitignore
├── README.md
└── DEPLOY_INSTRUCTIONS.md
```

## 🔴 PROBLEMA ANTERIOR

El error anterior fue que Elastic Beanstalk instaló la **aplicación de ejemplo** en lugar de tu código porque:
1. No seleccionaste correctamente tu archivo ZIP al crear el entorno
2. O el ZIP tenía una estructura incorrecta

## ✅ SOLUCIÓN - Pasos Correctos

### Opción A: Crear NUEVO Entorno (Recomendado)

1. **Eliminar el entorno anterior:**
   - Ve a Elastic Beanstalk Console
   - Selecciona tu entorno actual
   - Actions → Terminate Environment
   - Espera a que se elimine completamente

2. **Crear nuevo entorno:**
   - Click en "Create a new environment"
   - **Environment tier:** Web server environment
   - **Application name:** `darkstory-backend`
   - **Environment name:** `darkstory-backend-prod`

3. **Configurar Platform:**
   - **Platform:** Node.js
   - **Platform branch:** Node.js 20 running on 64bit Amazon Linux 2023
   - **Platform version:** (Recommended)

4. **Subir tu código:**
   - **Application code:** Upload your code
   - **Source code origin:** Local file
   - Click en "Choose file"
   - Selecciona: `darkstory-backend-eb.zip`
   - **Version label:** v1.0

5. **Configurar Presets:**
   - Selecciona: **Single instance (free tier eligible)**

6. **Next: Configure service access**
   - Usa un service role existente o crea uno nuevo
   - EC2 key pair: (opcional, para SSH)
   - EC2 instance profile: Crea uno nuevo si no existe

7. **Next: Set up networking, database, and tags**
   - Puedes dejar los valores por defecto
   - Click "Next"

8. **Configure instance traffic and scaling:**
   - **Root volume type:** General Purpose (SSD)
   - **Size:** 10 GB
   - Click "Next"

9. **Configure updates, monitoring, and logging:**
   - **Health reporting:** Enhanced
   - Click "Next"

10. **Review:**
    - Revisa toda la configuración
    - Click "Submit"

### Opción B: Actualizar Entorno Existente

Si prefieres actualizar el entorno existente:

1. Ve a tu aplicación en Elastic Beanstalk
2. Click en "Upload and deploy"
3. Click "Choose file"
4. Selecciona `darkstory-backend-eb.zip`
5. **Version label:** v1.0-fixed
6. Click "Deploy"

## ⚙️ CONFIGURAR VARIABLES DE ENTORNO

**IMPORTANTE:** Después de crear/actualizar el entorno:

1. Ve a tu entorno en EB Console
2. Click en "Configuration"
3. En "Software", click "Edit"
4. En "Environment properties", agrega:

```
PORT=8080
NODE_ENV=production
GEMINI_API_KEY=tu_clave_real_aqui
ELEVENLABS_API_KEY=tu_clave_real_aqui
```

5. Click "Apply"
6. Espera a que el entorno se actualice (~2-3 minutos)

## 🧪 VERIFICAR EL DESPLIEGUE

Una vez completado, obtendrás una URL como:
```
http://darkstory-backend-prod.us-east-2.elasticbeanstalk.com
```

### Probar los endpoints:

```bash
# 1. Health check
curl http://tu-url.elasticbeanstalk.com/health

# Respuesta esperada:
{"status":"ok","message":"Dark Story API is running"}

# 2. Test API Generate (POST)
curl -X POST http://tu-url.elasticbeanstalk.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Una historia de terror"}'

# 3. Test API TTS (POST)
curl -X POST http://tu-url.elasticbeanstalk.com/api/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"Hola mundo"}'
```

## 🔍 SI HAY ERRORES

### Ver los logs:
1. En EB Console, ve a tu entorno
2. Click en "Logs" en el menú izquierdo
3. Click "Request Logs" → "Last 100 Lines"
4. Descarga y revisa los logs

### Logs importantes:
- `/var/log/web.stdout.log` - Output de tu aplicación
- `/var/log/eb-engine.log` - Proceso de despliegue
- `/var/log/nginx/error.log` - Errores de nginx

## 🔗 CONECTAR CON EL FRONTEND

Una vez que tu backend esté funcionando:

1. Copia la URL de tu backend de EB
2. En tu frontend (Amplify), actualiza la URL del API
3. Redespliega el frontend

El CORS ya está configurado para:
```javascript
'https://main.d1zg38s9plz0es.amplifyapp.com'
```

## 📊 Checklist Final

- [ ] ZIP creado con archivos en la raíz ✅
- [ ] Crear nuevo entorno en EB (o actualizar existente)
- [ ] Subir `darkstory-backend-eb.zip`
- [ ] Configurar variables de entorno (API keys)
- [ ] Esperar a que el entorno esté "Ok" (verde)
- [ ] Probar endpoint `/health`
- [ ] Probar endpoint `/api/generate`
- [ ] Probar endpoint `/api/tts`
- [ ] Actualizar URL en el frontend
- [ ] Verificar que frontend y backend se comuniquen

## 🎯 Diferencias Clave vs Intento Anterior

| Anterior | Ahora |
|----------|-------|
| ❌ EB instaló app de ejemplo | ✅ ZIP con estructura correcta |
| ❌ Archivos en subdirectorios | ✅ Archivos en la raíz del ZIP |
| ❌ No se seleccionó el ZIP correctamente | ✅ Instrucciones claras paso a paso |

---

**¡El ZIP está listo! Ahora sigue los pasos para subirlo correctamente a Elastic Beanstalk.** 🚀
