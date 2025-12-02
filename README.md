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

3. Crea un archivo `.env.local` con tu API key de Gemini:

```
GEMINI_API_KEY=AIzaSyCBvSp0vx48CREARqLtoih-CFgPaLVinxM
```

4. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

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
