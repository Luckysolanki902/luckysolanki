import HeroSection from './components/HeroSection';
import TerminalSection from './components/TerminalSection';
import SelfTaughtSection from './components/SelfTaughtSection';
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <TerminalSection />
      <SelfTaughtSection />
      
      {/* Future sections will go here */}
      <div className={styles.placeholder}>
        <p>More sections coming soon...</p>
      </div>
    </div>
  );
}
