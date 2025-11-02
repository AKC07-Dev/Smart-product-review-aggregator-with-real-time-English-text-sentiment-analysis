import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(onLoadingComplete, 300);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center gradient-hero transition-opacity duration-300 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 gradient-primary animate-morph shadow-glow"></div>
          <div className="absolute inset-4 bg-background rounded-3xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold text-primary animate-pulse-glow">R</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 animate-fade-in">Review Platform</h2>
        <p className="text-white/80 animate-fade-in-up">Loading your experience...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
