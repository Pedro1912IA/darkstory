'use client'

import { useState } from 'react'
import StoryGenerator from '@/components/StoryGenerator'
import Logo from '@/components/Logo'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Logo />
        <StoryGenerator />
      </div>
    </main>
  )
}
