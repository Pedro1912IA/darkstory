const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const generateStory = async (prompt: string) => {
  const response = await fetch(`${API_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate story');
  }

  return response.json();
};

export const generateAudio = async (text: string) => {
  const response = await fetch(`${API_URL}/api/tts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate audio');
  }

  return response.json();
};
