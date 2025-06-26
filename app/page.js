'use client';

import { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import TerminalSection from './components/TerminalSection';
import SelfTaughtSection from './components/SelfTaughtSection';
import ToolsSection from './components/ToolsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import styles from "./page.module.css";

export default function Home() {
  // Fix for scroll position on refresh
  useEffect(() => {
    // This ensures the page stays at top on refresh
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className={styles.page}>
      <HeroSection />
      <TerminalSection />
      <SelfTaughtSection />
      <ToolsSection />
      <ExperienceSection />
      <ContactSection />
      
      {/* No placeholder needed as we have all sections now */}
    </div>
  );
}
