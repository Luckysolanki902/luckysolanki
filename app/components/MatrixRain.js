'use client';

import { useEffect, useRef } from 'react';
import styles from './MatrixRain.module.css';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Professional binary and tech symbols only
    const binary = '01';
    const techSymbols = '{}[]()<>=+-*/%&|^~';
    const allChars = (binary + techSymbols).split('');
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) * 0.4; // More visible but not overwhelming
    
    const drops = [];
    const speeds = [];
    const brightnesses = [];
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
      speeds[i] = 0.5 + Math.random() * 1.5; // Varied speeds for visual interest
      brightnesses[i] = Math.random();
    }

    const draw = () => {
      // Lighter trailing effect so matrix is more visible
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", "Consolas", monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Professional blue-green tech color with varied brightness
        const brightness = brightnesses[i];
        let color;
        
        if (brightness > 0.85) {
          color = 'rgba(100, 200, 255, 0.9)'; // Bright blue accent
        } else if (brightness > 0.7) {
          color = 'rgba(0, 255, 150, 0.7)'; // Matrix green
        } else if (brightness > 0.5) {
          color = 'rgba(0, 200, 255, 0.5)'; // Cyan
        } else if (brightness > 0.3) {
          color = 'rgba(0, 150, 200, 0.4)'; // Dark cyan
        } else {
          color = 'rgba(30, 100, 150, 0.3)'; // Very subtle blue
        }
        
        ctx.fillStyle = color;
        
        const text = allChars[Math.floor(Math.random() * allChars.length)];
        const x = i * fontSize * 2.5; // Spread out more for elegance
        
        ctx.fillText(text, x, drops[i] * fontSize);
        
        // Update brightness occasionally for shimmer effect
        if (Math.random() > 0.98) {
          brightnesses[i] = Math.random();
        }
        
        // Reset drop when it goes off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = 0.5 + Math.random() * 1.5;
        }
        
        drops[i] += speeds[i];
      }
    };

    const interval = setInterval(draw, 60); // Smooth 60fps equivalent
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={styles.matrixCanvas}
    />
  );
};

export default MatrixRain;
