export default function Logo() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-2">
        <svg 
          className="w-8 h-8 text-blood" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        <h1 className="text-5xl font-serif font-bold text-white tracking-wider">
          Dark Story AI
        </h1>
      </div>
      <p className="text-gray-400 text-sm tracking-widest">
        SUMMON YOUR NIGHTMARE
      </p>
    </div>
  )
}
