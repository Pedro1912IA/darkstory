# 🔒 Security

## API Keys Protection

This application uses sensitive API keys that are **securely stored on the server-side only**.

### How API Keys are Protected:

1. **Environment Variables**: All API keys are stored in `.env.local` file which is:
   - ✅ Listed in `.gitignore` (never committed to repository)
   - ✅ Only accessible on the server-side
   - ✅ Never exposed to the client/browser

2. **Server-Side API Routes**: All API calls are made through Next.js API routes:
   - `/app/api/generate/route.ts` - Handles Gemini AI story generation
   - `/app/api/tts/route.ts` - Handles ElevenLabs text-to-speech

3. **No Client-Side Exposure**: 
   - API keys are NEVER sent to the browser
   - All sensitive operations happen on the server
   - Client only receives the generated content

### Setup for Deployment:

When deploying to AWS Amplify or any hosting platform:

1. **DO NOT** commit `.env.local` to your repository
2. **DO** add environment variables in your hosting platform's dashboard:
   - `GEMINI_API_KEY`
   - `ELEVENLABS_API_KEY`

### For AWS Amplify:

1. Go to your app in Amplify Console
2. Navigate to "Environment variables"
3. Add your API keys there
4. They will be securely stored and only accessible to your server

### Checking for Exposed Keys:

```bash
# Make sure .env.local is in .gitignore
cat .gitignore | grep .env

# Check git history doesn't contain keys
git log --all --full-history --source -- .env.local
```

## Best Practices:

- ✅ Use `.env.local` for local development
- ✅ Use platform environment variables for production
- ✅ Never hardcode API keys in source code
- ✅ Rotate API keys if accidentally exposed
- ✅ Use `.env.example` as a template (without real keys)

## If Keys are Compromised:

1. Immediately revoke the exposed keys in Google Cloud Console and ElevenLabs dashboard
2. Generate new API keys
3. Update environment variables in your deployment platform
4. Redeploy your application
