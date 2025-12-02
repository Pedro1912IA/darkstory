'use client'

import { useState, useRef, useEffect } from 'react'

interface AudioPlayerProps {
  audioUrl: string
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const time = parseFloat(e.target.value)
    audio.currentTime = time
    setCurrentTime(time)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = audioUrl
    link.download = `dark-story-${Date.now()}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-dark-card border border-blood/30 rounded-lg p-6 glow-red animate-fade-in">
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-14 h-14 flex items-center justify-center bg-blood hover:bg-red-700 rounded-full transition-all glow-red-hover flex-shrink-0"
        >
          {isPlaying ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-gray-400 text-sm font-mono">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-2 bg-black rounded-lg appearance-none cursor-pointer audio-slider"
            />
            <span className="text-gray-400 text-sm font-mono">{formatTime(duration)}</span>
          </div>
          <p className="text-gray-500 text-sm">
            🎙️ Narrated Story
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-blood hover:bg-red-700 text-white rounded-lg transition-all glow-red-hover flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span className="font-medium text-sm">Download</span>
        </button>
      </div>

      <audio ref={audioRef} src={audioUrl} preload="metadata" />
    </div>
  )
}
