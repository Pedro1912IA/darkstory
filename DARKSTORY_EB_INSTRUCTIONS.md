# 🎯 Dark Story Backend - Elastic Beanstalk

## 📦 ZIP Listo: `darkstory-backend-eb.zip`

Este ZIP está estructurado igual que el `artmind-python.zip` que funcionó.

### Estructura:
```
darkstory-backend-eb/
├── .ebextensions/
│   └── python.config
├── .platform/
│   └── nginx/
│       └── conf.d/
│           └── timeout.conf
├── application.py
├── requirements.txt
└── Procfile
```

---

## 🚀 PASOS PARA DESPLEGAR

### 1️⃣ Subir el ZIP

1. Ve a tu environment en Elastic Beanstalk
2. **Upload and Deploy**
3. Selecciona: **`darkstory-backend-eb.zip`**
4. Version: `darkstory-v1`
5. **Deploy**

### 2️⃣ Esperar

- Tomará 5-10 minutos
- Elastic Beanstalk instalará Python, dependencias y configurará nginx

### 3️⃣ Verificar

Abre en tu navegador:
```
http://darkstoryai-env.eba-d5pd4mf4.us-east-2.elasticbeanstalk.com/
```

Deberías ver:
```json
{
  "status": "ok",
  "message": "Dark Story API is running",
  "version": "1.0"
}
```

---

## ✅ Probar Endpoints

### Health:
```
http://tu-backend-url.elasticbeanstalk.com/health
```

### Generate Story:
```bash
curl -X POST http://tu-backend-url.elasticbeanstalk.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"a haunted mansion"}'
```

### Generate Audio:
```bash
curl -X POST http://tu-backend-url.elasticbeanstalk.com/api/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"This is a test"}'
```

---

## 🔄 Actualizar Frontend

Una vez que funcione:

1. Ve a Amplify Console
2. **Environment variables**
3. Actualiza `NEXT_PUBLIC_API_URL`:
   ```
   http://darkstoryai-env.eba-d5pd4mf4.us-east-2.elasticbeanstalk.com
   ```
4. **Save** y redespliega

---

## 🎉 ¡Aplicación Completa!

- **Frontend**: https://main.d1zg38s9plz0es.amplifyapp.com
- **Backend**: http://darkstoryai-env.eba-d5pd4mf4.us-east-2.elasticbeanstalk.com

---

## 📝 Qué Incluye

- ✅ Flask + Gunicorn
- ✅ Gemini AI (generación de historias)
- ✅ ElevenLabs (generación de audio)
- ✅ CORS configurado
- ✅ Timeouts de 300 segundos
- ✅ Configuración de nginx
- ✅ Todas las dependencias

---

## 🆘 Si Hay Problemas

Si sigue sin funcionar, descarga los logs y envíamelos.

Pero honestamente, si este tampoco funciona, **Vercel es la mejor opción**.

---

## ✅ Este Debería Funcionar

Está estructurado exactamente como el ZIP que funcionó antes.

¡Avísame cuando lo subas!
