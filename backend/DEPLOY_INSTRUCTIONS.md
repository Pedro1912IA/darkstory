# 🚀 Instrucciones de Despliegue - Backend

## 📦 Este ZIP contiene el backend completo para Elastic Beanstalk

### ✅ Configuración incluida:
- ✅ CORS configurado para: `https://main.d1zg38s9plz0es.amplifyapp.com`
- ✅ API keys incluidas en `.env`
- ✅ Todas las dependencias en `package.json`
- ✅ Configuración de Elastic Beanstalk en `.ebextensions/`

---

## 🚀 Pasos para Desplegar en AWS Elastic Beanstalk

### 1. Ir a AWS Elastic Beanstalk Console
https://console.aws.amazon.com/elasticbeanstalk/

### 2. Crear Nueva Aplicación
1. Haz clic en **"Create Application"**
2. **Application name**: `dark-story-backend`
3. **Platform**: Node.js
4. **Platform branch**: Node.js 18 running on 64bit Amazon Linux 2023
5. **Application code**: Upload your code

### 3. Subir el ZIP
1. Selecciona **"Upload your code"**
2. Haz clic en **"Choose file"**
3. Selecciona el archivo `backend.zip`
4. Haz clic en **"Create application"**

### 4. Esperar el Despliegue
- El proceso tomará 5-10 minutos
- Verás el progreso en la consola
- Cuando termine, verás un checkmark verde ✅

### 5. Obtener la URL del Backend
Una vez desplegado, verás algo como:
```
http://dark-story-backend.us-east-1.elasticbeanstalk.com
```

**¡COPIA ESTA URL!** La necesitarás para el frontend.

---

## 🔧 Configurar Variables de Entorno (Opcional)

Si prefieres no incluir las API keys en el código:

1. En Elastic Beanstalk, ve a tu aplicación
2. Haz clic en **"Configuration"**
3. En **"Software"**, haz clic en **"Edit"**
4. En **"Environment properties"**, agrega:
   - `GEMINI_API_KEY`: AIzaSyCBvSp0vx48CREARqLtoih-CFgPaLVinxM
   - `ELEVENLABS_API_KEY`: fdc8a6f40d14b66a17c3b1126936c593df17192431704d2833d9048c95b95507
   - `PORT`: 8080
5. Haz clic en **"Apply"**

---

## ✅ Verificar que Funciona

### Health Check:
```bash
curl http://tu-backend-url.elasticbeanstalk.com/health
```

Deberías ver:
```json
{"status":"ok","message":"Dark Story API is running"}
```

### Probar Generación de Historia:
```bash
curl -X POST http://tu-backend-url.elasticbeanstalk.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"a haunted house"}'
```

---

## 🔄 Actualizar el Frontend

Una vez que tengas la URL del backend:

1. Ve a AWS Amplify Console
2. Selecciona tu app: `dark-story-ai`
3. Ve a **"Environment variables"**
4. Actualiza o agrega:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `http://tu-backend-url.elasticbeanstalk.com`
5. Haz clic en **"Save"**
6. Redespliega el frontend (o espera al próximo push)

---

## 🎉 ¡Listo!

Tu aplicación completa estará funcionando:
- **Frontend**: https://main.d1zg38s9plz0es.amplifyapp.com
- **Backend**: http://tu-backend-url.elasticbeanstalk.com

---

## 🆘 Troubleshooting

### Error: "Application failed to start"
- Revisa los logs en Elastic Beanstalk Console
- Ve a "Logs" → "Request Logs" → "Last 100 Lines"

### Error: CORS
- Verifica que la URL del frontend esté correcta en `server.js`
- Asegúrate de que no haya espacios o caracteres extra

### Error: "Cannot connect to backend"
- Verifica que el health check funcione
- Asegúrate de que `NEXT_PUBLIC_API_URL` esté configurada en Amplify
- Revisa que las API keys sean correctas

---

## 📝 Notas Importantes

1. **Costos**: Elastic Beanstalk tiene costos asociados (EC2, Load Balancer, etc.)
2. **Seguridad**: Las API keys están en el backend, no expuestas al público
3. **Escalabilidad**: Elastic Beanstalk escala automáticamente según el tráfico
4. **Logs**: Revisa CloudWatch Logs para debugging

---

## 🔒 Seguridad

✅ API keys solo en el backend
✅ CORS configurado correctamente
✅ Variables de entorno protegidas
✅ HTTPS recomendado para producción
