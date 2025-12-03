# 🎯 Elastic Beanstalk - Nuevo Entorno Limpio

## ✅ Perfecto! Crear un nuevo entorno es la mejor decisión

El entorno anterior tenía problemas acumulados. Empezar de cero es lo correcto.

---

## 📦 ZIP Definitivo: `backend-eb-final.zip`

Este es el backend completo y funcional con:
- ✅ Flask + Gunicorn
- ✅ Gemini AI (generación de historias)
- ✅ ElevenLabs (generación de audio)
- ✅ CORS configurado para tu frontend
- ✅ Todos los endpoints funcionando

---

## 🚀 PASOS PARA EL NUEVO ENTORNO

### 1️⃣ Configuración del Nuevo Entorno

Cuando crees el nuevo entorno, asegúrate de:

**Platform:**
- ✅ **Platform**: Python
- ✅ **Platform branch**: Python 3.11 running on 64bit Amazon Linux 2023
- ✅ **Platform version**: (la más reciente)

**Application code:**
- ✅ **Upload your code**
- ✅ Selecciona: **`backend-eb-final.zip`**

**Presets:**
- ✅ **Single instance** (free tier eligible)

### 2️⃣ Subir el ZIP

1. En el nuevo entorno
2. **Upload and Deploy**
3. Selecciona: **`backend-eb-final.zip`**
4. Version label: `final-v1`
5. **Deploy**

### 3️⃣ Esperar (5-10 minutos)

El nuevo entorno:
- Instalará Python 3.11
- Instalará todas las dependencias
- Iniciará Gunicorn
- Configurará el health check

### 4️⃣ Verificar

Una vez que el health status sea **Verde ✅**:

**Abre en tu navegador:**
```
http://tu-nuevo-backend-url.elasticbeanstalk.com/
```

Deberías ver:
```json
{
  "status": "ok",
  "message": "Dark Story API is running",
  "version": "1.0",
  "endpoints": ["/health", "/api/generate", "/api/tts"]
}
```

---

## ✅ Probar Endpoints

### Health Check:
```
http://tu-backend-url.elasticbeanstalk.com/health
```

### Generar Historia:
```bash
curl -X POST http://tu-backend-url.elasticbeanstalk.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"a haunted mansion"}'
```

### Generar Audio:
```bash
curl -X POST http://tu-backend-url.elasticbeanstalk.com/api/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"This is a test"}'
```

---

## 🔄 Actualizar Frontend en Amplify

Una vez que el backend funcione:

1. Ve a: https://console.aws.amazon.com/amplify/
2. Selecciona tu app: `dark-story-ai`
3. **Environment variables** → **Manage variables**
4. Actualiza o agrega:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `http://tu-backend-url.elasticbeanstalk.com`
5. **Save**
6. **Redeploy** el frontend

---

## 🎉 ¡Aplicación Completa!

Una vez configurado:

- **Frontend**: https://main.d1zg38s9plz0es.amplifyapp.com
- **Backend**: http://tu-backend-url.elasticbeanstalk.com

### Funcionalidades:
- ✅ Seleccionar categoría de terror
- ✅ Generar historia con Gemini AI
- ✅ Generar audio con ElevenLabs
- ✅ Ver imágenes (si están habilitadas)
- ✅ Descargar audio e imágenes

---

## 🆘 Si Hay Problemas

### Si el health status es Degraded/Severe:

1. **Descarga los logs**:
   - Logs → Request Logs → Full Logs
   
2. **Busca errores en**:
   - `eb-engine.log`
   - `web.stdout.log`
   
3. **Errores comunes**:
   - `gunicorn: command not found` → Las dependencias no se instalaron
   - `ModuleNotFoundError` → Falta una librería en requirements.txt
   - `Port 8080 already in use` → Reinicia el environment

### Solución rápida:

Si sigue sin funcionar, **termina el environment** y crea uno completamente nuevo con la **sample application** primero. Si la sample funciona, entonces sube `backend-eb-final.zip`.

---

## 📝 Checklist Final

Antes de desplegar, verifica:

- [ ] Nuevo entorno creado (no el anterior)
- [ ] Platform: Python 3.11
- [ ] ZIP: `backend-eb-final.zip`
- [ ] El ZIP contiene: `application.py`, `requirements.txt`, `Procfile`
- [ ] Esperaste 5-10 minutos para el deploy
- [ ] Health status es Verde ✅
- [ ] El endpoint `/` responde
- [ ] El endpoint `/health` responde

---

## 💡 Consejos

1. **Paciencia**: El primer deploy toma tiempo (5-10 min)
2. **Logs**: Si falla, revisa los logs inmediatamente
3. **Sample app**: Si nada funciona, prueba primero con la sample application
4. **Región**: Usa us-east-1 si tienes problemas en otras regiones

---

## 🎊 ¡Éxito!

Con un entorno limpio y este ZIP, debería funcionar perfectamente.

¡Avísame cuando esté desplegado y lo probamos juntos!
