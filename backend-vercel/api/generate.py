from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, origins=['*'])

@app.route('/api/generate', methods=['POST', 'OPTIONS'])
def generate():
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        import google.generativeai as genai
        
        data = request.get_json()
        prompt = data.get('prompt', 'a haunted house')
        
        GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', 'AIzaSyCBvSp0vx48CREARqLtoih-CFgPaLVinxM')
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

# For Vercel
if __name__ != '__main__':
    application = app
