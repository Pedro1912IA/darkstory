from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import base64

app = Flask(__name__)
CORS(app, origins=['*'])

@app.route('/')
def home():
    return jsonify({
        'status': 'ok',
        'message': 'Dark Story API is running',
        'version': '1.0',
        'endpoints': ['/health', '/api/generate', '/api/tts']
    })

@app.route('/health')
def health():
    return jsonify({'status': 'ok', 'message': 'Dark Story API is running'})

@app.route('/api/generate', methods=['POST', 'OPTIONS'])
def generate():
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        import google.generativeai as genai
        
        data = request.get_json()
        prompt = data.get('prompt', 'a haunted house')
        
        GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
        genai.configure(api_key=GEMINI_API_KEY)
        
        # Generate story
        story_model = genai.GenerativeModel('gemini-2.0-flash-exp')
        story_prompt = f"""You are a master horror writer. Create a terrifying, atmospheric, and immersive horror story about: {prompt}. 

Write EXACTLY 1 paragraph. Use vivid descriptions, build tension gradually, and create an impactful ending. Write in English with a literary and terrifying style. Make it concise but powerful."""
        
        story_response = story_model.generate_content(story_prompt)
        story = story_response.text
        
        # Generate images using Gemini 2.5 Flash Image
        images = []
        story_snippet = story[:300]
        
        image_prompts = [
            f"A dark horror scene: {prompt}. Cinematic, dark atmosphere, horror aesthetic, dramatic lighting",
            f"Gothic horror illustration: {prompt}. Ominous shadows, eerie atmosphere, dark",
            f"Nightmare horror scene: {prompt}. Dark fantasy, haunting, mysterious, creepy"
        ]
        
        # Use Pollinations AI for fast image generation (parallel loading)
        import urllib.parse
        for img_prompt in image_prompts:
            try:
                encoded_prompt = urllib.parse.quote(img_prompt)
                # Pollinations generates images on-demand via URL (loads in parallel on frontend)
                # Using 768x768 for faster loading while maintaining quality
                image_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=768&height=768&nologo=true&enhance=true&seed={hash(img_prompt) % 10000}"
                images.append(image_url)
            except Exception as img_err:
                print(f"Image generation error: {img_err}")
                continue
        
        return jsonify({
            'story': story,
            'images': images
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/tts', methods=['POST', 'OPTIONS'])
def tts():
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        from elevenlabs.client import ElevenLabs
        
        data = request.get_json()
        text = data.get('text', 'Test')
        
        ELEVENLABS_API_KEY = os.environ.get('ELEVENLABS_API_KEY')
        client = ElevenLabs(api_key=ELEVENLABS_API_KEY)
        
        audio = client.text_to_speech.convert(
            voice_id="1BfrkuYXmEwp8AWqSLWk",
            text=text[:500],
            model_id="eleven_multilingual_v2",
            output_format="mp3_44100_128"
        )
        
        audio_bytes = b''
        for chunk in audio:
            audio_bytes += chunk
        
        audio_base64 = base64.b64encode(audio_bytes).decode('utf-8')
        
        return jsonify({
            'audio': f"data:audio/mp3;base64,{audio_base64}"
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# For Vercel
if __name__ != '__main__':
    application = app
