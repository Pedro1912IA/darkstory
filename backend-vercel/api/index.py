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
        
        # Use Gemini 2.5 Flash Image model
        try:
            image_model = genai.GenerativeModel('gemini-2.5-flash-image')
            
            for idx, img_prompt in enumerate(image_prompts):
                try:
                    print(f"Generating image {idx + 1} with prompt: {img_prompt[:100]}...")
                    img_response = image_model.generate_content(img_prompt)
                    
                    print(f"Response received for image {idx + 1}")
                    
                    # Extract image from response
                    if img_response and hasattr(img_response, 'candidates'):
                        for candidate in img_response.candidates:
                            if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
                                for part in candidate.content.parts:
                                    # Check for inline_data attribute
                                    if hasattr(part, 'inline_data'):
                                        inline_data = part.inline_data
                                        if hasattr(inline_data, 'data'):
                                            image_data = inline_data.data
                                            # If it's bytes, encode to base64
                                            if isinstance(image_data, bytes):
                                                image_data = base64.b64encode(image_data).decode('utf-8')
                                            images.append(f"data:image/png;base64,{image_data}")
                                            print(f"Image {idx + 1} successfully generated")
                                            break
                                if len(images) > idx:
                                    break
                                    
                except Exception as img_err:
                    print(f"Image {idx + 1} generation error: {str(img_err)}")
                    import traceback
                    traceback.print_exc()
                    continue
                    
        except Exception as model_err:
            print(f"Image model initialization error: {str(model_err)}")
            import traceback
            traceback.print_exc()
        
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
