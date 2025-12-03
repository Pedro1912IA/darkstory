'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageGridProps {
  images: string[]
}

export default function ImageGrid({ images }: ImageGridProps) {
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    new Array(images.length).fill(false)
  )

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  const handleDownload = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `dark-story-image-${index + 1}-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download image:', error)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className="relative aspect-square bg-dark-card border border-blood/30 rounded-lg overflow-hidden group animate-fade-in"
          style={{ animationDelay: `${index * 200}ms` }}
        >
          {!loadedImages[index] && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-blood border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <Image
            src={imageUrl}
            alt={`Horror scene ${index + 1}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onLoad={() => handleImageLoad(index)}
            loading="lazy"
            quality={85}
            unoptimized
          />
          
          {/* Download button overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={() => handleDownload(imageUrl, index)}
              className="flex items-center gap-2 px-4 py-2 bg-blood hover:bg-red-700 text-white rounded-lg transition-all glow-red"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="font-medium">Download</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
