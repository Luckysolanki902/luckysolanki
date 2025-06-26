import MatrixRain from './MatrixRain';
import ScanLines from './ScanLines';
import HeroContent from './HeroContent';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      {/* Background Effects */}
      <MatrixRain />
      <ScanLines />
      
      {/* Main Content */}
      <HeroContent />
      
      {/* Additional atmospheric effects */}
      <div className={styles.gradient1}></div>
      <div className={styles.gradient2}></div>
      <div className={styles.noise}></div>
    </section>
  );
};

export default HeroSection;
