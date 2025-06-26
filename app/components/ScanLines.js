'use client';

import { useEffect, useRef } from 'react';
import styles from './ScanLines.module.css';

const ScanLines = () => {
  const scanLineRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const scanLine = scanLineRef.current;
    if (!scanLine) return;

    const animateScanLine = () => {
      scanLine.style.animation = 'none';
      setTimeout(() => {
        scanLine.style.animation = `${styles.scanLineMove} 6s linear infinite`;
      }, 10);
    };

    animateScanLine();
    
    const interval = setInterval(animateScanLine, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={styles.scanLinesOverlay}></div>
      <div 
        ref={scanLineRef}
        className={styles.scanLine}
      ></div>
    </>
  );
};

export default ScanLines;
