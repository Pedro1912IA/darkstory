# 🚀 Desplegar Backend en Vercel (RECOMENDADO)

## ⚡ Por Qué Vercel es Mejor

Elastic Beanstalk está dando muchos problemas. Vercel es:
- ✅ **10x más simple**
- ✅ **Deploy en 2 minutos** (vs 15 min de EB)
- ✅ **Gratis** (vs $15-30/mes de EB)
- ✅ **Sin configuración compleja**
- ✅ **Logs claros y fáciles**
- ✅ **HTTPS automático**

---

## 📦 Backend Preparado: `backend-vercel/`

Ya está listo con:
- ✅ Todos los endpoints (`/`, `/health`, `/api/generate`, `/api/tts`)
- ✅ CORS configurado
- ✅ API keys incluidas
- ✅ Estructura optimizada para Vercel

---

## 🚀 PASOS PARA DESPLEGAR

### 1️⃣ Crear Cuenta en Vercel

1. Ve a: https://vercel.com
2. **Sign Up** con GitHub
3. Autoriza Vercel

### 2️⃣ Subir Backend a GitHub

**Opción A: Repo Nuevo (Recomendado)**

```bash
cd backend-vercel
git init
git add .
git commit -m "Initial commit - Dark Story Backend"
git branch -M main
git remote add origin https://github.com/Pedro1912IA/darkstory-backend.git
git push -u origin main
```

**Opción B: Carpeta en el Mismo Repo**

Ya está en tu repo actual en la carpeta `backend-vercel/`

### 3️⃣ Conectar Vercel

1. En Vercel, haz clic en **"Add New"** → **"Project"**
2. **Import Git Repository**
3. Selecciona tu repo (darkstory o darkstory-backend)
4. Si está en una carpeta:
   - **Root Directory**: `backend-vercel`
5. **Framework Preset**: Other
6. Haz clic en **"Deploy"**

### 4️⃣ Configurar Variables de Entorno (Opcional)

En Vercel → Settings → Environment Variables:

- `GEMINI_API_KEY`: AIzaSyCBvSp0vx48CREARqLtoih-CFgPaLVinxM
- `ELEVENLABS_API_KEY`: fdc8a6f40d14b66a17c3b1126936c593df17192431704d2833d9048c95b95507

(Ya están en el código, pero puedes ponerlas aquí para más seguridad)

### 5️⃣ ¡Listo!

En 1-2 minutos tendrás tu backend funcionando en:
```
https://darkstory-backend.vercel.app
```

---

## ✅ Verificar

Abre en tu navegador:
```
https://tu-backend.vercel.app/
```

Deberías ver:
```json
{
  "status": "ok",
  "message": "Dark Story API is running",
  "version": "1.0"
}
```

### Probar Endpoints:

**Health:**
```
https://tu-backend.vercel.app/health
```

**Generate:**
```bash
curl -X POST https://tu-backend.vercel.app/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"a haunted house"}'
```

**TTS:**
```bash
curl -X POST https://tu-backend.vercel.app/api/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"This is a test"}'
```

---

## 🔄 Actualizar Frontend en Amplify

1. Ve a: https://console.aws.amazon.com/amplify/
2. Selecciona tu app
3. **Environment variables** → **Manage variables**
4. Actualiza `NEXT_PUBLIC_API_URL`:
   ```
   https://tu-backend.vercel.app
   ```
5. **Save** y redespliega

---

## 🎉 ¡Aplicación Completa Funcionando!

- **Frontend**: https://main.d1zg38s9plz0es.amplifyapp.com
- **Backend**: https://tu-backend.vercel.app

---

## 📊 Comparación Final

| Aspecto | Elastic Beanstalk | Vercel |
|---------|-------------------|--------|
| Tiempo de setup | 2+ horas ⏰ | 5 minutos ⚡ |
| Deploy | 15 min | 2 min |
| Debugging | Muy difícil ❌ | Fácil ✅ |
| Costo | $15-30/mes 💰 | Gratis 🆓 |
| Configuración | Compleja | Simple |
| Logs | Difíciles de leer | Claros |
| HTTPS | Manual | Automático |
| **Recomendación** | ❌ No para este proyecto | ✅ **USAR ESTO** |

---

## 💡 Ventajas Adicionales de Vercel

- ✅ Deploy automático en cada push a GitHub
- ✅ Preview deployments para cada PR
- ✅ Rollback instantáneo
- ✅ CDN global
- ✅ Escalado automático
- ✅ Monitoreo incluido
- ✅ Sin servidores que mantener

---

## 🆘 Si Tienes Problemas

Vercel tiene excelente documentación y soporte:
- https://vercel.com/docs
- Los errores son claros y fáciles de entender
- Los logs son en tiempo real

---

## ✅ Próximos Pasos

1. **Crea cuenta** en Vercel
2. **Sube** backend-vercel a GitHub
3. **Conecta** Vercel al repo
4. **Deploy** (2 minutos)
5. **Actualiza** URL en Amplify
6. **¡Disfruta!** Tu app funcionando

---

## 🎊 Recomendación Final

**Abandona Elastic Beanstalk** para este proyecto. Es demasiado complejo y problemático.

**Usa Vercel**. Es la solución perfecta para tu backend Python/Flask.

¿Necesitas ayuda con algún paso? ¡Avísame!
