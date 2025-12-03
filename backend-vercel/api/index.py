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
        
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        story_prompt = f"Write a short horror story (1 paragraph) about: {prompt}"
        
        response = model.generate_content(story_prompt)
        story = response.text
        
        return jsonify({
            'story': story,
            'images': []
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
