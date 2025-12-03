# 🔍 Debug Backend - Versión Simplificada

## 📦 Nuevo ZIP: `backend-python-simple.zip`

Esta versión tiene:
- ✅ Logs detallados
- ✅ Manejo de errores mejorado
- ✅ Endpoints de prueba
- ✅ Imports más seguros
- ✅ Timeouts configurados

---

## 🚀 Cómo Usar

### 1. Subir el Nuevo ZIP

1. Ve a Elastic Beanstalk
2. Haz clic en **"Upload and Deploy"**
3. Selecciona **`backend-python-simple.zip`**
4. Version label: `simple-v1`
5. Deploy

### 2. Probar Endpoints

Una vez desplegado, prueba en orden:

#### A. Home (más simple):
```
http://tu-url.elasticbeanstalk.com/
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

#### B. Health Check:
```
http://tu-url.elasticbeanstalk.com/health
```

#### C. Test Endpoint:
```
http://tu-url.elasticbeanstalk.com/api/test
```

#### D. Generate (con datos):
```bash
curl -X POST http://tu-url.elasticbeanstalk.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"test"}'
```

---

## 📋 Logs que Necesito

Si sigue sin funcionar, envíame:

### 1. Logs de Elastic Beanstalk

En AWS Console:
1. Tu aplicación → **Logs**
2. **Request Logs** → **Last 100 Lines**
3. Download y copia el contenido

Busca líneas con:
- `ERROR`
- `CRITICAL`
- `Exception`
- `Traceback`
- `ImportError`
- `ModuleNotFoundError`

### 2. Estado del Environment

- ¿Qué color muestra? (Verde/Amarillo/Rojo)
- ¿Qué mensaje aparece?

### 3. Events

En la pestaña **Events**, copia los últimos 5-10 eventos.

---

## 🔧 Errores Comunes y Soluciones

### ❌ Error: "502 Bad Gateway"

**Causa**: El servidor no inició correctamente.

**Logs a buscar**:
```
ModuleNotFoundError: No module named 'flask'
```

**Solución**: El ZIP debe tener `requirements.txt` en la raíz.

---

### ❌ Error: "Application failed to start"

**Causa**: Error en el código Python.

**Logs a buscar**:
```
SyntaxError
IndentationError
ImportError
```

**Solución**: Usa `backend-python-simple.zip` que tiene mejor manejo de errores.

---

### ❌ Error: "Health check failed"

**Causa**: El endpoint `/health` no responde.

**Solución**:
1. Verifica que el servidor esté corriendo
2. Revisa los logs de Gunicorn
3. Prueba el endpoint `/` primero

---

### ❌ Error: "Timeout"

**Causa**: El servidor tarda mucho en responder.

**Solución**: Ya configurado en `Procfile` con timeout de 120s.

---

## 🎯 Checklist de Verificación

Antes de enviar logs, verifica:

- [ ] Plataforma es **Python 3.11**
- [ ] El ZIP contiene `application.py` en la raíz
- [ ] El ZIP contiene `requirements.txt` en la raíz
- [ ] El ZIP contiene `Procfile` en la raíz
- [ ] El ZIP contiene carpeta `.ebextensions/`
- [ ] No hay carpetas extra (todo en la raíz del ZIP)

---

## 📁 Estructura Correcta del ZIP

```
backend-python-simple.zip
├── application.py
├── requirements.txt
├── Procfile
└── .ebextensions/
    └── 01_python.config
```

**NO debe tener**:
```
backend-python-simple.zip
└── backend-python-simple/  ❌ (carpeta extra)
    ├── application.py
    └── ...
```

---

## 🆘 Si Nada Funciona

Prueba esta configuración mínima:

### Crear Nuevo Environment

1. Elimina el environment actual
2. Crea uno nuevo
3. **Platform**: Python 3.11
4. **Sample application** primero (para verificar que funciona)
5. Si funciona, sube `backend-python-simple.zip`

---

## 📞 Información para Debug

Cuando me envíes los logs, incluye:

1. **Logs completos** (últimas 100 líneas)
2. **Región de AWS** (ej: us-east-1)
3. **Versión de Python** configurada
4. **Mensaje de error** exacto
5. **Color del health status**
6. **Últimos 5 eventos**

Con esa información podré identificar el problema exacto.
