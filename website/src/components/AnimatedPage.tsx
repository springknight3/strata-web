import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from '../lib/use-reduced-motion';
import { animatePageEnter } from '../lib/motion';

interface AnimatedPageProps {
  children: React.ReactNode;
}

export const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    animatePageEnter(containerRef.current, reducedMotion);
  }, [location.pathname, reducedMotion]);

  return <div ref={containerRef}>{children}</div>;
};
