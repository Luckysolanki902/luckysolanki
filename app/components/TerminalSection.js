'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './TerminalSection.module.css';
import Terminal from './Terminal';
import MatrixRain from './MatrixRain';

export default function TerminalSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`${styles.terminalSection} ${isVisible ? styles.visible : ''}`}
      id="terminal"
    >
      {/* Matrix Rain Background */}
      <div className={styles.matrixBackground}>
        <MatrixRain />
      </div>

      {/* Professional background overlay */}
      <div className={styles.backgroundOverlay}></div>
      
      {/* Floating particles */}
      <div className={styles.particlesContainer}>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className={`${styles.particle} ${styles[`particle${i % 4 + 1}`]}`}></div>
        ))}
      </div>

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleAccent}>{'>'}</span>
          <span className={styles.titleMain}>_terminal</span>
          <span className={styles.titleCursor}>|</span>
        </h2>
        <p className={styles.sectionSubtitle}>
          Navigate my digital world through commands • Type <span className={styles.highlight}>help</span> to explore
        </p>
      </div>
      
      <div className={styles.terminalContainer}>
        <Terminal />
      </div>
      
      {/* Background effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.gridOverlay}></div>
        <div className={styles.noiseOverlay}></div>
      </div>
    </section>
  );
}
