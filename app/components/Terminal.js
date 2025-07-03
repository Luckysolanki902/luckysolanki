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
Full Stack Developer & Creative Technologist

I'm Lucky Solanki, a passionate developer who transforms ideas into 
exceptional digital experiences. With expertise spanning modern web 
technologies, I create scalable applications that blend functionality 
with beautiful design.

🎯 Focus Areas:
• Frontend: React, Next.js, TypeScript, Tailwind CSS
• Backend: Node.js, Python, Express, FastAPI
• Database: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Vercel, Docker
• Tools: Git, VS Code, Figma

I believe in writing clean, maintainable code and staying current 
with emerging technologies. When I'm not coding, you'll find me 
exploring new frameworks or contributing to open source projects.
  `,
  
  skills: () => `
Technical Skills & Expertise

Programming Languages:
├── JavaScript/TypeScript  ████████████ Expert
├── Python                ███████████  Advanced
├── Java                  █████████    Intermediate
├── Go                    ██████       Learning
└── Rust                  ████         Exploring

Frontend Technologies:
├── React/Next.js         ████████████ Expert
├── Vue.js                █████████    Advanced
├── Svelte                ██████       Intermediate
└── Angular               █████        Intermediate

Backend & Database:
├── Node.js/Express       ████████████ Expert
├── Python/FastAPI        ███████████  Advanced
├── PostgreSQL            ██████████   Advanced
├── MongoDB               █████████    Advanced
└── Redis                 ████████     Intermediate

DevOps & Tools:
├── Docker                █████████    Advanced
├── AWS/Cloud             ████████     Intermediate
├── Git/GitHub            ████████████ Expert
└── CI/CD                 ███████      Intermediate
  `,
  
  projects: () => `
Featured Projects

📊 Analytics Dashboard
   A real-time analytics platform built with Next.js and D3.js
   • Tech: Next.js, TypeScript, PostgreSQL, WebSockets
   • Features: Real-time data visualization, custom charts
   • Status: Production (10k+ users)

🛒 E-commerce Platform
   Full-stack e-commerce solution with modern UX
   • Tech: React, Node.js, Stripe, MongoDB
   • Features: Payment processing, inventory management
   • Status: Live & scaling

🤖 AI Chat Assistant
   Intelligent chatbot with natural language processing
   • Tech: Python, OpenAI API, React, FastAPI
   • Features: Context awareness, multi-language support
   • Status: Beta testing

🎮 Game Development Framework
   Lightweight 2D game engine for web browsers
   • Tech: TypeScript, WebGL, Canvas API
   • Features: Physics engine, sprite animation
   • Status: Open source

Type 'project <name>' for detailed information about any project.
  `,
  
  experience: () => `
Professional Experience

🏢 Senior Full Stack Developer
   TechCorp Solutions | 2022 - Present
   • Lead development of microservices architecture
   • Mentored junior developers and code reviews
   • Improved application performance by 40%
   • Technologies: React, Node.js, AWS, PostgreSQL

💼 Frontend Developer
   Digital Agency | 2020 - 2022
   • Built responsive web applications for clients
   • Collaborated with design teams on UI/UX
   • Implemented modern web standards and accessibility
   • Technologies: Vue.js, JavaScript, SCSS, Figma

🚀 Freelance Developer
   Independent | 2019 - 2020
   • Developed custom web solutions for small businesses
   • Created e-commerce platforms and landing pages
   • Provided technical consulting and maintenance
   • Technologies: WordPress, PHP, JavaScript, MySQL

📚 Computer Science Degree
   University of Technology | 2015 - 2019
   • Bachelor's in Computer Science
   • Focus on Software Engineering and Algorithms
   • Graduated with Honors (3.8 GPA)
  `,
  
  contact: () => `
Get In Touch

📧 Email:     lucky.solanki@email.com
🌐 Website:   https://luckysolanki.dev
💼 LinkedIn:  linkedin.com/in/luckysolanki
🐙 GitHub:    github.com/luckysolanki
🐦 Twitter:   @luckysolanki_dev

📍 Location:  San Francisco Bay Area
🕐 Timezone:  PST (UTC-8)

Available for:
• Full-time opportunities
• Freelance projects
• Technical consulting
• Open source collaboration

Feel free to reach out for any inquiries or just to say hello!
I typically respond within 24 hours.
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
  
  ai: () => 'AI Chat activated! Ask me anything about my work, skills, or experience.'
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
      const finalData = { ...contactFormState.data, message: input };
      
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
