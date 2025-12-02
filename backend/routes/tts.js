const express = require('express');
const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');

const router = express.Router();
const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY || '',
});

router.post('/', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const audio = await elevenlabs.textToSpeech.convert(
      '1BfrkuYXmEwp8AWqSLWk', // voice_id (Adam - deep voice)
      {
        text: text,
        model_id: 'eleven_multilingual_v2',
        output_format: 'mp3_44100_128',
      }
    );

    // Convert audio stream to buffer
    const chunks = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
    
    const buffer = Buffer.concat(chunks);
    const base64Audio = buffer.toString('base64');

    res.json({
      audio: `data:audio/mp3;base64,${base64Audio}`,
    });
  } catch (error) {
    console.error('Error generating audio:', error);
    res.status(500).json({ error: error.message || 'Failed to generate audio' });
  }
});

module.exports = router;
