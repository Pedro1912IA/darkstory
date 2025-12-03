# 🐍 Backend Python para Elastic Beanstalk

## ✅ Archivo Listo: `backend-python.zip`

Este backend está en **Python/Flask** y es más compatible con Elastic Beanstalk.

### 📦 Contenido del ZIP:
- ✅ `application.py` - Servidor Flask
- ✅ `requirements.txt` - Dependencias Python
- ✅ `Procfile` - Configuración de Gunicorn
- ✅ `.ebextensions/` - Configuración de Elastic Beanstalk
- ✅ CORS configurado para: `https://main.d1zg38s9plz0es.amplifyapp.com`
- ✅ API keys incluidas

---

## 🚀 PASOS PARA DESPLEGAR

### 1️⃣ Ir a AWS Elastic Beanstalk

https://console.aws.amazon.com/elasticbeanstalk/

### 2️⃣ Crear Nueva Aplicación

1. Haz clic en **"Create Application"**
2. Configuración:
   - **Application name**: `dark-story-backend`
   - **Platform**: **Python**
   - **Platform branch**: **Python 3.11 running on 64bit Amazon Linux 2023**
   - **Application code**: Upload your code

### 3️⃣ Subir el ZIP

1. Selecciona **"Upload your code"**
2. Haz clic en **"Choose file"**
3. Selecciona: **`backend-python.zip`**
4. **Version label**: `python-v1`
5. Haz clic en **"Create application"**

### 4️⃣ Esperar el Despliegue

- Tomará 5-10 minutos
- Elastic Beanstalk instalará Python y todas las dependencias
- Verás el progreso en tiempo real

### 5️⃣ Obtener la URL

Una vez completado:
```
✅ Environment health: Ok
URL: http://dark-story-backend.us-east-1.elasticbeanstalk.com
```

**¡COPIA ESTA URL!**

---

## ✅ Verificar que Funciona

### Health Check:

Abre en tu navegador:
```
http://tu-backend-url.elasticbeanstalk.com/health
```

Deberías ver:
```json
{"status":"ok","message":"Dark Story API is running"}
```

### Probar Generación:

```bash
curl -X POST http://tu-backend-url.elasticbeanstalk.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"a haunted house"}'
```

---

## 🔄 Actualizar Frontend en Amplify

1. Ve a: https://console.aws.amazon.com/amplify/
2. Selecciona tu app
3. Ve a **"Environment variables"**
4. Agrega/actualiza:
   - **Variable**: `NEXT_PUBLIC_API_URL`
   - **Value**: `http://tu-backend-url.elasticbeanstalk.com`
5. **Save** y redespliega

---

## 🎉 ¡LISTO!

Tu aplicación completa funcionará:
- **Frontend**: https://main.d1zg38s9plz0es.amplifyapp.com
- **Backend**: http://tu-backend-url.elasticbeanstalk.com

---

## 🔧 Ventajas del Backend Python

✅ Mejor compatibilidad con Elastic Beanstalk
✅ Más estable y confiable
✅ Mejor manejo de dependencias
✅ Logs más claros
✅ Menos problemas de configuración

---

## 📝 Notas

- Las API keys están incluidas en el código
- CORS ya está configurado para tu frontend
- Gunicorn maneja múltiples requests
- Timeout configurado para requests largos (generación de imágenes)

---

## 🆘 Si hay problemas

1. **Revisa los logs**: Elastic Beanstalk → Logs → Last 100 Lines
2. **Verifica la plataforma**: Debe ser Python 3.11
3. **Health check**: Debe responder en `/health`
4. **Variables de entorno**: Opcional, ya están en el código

---

## ⚡ Diferencias con Node.js

| Aspecto | Node.js | Python |
|---------|---------|--------|
| Compatibilidad EB | ⚠️ Media | ✅ Excelente |
| Configuración | Compleja | Simple |
| Dependencias | npm | pip |
| Servidor | Express | Flask + Gunicorn |
| Estabilidad | Buena | Excelente |

**Recomendación**: Usa el backend Python para Elastic Beanstalk.
