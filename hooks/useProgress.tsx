"use client";
import { useState, useEffect } from 'react';

interface ReadingProgress {
  progress: number;
}

const useProgress = (): ReadingProgress => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const currentProgress = (currentScroll / totalHeight) * 100;
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { progress };
};

export default useProgress;
