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
        
        # Generate 3 images with Gemini in parallel
        images = []
        
        # Optimized prompts for Gemini
        image_prompts = [
            f"dark horror scene: {prompt}. cinematic, dramatic lighting",
            f"gothic horror: {prompt}. ominous shadows, eerie",
            f"nightmare scene: {prompt}. haunting, mysterious"
        ]
        
        # Use threading for parallel image generation
        from concurrent.futures import ThreadPoolExecutor, as_completed
        import threading
        
        def generate_single_image(img_prompt, index):
            """Generate a single image with Gemini"""
            try:
                print(f"Generating image {index + 1}...")
                image_model = genai.GenerativeModel('gemini-2.5-flash-image')
                img_response = image_model.generate_content(img_prompt)
                
                if img_response and hasattr(img_response, 'candidates'):
                    for candidate in img_response.candidates:
                        if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
                            for part in candidate.content.parts:
                                if hasattr(part, 'inline_data') and part.inline_data:
                                    if hasattr(part.inline_data, 'data'):
                                        image_data = part.inline_data.data
                                        if isinstance(image_data, bytes):
                                            image_data = base64.b64encode(image_data).decode('utf-8')
                                        print(f"Image {index + 1} generated successfully")
                                        return (index, f"data:image/png;base64,{image_data}")
            except Exception as e:
                print(f"Error generating image {index + 1}: {e}")
            return (index, None)
        
        # Generate all 3 images in parallel
        print("Starting parallel image generation with Gemini...")
        with ThreadPoolExecutor(max_workers=3) as executor:
            futures = [
                executor.submit(generate_single_image, prompt, idx)
                for idx, prompt in enumerate(image_prompts)
            ]
            
            # Collect results as they complete
            results = [None, None, None]
            for future in as_completed(futures):
                idx, img_data = future.result()
                if img_data:
                    results[idx] = img_data
        
        # Add successfully generated images
        images = [img for img in results if img is not None]
        print(f"Generated {len(images)} images with Gemini")
        
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
