export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blood/30 border-t-blood rounded-full animate-spin" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-blood rounded-full animate-spin" 
             style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
      </div>
      <p className="mt-6 text-blood font-serif text-xl animate-pulse">
        Generating nightmare...
      </p>
    </div>
  )
}
