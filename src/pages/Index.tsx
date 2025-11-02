import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Landing from './Landing';

const Index = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
    if (hasSeenLoading) {
      setShowLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasSeenLoading', 'true');
    setShowLoading(false);
  };

  if (showLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return <Landing />;
};

export default Index;
