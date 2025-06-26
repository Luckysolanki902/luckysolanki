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

    // Ultra-minimal characters for subtlety
    const chars = '01';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) * 0.15; // Much fewer columns for subtlety
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }

    const draw = () => {
      // Very subtle black background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.98)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = fontSize + 'px "Inter", monospace';
      
      for (let i = 0; i < drops.length; i++) {
        // Ultra-subtle blue-gray color with very low opacity
        const opacity = Math.random() * 0.05; // Max 5% opacity
        ctx.fillStyle = `rgba(30, 41, 59, ${opacity})`;
        
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = (i * fontSize * 8) + (Math.random() * window.innerWidth * 0.1); // Spread out more
        
        // Only draw on outer edges of screen
        if (x < window.innerWidth * 0.15 || x > window.innerWidth * 0.85) {
          ctx.fillText(text, x, drops[i] * fontSize);
        }
        
        // Very slow movement
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }
        drops[i] += 0.2; // Much slower speed
      }
    };

    const interval = setInterval(draw, 150); // Very slow frame rate for subtlety
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={styles.matrixCanvas}
      style={{ opacity: 0.02 }} // Ultra-subtle opacity
    />
  );
};

export default MatrixRain;
