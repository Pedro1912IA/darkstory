from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import base64

app = Flask(__name__)
CORS(app, origins=['*'])

@app.route('/api/tts', methods=['POST', 'OPTIONS'])
def tts():
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        from elevenlabs.client import ElevenLabs
        
        data = request.get_json()
        text = data.get('text', 'Test')
        
        ELEVENLABS_API_KEY = os.environ.get('ELEVENLABS_API_KEY', 'fdc8a6f40d14b66a17c3b1126936c593df17192431704d2833d9048c95b95507')
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
