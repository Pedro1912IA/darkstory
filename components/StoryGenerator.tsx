'use client'

import { useState } from 'react'
import StoryCard from './StoryCard'
import ImageGrid from './ImageGrid'
import LoadingSpinner from './LoadingSpinner'
import AudioPlayer from './AudioPlayer'

const CATEGORIES = [
  'Haunted Houses',
  'Ghost Encounters',
  'Cursed Objects',
  'Dark Forests',
  'Demonic Entities',
  'Psychological Horror',
  'Monsters & Shadows',
  'Vampires and Werewolves',
  'Occult Rituals',
  'Lost Souls',
  'Supernatural Horrors',
  'Abandoned Places'
]

export default function StoryGenerator() {
  const [prompt, setPrompt] = useState('')
  const [story, setStory] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [audioUrl, setAudioUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingAudio, setLoadingAudio] = useState(false)
  const [error, setError] = useState('')

  const handleCategoryClick = (category: string) => {
    setPrompt(category)
  }

  const generateStory = async () => {
    if (!prompt.trim()) {
      setError('Please describe your nightmare or select a category...')
      return
    }

    setLoading(true)
    setError('')
    setStory('')
    setImages([])
    setAudioUrl('')

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
      
      const response = await fetch(`${API_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate story')
      }

      const data = await response.json()
      setStory(data.story)
      
      // Preload all images in parallel to trigger generation
      if (data.images && data.images.length > 0) {
        data.images.forEach((imgUrl: string) => {
          const img = new Image()
          img.src = imgUrl
        })
      }
      
      setImages(data.images)

      // Generate audio narration
      setLoadingAudio(true)
      try {
        const audioResponse = await fetch(`${API_URL}/api/tts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: data.story }),
        })

        if (audioResponse.ok) {
          const audioData = await audioResponse.json()
          setAudioUrl(audioData.audio)
        }
      } catch (audioErr) {
        console.error('Failed to generate audio:', audioErr)
      } finally {
        setLoadingAudio(false)
      }
    } catch (err) {
      setError('The shadows refused to speak. Try again...')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      generateStory()
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <div className="bg-dark-card border border-dark-border rounded-lg p-8 glow-red-hover transition-all">
        {/* Categories as filters */}
        <div className="mb-6">
          <h3 className="text-gray-400 text-sm mb-3 font-medium">Quick Categories:</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="py-2 px-4 rounded-full border border-blood/30 bg-black text-gray-300 hover:border-blood hover:text-white hover:bg-blood/10 transition-all text-sm font-medium glow-red-hover"
                disabled={loading}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe your nightmare... (e.g., 'a haunted mansion in the woods where time stands still')"
          className="w-full bg-black border border-blood/30 rounded-lg p-4 text-white placeholder-gray-600 focus:outline-none focus:border-blood focus:ring-1 focus:ring-blood resize-none h-32 transition-all"
          disabled={loading}
        />
        
        {error && (
          <p className="text-blood text-sm mt-2">{error}</p>
        )}

        <button
          onClick={generateStory}
          disabled={loading}
          className="mt-4 w-full bg-blood hover:bg-red-700 disabled:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg transition-all glow-red-hover disabled:cursor-not-allowed"
        >
          {loading ? 'Summoning Shadows...' : 'Generate Story'}
        </button>
      </div>

      {loading && <LoadingSpinner />}

      {story && (
        <>
          <StoryCard story={story} />
          
          {loadingAudio && (
            <div className="bg-dark-card border border-blood/30 rounded-lg p-6 text-center">
              <div className="w-8 h-8 border-2 border-blood border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Generating audio narration...</p>
            </div>
          )}
          
          {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
          
          {images.length > 0 && <ImageGrid images={images} />}
          
          <button
            onClick={() => {
              setPrompt('')
              setStory('')
              setImages([])
              setAudioUrl('')
            }}
            className="w-full bg-dark-card border border-blood/50 hover:border-blood text-blood font-bold py-3 px-6 rounded-lg transition-all glow-red-hover"
          >
            Generate Another Nightmare
          </button>
        </>
      )}
    </div>
  )
}
