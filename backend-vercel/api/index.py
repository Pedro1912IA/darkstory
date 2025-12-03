from flask import Flask, jsonify, request
from flask_cors import CORS
import os

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

# For Vercel
if __name__ != '__main__':
    # Vercel uses this
    application = app
