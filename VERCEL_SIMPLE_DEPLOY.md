# 🚀 Desplegar Backend en Vercel - Guía Simple

## 📦 Backend Listo: `backend-vercel/`

Ya está en tu repo de GitHub en la carpeta `backend-vercel/`.

---

## 🚀 PASOS PARA DESPLEGAR

### 1️⃣ Ir a Vercel

https://vercel.com

**Sign Up** o **Log In** con GitHub

---

### 2️⃣ Nuevo Proyecto

1. Haz clic en **"Add New"** → **"Project"**
2. Verás tus repos de GitHub
3. Busca y selecciona: **`darkstory`**
4. Haz clic en **"Import"**

---

### 3️⃣ Configurar Root Directory

**MUY IMPORTANTE**:

En la pantalla de configuración:

1. Busca **"Root Directory"**
2. Haz clic en **"Edit"**
3. Escribe: **`backend-vercel`**
4. Haz clic en el botón para confirmar

Otras configuraciones:
- **Framework Preset**: Other
- **Build Command**: (dejar vacío)
- **Output Directory**: (dejar vacío)

---

### 4️⃣ Variables de Entorno (Opcional)

En **Environment Variables**, puedes agregar (opcional):

- **Name**: `GEMINI_API_KEY`
  **Value**: `AIzaSyCBvSp0vx48CREARqLtoih-CFgPaLVinxM`

- **Name**: `ELEVENLABS_API_KEY`
  **Value**: `fdc8a6f40d14b66a17c3b1126936c593df17192431704d2833d9048c95b95507`

(Ya están en el código, pero puedes ponerlas aquí para más seguridad)

---

### 5️⃣ Deploy

1. Haz clic en **"Deploy"**
2. Vercel comenzará a construir tu backend
3. Espera 1-2 minutos
4. ¡Listo! Verás un mensaje de éxito

---

## ✅ Obtener la URL

Una vez desplegado, verás algo como:

```
https://darkstory-xxxxx.vercel.app
```

**Copia esta URL** - la necesitarás para el frontend.

---

## 🧪 Probar el Backend

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

---

## 🔄 Actualizar Frontend en Amplify

1. Ve a: https://console.aws.amazon.com/amplify/
2. Selecciona tu app: `dark-story-ai`
3. En el menú izquierdo: **"Environment variables"**
4. Haz clic en **"Manage variables"**
5. Busca `NEXT_PUBLIC_API_URL` o agrégala:
   - **Variable**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://tu-backend.vercel.app` (la URL que copiaste)
6. Haz clic en **"Save"**
7. Ve a la pestaña **"Deployments"**
8. Haz clic en **"Redeploy this version"**

---

## 🎉 ¡Aplicación Completa Funcionando!

- **Frontend**: https://main.d1zg38s9plz0es.amplifyapp.com
- **Backend**: https://tu-backend.vercel.app

### Prueba tu app:
1. Abre el frontend
2. Selecciona una categoría de terror
3. Haz clic en "Generate Story"
4. Deberías ver:
   - ✅ Historia generada
   - ✅ Audio narrado
   - ✅ Botones de descarga

---

## 🆘 Si Hay Problemas

### Error en Vercel:

1. Ve a tu proyecto en Vercel
2. Haz clic en la pestaña **"Deployments"**
3. Haz clic en el deployment fallido
4. Revisa los **"Build Logs"**
5. Envíame el error y te ayudo

### Error en el Frontend:

1. Abre la consola del navegador (F12)
2. Ve a la pestaña **"Console"**
3. Busca errores en rojo
4. Verifica que `NEXT_PUBLIC_API_URL` esté configurada correctamente

---

## 📝 Checklist

- [ ] Vercel conectado a GitHub
- [ ] Root Directory configurado: `backend-vercel`
- [ ] Deploy exitoso
- [ ] URL del backend copiada
- [ ] `NEXT_PUBLIC_API_URL` actualizada en Amplify
- [ ] Frontend redesplegado
- [ ] App probada y funcionando

---

## 🎊 ¡Listo!

Tu aplicación Dark Story AI está completamente desplegada y funcionando.

¡Disfruta generando historias de terror!
