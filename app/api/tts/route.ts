import { NextResponse } from 'next/server'
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY || '',
})

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    const audio = await elevenlabs.textToSpeech.convert(
      '1BfrkuYXmEwp8AWqSLWk', // voice_id (Adam - deep voice)
      {
        text: text,
        model_id: 'eleven_multilingual_v2',
        output_format: 'mp3_44100_128',
      }
    )

    // Convert audio stream to buffer
    const chunks: Uint8Array[] = []
    for await (const chunk of audio) {
      chunks.push(chunk)
    }
    
    const buffer = Buffer.concat(chunks)
    const base64Audio = buffer.toString('base64')

    return NextResponse.json({
      audio: `data:audio/mp3;base64,${base64Audio}`,
    })
  } catch (error: any) {
    console.error('Error generating audio:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate audio' },
      { status: 500 }
    )
  }
}
