# 🚀 Solución Alternativa: Backend en Vercel

## ⚡ Por qué Vercel es Mejor para Este Proyecto

| Aspecto | Elastic Beanstalk | Vercel |
|---------|-------------------|--------|
| Configuración | Compleja ❌ | Simple ✅ |
| Deploy | 10-15 min ⏰ | 2 min ⚡ |
| Errores | Difícil debuggear ❌ | Logs claros ✅ |
| Costo | ~$15-30/mes 💰 | Gratis (tier generoso) 🆓 |
| Python/Flask | Problemas ⚠️ | Funciona perfecto ✅ |

---

## 📦 Backend Preparado para Vercel

Ya preparé el backend optimizado para Vercel: **`backend-vercel/`**

---

## 🚀 Pasos para Desplegar en Vercel

### 1️⃣ Crear Cuenta en Vercel

1. Ve a: https://vercel.com
2. **Sign Up** con GitHub
3. Autoriza Vercel

### 2️⃣ Subir Backend a GitHub

Opción A: Crear repo nuevo para el backend
```bash
cd backend-vercel
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/darkstory-backend.git
git push -u origin main
```

Opción B: Usar el mismo repo en una carpeta

### 3️⃣ Conectar Vercel

1. En Vercel, haz clic en **"Add New"** → **"Project"**
2. **Import Git Repository**
3. Selecciona tu repo
4. **Root Directory**: `backend-vercel` (si está en una carpeta)
5. **Framework Preset**: Other
6. **Build Command**: (dejar vacío)
7. **Output Directory**: (dejar vacío)

### 4️⃣ Configurar Variables de Entorno

En Vercel:
1. **Environment Variables**
2. Agrega:
   - `GEMINI_API_KEY`: AIzaSyCBvSp0vx48CREARqLtoih-CFgPaLVinxM
   - `ELEVENLABS_API_KEY`: fdc8a6f40d14b66a17c3b1126936c593df17192431704d2833d9048c95b95507

### 5️⃣ Deploy

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
https://tu-backend.vercel.app/
```

Deberías ver:
```json
{
  "status": "ok",
  "message": "Dark Story API is running"
}
```

---

## 🔄 Actualizar Frontend

1. Ve a Amplify Console
2. **Environment variables**
3. Actualiza `NEXT_PUBLIC_API_URL`:
   ```
   https://tu-backend.vercel.app
   ```
4. Redespliega

---

## 🎉 Ventajas de Vercel

✅ Deploy automático en cada push
✅ Logs en tiempo real
✅ HTTPS automático
✅ CDN global
✅ Escalado automático
✅ Sin configuración compleja
✅ Funciona perfecto con Python

---

## 📝 Estructura del Backend para Vercel

```
backend-vercel/
├── api/
│   ├── index.py          # Home y health
│   ├── generate.py       # Generar historia
│   └── tts.py           # Generar audio
├── requirements.txt
└── vercel.json
```

Vercel detecta automáticamente Python y Flask.

---

## 🆘 Si Prefieres Seguir con Elastic Beanstalk

Sube los logs a la carpeta `logs/` y los reviso.

Pero honestamente, **Vercel es mucho mejor** para este tipo de proyecto.

---

## ⚡ ¿Quieres que prepare el backend para Vercel?

Dime y te lo preparo en 5 minutos. Es mucho más simple y confiable.
