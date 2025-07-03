'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import styles from './Footer.module.css';

// Dynamically import the FooterAnimation to prevent SSR issues
const FooterAnimation = dynamic(() => import('./FooterAnimation'), {
  ssr: false,
  loading: () => null
});

export default function Footer() {
  const [year] = useState(new Date().getFullYear());
  const [animationLoaded, setAnimationLoaded] = useState(false);
  
  useEffect(() => {
    // Set animation as loaded after a short delay for smoother transition
    const timer = setTimeout(() => {
      setAnimationLoaded(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <footer className={styles.footer}>
      {/* 3D Animation Background */}
      <div className={`${styles.animationContainer} ${animationLoaded ? styles.animationVisible : ''}`}>
        <Suspense fallback={null}>
          <FooterAnimation />
        </Suspense>
      </div>
      
      <div className={styles.content}>
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            <span className={styles.copyrightSymbol}>&lt;/&gt;</span> {year} • Built with Next.js and creativity
          </p>
        </div>
      </div>
    </footer>
  );
}
