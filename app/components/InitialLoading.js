'use client';

import { useState, useEffect } from 'react';
import styles from './InitialLoading.module.css';

const loadingMessages = [
  { text: "Initializing quantum code flux capacitor...", time: 400 },
  { text: "Brewing coffee.js for optimal developer experience...", time: 500 },
  { text: "Untangling promises from callback hell...", time: 450 },
  { text: "Recruiting pixels for UI assembly...", time: 350 },
  { text: "Patching the matrix - déjà vu imminent...", time: 400 },
  { text: "Spinning up the hamster wheels...", time: 300 },
  { text: "Launching portfolio in 3...2...1...", time: 450 }
];

export default function InitialLoading({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [terminalLines, setTerminalLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Ensure minimum display time of 3 seconds for new users
    const startTime = Date.now();
    const minDisplayTime = 3000; // 3 seconds minimum display time
    
    // Set up loading sequence
    let currentProgress = 0;
    let messageIndex = 0;
    let lineId = 0;
    
    const advanceLoading = () => {
      if (messageIndex < loadingMessages.length) {
        const message = loadingMessages[messageIndex];
        
        // Add terminal line
        setTerminalLines(prev => [...prev, { 
          id: lineId++, 
          text: message.text, 
          status: 'loading' 
        }]);
        
        // After a short delay, mark the line as completed
        setTimeout(() => {
          setTerminalLines(prev => 
            prev.map(line => 
              line.id === lineId - 1 ? { ...line, status: 'completed' } : line
            )
          );
        }, message.time);
        
        // Advance progress
        const progressIncrement = 100 / loadingMessages.length;
        currentProgress += progressIncrement;
        setProgress(Math.min(currentProgress, 99)); // Cap at 99% until fully complete
        
        messageIndex++;
        setCurrentMessageIndex(messageIndex);
        
        // Continue to next message
        setTimeout(() => {
          if (messageIndex < loadingMessages.length) {
            advanceLoading();
          } else {
            // Finish loading
            setTimeout(() => {
              setProgress(100);
              
              // Add final success message
              setTerminalLines(prev => [...prev, { 
                id: lineId++, 
                text: "System calibrated - portfolio.exe loaded successfully!", 
                status: 'success' 
              }]);
              
              // Hide loading screen after ensuring minimum display time
              setTimeout(() => {
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
                
                setTimeout(() => {
                  // Save to localStorage that user has visited before
                  localStorage.setItem('hasVisitedPortfolio', 'true');
                  
                  // Notify parent component loading is complete
                  if (onLoadingComplete) {
                    onLoadingComplete();
                  }
                }, remainingTime);
              }, 800);
            }, 400);
          }
        }, message.time + 200);
      }
    };
    
    // Start the loading sequence after a short delay
    setTimeout(() => {
      advanceLoading();
    }, 500);
    
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, [onLoadingComplete]);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={styles.terminalTitle}>cyberdeck-portfolio-initializer.sh</div>
          </div>
          
          <div className={styles.terminalBody}>
            <div className={styles.terminalLines}>
              <div className={styles.initialLine}>
                <span className={styles.prompt}>&gt;</span> 
                <span className={styles.command}>sudo ./boot-awesome-portfolio.sh --turbo</span>
              </div>
              
              {terminalLines.map(line => (
                <div key={line.id} className={`${styles.terminalLine} ${styles[line.status]}`}>
                  <span className={styles.linePrefix}>
                    {line.status === 'loading' && <span className={styles.spinner}></span>}
                    {line.status === 'completed' && <span className={styles.checkmark}>✓</span>}
                    {line.status === 'success' && <span className={styles.successIcon}>✓</span>}
                  </span>
                  <span className={styles.lineText}>{line.text}</span>
                </div>
              ))}
              
              <div className={styles.currentLine}>
                <span className={styles.prompt}>&gt;</span>
                <span className={`${styles.cursor} ${showCursor ? styles.visible : ''}`}>_</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className={styles.progressText}>
            <span className={styles.percentage}>{Math.floor(progress)}%</span>
            <span className={styles.progressMessage}>
              {progress < 100 
                ? 'Compressing time and space...' 
                : 'System ready - Entering the matrix!'}
            </span>
          </div>
        </div>
        
        <div className={styles.glowEffect}></div>
      </div>
      
      <div className={styles.backgroundGrid}></div>
      <div className={styles.backgroundGlow}></div>
    </div>
  );
}
