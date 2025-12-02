# 🌙 Dark Story AI

Una aplicación web de terror que genera cuentos personalizados e imágenes usando IA.

## 🎃 Características

- Generación de cuentos de terror personalizados con GPT-4
- 3 imágenes generadas automáticamente con DALL-E 3
- Interfaz oscura y minimalista estilo "horror moderno"
- Animaciones suaves y efectos visuales
- Diseño responsive

## 🚀 Instalación

1. Clona el repositorio
2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env.local` con tus API keys:

```
GEMINI_API_KEY=tu_gemini_api_key
ELEVENLABS_API_KEY=tu_elevenlabs_api_key
```

4. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 🚀 Despliegue en AWS Amplify

1. Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Haz clic en "New app" > "Host web app"
3. Conecta tu repositorio de GitHub
4. Amplify detectará automáticamente el archivo `amplify.yml`
5. En "Environment variables", agrega:
   - `GEMINI_API_KEY`: Tu API key de Google Gemini
   - `ELEVENLABS_API_KEY`: Tu API key de ElevenLabs
6. Haz clic en "Save and deploy"

**Nota:** Asegúrate de que tu cuenta de AWS tenga los permisos necesarios y que las API keys estén configuradas correctamente.

## 🎨 Paleta de Colores

- Negro: `#000000`
- Gris oscuro: `#111111`
- Bordes: `#222222`
- Rojo carmesí: `#B30000`

## 🛠️ Tecnologías

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Google Gemini AI (gemini-2.0-flash-exp para texto e imágenes)

## 📝 Uso

1. Describe el tipo de cuento de terror que quieres
2. Haz clic en "Generate Story"
3. Espera mientras la IA genera tu pesadilla
4. Disfruta del cuento y las imágenes generadas
5. Genera otra historia cuando quieras

## ⚠️ Nota

Necesitas una API key válida de Google Gemini AI. Las imágenes se generan automáticamente basándose en el cuento creado.
