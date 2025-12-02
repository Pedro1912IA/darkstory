interface StoryCardProps {
  story: string
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <div className="bg-dark-card border border-blood/30 rounded-lg p-8 glow-red animate-fade-in">
      <h2 className="text-3xl font-serif font-bold text-blood mb-6 text-center">
        Your Nightmare
      </h2>
      <div className="prose prose-invert max-w-none">
        {story.split('\n\n').map((paragraph, index) => (
          <p 
            key={index} 
            className="text-gray-300 leading-relaxed mb-4 font-serif text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}
