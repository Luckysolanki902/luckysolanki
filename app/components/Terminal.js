'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Terminal.module.css';

const COMMANDS = {
  help: {
    description: 'Show available commands',
    category: 'System'
  },
  about: {
    description: 'Learn about Lucky Solanki',
    category: 'Info'
  },
  skills: {
    description: 'Display technical skills',
    category: 'Info'
  },
  projects: {
    description: 'Show featured projects',
    category: 'Info'
  },
  experience: {
    description: 'Display work experience',
    category: 'Info'
  },
  contact: {
    description: 'Get contact information',
    category: 'Info'
  },
  clear: {
    description: 'Clear terminal output',
    category: 'System'
  },
  theme: {
    description: 'Toggle terminal theme',
    category: 'System'
  },
  whoami: {
    description: 'Display current user info',
    category: 'System'
  },
  date: {
    description: 'Show current date and time',
    category: 'System'
  },
  echo: {
    description: 'Echo text back to terminal',
    category: 'System'
  },
  history: {
    description: 'Show command history',
    category: 'System'
  },
  message: {
    description: 'Send me a message',
    category: 'Contact'
  },
  ai: {
    description: 'Ask questions in natural language',
    category: 'AI'
  },
  education: {
    description: 'Show academic background',
    category: 'Info'
  },
  startup: {
    description: 'Details about Maddy Custom',
    category: 'Projects'
  }
};

const RESPONSES = {
  help: () => {
    const categories = [...new Set(Object.values(COMMANDS).map(cmd => cmd.category))];
    let output = 'Available commands:\n\n';
    
    categories.forEach(category => {
      output += `${category} Commands:\n`;
      Object.entries(COMMANDS)
        .filter(([_, cmd]) => cmd.category === category)
        .forEach(([name, cmd]) => {
          output += `  ${name.padEnd(12)} - ${cmd.description}\n`;
        });
      output += '\n';
    });
    
    output += 'Type any command followed by Enter to execute.\n';
    output += 'Use arrow keys to navigate command history.';
    return output;
  },
  
  about: () => `
Full Stack Developer & Software Entrepreneur

I'm Lucky Solanki, a software developer specializing in full-stack development 
and entrepreneurial ventures. With a background in Mechanical Engineering, I've 
built expertise in software development through self-directed learning and 
practical implementation.

Professional Focus:
• Web & Mobile Development
• Scalable Backend Architecture
• E-commerce Solutions
• Real-time Applications

I've developed and deployed 10+ production-scale projects, including a 
successful e-commerce platform generating ₹6L+ in monthly revenue. My 
technical decisions are driven by performance, scalability, and user experience.


  `,
  
  skills: () => `
Technical Skills & Expertise

Frontend Development (95% mastery):
├── React.js            ████████████ Expert
├── Next.js             ████████████ Expert
├── Tailwind CSS        ████████████ Expert
├── Material UI         ███████████  Advanced
├── Framer Motion       ███████████  Advanced
├── React Spring        ██████████   Advanced
├── GSAP                █████████    Advanced
└── Lexical             █████████    Advanced

Backend & API (92% mastery):
├── Node.js             ████████████ Expert
├── Express.js          ████████████ Expert
├── MongoDB             ███████████  Advanced
├── MySQL               ███████████  Advanced
├── Firebase            ███████████  Advanced
├── JWT                 ██████████   Advanced
├── REST APIs           ████████████ Expert
└── Webhooks            ██████████   Advanced

Real-Time Systems (88% mastery):
├── Socket.IO           ███████████  Advanced
├── WebRTC              ██████████   Advanced
├── OpenAI API          ███████████  Advanced
├── Razorpay            ██████████   Advanced
├── Shiprocket          ██████████   Advanced
├── Twilio              █████████    Advanced
├── Cloudinary          ██████████   Advanced
└── CryptoJS            █████████    Advanced

DevOps & Infra (87% mastery):
├── AWS S3              ██████████   Advanced
├── CloudFront          █████████    Advanced
├── GitHub Actions      █████████    Advanced
├── Vercel              ███████████  Advanced
├── Render              ██████████   Advanced
├── Clerk               ██████████   Advanced
└── SEO Optimization    ███████████  Advanced

Automation & AI (92% mastery):
├── Python              ███████████  Advanced
├── Tesseract OCR       ██████████   Advanced
├── OpenAI              ███████████  Advanced
├── Raspberry Pi        █████████    Advanced
└── Encryption          ██████████   Advanced

Product Strategy (85% mastery):
├── User Analytics      ██████████   Advanced
├── A/B Testing         █████████    Advanced
├── Growth Metrics      █████████    Advanced
└── SEO-led Impact      ██████████   Advanced
  `,
  
  projects: () => `
Featured Projects

01. Maddy Custom
    E-commerce platform for vehicle personalization
    • Position: Co-founder & CTO
    • Tech: React, Next.js, Node.js, MongoDB
    • Features: Custom admin panel, payment processing, inventory management
    • Impact: 50K+ monthly users, ₹6L+ monthly revenue

02. MeetYourMate
    Social platform for college campuses
    • Tech: Socket.IO, Clerk auth, CryptoJS
    • Features: Real-time messaging, anonymous sharing
    • Security: End-to-end encryption, privacy-first architecture

03. AnotherMe
    Productivity & self-improvement platform
    • Tech: React, Lexical editor, MongoDB
    • Features: Task management, progress tracking, analytics
    • Security: End-to-end encrypted user data

04. AI Quiz Solver
    Education automation toolkit
    • Tech: Python, Tesseract OCR, OpenAI, Twilio
    • Features: Screen capture analysis, AI-powered problem solving
    • Implementation: Computer vision + NLP pipeline

05. EasyMola
    Campus logistics application
    • Tech: Firebase, React Native
    • Features: Real-time tracking, request management
    • Build time: Rapid MVP development (under 1 hour)


  `,
  
  experience: () => `
Professional Experience

 Maddy Custom | 2022 - Present
   Co-founder & CTO
   • Built completely from scratch without Shopify or templates
   • Architected both frontend and backend systems
   • Implemented role-based admin panel, advanced offer engine
   • Integrated Razorpay and Shiprocket APIs
   • Created SEO-focused architecture and behavior tracking
   • Grew to 50K+ monthly users, 2K+ monthly transactions
   • Achieved top 5 Google ranking for core keywords
   • Team: Harshit (CEO), Priyanshu (Co-founder), 
     Sumit (CPO), and Prashant (CDO)
  `,
  
  contact: () => `
Get In Touch

 Email:     luckysolanki902@gmail.com
 GitHub:    github.com/Luckysolanki902
 LinkedIn:  linkedin.com/in/luckysolanki902

I'm available for:
• Full-time opportunities
• Freelance projects
• Open source collaboration

Feel free to reach out for any inquiries or just to type 'message' in the terminal to send me a message!
  `,
  
  whoami: () => 'guest@luckysolanki.dev',
  
  date: () => new Date().toLocaleString(),
  
  clear: () => null, // Special case handled in component
  
  theme: () => 'Theme toggle feature coming soon!',
  
  history: (history) => {
    if (history.length === 0) return 'No command history found.';
    return `Command History:\n${history.map((cmd, i) => `${i + 1}. ${cmd}`).join('\n')}`;
  },
  
  message: () => 'Initiating contact form... Please provide the following information:',
  
  ai: () => 'AI Chat activated! Ask me anything about my work, skills, or experience.',
  
  education: () => `
Academic Background

 Harcourt Butler Technical University (HBTU), Kanpur
   B.Tech in Mechanical Engineering (2021-2025)
   
   Despite pursuing Mechanical Engineering formally, my passion and 
   self-education has been focused on Computer Science and Software 
   Development. I've consistently applied technical skills through 
   various campus projects and extracurricular activities.
   
   Key Achievements:
   • Web Development Head for HBTU's Technical Sub Council (2023-2024)
   • Built the tech fest website with ticketing and registration systems
   • Created platforms used by thousands of students on campus
   • Self-taught programming languages, frameworks, and development practices
   
   My academic journey represents my ability to learn independently and
   apply knowledge across disciplines. While mechanical engineering 
   provided me with problem-solving foundations, my self-directed 
   learning in software development has been my true passion.
  `,
  
  startup: () => `
Maddy Custom — E-commerce Platform

Position: Co-founder & CTO
Industry: Vehicle Personalization
Revenue: ₹6L+/month

Key Metrics:
• 50K+ monthly users
• 2K+ monthly transactions
• Top 5 Google ranking for core keywords

Technical Architecture:
• Custom-built full-stack solution
• Role-based authorization system
• Payment processing (Razorpay)
• Logistics integration (Shiprocket)
• SEO-optimized structure
• Analytics implementation

Leadership:
• Led technical strategy and implementation
• Collaborated with cross-functional team
• Managed development workflow and releases
• Implemented data-driven decision making

Notable Achievements:
• Reduced page load time by 40%
• Implemented A/B testing framework
• Designed scalable database architecture
• Created automated inventory management
  `
};

export default function Terminal() {
  const [output, setOutput] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  
  // Contact form state
  const [contactFormState, setContactFormState] = useState({
    active: false,
    step: 0,
    data: { name: '', email: '', message: '' }
  });
  
  // AI chat state
  const [aiChatMode, setAiChatMode] = useState(false);
  
  // Loading states
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const terminalRef = useRef(null);

  // Auto-focus input when terminal is clicked
  const handleTerminalClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Scroll to bottom when output changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage = {
      type: 'system',
      content: `Welcome to Lucky Solanki's Interactive Terminal

Type 'help' to see available commands or explore at your own pace.
    
╭─ guest@luckysolanki.dev
╰─$ `
    };
    setOutput([welcomeMessage]);
  }, []);

  // Handle contact form input flow
  const handleContactFormInput = async (input) => {
    const { step } = contactFormState;
    
    const commandOutput = {
      type: 'command',
      content: `guest@luckysolanki.dev:~$ ${input}`
    };
    setOutput(prev => [...prev, commandOutput]);
    setIsTyping(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let response = '';
    
    if (step === 0) { // Name input
      setContactFormState(prev => ({ ...prev, step: 1, data: { ...prev.data, name: input } }));
      response = 'Step 2/3: Please enter your email address:';
    } else if (step === 1) { // Email input
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input)) {
        response = 'Invalid email format. Please enter a valid email address:';
      } else {
        setContactFormState(prev => ({ ...prev, step: 2, data: { ...prev.data, email: input } }));
        response = 'Step 3/3: Please enter your message:';
      }
    } else if (step === 2) { // Message input
      const finalData = { ...contactFormState.data, message: input, source: 'terminal' };
      
      // Show loading animation
      setIsLoadingMessage(true);
      response = '📤 Sending your message...';
      
      const loadingOutput = {
        type: 'loading',
        content: response
      };
      setOutput(prev => [...prev, loadingOutput]);
      setIsTyping(false);
      
      // Send the message
      try {
        await new Promise(resolve => setTimeout(resolve, 800)); // Brief delay for UX
        
        const result = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData)
        });
        
        setIsLoadingMessage(false);
        
        if (result.ok) {
          response = `✅ Message sent successfully!\n\nThank you ${finalData.name}! I'll get back to you soon.\nReturning to terminal mode...`;
        } else {
          response = '❌ Failed to send message. Please try again later.\nReturning to terminal mode...';
        }
      } catch (error) {
        setIsLoadingMessage(false);
        response = '❌ Network error. Please check your connection and try again.\nReturning to terminal mode...';
      }
      
      setContactFormState({ active: false, step: 0, data: { name: '', email: '', message: '' } });
      
      // Remove loading message and add final response
      setOutput(prev => prev.slice(0, -1));
      const finalResponseOutput = {
        type: 'response',
        content: response
      };
      setOutput(prev => [...prev, finalResponseOutput]);
      return;
    }
    
    const responseOutput = {
      type: 'response',
      content: response
    };
    setOutput(prev => [...prev, responseOutput]);
    setIsTyping(false);
  };

  // Handle AI chat
  const handleAiChat = async (input) => {
    const commandOutput = {
      type: 'command',
      content: `you: ${input}`
    };
    setOutput(prev => [...prev, commandOutput]);
    
    // Show AI thinking animation
    setIsLoadingAI(true);
    const thinkingOutput = {
      type: 'loading',
      content: 'Thinking...'
    };
    setOutput(prev => [...prev, thinkingOutput]);
    setIsTyping(false);
    
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      const data = await response.json();
      
      // Brief delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsLoadingAI(false);
      
      // Remove loading message and add AI response
      setOutput(prev => prev.slice(0, -1));
      
      const aiResponse = {
        type: 'ai',
        content: `Lucky AI: ${data.reply || data.error || 'Sorry, I could not process your request.'}`
      };
      setOutput(prev => [...prev, aiResponse]);
      
    } catch (error) {
      setIsLoadingAI(false);
      
      // Remove loading message and add error response
      setOutput(prev => prev.slice(0, -1));
      
      const errorResponse = {
        type: 'ai',
        content: 'Lucky AI: Sorry, I\'m having trouble connecting right now. Please try again later.'
      };
      setOutput(prev => [...prev, errorResponse]);
    }
  };

  const executeCommand = async (command) => {
    const trimmedCommand = command.trim();
    const [mainCommand, ...args] = trimmedCommand.toLowerCase().split(' ');
    
    // Handle contact form flow
    if (contactFormState.active) {
      await handleContactFormInput(trimmedCommand);
      return;
    }
    
    // Handle AI chat mode
    if (aiChatMode && trimmedCommand !== 'exit') {
      await handleAiChat(trimmedCommand);
      return;
    }
    
    // Add command to history
    if (trimmedCommand && !commandHistory.includes(trimmedCommand)) {
      setCommandHistory(prev => [...prev, trimmedCommand]);
    }
    
    // Add command to output
    const commandOutput = {
      type: 'command',
      content: `guest@luckysolanki.dev:~$ ${command}`
    };
    
    setOutput(prev => [...prev, commandOutput]);
    setIsTyping(true);

    // Simulate typing delay for realism
    await new Promise(resolve => setTimeout(resolve, 300));

    let response = '';
    
    if (mainCommand === 'clear') {
      setOutput([]);
      setContactFormState({ active: false, step: 0, data: { name: '', email: '', message: '' } });
      setAiChatMode(false);
      setIsTyping(false);
      return;
    } else if (mainCommand === 'exit') {
      if (aiChatMode) {
        setAiChatMode(false);
        response = 'AI chat mode deactivated. Type any command to continue.';
      } else if (contactFormState.active) {
        setContactFormState({ active: false, step: 0, data: { name: '', email: '', message: '' } });
        response = 'Contact form cancelled. Type any command to continue.';
      } else {
        response = 'Nothing to exit from.';
      }
    } else if (mainCommand === 'message') {
      setContactFormState({ active: true, step: 0, data: { name: '', email: '', message: '' } });
      response = 'Contact form initiated!\n\nStep 1/3: Please enter your name:';
    } else if (mainCommand === 'ai') {
      setAiChatMode(true);
      response = 'AI Chat activated! 🤖\n\nAsk me anything about my work, skills, or experience.\nType "exit" to return to terminal mode.\n\nWhat would you like to know?';
    } else if (mainCommand === 'echo') {
      response = args.join(' ') || '';
    } else if (mainCommand === 'history') {
      response = RESPONSES.history(commandHistory);
    } else if (mainCommand === 'education') {
      response = RESPONSES.education();
    } else if (mainCommand === 'startup') {
      response = RESPONSES.startup();
    } else if (RESPONSES[mainCommand]) {
      response = RESPONSES[mainCommand]();
    } else if (trimmedCommand === '') {
      // Empty command, just show prompt
      setIsTyping(false);
      return;
    } else {
      response = `Command not found: ${mainCommand}\nType 'help' to see available commands.`;
    }

    const responseOutput = {
      type: 'response',
      content: response
    };

    setOutput(prev => [...prev, responseOutput]);
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentInput.trim()) {
        executeCommand(currentInput);
        setCurrentInput('');
        setHistoryIndex(-1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete functionality
      const availableCommands = Object.keys(COMMANDS);
      const matches = availableCommands.filter(cmd => 
        cmd.startsWith(currentInput.toLowerCase())
      );
      
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      } else if (matches.length > 1) {
        const commonPrefix = matches.reduce((prefix, cmd) => {
          let common = '';
          for (let i = 0; i < Math.min(prefix.length, cmd.length); i++) {
            if (prefix[i] === cmd[i]) {
              common += prefix[i];
            } else {
              break;
            }
          }
          return common;
        });
        
        if (commonPrefix.length > currentInput.length) {
          setCurrentInput(commonPrefix);
        } else {
          // Show available options
          const suggestionsOutput = {
            type: 'response',
            content: `Available commands: ${matches.join(', ')}`
          };
          setOutput(prev => [...prev, suggestionsOutput]);
        }
      }
    }
  };

  return (
    <div 
      ref={terminalRef}
      className={styles.terminal}
      onClick={handleTerminalClick}
    >
      {/* Terminal Header */}
      <div className={styles.terminalHeader}>
        <div className={styles.windowControls}>
          <span className={styles.controlButton} style={{ backgroundColor: '#ff5f57' }}></span>
          <span className={styles.controlButton} style={{ backgroundColor: '#ffbd2e' }}></span>
          <span className={styles.controlButton} style={{ backgroundColor: '#28ca42' }}></span>
        </div>
        <div className={styles.terminalTitle}>
          lucky@portfolio:~
        </div>
        <div className={styles.terminalInfo}>
          zsh
        </div>
      </div>

      {/* Terminal Body */}
      <div ref={outputRef} className={styles.terminalBody}>
        {/* Output */}
        {output.map((line, index) => (
          <div key={index} className={styles.outputLine}>
            {line.type === 'command' && (
              <div className={styles.commandLine}>
                {line.content}
              </div>
            )}
            {line.type === 'response' && (
              <div className={styles.responseLine}>
                <pre className={styles.responseText}>{line.content}</pre>
              </div>
            )}
            {line.type === 'system' && (
              <div className={styles.systemLine}>
                <pre className={styles.systemText}>{line.content}</pre>
              </div>
            )}
            {line.type === 'ai' && (
              <div className={styles.aiLine}>
                <pre className={styles.aiText}>{line.content}</pre>
              </div>
            )}
            {line.type === 'loading' && (
              <div className={styles.loadingLine}>
                <pre className={styles.loadingText}>
                  <span className={styles.loadingSpinner}></span>
                  {line.content}
                  <span className={styles.loadingDots}>
                    <span className={styles.dot1}>.</span>
                    <span className={styles.dot2}>.</span>
                    <span className={styles.dot3}>.</span>
                  </span>
                </pre>
                <div className={styles.loadingProgress}></div>
              </div>
            )}
          </div>
        ))}

        {/* Current Input Line */}
        <div className={`${styles.inputLine} ${(isLoadingMessage || isLoadingAI) ? styles.loading : ''}`}>
          <span className={styles.prompt}>
            {contactFormState.active 
              ? 'contact-form:~$ ' 
              : aiChatMode 
                ? 'ai-chat:~$ ' 
                : 'guest@luckysolanki.dev:~$ '
            }
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.terminalInput}
            disabled={isLoadingMessage || isLoadingAI}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
          {(isTyping || isLoadingMessage || isLoadingAI) && <span className={styles.cursor}>_</span>}
        </div>
      </div>
    </div>
  );
}
