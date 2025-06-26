'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './SelfTaughtSection.module.css';

export default function SelfTaughtSection() {
    const [visibleElements, setVisibleElements] = useState([]);
    const sectionRef = useRef(null);

    const storyMilestones = [
        {
            title: 'Gaming Childhood',
            content: 'Since childhood, I was fond of gaming. I used to play adventure games on my phone and TV video games. I always wanted to build games, not learning from any institution, but learning from online available resources.',
            tech: 'Adventure Games • Creative Thinking',
            side: 'left'
        },
        {
            title: 'First PC & Discovery',
            content: 'I couldn\'t get Computer Science branch but got Mechanical instead. My interest in computer science got ignited even more when I got my first PC - a HP Pavilion Gaming Laptop. I spent days exploring Windows UI, used monkeytype.com for fun, improved typing from 20 to 100 WPM.',
            tech: 'Windows • Typing • Exploration',
            side: 'right'
        },
        {
            title: 'Unity & Game Development',
            content: 'Finally installed Unity Engine, learnt C# basics, and started creating my first arcade game. I had learnt Photoshop by then, so I made characters and obstacles in Photoshop. Pure self-driven learning.',
            tech: 'Unity • C# • Photoshop',
            side: 'left'
        },
        {
            title: 'Startup Opportunity',
            content: 'When Harshit saw me using Photoshop, he had an entrepreneurial mindset and was working on a vehicle modification startup. He convinced me to mockup helmets to sell customized helmets and we succeeded. I later used JSX to automate design mockups.',
            tech: 'JSX • Design Automation • Business Logic',
            side: 'right'
        },
        {
            title: 'Web Development Journey',
            content: 'We needed a website. No one was willing to do it for free with passion, so I decided to learn web development myself. Learnt HTML, CSS, JS in a week, React in 2 weeks, then Next.js for SEO. Daily red pages of bugs taught me architecture, maintenance, and scalability.',
            tech: 'HTML • CSS • JS • React • Next.js',
            side: 'left'
        },
        {
            title: 'Business Success',
            content: 'We launched products one after another but nothing went viral via Meta ads, until \'Window Pillar Wraps\' became our breakthrough. Currently at ₹6 lakhs monthly revenue with full-stack systems I built from scratch.',
            tech: 'Full-Stack • Meta Ads • Revenue Systems',
            side: 'right'
        },
        {
            title: 'Continuous Innovation',
            content: 'In the meantime, created MeetYourMate.in (college Omegle with filters), EasyMola (hostel market logistics), AnotherMe (AI journaling with progress quantification), and various automation tools. Always building, always learning.',
            tech: 'WebRTC • Real-time Systems • AI Integration',
            side: 'left'
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
                    <div className={styles.timelinePath}></div>
                    {storyMilestones.map((milestone, index) => (
                        <div
                            key={index}
                            className={`${styles.milestone} ${styles[milestone.side]} ${isVisible(`milestone-${index}`) ? styles.visible : ''}`}
                            data-element-id={`milestone-${index}`}
                            style={{ '--index': index }}
                        >
                            <div className={styles.milestoneCard}>
                                <div className={styles.milestoneNumber}>{String(index + 1).padStart(2, '0')}</div>
                                <div className={styles.milestoneContent}>
                                    <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                                    <p className={styles.milestoneText}>{milestone.content}</p>
                                    <div className={styles.milestoneTech}>{milestone.tech}</div>
                                </div>
                                <div className={styles.circuitPattern}></div>
                            </div>
                            <div className={styles.connector}></div>
                        </div>
                    ))}
                </div>

                {/* Comparison Section */}
                <div
                    className={`${styles.comparisonSection} ${isVisible('comparison') ? styles.visible : ''}`}
                    data-element-id="comparison"
                >
                    <h3 className={styles.sectionTitle}>Academic vs Self-Taught Reality</h3>
                    <div className={styles.comparisonGrid}>
                        <div className={styles.academicSide}>
                            <h4>Mechanical Engineering Curriculum</h4>
                            <div className={styles.skillsList}>
                                <span>Thermodynamics</span>
                                <span>Statics & Dynamics</span>
                                <span>Material Science</span>
                                <span>Manufacturing Processes</span>
                                <span>Heat Transfer</span>
                                <span>Fluid Mechanics</span>
                            </div>
                        </div>
                        <div className={styles.dividerLine}>
                            <span className={styles.dividerText}>vs</span>
                        </div>
                        <div className={styles.selfTaughtSide}>
                            <h4>Self-Taught Development Skills</h4>
                            <div className={styles.skillsList}>
                                <span>Full-Stack Web Development</span>
                                <span>Real-time Systems</span>
                                <span>Business Logic & Architecture</span>
                                <span>UI/UX Design Principles</span>
                                <span>AI Integration</span>
                                <span>Startup Operations</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.comparisonQuote}>
                        "I didn't wait for a degree to define me. I let my projects speak instead."
                    </div>
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
                                <span className={styles.fileName}>philosophy.js</span>
                            </div>
                            <div className={styles.codeContent}>
                                <div className={styles.codeLine}>
                                    <span className={styles.keyword}>const</span>
                                    <span className={styles.variable}> philosophy</span>
                                    <span className={styles.operator}> = </span>
                                    <span className={styles.bracket}>{'{'}</span>
                                </div>
                                <div className={styles.codeLine}>
                                    <span className={styles.property}>  curiosity</span>
                                    <span className={styles.operator}>: </span>
                                    <span className={styles.string}>"Never stop asking 'why' and 'how'"</span>
                                    <span className={styles.operator}>,</span>
                                </div>
                                <div className={styles.codeLine}>
                                    <span className={styles.property}>  persistence</span>
                                    <span className={styles.operator}>: </span>
                                    <span className={styles.string}>"Every bug is a puzzle waiting to be solved"</span>
                                    <span className={styles.operator}>,</span>
                                </div>
                                <div className={styles.codeLine}>
                                    <span className={styles.property}>  growth</span>
                                    <span className={styles.operator}>: </span>
                                    <span className={styles.string}>"Embrace challenges as opportunities"</span>
                                    <span className={styles.operator}>,</span>
                                </div>
                                <div className={styles.codeLine}>
                                    <span className={styles.property}>  innovation</span>
                                    <span className={styles.operator}>: </span>
                                    <span className={styles.string}>"Build solutions that matter"</span>
                                </div>
                                <div className={styles.codeLine}>
                                    <span className={styles.bracket}>{'};'}</span>
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
                                <div className={styles.metricValue} style={{transform:'scale(1.5)'}}>∞</div>
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
