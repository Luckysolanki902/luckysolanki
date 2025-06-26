'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ToolsSection.module.css';

export default function ToolsSection() {
  const [visibleElements, setVisibleElements] = useState([]);
  const [activeProject, setActiveProject] = useState(0);
  const sectionRef = useRef(null);
  const tabsContainerRef = useRef(null);

  const skillMatrix = [
    {
      name: 'Frontend Development',
      category: 'Core Expertise',
      description: 'Focused on clarity, responsiveness, and accessibility',
      proficiency: 95,
      tools: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Material UI', 'Lexical Editor']
    },
    {
      name: 'Backend Architecture',
      category: 'Core Expertise', 
      description: 'Componentized logic, modular layouts, and scalable DB design',
      proficiency: 90,
      tools: ['Node.js', 'Express.js', 'MongoDB', 'MySQL', 'REST APIs', 'Firebase']
    },
    {
      name: 'Real-Time Systems',
      category: 'System Design',
      description: 'Low-latency Socket.IO and presence-based interaction flows',
      proficiency: 88,
      tools: ['Socket.IO', 'WebRTC', 'OpenAI API', 'Razorpay', 'Shiprocket', 'CryptoJS']
    },
    {
      name: 'Infrastructure & Growth',
      category: 'DevOps & Scale',
      description: 'Optimized static generation, meta structuring, and behavioral analytics',
      proficiency: 87,
      tools: ['AWS S3', 'CloudFront', 'SEO Optimization', 'GitHub Actions', 'Performance Profiling', 'Clerk']
    },
    {
      name: 'Automation & Security',
      category: 'AI & Innovation',
      description: 'Custom pipelines, end-to-end encryption, and access-level control',
      proficiency: 92,
      tools: ['Python', 'Tesseract OCR', 'Twilio API', 'WhatsApp API', 'GSAP', 'Automation Pipelines']
    },
    {
      name: 'Product Strategy',
      category: 'Business Impact',
      description: 'Converting technical solutions into measurable business value',
      proficiency: 85,
      tools: ['Market Research', 'Revenue Generation', 'User Analytics', 'A/B Testing', 'SEO Optimization', 'Growth Metrics']
    }
  ];

  const projects = [
    {
      name: 'AnotherMe',
      tagline: 'AI-powered self-growth tracker',
      description: 'Built a secure, full-stack journaling and growth visualization platform. Integrated Lexical-based rich text planning, OpenAI-guided journaling, real-time mood tracking, and a gamified point system that quantifies your actual progress. Fully encrypted using CryptoJS and deployed with CDN performance in mind.',
      stack: ['Next.js', 'Tailwind CSS', 'MongoDB', 'OpenAI API', 'Lexical', 'GSAP', 'CryptoJS'],
      status: 'Live',
      impact: 'Personal Growth Platform',
      liveLink: 'https://another-me.vercel.app',
      githubLink: 'https://github.com/yourusername/another-me'
    },
    {
      name: 'Maddy Custom',
      tagline: 'Full-scale eCommerce engine',
      description: 'From product listings to offer logic, admin dashboards, webhook integrations, and marketing pipelines — everything was custom-built. Built-in coupon systems, inventory flows, order tracking, and a complete role-based access model. The site ranks top 5 for core search keywords with over 6 lakh/month revenue.',
      stack: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Razorpay', 'Shiprocket', 'CloudFront'],
      status: 'Production',
      impact: '₹6L+ Monthly Revenue',
      liveLink: 'https://maddycustom.com'
    },
    {
      name: 'MeetYourMate.in',
      tagline: 'Real-time social experiment for college campuses',
      description: 'An Omegle-like app designed for verified students to meet and chat anonymously or by filters like gender and institution. Built with real-time sockets, anonymized user layers, confession posting, and a highly responsive UI.',
      stack: ['Next.js', 'Socket.IO', 'MongoDB', 'Clerk', 'Tailwind CSS', 'CryptoJS'],
      status: 'Live',
      impact: 'Day-1 Traffic Success',
      liveLink: 'https://meetyourmate.in',
      githubLink: 'https://github.com/yourusername/meetyourmate'
    },
    {
      name: 'EasyMola',
      tagline: 'Logistics utility for campus life',
      description: 'Allows students going to the market to list themselves for delivery help — others can submit items they need. A utility-based, serverless app built around real-time matching and task tracking.',
      stack: ['React', 'Firebase', 'Tailwind'],
      status: 'MVP',
      impact: 'Campus Utility Tool',
      githubLink: 'https://github.com/yourusername/easymola'
    },
    {
      name: 'Custom AI Tools',
      tagline: 'Automated WhatsApp Question Answering System',
      description: 'An OCR pipeline that scans screen-based questions and answers them in real-time using OpenAI and sends results via WhatsApp. Built for demo use cases in student communities.',
      stack: ['Python', 'Tesseract OCR', 'Twilio API', 'OpenAI API'],
      status: 'Demo',
      impact: 'Automation Pipeline',
      githubLink: 'https://github.com/yourusername/ai-tools'
    }
  ];

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

  const handleTabClick = (index) => {
    setActiveProject(index);
    
    // Center the selected tab in the scroll view with smooth scrolling
    setTimeout(() => {
      if (tabsContainerRef.current) {
        const tabsContainer = tabsContainerRef.current;
        const activeTab = tabsContainer.children[index];
        
        if (activeTab) {
          const containerWidth = tabsContainer.offsetWidth;
          const tabWidth = activeTab.offsetWidth;
          const tabLeft = activeTab.offsetLeft;
          
          tabsContainer.scrollTo({
            left: tabLeft - containerWidth / 2 + tabWidth / 2,
            behavior: 'smooth'
          });
        }
      }
    }, 100);
  };

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
              Tools, Systems & Products
              <span className={styles.codeSymbol}>{' />'}</span>
            </h2>
            <div className={styles.subtitle}>
              I believe in building systems that scale, not just writing code that runs.
            </div>
            <div className={styles.description}>
              No tool is impressive on its own — only what it's used to create.
            </div>
          </div>
          <div className={styles.headerGlow}></div>
        </div>

        {/* Skills & Expertise */}
        <div 
          className={`${styles.skillsSection} ${isVisible('skills') ? styles.visible : ''}`}
          data-element-id="skills"
        >
          <h3 className={styles.sectionTitle}>Skills & Expertise</h3>
          <div className={styles.skillsGrid}>
            {skillMatrix.map((skill, index) => (
              <div 
                key={index} 
                className={styles.skillCard}
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className={styles.skillHeader}>
                  <div className={styles.skillTitleRow}>
                    <h4 className={styles.skillTitle}>{skill.name}</h4>
                    <span className={styles.skillProficiency}>{skill.proficiency}%</span>
                  </div>
                  <span className={styles.skillCategory}>{skill.category}</span>
                </div>
                
                <p className={styles.skillDescription}>{skill.description}</p>
                
                <div className={styles.proficiencyBar}>
                  <div 
                    className={styles.proficiencyFill}
                    style={{ '--proficiency': `${skill.proficiency}%` }}
                  ></div>
                </div>
                
                <div className={styles.skillTools}>
                  <span className={styles.toolsLabel}>Tools:</span>
                  <div className={styles.toolsList}>
                    {skill.tools.map((tool, toolIndex) => (
                      <span key={toolIndex} className={styles.toolTag}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className={styles.skillGlow}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Projects */}
        <div 
          className={`${styles.projectsSection} ${isVisible('projects') ? styles.visible : ''}`}
          data-element-id="projects"
        >
          <h3 className={styles.sectionTitle}>Selected Projects</h3>
          <div className={styles.projectsContainer}>
            <div 
              className={styles.projectTabs} 
              ref={tabsContainerRef}
              role="tablist"
              aria-label="Project tabs"
            >
              {projects.map((project, index) => (
                <button
                  key={index}
                  id={`tab-${index}`}
                  className={`${styles.projectTab} ${activeProject === index ? styles.active : ''}`}
                  onClick={() => handleTabClick(index)}
                  aria-selected={activeProject === index}
                  aria-controls={`panel-${index}`}
                  role="tab"
                >
                  <span className={styles.tabName}>{project.name}</span>
                  <span className={styles.tabStatus}>{project.status}</span>
                </button>
              ))}
            </div>
            
            <div className={styles.projectDisplay}>
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`${styles.projectCard} ${activeProject === index ? styles.active : ''}`}
                >
                  <div className={styles.projectHeader}>
                    <div className={styles.projectMeta}>
                      <h4 className={styles.projectName}>{project.name}</h4>
                      <span className={styles.projectStatus}>{project.status}</span>
                    </div>
                    <div className={styles.projectTagline}>{project.tagline}</div>
                    <div className={styles.projectImpact}>{project.impact}</div>
                  </div>
                  
                  <div className={styles.projectBody}>
                    <p className={styles.projectDescription}>{project.description}</p>
                    
                    <div className={styles.projectStack}>
                      <span className={styles.stackLabel}>Tech Stack:</span>
                      <div className={styles.stackTags}>
                        {project.stack.map((tech, techIndex) => (
                          <span key={techIndex} className={styles.stackTag}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {(project.liveLink || project.githubLink) && (
                      <div className={styles.projectLinks}>
                        {project.liveLink && (
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M8 12L16 12"></path>
                              <path d="M12 8L16 12 12 16"></path>
                            </svg>
                            View Live Site
                          </a>
                        )}
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                            View Source
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Final Word */}
        <div 
          className={`${styles.finalSection} ${isVisible('final') ? styles.visible : ''}`}
          data-element-id="final"
        >
          <div className={styles.finalContainer}>
            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <div className={styles.codeDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className={styles.fileName}>approach.js</span>
              </div>
              <div className={styles.codeContent}>
                <div className={styles.codeLine}>
                  <span className={styles.keyword}>const</span>
                  <span className={styles.variable}> approach</span>
                  <span className={styles.operator}> = </span>
                  <span className={styles.bracket}>{'{'}</span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.property}>  philosophy</span>
                  <span className={styles.operator}>: </span>
                  <span className={styles.string}>"I don't chase trends or tools"</span>
                  <span className={styles.operator}>,</span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.property}>  focus</span>
                  <span className={styles.operator}>: </span>
                  <span className={styles.string}>"I chase the utility they unlock"</span>
                  <span className={styles.operator}>,</span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.property}>  criteria</span>
                  <span className={styles.operator}>: </span>
                  <span className={styles.string}>"Does it work fast, securely, and at scale?"</span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.bracket}>{'};'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
