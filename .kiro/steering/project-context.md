---
inclusion: always
---

# DarkStory Project - Steering Context

## Project Overview

DarkStory is a web application for generating horror stories with images using AI.

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Python/Flask
- **AI**: Google Gemini API (text & images) + ElevenLabs API (TTS/narration)
- **Deployment**: AWS Amplify (frontend), Vercel (Python backend)

## Coding Standards

### TypeScript
- Use explicit types, avoid `any`
- Interfaces for component props
- Types for API responses
- Strict mode enabled

### React/Next.js
- Functional components with hooks
- Server components by default in Next.js 14
- Client components only when necessary ('use client')
- Naming: PascalCase for components, camelCase for functions

### Styling
- Tailwind CSS for all styles
- Utility classes, avoid custom CSS
- Responsive design: mobile-first
- Dark theme by default

### API Integration
- Robust error handling with try-catch
- Clear loading states
- Retry logic for temporary failures
- Configurable timeouts
- Rate limiting on backend

## Project Structure

```
DarkStory/
├── app/                    # Next.js 14 app directory
│   ├── page.tsx           # Homepage
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── StoryGenerator.tsx # Main story generation
│   ├── ImageGrid.tsx      # Image display
│   └── AudioPlayer.tsx    # Audio playback
├── backend-vercel/        # Python backend (Vercel)
│   └── api/
│       └── index.py       # Flask API - Gemini + ElevenLabs
├── lib/                   # Utilities
└── amplify.yml            # AWS Amplify config
```

## Environment Variables

### Required
- `GEMINI_API_KEY`: Google Gemini API key
- `ELEVENLABS_API_KEY`: ElevenLabs API key
- `NEXT_PUBLIC_API_URL`: Backend URL (Vercel)

### Optional
- `NODE_ENV`: production/development
- `FLASK_ENV`: production/development

## Common Patterns

### API Calls
```typescript
try {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ theme })
  });
  
  if (!response.ok) throw new Error('API error');
  
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Error:', error);
  throw error;
}
```

### Component Structure
```typescript
'use client';

interface Props {
  // Props definition
}

export default function Component({ }: Props) {
  // State
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {}, []);
  
  // Handlers
  const handleAction = () => {};
  
  // Render
  return (
    <div className="tailwind-classes">
      {/* JSX */}
    </div>
  );
}
```

## Deployment Notes

### AWS Amplify (Frontend)
- Automatic deployment from main branch
- Optimized Next.js build
- Environment variables: Set in Amplify console
- Build command: `npm run build`

### Vercel (Python Backend)
- Python Flask API
- Serverless functions
- Environment variables: GEMINI_API_KEY, ELEVENLABS_API_KEY
- Auto-deploy from repository

## Testing Strategy

### Manual Testing
- Test story generation with various themes
- Verify image generation (4 images per story)
- Check audio playback
- Test error handling (invalid API key, network errors)
- Responsive design testing

### Automated Testing (Future)
- Unit tests for utilities
- Integration tests for API endpoints
- E2E tests for user flows

## Performance Considerations

### Frontend
- Image optimization with next/image
- Lazy loading for images
- Automatic code splitting with Next.js
- Minimize bundle size

### Backend
- Parallel image generation (4 images)
- Response caching (future)
- Rate limiting to prevent abuse
- Timeout handling (60s for images)

## Security

### API Keys
- Never commit API keys
- Use environment variables
- Rotate keys regularly
- Monitor usage

### CORS
- Configured for frontend domain
- Restrict origins in production
- Handle preflight requests

### Input Validation
- Sanitize user inputs
- Validate theme length
- Rate limiting per IP
- Content filtering

## Common Issues & Solutions

### Issue: 502 Bad Gateway
- **Cause**: Backend timeout or crash
- **Solution**: Increase timeout, check logs, verify API key

### Issue: CORS errors
- **Cause**: Missing CORS headers
- **Solution**: Configure CORS middleware correctly

### Issue: Image generation timeout
- **Cause**: Gemini API slow response
- **Solution**: Increase timeout to 60s, implement retry logic

### Issue: API rate limits
- **Cause**: Too many requests to Gemini/ElevenLabs
- **Solution**: Implement rate limiting, caching

## Documentation References

- Main README: #[[file:README.md]]
- Deployment guide: #[[file:DEPLOYMENT.md]]
- Security notes: #[[file:SECURITY.md]]
- Backend instructions: #[[file:BACKEND_FIXED_INSTRUCTIONS.md]]

## Development Workflow

1. **Local Development**:
   ```bash
   npm run dev                    # Frontend (port 3000)
   cd backend-vercel && python api/index.py  # Backend local
   ```

2. **Testing**:
   - Test locally before deployment
   - Verify environment variables (GEMINI_API_KEY, ELEVENLABS_API_KEY)
   - Check API connectivity

3. **Deployment**:
   - Push to main branch
   - Amplify auto-deploys frontend
   - Vercel auto-deploys backend
   - Test production URLs

## Best Practices

### Code Quality
- Write self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Follow DRY principle

### Git Workflow
- Descriptive commit messages
- Small, focused commits
- Document major changes
- Keep main branch stable

### Error Handling
- Always handle errors gracefully
- Provide user-friendly error messages
- Log errors for debugging
- Implement retry logic where appropriate

## Future Enhancements

- [ ] User authentication
- [ ] Save/share stories
- [ ] Multiple story styles
- [ ] Audio narration with AI voices
- [ ] Story editing capabilities
- [ ] Social sharing features
- [ ] Analytics dashboard
