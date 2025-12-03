# 🔧 Troubleshooting Elastic Beanstalk

## ❌ Si el backend no funciona, sigue estos pasos:

### 1️⃣ Ver los Logs

1. Ve a AWS Elastic Beanstalk Console
2. Haz clic en tu aplicación
3. En el menú izquierdo, haz clic en **"Logs"**
4. Haz clic en **"Request Logs"** → **"Last 100 Lines"**
5. Espera unos segundos y haz clic en **"Download"**

**Busca errores como:**
- `Error: Cannot find module`
- `EADDRINUSE`
- `npm ERR!`
- `Application failed to start`

---

### 2️⃣ Problemas Comunes y Soluciones

#### ❌ Error: "Application failed to start"

**Causa**: El servidor no se inició correctamente.

**Solución**:
1. Verifica que `package.json` tenga:
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```
2. Sube el nuevo ZIP: `backend-deploy-v2.zip`

---

#### ❌ Error: "502 Bad Gateway"

**Causa**: El servidor no está escuchando en el puerto correcto.

**Solución**:
1. Verifica que el servidor use `process.env.PORT`
2. El código ya está configurado correctamente
3. Redespliega con `backend-deploy-v2.zip`

---

#### ❌ Error: "Cannot find module"

**Causa**: Dependencias no instaladas.

**Solución**:
1. Elastic Beanstalk ejecuta `npm install` automáticamente
2. Verifica que `package.json` esté en el ZIP
3. Espera a que termine la instalación (puede tomar 5-10 min)

---

#### ❌ Error: Health check failed

**Causa**: El endpoint `/health` no responde.

**Solución**:
1. Verifica que el servidor esté corriendo
2. Prueba manualmente: `http://tu-url.elasticbeanstalk.com/health`
3. Revisa los logs

---

### 3️⃣ Verificar Configuración

#### Verificar Variables de Entorno:

1. En Elastic Beanstalk, ve a **"Configuration"**
2. Haz clic en **"Software"** → **"Edit"**
3. Verifica que existan:
   - `GEMINI_API_KEY`
   - `ELEVENLABS_API_KEY`

Si no existen, agrégalas manualmente.

---

### 4️⃣ Redesplegar con el Nuevo ZIP

He creado un nuevo ZIP mejorado: **`backend-deploy-v2.zip`**

**Cambios incluidos:**
- ✅ Servidor escucha en `0.0.0.0` (requerido por Elastic Beanstalk)
- ✅ Logs mejorados para debugging
- ✅ Configuración de nginx para body size
- ✅ Variables de entorno optimizadas

**Para redesplegar:**

1. Ve a tu aplicación en Elastic Beanstalk
2. Haz clic en **"Upload and deploy"**
3. Selecciona **`backend-deploy-v2.zip`**
4. **Version label**: `v2.0`
5. Haz clic en **"Deploy"**
6. Espera 5-10 minutos

---

### 5️⃣ Probar el Backend

Una vez desplegado, prueba:

#### Health Check:
```bash
curl http://tu-backend-url.elasticbeanstalk.com/health
```

Deberías ver:
```json
{"status":"ok","message":"Dark Story API is running"}
```

#### Generar Historia:
```bash
curl -X POST http://tu-backend-url.elasticbeanstalk.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"a haunted house"}'
```

---

### 6️⃣ Si Aún No Funciona

#### Opción A: Revisar Logs Detallados

1. Ve a **CloudWatch Logs**
2. Busca el log group: `/aws/elasticbeanstalk/tu-app/var/log/nodejs/nodejs.log`
3. Revisa los errores

#### Opción B: Conectarse por SSH (Avanzado)

1. En Elastic Beanstalk, ve a tu environment
2. Haz clic en **"Actions"** → **"Connect to instance"**
3. Ejecuta:
   ```bash
   cd /var/app/current
   cat /var/log/nodejs/nodejs.log
   ```

#### Opción C: Crear Nuevo Environment

Si nada funciona:
1. Elimina el environment actual
2. Crea uno nuevo
3. Sube `backend-deploy-v2.zip`
4. Configura las variables de entorno

---

### 7️⃣ Checklist de Verificación

Antes de contactar soporte, verifica:

- [ ] El ZIP contiene `package.json`
- [ ] El ZIP contiene `server.js`
- [ ] El ZIP contiene carpeta `routes/`
- [ ] Las API keys están en `.env` o en Environment Variables
- [ ] La plataforma es Node.js 18
- [ ] El health check endpoint existe: `/health`
- [ ] Los logs no muestran errores de sintaxis

---

### 8️⃣ Configuración Alternativa (Si todo falla)

Si Elastic Beanstalk no funciona, puedes usar:

#### Opción 1: AWS Lambda + API Gateway
- Más económico
- Serverless
- Requiere adaptación del código

#### Opción 2: EC2 Manual
- Control total
- Más trabajo de configuración
- Usa PM2 para mantener el servidor corriendo

#### Opción 3: Heroku
- Más simple
- Sube el código directamente
- Tiene tier gratuito limitado

---

## 📞 Información para Soporte

Si necesitas ayuda, proporciona:

1. **Logs completos** de Elastic Beanstalk
2. **Versión de Node.js** configurada
3. **Región de AWS** donde desplegaste
4. **Mensaje de error exacto**
5. **Captura de pantalla** del dashboard

---

## ✅ Solución Rápida

**Usa el nuevo ZIP:**
```
backend-deploy-v2.zip
```

Este tiene todas las correcciones necesarias para Elastic Beanstalk.
