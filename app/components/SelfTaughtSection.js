'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './SelfTaughtSection.module.css';

export default function SelfTaughtSection() {
    const [visibleElements, setVisibleElements] = useState([]);
    const [showFullStory, setShowFullStory] = useState(false);
    const sectionRef = useRef(null);

    const storyMilestones = [
        {
            title: 'Imagining Worlds Through Gaming',
            content: 'My journey began with adventure games on mobile and console, where each playthrough inspired me to imagine new stories, challenging puzzles, and intricate level designs. This sparked a passion to someday create my own digital adventures.',
            tech: ['Adventure Games', 'Level Design'],
            side: 'left',
            image: 'story_1.png',
            year: '2014-18',
            type: 'milestone'
        },
        {
            title: 'Discovering Tech: First Personal Computer',
            content: 'Though I started out in Mechanical Engineering, everything changed when I got my first PC—a HP Pavilion Gaming Laptop. I became obsessed with exploring the Windows interface and picking up shortcuts and tools my friends used—like Photoshop, Premiere Pro, even a bit of After Effects. I started using Monkeytype.com just for fun, and my typing speed quickly shot up from 20 to 50, and now it’s over 100 WPM. That’s when my love for tech really took off.',
            tech: ['Windows OS', 'Touch Typing', 'Technical Curiosity', 'Photoshop', 'Premiere Pro', 'After Effects'],
            side: 'right',
            image: 'story_2.png',
            year: '2021',
            type: 'milestone'
        },
        {
            title: 'Taking the Leap into Game Development',
            content: 'Driven by passion, I installed Unity Engine and dove head-first into game development. I quickly picked up C#, crafted my first arcade-style game, and used Photoshop to design original characters and assets—entirely self-taught through dedication and experimentation.',
            tech: ['Unity', 'C# Programming'],
            side: 'left',
            image: 'story_3.png',
            year: '2021',
            type: 'milestone'
        },
        {
            title: 'Design Skills Meet Entrepreneurship',
            content: 'When my friend Harshit saw my Photoshop skills, he recognized a business opportunity. Together, we launched an e-commerce site selling custom-designed full bike wraps. Leveraging JSX scripting, I automated design mockups, significantly accelerating our workflow and product innovation.',
            tech: ['JSX Automation', 'Product Design', 'Entrepreneurial Strategy'],
            side: 'right',
            image: 'story_4.png',
            year: '2022',
            type: 'milestone'
        },
        {
            title: 'Self-Taught Web Development & Challenges',
            content: 'Our growing startup required an online presence, but external web developers lacked passion or charged beyond our means. Determined, I taught myself HTML, CSS, JavaScript, React, and Next.js within weeks. Overcoming daily challenges, debugging sessions taught me essential lessons in architecture, scalability, and resilience.',
            tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'SEO'],
            side: 'left',
            image: 'story_5.png',
            year: '2022',
            type: 'milestone'
        },
        {
            title: 'Breakthrough: Scaling Our Business Online',
            content: `After countless product experiments and launches, our 'Window Pillar Wraps' became our breakout success—generating over ₹6 lakhs in monthly revenue. Today, we're a team of 10, and as the Co-founder and CTO, I’ve had the privilege of working with brilliant developers like Harsh and Sukrit in the past, and currently with Sahil, who continues to play a key role in building and improving our platform. Our admin panel is incredibly powerful—handling everything from orders to inventory—but we’ve designed it to feel simple and intuitive for users. On the business side, marketing and execution are led by Harshit (Founder), production is driven by Priyanshu (Co-founder) and Sumit (CPO), while design and creative direction are led by Prashant (CDO).`,
            tech: ['Startup', 'Revenue Growth', 'Team Building'],
            side: 'right',
            image: 'story_6.png',
            year: '2023-25',
            type: 'milestone'
        },
        {
            title: 'Innovating & Creating Beyond Limits',
            content: "Driven by curiosity and collaboration, I've built and explored a wide range of passion projects with friends. Alongside Chaman, I created MeetYourMate.vercel.app (formerly MeetYourMate.in) — a filtered, anonymous chat platform for college students to connect, confess, and react. I developed the full-stack infrastructure, while Chaman handled UI design and social media marketing. EasyMola was a spontaneous idea from Harshit — a peer-to-peer hostel delivery system where students could request items from others heading to the market. We built it in just an hour as an experiment; the response was lukewarm, so we chose to sunset it. I recently created AnotherMe—an AI-powered journaling and growth tracker that turns personal reflection into measurable self-improvement. Unlike vague productivity apps, it shows exactly how much better you've become, with real data, smart prompts, and a beautifully visualized dashboard. It's truth-driven personal development—no fluff, just facts. Beyond these, I've built several quirky yet technically challenging tools just for fun: a screen-reading bot that solves MCQs during online exams and sends answers via WhatsApp (built purely for experimentation), and a LeetCode auto-solver that types out solutions when copy-paste is restricted. Whether it's solving real problems or playing with limits, I'm always building, learning, and having fun along the way.",
            tech: ['Passion Projects', 'Real-time Apps', 'Automation', 'AI Tools'],
            side: 'center',
            images: ['story_7.png', 'story_8.png'], // Dual images for summary
            year: '2025',
            type: 'summary'
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

    // Modified to ensure all panels become visible when showFullStory is true
    const isVisible = (elementId) => {
        if (showFullStory && elementId.startsWith('milestone-')) {
            return true;
        }
        return visibleElements.includes(elementId);
    };

    // New effect to make all milestones visible when showFullStory is true
    useEffect(() => {
        if (showFullStory) {
            // Find all milestone elements
            const milestoneElements = sectionRef.current?.querySelectorAll('[data-element-id^="milestone-"]');
            const milestoneIds = Array.from(milestoneElements || []).map(el => el.dataset.elementId);
            
            // Add all milestone IDs to visibleElements if they're not already there
            setVisibleElements(prev => {
                const newElements = [...prev];
                milestoneIds.forEach(id => {
                    if (!newElements.includes(id)) {
                        newElements.push(id);
                    }
                });
                return newElements;
            });
        }
    }, [showFullStory]);

    // Show only first 3 milestones initially, rest on user request
    const visibleMilestones = showFullStory ? storyMilestones : storyMilestones.slice(0, 3);
    const remainingCount = storyMilestones.length - visibleMilestones.length;

    return (
        <section className={styles.section} ref={sectionRef}>
            {/* Background Effects */}
            <div className={styles.backgroundEffects}>
                <div className={styles.gridOverlay}></div>
                <div className={styles.noiseOverlay}></div>
                <div className={styles.gradientBlob1}></div>
                <div className={styles.gradientBlob2}></div>
            </div>

            <div className={styles.container}>
                {/* Header */}
                <div
                    className={`${styles.header} ${isVisible('header') ? styles.visible : ''}`}
                    data-element-id="header"
                >
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>
                            <span className={styles.codeSymbol}>const</span>
                            <span className={styles.titleText}> selfTaughtEngineer</span>
                            <span className={styles.codeSymbol}> = true;</span>
                        </h2>
                        <div className={styles.subtitle}>
                            My branch may say Mechanical, but my story has always been Computer Science.
                        </div>
                        <div className={styles.description}>
                            This isn't about what I was taught — it's about what I chose to learn.
                        </div>
                    </div>
                    <div className={styles.headerGlow}></div>
                </div>

                {/* Story Timeline */}
                <div
                    className={`${styles.storySection} ${isVisible('story') ? styles.visible : ''}`}
                    data-element-id="story"
                >
                    <div className={styles.storyHeader}>
                        <h3 className={styles.storyTitle}>My Journey</h3>
                        <div className={styles.storySubtitle}>A comic-style chronicle of self-discovery</div>
                    </div>
                    
                    <div className={`${styles.comicContainer} ${showFullStory ? styles.expanded : ''}`}>
                        {visibleMilestones.map((milestone, index) => {
                            if (milestone.type === 'summary') {
                                // Special full-width design for the final summary milestone
                                return (
                                    <div
                                        key={index}
                                        className={`${styles.summaryPanel} ${isVisible(`milestone-${index}`) ? styles.visible : ''}`}
                                        data-element-id={`milestone-${index}`}
                                        style={{ '--index': index }}
                                    >
                                        <div className={styles.summaryCard}>
                                            <div className={styles.summaryBackground}>
                                                <div className={styles.summaryGradient}></div>
                                                <div className={styles.summaryPattern}></div>
                                            </div>
                                            
                                            <div className={styles.summaryHeader}>
                                                <div className={styles.summaryBadge}>
                                                    <span>Present Day</span>
                                                </div>
                                                <div className={styles.summaryYear}>{milestone.year}</div>
                                            </div>
                                            
                                            <div className={styles.summaryContent}>
                                                <div className={styles.summaryTextContent}>
                                                    <div className={styles.summaryChapter}>
                                                        <span className={styles.summaryChapterNumber}>Chapter {index + 1}</span>
                                                        <span className={styles.summaryChapterDivider}>•</span>
                                                        <span className={styles.summaryChapterLabel}>The Journey Continues</span>
                                                    </div>
                                                    
                                                    <h3 className={styles.summaryTitle}>
                                                        {milestone.title}
                                                    </h3>
                                                    <div className={styles.summaryDescription}>
                                                        {milestone.content}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className={styles.summaryImagesContainer}>
                                                {milestone.images ? (
                                                    <div className={styles.dualImages}>
                                                        {milestone.images.map((image, imgIndex) => (
                                                            <div key={imgIndex} className={styles.summaryImageWrapper}>
                                                                <img 
                                                                    src={`/${image}`} 
                                                                    alt={`${milestone.title} - Image ${imgIndex + 1}`}
                                                                    className={styles.summaryImage}
                                                                />
                                                                <div className={styles.summaryImageOverlay}></div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : null}
                                            </div>
                                            
                                            <div className={styles.summaryFooter}>
                                                <div className={styles.summaryStats}>
                                                    <div className={styles.summaryStat}>
                                                        <div className={styles.summaryStatContent}>
                                                            <span className={styles.summaryStatNumber}>10+</span>
                                                            <span className={styles.summaryStatLabel}>Projects Launched</span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.summaryStat}>
                                                        <div className={styles.summaryStatContent}>
                                                            <span className={styles.summaryStatNumber}>6L+</span>
                                                            <span className={styles.summaryStatLabel}>Monthly Revenue</span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.summaryStat}>
                                                        <div className={styles.summaryStatContent}>
                                                            <span className={styles.summaryStatNumber} style={{transform:'scale(1.5)'}}>∞</span>
                                                            <span className={styles.summaryStatLabel}>Bugs Fixed</span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.summaryStat}>
                                                        <div className={styles.summaryStatContent}>
                                                            <span className={styles.summaryStatNumber}>24/7</span>
                                                            <span className={styles.summaryStatLabel}>Building Mode</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className={styles.summaryQuote}>
                                                    <div className={styles.summaryQuoteText}>
                                                        "Self-taught doesn't mean self-limited. It means self-driven."
                                                    </div>
                                                    <div className={styles.summaryQuoteAuthor}>- My Journey</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                // Comic-style panel design
                                return (
                                    <div
                                        key={index}
                                        className={`${styles.comicPanel} ${milestone.side === 'left' ? styles.leftPanel : styles.rightPanel} ${isVisible(`milestone-${index}`) ? styles.visible : ''}`}
                                        data-element-id={`milestone-${index}`}
                                        style={{ '--index': index }}
                                    >
                                        <div className={styles.storyCard}>
                                            <div className={styles.cardGlow}></div>
                                            <div className={styles.cardContent}>
                                                <div className={styles.imageSection}>
                                                    <div className={styles.imageFrame}>
                                                        <img 
                                                            src={`/${milestone.image}`} 
                                                            alt={milestone.title}
                                                            className={styles.storyImage}
                                                        />
                                                        <div className={styles.imageGradient}></div>
                                                        <div className={styles.yearTag}>{milestone.year}</div>
                                                    </div>
                                                </div>
                                                
                                                <div className={styles.contentSection}>
                                                    <div className={styles.chapterBadge}>
                                                        Chapter {index + 1}
                                                    </div>
                                                    <h3 className={styles.storyTitle}>{milestone.title}</h3>
                                                    <p className={styles.storyDescription}>{milestone.content}</p>
                                                    
                                                    <div className={styles.techStack}>
                                                        <div className={styles.techGrid}>
                                                            {milestone.tech.map((tech, techIndex) => (
                                                                <span key={techIndex} className={styles.techItem}>
                                                                    <span className={styles.techDot}></span>
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className={styles.cardPattern}></div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                    
                    {!showFullStory && remainingCount > 0 && (
                        <div className={styles.continueContainer}>
                            <button 
                                className={styles.continueButton}
                                onClick={() => {
                                    console.log('Continue Reading clicked, showing all chapters');
                                    setShowFullStory(true);
                                }}
                            >
                                <span className={styles.continueText}>Continue Reading My Story</span>
                                <span className={styles.continueSubtext}>+{remainingCount} more chapters</span>
                                <div className={styles.continueIcon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6"/>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    )}
                </div>


                {/* Philosophy Section */}
                <div
                    className={`${styles.philosophySection} ${isVisible('philosophy') ? styles.visible : ''}`}
                    data-element-id="philosophy"
                >
                    <h3 className={styles.sectionTitle}>Development Philosophy</h3>

                    <div className={styles.philosophyContainer}>
                        <div className={styles.codeBlock}>
                            <div className={styles.codeHeader}>
                                <div className={styles.codeDots}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <span className={styles.fileName}>philosophy.py</span>
                            </div>
                            <div className={styles.codeContent}>
                                <div className={styles.codeLine}>
                                    <span className={styles.keyword}>class</span> <span className={styles.variable}>Builder</span>:
                                </div>
                                <div className={styles.codeLine}>
                                    &nbsp;&nbsp;<span className={styles.keyword}>def</span> <span className={styles.function}>__init__</span>(<span className={styles.variable}>self</span>):
                                </div>
                                <div className={styles.codeLine}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.variable}>self</span>.curiosity = <span className={styles.string}>'always ask why, then how'</span>
                                </div>
                                <div className={styles.codeLine}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.variable}>self</span>.resilience = <span className={styles.string}>'fail, debug, repeat'</span>
                                </div>
                                <div className={styles.codeLine}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.variable}>self</span>.vision = <span className={styles.string}>'build what matters'</span>
                                </div>
                                <div className={styles.codeLine}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.variable}>self</span>.ship = <span className={styles.string}>'launch, learn, iterate'</span>
                                </div>
                                <div className={styles.codeLine}>
                                    &nbsp;&nbsp;<span className={styles.keyword}>def</span> <span className={styles.function}>solve</span>(<span className={styles.variable}>self</span>, <span className={styles.variable}>problem</span>):
                                </div>
                                <div className={styles.codeLine}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.keyword}>if</span> <span className={styles.variable}>problem</span>:
                                </div>
                                <div className={styles.codeLine}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.keyword}>return</span> <span className={styles.string}>'solution found'</span>
                                </div>
                                <div className={styles.codeLine}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.keyword}>return</span> <span className={styles.string}>'keep building'</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.metricsGrid}>
                            <div className={styles.metric}>
                                <div className={styles.metricValue}>7000+</div>
                                <div className={styles.metricLabel}>Hours Coding</div>
                            </div>
                            <div className={styles.metric}>
                                <div className={styles.metricValue}>10+</div>
                                <div className={styles.metricLabel}>Projects Built</div>
                            </div>
                            <div className={styles.metric}>
                                <div className={styles.metricValue} style={{ transform: 'scale(1.5)' }}>∞</div>
                                <div className={styles.metricLabel}>Bugs Fixed</div>
                            </div>
                            <div className={styles.metric}>
                                <div className={styles.metricValue}>6L+</div>
                                <div className={styles.metricLabel}>Monthly Revenue</div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
}
