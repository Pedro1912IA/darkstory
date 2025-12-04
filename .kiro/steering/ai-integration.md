---
inclusion: fileMatch
fileMatchPattern: "**/generate.*"
---

# AI Integration Guidelines - Gemini API & ElevenLabs

## Google Gemini API Best Practices

### Gemini for Story Generation

#### Optimal Configuration
```python
{
  "model": "gemini-pro",
  "temperature": 0.8,        # High creativity
  "max_output_tokens": 1500, # ~1000 words
  "top_p": 0.9,
  "top_k": 40
}
```

#### System Prompt Template
```
You are a master writer of psychological horror stories. 
Create stories that:
- Build tension gradually
- Use atmosphere and suspense
- Avoid excessive gore
- Have unexpected twists
- Length: 500-800 words
- Structure: beginning, development, climax, resolution
```

#### User Prompt Template
```
Write a horror story about: {theme}

The story should:
1. Start with a normal situation
2. Gradually introduce disturbing elements
3. Build tension to a climax
4. End with an impactful conclusion

Style: Psychological horror, dark atmosphere, suspense.
```

### Gemini for Image Generation

#### Optimal Configuration
```python
{
  "model": "gemini-pro-vision",  # or "gemini-1.5-pro" for images
  "temperature": 0.7,
  "max_output_tokens": 2048
}
```

#### Prompt Engineering for Horror Images

**Base Template**:
```
Dark atmospheric horror scene, {scene_description}, 
cinematic lighting, moody, detailed, photorealistic, 
dramatic shadows, eerie atmosphere, 4k quality
```

**Scene Extraction from Story**:
1. Identify 4 key moments in the story
2. Extract visual description of each moment
3. Add consistent style
4. Avoid text in images

**Example Prompts**:
```
Scene 1 (Beginning):
"Dark atmospheric horror scene, abandoned Victorian mansion at dusk, 
overgrown garden, broken windows, cinematic lighting, moody, detailed, 
photorealistic, dramatic shadows, eerie atmosphere"

Scene 2 (Development):
"Dark atmospheric horror scene, dimly lit corridor with peeling wallpaper, 
shadows moving on walls, single flickering candle, cinematic lighting, 
moody, detailed, photorealistic, eerie atmosphere"

Scene 3 (Climax):
"Dark atmospheric horror scene, figure in shadows, intense dramatic lighting, 
fear and tension, cinematic composition, moody, detailed, photorealistic, 
horror atmosphere"

Scene 4 (Resolution):
"Dark atmospheric horror scene, aftermath of horror event, empty room, 
disturbing details, cinematic lighting, moody, detailed, photorealistic, 
unsettling atmosphere"
```

## ElevenLabs API for Text-to-Speech

### Optimal Configuration
```python
{
  "voice_id": "21m00Tcm4TlvDq8ikWAM",  # Rachel voice
  "model_id": "eleven_multilingual_v2",
  "voice_settings": {
    "stability": 0.5,
    "similarity_boost": 0.75,
    "style": 0.5,
    "use_speaker_boost": True
  }
}
```

### Voice Selection for Horror
- **Rachel**: Neutral, clear (good for narration)
- **Bella**: Soft, mysterious
- **Antoni**: Deep, ominous
- **Elli**: Young, innocent (contrast with horror)

## Error Handling

### Common Gemini API Errors

#### Rate Limit Error (429)
```python
if error.status_code == 429:
    time.sleep(2)
    return retry_request()
```

#### Invalid API Key (401)
```python
if error.status_code == 401:
    raise Exception('Invalid API key. Check GEMINI_API_KEY environment variable.')
```

#### Content Policy Violation (400)
```python
if error.status_code == 400 and 'safety' in str(error):
    raise Exception('Content violates Gemini safety policy. Try a different theme.')
```

### Common ElevenLabs Errors

#### Quota Exceeded
```python
if error.status_code == 401 and 'quota' in str(error):
    raise Exception('ElevenLabs quota exceeded. Check your plan.')
```

#### Invalid Voice ID
```python
if error.status_code == 404:
    raise Exception('Voice ID not found. Check ELEVENLABS_VOICE_ID.')
```

## Performance Optimization

### Parallel Image Generation
```python
import asyncio

# Generate 4 images in parallel
async def generate_all_images(scenes):
    tasks = [generate_image(scene) for scene in scenes]
    images = await asyncio.gather(*tasks)
    return images
```

### Retry Logic
```python
import time

def generate_with_retry(prompt, max_retries=3):
    for i in range(max_retries):
        try:
            return generate(prompt)
        except Exception as error:
            if i == max_retries - 1:
                raise error
            time.sleep(1 * (i + 1))  # Exponential backoff
```

### Caching (Future Enhancement)
```python
# Cache responses to reduce API calls
cache = {}

def get_cache_key(prompt):
    import hashlib
    return hashlib.md5(prompt.encode()).hexdigest()

def generate_with_cache(prompt):
    key = get_cache_key(prompt)
    if key in cache:
        return cache[key]
    
    result = generate(prompt)
    cache[key] = result
    return result
```

## Cost Optimization

### API Pricing
- **Gemini Pro**: Free tier available, then ~$0.00025 per 1K characters
- **Gemini Pro Vision**: ~$0.0025 per image
- **ElevenLabs**: ~$0.30 per 1K characters (varies by plan)

### Estimated Cost per Story
- Story generation (Gemini): ~1500 chars = ~$0.0004
- 4 images (Gemini Vision): 4 × $0.0025 = ~$0.01
- Audio narration (ElevenLabs): ~1500 chars = ~$0.45
- **Total per story**: ~$0.46 (mainly ElevenLabs)

### Cost Reduction Strategies
1. **Caching**: Reduce duplicate requests
2. **Rate limiting**: Prevent abuse
3. **Prompt optimization**: Shorter prompts = fewer tokens
4. **Quality settings**: Balance quality vs cost

## Monitoring & Logging

### Log Important Events
```python
print(f'[Gemini] Story generation started: {theme}')
print(f'[Gemini] Story generated: {len(story)} characters')
print(f'[Gemini] Image generation started: scene {scene_num}')
print(f'[Gemini] All images generated: {len(images)} images')
print(f'[ElevenLabs] Audio generation started: {len(text)} characters')
print(f'[ElevenLabs] Audio generated: {audio_size} bytes')
```

### Track Usage
```python
# Track API usage for monitoring
usage = {
    "stories": 0,
    "images": 0,
    "audio": 0,
    "cost": 0.0
}

def track_usage(type, data):
    usage[type] += 1
    if "cost" in data:
        usage["cost"] += data["cost"]
```

## Testing

### Test with Mock Data
```python
# For development, use mock responses
MOCK_MODE = os.getenv('NODE_ENV') == 'development'

def generate_story(theme):
    if MOCK_MODE:
        return {
            "story": f"Mock horror story about {theme}",
            "scenes": ["Scene 1", "Scene 2", "Scene 3", "Scene 4"]
        }
    
    return call_gemini_api(theme)
```

### Validate Responses
```python
def validate_story_response(response):
    if not response or 'text' not in response:
        raise Exception('Invalid response from Gemini')
    
    story = response['text']
    
    if len(story) < 100:
        raise Exception('Story too short')
    
    return story
```

## Security

### API Key Protection
- Never expose API keys in frontend
- Use environment variables: GEMINI_API_KEY, ELEVENLABS_API_KEY
- Rotate keys regularly
- Monitor for unusual usage

### Input Sanitization
```python
import re

def sanitize_theme(theme):
    # Remove potentially harmful content
    theme = theme.strip()
    theme = theme[:200]  # Max length
    theme = re.sub(r'[<>]', '', theme)  # Remove HTML
    return theme
```

### Content Filtering
```python
BLOCKED_KEYWORDS = ['explicit', 'violent', 'illegal']

def validate_theme(theme):
    lower = theme.lower()
    for keyword in BLOCKED_KEYWORDS:
        if keyword in lower:
            raise Exception('Theme contains inappropriate content')
```

## References

- Gemini API Docs: https://ai.google.dev/docs
- Gemini Pro Guide: https://ai.google.dev/tutorials/python_quickstart
- ElevenLabs API Docs: https://elevenlabs.io/docs/api-reference
- ElevenLabs Voice Library: https://elevenlabs.io/voice-library
- Rate Limits: Check respective API documentation
