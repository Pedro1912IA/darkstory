# 🔬 Backend Mínimo - Para Probar Elastic Beanstalk

## 🎯 Objetivo

Primero vamos a probar que Elastic Beanstalk funciona con un backend súper simple.
Si esto funciona, entonces el problema está en las dependencias (Gemini, ElevenLabs).

---

## 📦 Archivo: `backend-minimal.zip`

Este es el backend MÁS SIMPLE posible:
- ✅ Solo Flask
- ✅ Solo 2 endpoints: `/` y `/health`
- ✅ Sin dependencias complejas
- ✅ Sin APIs externas

---

## 🚀 Pasos:

### 1. Subir el Backend Mínimo

1. Ve a Elastic Beanstalk
2. **Upload and Deploy**
3. Selecciona: `backend-minimal.zip`
4. Version: `minimal-test`
5. **Deploy**

### 2. Esperar y Verificar

Si este backend simple funciona:
- ✅ Verás el health status verde
- ✅ Podrás abrir: `http://tu-url.elasticbeanstalk.com/`
- ✅ Verás: `{"status":"ok","message":"Backend is running"}`

### 3. Resultado

#### ✅ Si Funciona:
El problema está en las dependencias (google-generativeai o elevenlabs).
→ Necesitamos instalarlas de otra forma.

#### ❌ Si NO Funciona:
El problema es la configuración de Elastic Beanstalk.
→ Necesitamos ver los logs completos.

---

## 📋 Cómo Obtener los Logs Completos

Si el backend mínimo tampoco funciona:

### 1. Descargar Logs

1. Ve a tu aplicación en Elastic Beanstalk
2. Haz clic en **"Logs"** (menú izquierdo)
3. Haz clic en **"Request Logs"** → **"Full Logs"** (no "Last 100 Lines")
4. Espera 1-2 minutos
5. Haz clic en **"Download"**

### 2. Buscar el Archivo

Dentro del ZIP descargado, busca:
- `eb-engine.log`
- `web.stdout.log`
- `cfn-init.log`

### 3. Enviarme

Copia y pega aquí las últimas 50 líneas de:
- `eb-engine.log` (el más importante)
- `web.stdout.log`

---

## 🔍 Qué Buscar en los Logs

Busca líneas con:
- `ERROR`
- `CRITICAL`
- `Failed`
- `Exception`
- `Traceback`
- `ModuleNotFoundError`
- `ImportError`

---

## 🆘 Alternativa: Crear Nuevo Environment

Si nada funciona, prueba crear un environment completamente nuevo:

### 1. Eliminar el Environment Actual

1. Ve a tu aplicación
2. Haz clic en el environment
3. **Actions** → **Terminate environment**
4. Confirma

### 2. Crear Nuevo Environment

1. En tu aplicación, haz clic en **"Create a new environment"**
2. **Web server environment**
3. **Platform**: Python 3.11
4. **Sample application** (para probar primero)
5. **Create environment**

### 3. Probar Sample Application

Si la sample application funciona:
- ✅ Elastic Beanstalk está bien configurado
- → Sube `backend-minimal.zip`

Si la sample application NO funciona:
- ❌ Hay un problema con tu cuenta/región de AWS
- → Prueba otra región (ej: us-east-1)

---

## 💡 Solución Alternativa: Usar Vercel

Si Elastic Beanstalk sigue dando problemas, puedes desplegar el backend en Vercel:

### Ventajas de Vercel:
- ✅ Más simple que Elastic Beanstalk
- ✅ Deploy automático desde GitHub
- ✅ Tier gratuito generoso
- ✅ Funciona con Python/Flask

### Pasos:
1. Sube el backend a un repo de GitHub separado
2. Conecta Vercel a ese repo
3. Vercel detecta Flask automáticamente
4. Deploy en 2 minutos

¿Quieres que te prepare el backend para Vercel?

---

## 📞 Información que Necesito

Para ayudarte mejor, envíame:

1. **Logs completos** (eb-engine.log)
2. **Región de AWS** que estás usando
3. **Tipo de cuenta** (Free tier / Paid)
4. **Resultado del backend mínimo** (¿funcionó?)

Con esa info podré darte la solución exacta.
