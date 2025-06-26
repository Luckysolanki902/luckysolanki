'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const [visibleElements, setVisibleElements] = useState([]);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    isSubmitting: false,
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });
  
  const sectionRef = useRef(null);
  const formRef = useRef(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setFormState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          submitted: true,
          success: true,
          message: 'Message sent successfully! I\'ll be in touch soon.',
        });
        
        // Reset the form
        setFormState({
          name: '',
          email: '',
          message: '',
          isSubmitting: false,
        });
      } else {
        setFormStatus({
          submitted: true,
          success: false,
          message: data.error || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
      
      // Auto-dismiss the message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);
    }
  };

  return (
    <section className={styles.section} ref={sectionRef} id="contact">
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
              Let's Connect
              <span className={styles.codeSymbol}>{' />'}</span>
            </h2>
            <div className={styles.subtitle}>
              Got a project idea or question? Let's talk.
            </div>
          </div>
          <div className={styles.headerGlow}></div>
        </div>

        <div 
          className={`${styles.contactContainer} ${isVisible('contact') ? styles.visible : ''}`}
          data-element-id="contact"
        >
          <div className={styles.contactGrid}>
            {/* Contact Form Card */}
            <div className={styles.formCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className={styles.cardPath}>~/message/new</div>
              </div>
              
              <div className={styles.formBody}>
                <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm}>
                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <label className={styles.inputLabel} htmlFor="name">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span className={styles.labelText}>Name</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className={styles.formInput}
                        placeholder="Your name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <label className={styles.inputLabel} htmlFor="email">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span className={styles.labelText}>Email</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={styles.formInput}
                        placeholder="your.email@example.com"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <label className={styles.inputLabel} htmlFor="message">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        <span className={styles.labelText}>Message</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className={styles.formTextarea}
                        placeholder="What's on your mind?"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows="6"
                      ></textarea>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={formState.isSubmitting}
                  >
                    {formState.isSubmitting ? (
                      <div className={styles.loadingIndicator}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
                
                {/* Form status message */}
                <div className={`${styles.statusMessage} ${formStatus.submitted ? styles.active : ''} ${formStatus.success ? styles.success : styles.error}`}>
                  {formStatus.success ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  )}
                  <span>{formStatus.message}</span>
                </div>
              </div>
            </div>
            
            {/* Connection Info Card */}
            <div className={styles.infoCard}>
              <div className={styles.infoHeader}>
                <h3 className={styles.infoTitle}>Other Ways To Connect</h3>
                <div className={styles.infoAccent}></div>
              </div>
              
              <div className={styles.infoBody}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <h4>Email</h4>
                    <a href="mailto:your.email@example.com" className={styles.infoLink}>
                      your.email@example.com
                    </a>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <h4>GitHub</h4>
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                      github.com/yourusername
                    </a>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <h4>LinkedIn</h4>
                    <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                      linkedin.com/in/yourprofile
                    </a>
                  </div>
                </div>
              </div>
              
              <div className={styles.infoNotes}>
                <p>Looking forward to connecting with you!</p>
                <p>Response time: <span className={styles.highlight}>24-48 hours</span></p>
              </div>

              <div className={styles.decorativeElement}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
