# 🚀 Configuración de AWS Amplify

## Paso a Paso para Desplegar el Frontend

### 1. Preparar el Repositorio

El proyecto ya está configurado con:
- ✅ `.amplifyignore` - Ignora la carpeta `backend/`
- ✅ `amplify.yml` - Configuración de build
- ✅ `package.json` - Solo dependencias del frontend

### 2. Ir a AWS Amplify Console

1. Ve a: https://console.aws.amazon.com/amplify/
2. Haz clic en **"New app"** → **"Host web app"**

### 3. Conectar GitHub

1. Selecciona **GitHub**
2. Autoriza AWS Amplify si es necesario
3. Selecciona tu repositorio: **Pedro1912IA/darkstory**
4. Selecciona la rama: **main**
5. Haz clic en **Next**

### 4. Configurar Build Settings

Amplify detectará automáticamente Next.js y usará el archivo `amplify.yml`.

**Verifica que la configuración sea:**
- **App name**: dark-story-ai (o el nombre que prefieras)
- **Environment**: production
- **Build settings**: Debe mostrar el contenido de `amplify.yml`

Si no detecta `amplify.yml`, copia y pega esto:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci --legacy-peer-deps
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### 5. Configurar Variables de Entorno

**IMPORTANTE:** Antes de hacer deploy, agrega esta variable:

1. En la página de configuración, busca **"Environment variables"**
2. Haz clic en **"Add environment variable"**
3. Agrega:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `http://tu-backend-url.elasticbeanstalk.com`
   
   ⚠️ **Nota:** Primero debes desplegar el backend en Elastic Beanstalk para obtener esta URL.

### 6. Configuración Avanzada (Opcional)

En **"Advanced settings"**:
- **Node version**: 18 (o la que uses)
- **Build timeout**: 10 minutos (default está bien)

### 7. Deploy

1. Haz clic en **"Save and deploy"**
2. Amplify comenzará a:
   - Provisionar recursos
   - Clonar el repositorio
   - Instalar dependencias
   - Construir la aplicación
   - Desplegar

Esto tomará unos 5-10 minutos.

### 8. Obtener la URL

Una vez completado, verás:
- ✅ **URL de tu app**: `https://main.xxxxx.amplifyapp.com`

### 9. Configurar CORS en el Backend

Ahora que tienes la URL de Amplify, actualiza el backend:

En `backend/server.js`, cambia:

```javascript
app.use(cors());
```

Por:

```javascript
app.use(cors({
  origin: 'https://main.xxxxx.amplifyapp.com', // Tu URL de Amplify
  credentials: true
}));
```

Luego redespliega el backend en Elastic Beanstalk.

---

## 🔧 Troubleshooting

### Error: "Build failed"

**Verifica:**
1. Que `package.json` no tenga dependencias del backend
2. Que `.amplifyignore` esté ignorando la carpeta `backend/`
3. Los logs de build en Amplify Console

### Error: "Cannot connect to backend"

**Verifica:**
1. Que `NEXT_PUBLIC_API_URL` esté configurada correctamente
2. Que el backend esté corriendo en Elastic Beanstalk
3. Que CORS esté configurado en el backend

### Error: "Module not found"

**Solución:**
1. Ve a Amplify Console → App settings → Build settings
2. Agrega en preBuild:
   ```yaml
   - npm ci --legacy-peer-deps
   ```

---

## 📝 Notas Importantes

1. **Carpeta backend**: Se ignora automáticamente con `.amplifyignore`
2. **Variables de entorno**: Solo `NEXT_PUBLIC_*` son accesibles en el cliente
3. **Redeploy automático**: Cada push a `main` redesplegará automáticamente
4. **Costos**: Amplify tiene un tier gratuito, pero revisa los límites

---

## ✅ Checklist Final

- [ ] Backend desplegado en Elastic Beanstalk
- [ ] URL del backend obtenida
- [ ] `NEXT_PUBLIC_API_URL` configurada en Amplify
- [ ] CORS configurado en el backend
- [ ] Frontend desplegado en Amplify
- [ ] Probado generando una historia

---

## 🎉 ¡Listo!

Tu aplicación debería estar funcionando en:
- **Frontend**: `https://main.xxxxx.amplifyapp.com`
- **Backend**: `http://tu-backend.elasticbeanstalk.com`
