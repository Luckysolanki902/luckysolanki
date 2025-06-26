'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ExperienceSection.module.css';

export default function ExperienceSection() {
  const [visibleElements, setVisibleElements] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.dataset.elementId;
            if (elementId && !visibleElements.includes(elementId)) {
              setVisibleElements(prev => [...prev, elementId]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('[data-element-id]');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [visibleElements]);

  const isVisible = (elementId) => visibleElements.includes(elementId);

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.gridOverlay}></div>
        <div className={styles.noiseOverlay}></div>
        <div className={styles.codeRain}></div>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div 
          className={`${styles.header} ${isVisible('header') ? styles.visible : ''}`}
          data-element-id="header"
        >
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>
              <span className={styles.codeSymbol}>{'<'}</span>
              Professional Experience
              <span className={styles.codeSymbol}>{' />'}</span>
            </h2>
            <div className={styles.subtitle}>
              Building scalable products from concept to execution
            </div>
          </div>
          <div className={styles.headerGlow}></div>
        </div>

        {/* Main Experience Content */}
        <div 
          className={`${styles.experienceContainer} ${isVisible('experience') ? styles.visible : ''}`}
          data-element-id="experience"
        >
          <div className={styles.companyCard}>
            <div className={styles.roleInfo}>
              <h3 className={styles.role}>Co-founder & CTO</h3>
              <div className={styles.companyMeta}>
                <div className={styles.companyName}>Maddy Custom</div>
                <a href="https://maddycustom.com" target="_blank" rel="noopener noreferrer" className={styles.companyLink}>
                  <span className={styles.linkText}>maddycustom.com</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.linkIcon}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
              <div className={styles.timelineRow}>
                <div className={styles.timeline}>2022 — Present</div>
                <div className={styles.status}>
                  Operating at <span className={styles.highlight}>₹6+ lakh/month</span> revenue
                </div>
              </div>
            </div>

            <div className={styles.separator}></div>

            {/* Building From Zero Section */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionTitle}>Building From Zero</h3>
              <p className={styles.sectionText}>
                No templates. No shortcuts. I co-founded Maddy Custom with a mission to deliver personalized automotive accessories — and I've led the <span className={styles.emphasis}>entire product and technical architecture</span> since day one.
              </p>
              <p className={styles.sectionText}>
                While others outsourced, I built. Every system. Every screen. Every strategy.
              </p>
            </div>

            {/* What I Built Section */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionTitle}>What I Built</h3>
              
              <div className={styles.buildArea}>
                <h4 className={styles.buildTitle}>The Frontend</h4>
                <p className={styles.buildDescription}>
                  A fully responsive eCommerce storefront optimized for SEO, speed, and scale — designed to convert first-time visitors through performance, UX, and trust.
                </p>
                <ul className={styles.buildPoints}>
                  <li>Built with <span className={styles.tag}>React</span>, <span className={styles.tag}>Next.js</span>, <span className={styles.tag}>Tailwind</span>, and <span className={styles.tag}>Material UI</span></li>
                  <li>Integrated real-time product previews and customizable variants</li>
                  <li>Lighthouse scores: <span className={styles.highlight}>90+ across all categories</span></li>
                </ul>
              </div>
              
              <div className={styles.buildArea}>
                <h4 className={styles.buildTitle}>The Admin System</h4>
                <p className={styles.buildDescription}>
                  A complete business operations suite — no third-party dashboards. Custom built to scale and match internal workflows.
                </p>
                <ul className={styles.buildPoints}>
                  <li>Inventory and product management</li>
                  <li>Auto-generated offer system (combo & best price logic)</li>
                  <li>Role-based dashboard access: <span className={styles.tag}>Marketing</span> · <span className={styles.tag}>Production</span> · <span className={styles.tag}>Design</span> · <span className={styles.tag}>Fulfillment</span></li>
                </ul>
              </div>
              
              <div className={styles.buildArea}>
                <h4 className={styles.buildTitle}>Order & Payment Flows</h4>
                <p className={styles.buildDescription}>
                  Fully secure and automated order processing, from checkout to delivery tracking.
                </p>
                <ul className={styles.buildPoints}>
                  <li>Integrated <span className={styles.tag}>Razorpay</span>, <span className={styles.tag}>Shiprocket</span>, and <span className={styles.tag}>Webhook pipelines</span></li>
                  <li>Custom order tagging, fraud detection rules, and delivery state updates</li>
                  <li>Built-in customer service tools: refunds, reports, and logs</li>
                </ul>
              </div>
              
              <div className={styles.buildArea}>
                <h4 className={styles.buildTitle}>Analytics & Growth Infrastructure</h4>
                <p className={styles.buildDescription}>
                  I designed the site for growth — not just functionality.
                </p>
                <ul className={styles.buildPoints}>
                  <li>SEO-first product architecture → ranked <span className={styles.highlight}>top 5</span> for core keywords</li>
                  <li>Setup behavior tracking via <span className={styles.tag}>Google Analytics</span>, <span className={styles.tag}>MS Clarity</span>, and <span className={styles.tag}>Search Console</span></li>
                  <li>Grew visibility by <span className={styles.highlight}>48% in 3 months</span> through content + performance ops</li>
                </ul>
              </div>
            </div>
            
            {/* CTO Responsibilities Section */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionTitle}>CTO Responsibilities</h3>
              <p className={styles.sectionText}>
                I don't just write code — I run systems.
              </p>
              <ul className={styles.responsibilitiesList}>
                <li>Managed and deployed full-stack codebases across staging and production</li>
                <li>Designed and implemented secure internal tools for tracking bugs, assigning tasks, and logging voice/screenshots across team members</li>
                <li>Handled product strategy meetings, tech growth plans, and design systems</li>
              </ul>
            </div>
            
            {/* Result Section */}
            <div className={styles.resultBlock}>
              <h3 className={styles.resultTitle}>The Result</h3>
              <p className={styles.resultText}>
                From raw Photoshop mockups to a <span className={styles.emphasis}>custom-built, profitable, scalable platform</span> — Maddy Custom now ships products across the country and handles thousands of monthly users, all through infrastructure that I built and continue to evolve.
              </p>
            </div>
            
            {/* Team Recognition */}
            <div className={styles.teamBlock}>
              <div className={styles.teamIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className={styles.teamContent}>
                <h4 className={styles.teamTitle}>Team Success</h4>
                <p className={styles.teamText}>
                  Working alongside <span className={styles.partnerName}>Harshit</span> (CEO & Founder) has been foundational to our success. While I built the technology, Harshit executed flawlessly on marketing, production, strategy, and team building — turning our vision into a thriving business through encouragement, motivation, and exceptional leadership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
