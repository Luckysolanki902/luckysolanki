'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ToolsSection.module.css';

export default function ToolsSection() {
  const [visibleElements, setVisibleElements] = useState([]);
  const [activeProject, setActiveProject] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const sectionRef = useRef(null);
  const tabsContainerRef = useRef(null);

  const skillMatrix = [
    {
      name: 'Frontend Development',
      category: 'Core Expertise',
      description: 'Clean, accessible, and animated interfaces built with precision and speed.',
      proficiency: 95,
      tools: [
        'React.js', 'Next.js', 'Tailwind CSS', 'Material UI', 'Vanilla CSS',
        'Framer Motion', 'React Spring', 'GSAP', 'Lexical Editor'
      ]
    },
    {
      name: 'Backend Architecture & APIs',
      category: 'Core Expertise',
      description: 'Modular, secure, and scalable server-side systems with clean data flows.',
      proficiency: 92,
      tools: [
        'Node.js', 'Express.js', 'MongoDB', 'MySQL',
        'Firebase', 'REST APIs', 'JWT',
        'Cron Jobs', 'Nodemailer', 'Webhooks'
      ]
    },
    {
      name: 'Real-Time Systems & Integration',
      category: 'System Design',
      description: 'Interactive, event-driven architectures with low-latency performance.',
      proficiency: 88,
      tools: [
        'Socket.IO', 'WebRTC', 'OpenAI API', 'Razorpay', 'Shiprocket',
        'Twilio', 'Cloudinary', 'CryptoJS'
      ]
    },
    {
      name: 'DevOps, Infra & Scale',
      category: 'Deployment & Optimization',
      description: 'High-performance deployment with secure access control and analytics.',
      proficiency: 87,
      tools: [
        'AWS S3', 'CloudFront', 'GitHub Actions', 'Clerk',
        'SEO Optimization', 'Vercel', 'Netlify', 'Render'

      ]
    },
    {
      name: 'Automation & AI Integration',
      category: 'Innovation & Security',
      description: 'AI-assisted tools, secure pipelines, and smart automation workflows.',
      proficiency: 92,
      tools: [
        'Python', 'Tesseract OCR', 'Automation Pipelines',
        'OpenAI API', 'Encryption Systems', 'Raspberry Pi',
      ]
    },
    {
      name: 'Product Strategy & Growth',
      category: 'Business & Impact',
      description: 'Tech-backed decisions that drive user acquisition.',
      proficiency: 85,
      tools: [
        'User Analytics', 'A/B Testing', 'Growth Metrics', 'SEO Optimization'
      ]
    }
  ];

  const projects = [

    {
      name: 'Maddy Custom',
      tagline: 'High-performance eCommerce platform for vehicle personalization',
      description: 'A full-scale custom eCommerce site serving 50K+ monthly users and 2K+ transactions. Implemented a modular admin dashboard with inventory management, role-based access control, and an advanced offer engine. Integrated Razorpay for secure payments, Shiprocket for logistics, and SEO optimization that led to top-5 Google ranking for core keywords.',
      stack: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Razorpay', 'Shiprocket', 'AWS S3', 'CloudFront'],
      status: 'Production',
      impact: '₹6L+ Monthly Revenue, Top-5 SEO Rank',
      liveLink: 'https://maddycustom.com'
    },
    {
      name: 'MeetYourMate.vercel.app',
      tagline: 'Real-time social experiment for college campuses',
      description: 'A real-time anonymous social platform built for verified students to connect through confessions, text chat, and vlogs. Developed the full-stack infrastructure with Socket.IO for real-time communication, Clerk for authentication, and CryptoJS for privacy-focused architecture.',
      stack: ['Next.js', 'Socket.IO', 'MongoDB', 'Firebase', 'Vanilla CSS', 'CryptoJS'],
      status: 'Live',
      impact: 'Day-1 Viral hype on Campus',
      liveLink: 'https://meetyourmate.vercel.app',
      githubLink: 'https://github.com/Luckysolanki902/mym',
      serverGithubLink: 'https://github.com/Luckysolanki902/mym-server'
    },
    {
      name: 'AnotherMe',
      tagline: 'AI-powered platform for quantified self-growth',
      description: 'Built a secure full-stack platform that redefines personal development using real data. Integrated AI-assisted journaling, Lexical-based Notion-style planner, mood tracking, and a smart task scoring system to visualize precise growth. Features end-to-end encryption using CryptoJS and a dynamic dashboard to measure true improvement over time.',
      stack: ['Next.js', 'MongoDB', 'Vanilla CSS', 'Lexical', 'OpenAI API', 'Framer Motion', 'CryptoJS', 'Clerk', 'Vercel'],
      status: 'Live',
      impact: 'Quantified Personal Growth',
      liveLink: 'https://an-other-me.vercel.app',
      githubLink: 'https://github.com/Luckysolanki902/betterme'
    },
    {
      name: 'EasyMola',
      tagline: 'Logistics micro-service for student campuses',
      description: 'Built in under an hour, EasyMola allowed students heading to markets to accept item delivery requests from others on campus. A simple utility app using Firebase real-time DB and task tracking.',
      stack: ['React', 'Firebase', 'Vanilla CSS'],
      status: 'MVP',
      impact: 'Campus Logistics Prototype',
      githubLink: 'https://github.com/Luckysolanki902/easymola'
    },
    {
      name: 'AI Quiz & LeetCode Solver Bot',
      tagline: 'OCR, AI, and automation for learning hacks',
      description: 'A multi-purpose automation bot built for experimentation in learning environments. It reads on-screen MCQs using Tesseract OCR, solves them via OpenAI, and sends the answers through WhatsApp using Twilio. It also includes a LeetCode auto-solver that types full code solutions directly using PyAutoGUI—bypassing copy-paste restrictions on platforms like LeetCode.',
      stack: ['Python', 'Tesseract OCR', 'OpenAI API', 'Twilio API', 'PyAutoGUI'],
      status: 'Demo',
      impact: 'EdTech Automation Toolkit (Experimental)',
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

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh animation
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const handleQuickAction = () => {
    const currentProject = projects[activeProject];
    if (currentProject.liveLink) {
      window.open(currentProject.liveLink, '_blank');
    } else if (currentProject.githubLink) {
      window.open(currentProject.githubLink, '_blank');
    }
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
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <div className={styles.titleAccentContainer}>
                <div className={styles.sparkleIcon}></div>
              </div>
              Selected Projects
              <span className={styles.titleCode}>.showcase()</span>
            </h3>
            <div className={styles.sectionSubtitle}>
              Real solutions, real impact — built from the ground up
            </div>
          </div>

          <div className={styles.projectsWrapper}>
            {/* Mac-style Window Chrome */}
            <div className={styles.windowChrome}>
              <div className={styles.windowControls}>
                <div className={`${styles.windowControl} ${styles.close}`}></div>
                <div className={`${styles.windowControl} ${styles.minimize}`}></div>
                <div className={`${styles.windowControl} ${styles.maximize}`}></div>
              </div>
              <div className={styles.windowTitle}>
                <div className={styles.titleIconContainer}>
                  <div className={styles.folderIcon}></div>
                </div>
                ~/projects/showcase
              </div>
              <div className={styles.windowActions}>
                <div className={styles.connectionStatus}>
                  <div className={styles.statusDot}></div>
                  <span>code</span>
                </div>
              </div>
            </div>

            <div className={styles.projectsContainer}>
              {/* Enhanced Sidebar Navigation */}
              <div className={styles.projectSidebar}>
                <div className={styles.sidebarHeader}>
                  <span className={styles.sidebarTitle}>PROJECTS</span>
                  <span className={styles.projectCount}>{projects.length}</span>
                </div>
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
                      <div className={styles.tabIcon}>
                        <div className={`${styles.statusIndicator} ${styles[project.status.toLowerCase()]}`}></div>
                      </div>
                      <div className={styles.tabContent}>
                        <span className={styles.tabName}>{project.name}</span>
                        <span className={styles.tabMeta}>
                          <span className={styles.tabStatus}>{project.status}</span>
                          <span className={styles.tabDot}>•</span>
                          <span className={styles.tabStack}>{project.stack.length} tools</span>
                        </span>
                      </div>
                      <div className={styles.tabIndicator}></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Project Display */}
              <div className={styles.projectDisplay}>
                <div className={styles.displayHeader}>
                  <div className={styles.breadcrumb}>
                    <span className={styles.breadcrumbItem}>projects</span>
                    <span className={styles.breadcrumbSeparator}>/</span>
                    <span className={styles.breadcrumbItem}>{projects[activeProject]?.name}</span>
                  </div>
                  <div className={styles.displayActions}>
                    <button
                      className={`${styles.actionButton} ${isRefreshing ? styles.refreshing : ''}`}
                      onClick={handleRefresh}
                      title="Refresh Project Data"
                      disabled={isRefreshing}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                        <path d="M3 21v-5h5" />
                      </svg>
                    </button>
                    <button
                      className={styles.actionButton}
                      onClick={handleQuickAction}
                      title={projects[activeProject]?.liveLink ? 'Open Live Site' : 'Open GitHub Repository'}
                    >
                      {projects[activeProject]?.liveLink ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {projects.map((project, index) => (
                  <div
                    key={index}
                    className={`${styles.projectCard} ${activeProject === index ? styles.active : ''}`}
                    id={`panel-${index}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${index}`}
                  >
                    <div className={styles.projectScroll}>
                      <div className={styles.projectHeader}>
                        <div className={styles.projectMeta}>
                          <div className={styles.projectTitleRow}>
                            <h4 className={styles.projectName}>
                              <div className={`${styles.projectIconContainer} ${styles[project.status.toLowerCase()]}`}>
                                <div className={styles.projectStatusIcon}></div>
                              </div>
                              {project.name}
                            </h4>
                            <div className={styles.projectBadges}>
                              <span className={`${styles.statusBadge} ${styles[project.status.toLowerCase()]}`}>
                                {project.status}
                              </span>
                            </div>
                          </div>
                          <div className={styles.projectTagline}>{project.tagline}</div>
                        </div>

                        <div className={styles.projectStats}>
                          <div className={styles.statItem}>
                            <span className={styles.statLabel}>Impact</span>
                            <span className={styles.statValue}>{project.impact}</span>
                          </div>
                          <div className={styles.statItem}>
                            <span className={styles.statLabel}>Stack</span>
                            <span className={styles.statValue}>{project.stack.length} technologies</span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.projectBody}>
                        <div className={styles.descriptionSection}>
                          <h5 className={styles.sectionLabel}>
                            <div className={styles.labelIconContainer}>
                              <div className={styles.overviewIcon}></div>
                            </div>
                            Overview
                          </h5>
                          <div className={styles.projectDescription}>
                            <p>{project.description}</p>
                          </div>
                        </div>

                        <div className={styles.stackSection}>
                          <h5 className={styles.sectionLabel}>
                            <div className={styles.labelIconContainer}>
                              <div className={styles.stackIcon}></div>
                            </div>
                            Tech Stack
                          </h5>
                          <div className={styles.stackGrid}>
                            {project.stack.map((tech, techIndex) => (
                              <div key={techIndex} className={styles.stackItem}>
                                {/* <div className={`${styles.stackIconContainer} ${styles[tech.toLowerCase().replace(/[^a-z0-9]/g, '')]}`}>
                                  <div className={styles.techIcon}></div>
                                </div> */}
                                <span className={styles.stackName}>{tech}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {(project.liveLink || project.githubLink) && (
                          <div className={styles.linksSection}>
                            <h5 className={styles.sectionLabel}>
                              <div className={styles.labelIconContainer}>
                                <div className={styles.linksIcon}></div>
                              </div>
                              Links
                            </h5>
                            <div className={styles.projectLinks}>
                              {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={`${styles.projectLink} ${styles.liveLink}`}>
                                  <div className={styles.linkIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                    </svg>
                                  </div>
                                  <div className={styles.linkContent}>
                                    <span className={styles.linkTitle}>Live Site</span>
                                    <span className={styles.linkUrl}>{project.liveLink.replace('https://', '')}</span>
                                  </div>
                                  <div className={styles.linkArrow}>→</div>
                                </a>
                              )}
                              {project.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={`${styles.projectLink} ${styles.githubLink}`}>
                                  <div className={styles.linkIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                    </svg>
                                  </div>
                                  <div className={styles.linkContent}>
                                    <span className={styles.linkTitle}>Source Code</span>
                                    <span className={styles.linkUrl}>GitHub Repository</span>
                                  </div>
                                  <div className={styles.linkArrow}>→</div>
                                </a>
                              )}
                              {project.serverGithubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={`${styles.projectLink} ${styles.githubLink}`}>
                                  <div className={styles.linkIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                    </svg>
                                  </div>
                                  <div className={styles.linkContent}>
                                    <span className={styles.linkTitle}>Server Source Code</span>
                                    <span className={styles.linkUrl}>GitHub Repository</span>
                                  </div>
                                  <div className={styles.linkArrow}>→</div>
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                <span className={styles.fileName}>approach.sql</span>
              </div>
              <div className={styles.codeContent}>
                <div className={styles.codeLine}>
                  <span className={styles.keyword}>--</span> Build value, not just features
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.keyword}>SELECT</span> <span className={styles.variable}>impact</span>, <span className={styles.variable}>scalability</span>, <span className={styles.variable}>speed</span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.keyword}>FROM</span> <span className={styles.variable}>solutions</span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.keyword}>WHERE</span> <span className={styles.variable}>problem</span> <span className={styles.operator}>IS NOT</span> <span className={styles.keyword}>NULL</span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.keyword}>ORDER BY</span> <span className={styles.variable}>impact</span> <span className={styles.operator}>DESC</span>, <span className={styles.variable}>launched_at</span> <span className={styles.operator}>ASC</span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.keyword}>LIMIT</span> 1;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
