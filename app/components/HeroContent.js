'use client';

import { useEffect, useState } from 'react';
import styles from './HeroContent.module.css';

const HeroContent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showCodeBlock, setShowCodeBlock] = useState(false);
  const [typedText, setTypedText] = useState('');
  
  const fullText = "I’m obsessed with simplifying the complex — automating tasks, building intuitive systems, and chasing ideas the moment they strike. I believe in smart work over hard grind, and I code until it’s real. If something can be made better, faster, or smarter — I’ll probably build it before thinking twice.";

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 300);
    const timer2 = setTimeout(() => setShowSubtitle(true), 800);
    const timer3 = setTimeout(() => setShowDescription(true), 1400);
    const timer4 = setTimeout(() => setShowCodeBlock(true), 2800);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  useEffect(() => {
    if (showDescription) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 35);

      return () => clearInterval(typingInterval);
    }
  }, [showDescription, fullText]);

  return (
    <div className={styles.heroContent}>
      <div className={styles.titleContainer}>
        <h1 className={`${styles.mainTitle} ${isVisible ? styles.visible : ''}`}>
          <span className={styles.name}>Lucky Solanki</span>
        </h1>
        
        <div className={`${styles.subtitleContainer} ${showSubtitle ? styles.visible : ''}`}>
          <h2 className={styles.subtitle}>
            <span className={styles.passionate}>Passionate</span>
            <span className={styles.developer}>Developer</span>
            <span className={styles.ampersand}>&</span>
            <span className={styles.entrepreneur}>Entrepreneur</span>
          </h2>
          
          <div className={styles.techAccent}></div>
          
          <p className={`${styles.description} ${showDescription ? styles.visible : ''}`}>
            {typedText}
            <span className={styles.cursor}>|</span>
          </p>
          
        </div>
      </div>
      
      <div 
        className={styles.scrollIndicator} 
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          }
        }}
        aria-label="Scroll to next section"
      >
        <div className={styles.scrollDot}></div>
        <div className={styles.scrollText}>Explore</div>
      </div>
    </div>
  );
};

export default HeroContent;
