# 🚀 Desplegar Backend Node.js en Vercel

## ✅ Todo Está Listo

El backend de Node.js está preparado para Vercel con:
- ✅ Express.js
- ✅ CORS configurado para tu frontend
- ✅ Gemini AI (generación de historias)
- ✅ ElevenLabs (generación de audio)
- ✅ `vercel.json` configurado

---

## 📦 Pasos para Subir a GitHub

### 1. Ir a la carpeta del backend

```bash
cd backend
```

### 2. Inicializar Git

```bash
git init
git add .
git commit -m "Dark Story Backend - Node.js"
git branch -M main
```

### 3. Crear Repo en GitHub

1. Ve a https://github.com/new
2. Nombre: `darkstory-backend`
3. **Create repository** (sin README, sin .gitignore)

### 4. Conectar y Subir

```bash
git remote add origin https://github.com/Pedro1912IA/darkstory-backend.git
git push -u origin main
```

---

## 🚀 Desplegar en Vercel

### 1. Ir a Vercel

1. Ve a https://vercel.com
2. **Sign Up** o **Log In** con GitHub

### 2. Importar Proyecto

1. Haz clic en **"Add New"** → **"Project"**
2. **Import Git Repository**
3. Busca y selecciona `darkstory-backend`
4. Haz clic en **"Import"**

### 3. Configurar

Vercel detectará automáticamente Node.js. Configuración:

- **Framework Preset**: Other
- **Root Directory**: `.` (dejar como está)
- **Build Command**: (dejar vacío o `npm install`)
- **Output Directory**: (dejar vacío)
- **Install Command**: `npm install`

### 4. Variables de Entorno (Opcional)

Las API keys ya están en el código, pero puedes agregarlas aquí para más seguridad:

- `GEMINI_API_KEY`: AIzaSyCBvSp0vx48CREARqLtoih-CFgPaLVinxM
- `ELEVENLABS_API_KEY`: fdc8a6f40d14b66a17c3b1126936c593df17192431704d2833d9048c95b95507

### 5. Deploy

1. Haz clic en **"Deploy"**
2. Espera 1-2 minutos
3. ¡Listo! Obtendrás una URL como:
   ```
   https://darkstory-backend.vercel.app
   ```

---

## ✅ Verificar

Abre en tu navegador:
```
https://tu-backend.vercel.app/health
```

Deberías ver:
```json
{
  "status": "ok",
  "message": "Dark Story API is running"
}
```

---

## 🔄 Actualizar Frontend en Amplify

1. Ve a Amplify Console
2. **Environment variables** → **Manage variables**
3. Agrega o actualiza:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://tu-backend.vercel.app`
4. **Save**
5. **Redeploy** el frontend

---

## 🎉 ¡Aplicación Completa!

- **Frontend**: https://main.d1zg38s9plz0es.amplifyapp.com
- **Backend**: https://tu-backend.vercel.app

### Funcionalidades:
- ✅ Seleccionar categoría de terror
- ✅ Generar historia con Gemini AI
- ✅ Generar audio con ElevenLabs
- ✅ Descargar audio
- ✅ Ver imágenes

---

## 📝 Comandos Resumidos

```bash
cd backend
git init
git add .
git commit -m "Dark Story Backend"
git branch -M main
git remote add origin https://github.com/Pedro1912IA/darkstory-backend.git
git push -u origin main
```

Luego ve a Vercel y conecta el repo.

---

## 🆘 Si Hay Problemas

Vercel tiene excelente soporte y logs claros. Si algo falla, los logs te dirán exactamente qué pasó.

---

## ✅ Ventajas de Vercel

- ✅ Deploy en 2 minutos
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Logs en tiempo real
- ✅ Deploy automático en cada push
- ✅ Gratis para proyectos personales

¡Listo para desplegar!
