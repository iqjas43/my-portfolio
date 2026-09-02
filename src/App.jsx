import React, { useState, useEffect } from 'react';
import { Mail, ExternalLink, Code2, Globe, Terminal, User, Briefcase, GraduationCap, Award, Send } from 'lucide-react';``
function App() {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  
  // Fast & smooth typing effect states
  const roles = ["Frontend Developer", "Web Developer", "React Specialist"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  // Projects Data
  const myProjects = [
    {
      title: "LingoLab (Language Learning App)",
      tag: "Featured",
      description: "A gamified language-learning web application featuring interactive quizzes, multi-language vocabulary support, and live XP progress tracking.",
      tech: ['React.js', 'Tailwind CSS', 'JavaScript', 'Node.js'],
      liveUrl: "#",
      githubUrl: "https://github.com/iqjas43/LingoLab"
    },
    {
      title: "Portfolio Website",
      tag: "Personal",
      description: "A highly responsive modern portfolio template built to showcase projects, technical skills, and professional resume details.",
      tech: ['React.js', 'Tailwind CSS', 'Vite'],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  // Smooth custom cursor tracking using requestAnimationFrame for zero lag
  useEffect(() => {
    let animationFrameId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      setMousePosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Fast typing & erasing loop
  useEffect(() => {
    const fullText = roles[currentRoleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1000);
          setTypingSpeed(50);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(80);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <div 
      className={`${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'} min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950 relative cursor-default transition-colors duration-300`}
      onMouseMove={(e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
          setCursorText('');
        } else {
          setCursorText('');
        }
      }}
    >
      
      {/* Super Smooth Floating Label Cursor */}
      <div 
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-600/95 backdrop-blur-md text-white text-xs font-medium shadow-lg shadow-emerald-500/40 border border-emerald-400/50"
        style={{
          transform: `translate3d(${mousePosition.x + 15}px, ${mousePosition.y + 15}px, 0)`
        }}
      >
        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
        {cursorText}
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full ${darkMode ? 'bg-slate-950/80 border-slate-800/50 text-slate-100' : 'bg-white/90 border-slate-200 text-slate-900'} backdrop-blur-md z-40 border-b transition-all`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
            Portfolio.
          </span>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-slate-900 text-yellow-400 border-slate-800' : 'bg-slate-100 text-amber-500 border-slate-200'} border transition-transform active:scale-95`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(true)}
              className={`md:hidden ${darkMode ? 'text-slate-200' : 'text-slate-800'} hover:text-emerald-400 transition-transform active:scale-95 z-50`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Smooth Side Slide-in Mobile Drawer */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${mobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div 
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        <div className={`absolute top-0 right-0 h-full w-72 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'} border-l shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div>
            <div className={`flex items-center justify-between pb-6 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Portfolio.
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-full ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-amber-500'} transition-transform active:scale-95`}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2 rounded-full ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'} hover:text-emerald-400 transition-colors`}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-6 mt-8 text-base font-medium">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition-colors flex items-center justify-between group">
                <span>About</span>
                <span className="text-xs text-slate-400 group-hover:text-emerald-400">01</span>
              </a>
              <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition-colors flex items-center justify-between group">
                <span>Skills</span>
                <span className="text-xs text-slate-400 group-hover:text-emerald-400">02</span>
              </a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition-colors flex items-center justify-between group">
                <span>Projects</span>
                <span className="text-xs text-slate-400 group-hover:text-emerald-400">03</span>
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition-colors flex items-center justify-between group">
                <span>Contact</span>
                <span className="text-xs text-slate-400 group-hover:text-emerald-400">04</span>
              </a>
            </div>
          </div>

          <div className={`pt-6 border-t ${darkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'} text-xs text-center`}>
            <p>Junaid Ansari</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${darkMode ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600'} border text-xs font-semibold shadow-lg shadow-emerald-500/10`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Available for Frontend Developer Roles
          </div>
          <div>
            <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              Hello, I'm <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Junaid Ansari
              </span>
            </h1>
            <div className={`h-10 mt-3 flex items-center text-xl md:text-2xl font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
              <span className="text-emerald-400 mr-2">&gt;</span>
              <span>{currentText}</span>
              <span className="w-2.5 h-6 bg-emerald-400 ml-1 animate-pulse"></span>
            </div>
          </div>

          <p className={`${darkMode ? 'text-slate-300' : 'text-slate-700'} text-base md:text-lg max-w-xl leading-relaxed`}>
            I build fast, responsive, and scalable web applications using React.js, JavaScript, and Tailwind CSS. Passionate about creating clean user interfaces and seamless experiences.
          </p>

          <div className="flex gap-4 pt-2">
            <a href="#contact" className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all duration-300">
              Let's Connect
            </a>
            <a href="#projects" className={`px-6 py-3 rounded-xl border ${darkMode ? 'border-slate-700 bg-slate-900/50 text-slate-200 hover:border-emerald-400/50' : 'border-slate-300 bg-slate-50 text-slate-800 hover:border-emerald-500'} font-medium hover:scale-105 transition-all duration-300`}>
              View Projects
            </a>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <a href="https://github.com/iqjas43" target="_blank" rel="noreferrer" className={`p-2 rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'} border hover:text-emerald-400 hover:scale-110 transition-all`}>
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={`p-2 rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'} border hover:text-emerald-400 hover:scale-110 transition-all`}>
              <Linkedin size={20} />
            </a>
            <a href="mailto:your_email@gmail.com" className={`p-2 rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'} border hover:text-emerald-400 hover:scale-110 transition-all`}>
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="w-full md:w-auto grid grid-cols-2 gap-4">
          <div className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-900/60 border-slate-800/80 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-lg'} border backdrop-blur-sm text-center hover:border-emerald-400/40 hover:-translate-y-1 transition-all duration-300`}>
            <h3 className="text-3xl font-bold text-emerald-400">2+</h3>
            <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'} mt-1`}>Projects Built</p>
          </div>
          <div className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-900/60 border-slate-800/80 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-lg'} border backdrop-blur-sm text-center hover:border-teal-400/40 hover:-translate-y-1 transition-all duration-300`}>
            <h3 className="text-3xl font-bold text-teal-400">10+</h3>
            <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'} mt-1`}>Technologies</p>
          </div>
          <div className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-900/60 border-slate-800/80 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-lg'} border backdrop-blur-sm col-span-2 text-center hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-300`}>
            <h3 className="text-xl font-bold text-cyan-400">BSC IT Graduate</h3>
            <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'} mt-1`}>Mumbai University</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-6 max-w-6xl mx-auto border-t ${darkMode ? 'border-slate-900' : 'border-slate-200'}`}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">Who I Am</span>
          <h2 className={`text-3xl md:text-4xl font-bold mt-3 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>About Me</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className={`p-8 rounded-3xl ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-lg'} border space-y-4 hover:border-emerald-400/30 transition-all duration-300`}>
            <h3 className="text-xl font-semibold text-emerald-400 flex items-center gap-2">
              <User size={20} /> Professional Summary
            </h3>
            <p className={`${darkMode ? 'text-slate-300' : 'text-slate-700'} leading-relaxed text-sm md:text-base`}>
              I am a dedicated frontend developer with a BSC IT degree from Mumbai University, specializing in building modern web interfaces. I focus on writing clean, scalable code and turning UI/UX designs into fully responsive web applications.
            </p>
          </div>
          <div className={`p-8 rounded-3xl ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-lg'} border space-y-4 hover:border-teal-400/30 transition-all duration-300`}>
            <h3 className="text-xl font-semibold text-teal-400 flex items-center gap-2">
              <GraduationCap size={20} /> Education & Background
            </h3>
            <ul className={`space-y-3 text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <strong>B.Sc. IT</strong> - Mumbai University
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                Specialized in Frontend Web Development
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-6 max-w-6xl mx-auto border-t ${darkMode ? 'border-slate-900' : 'border-slate-200'}`}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">My Skills</span>
          <h2 className={`text-3xl md:text-4xl font-bold mt-3 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Technical Expertise</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-lg'} border space-y-4 hover:border-emerald-400/40 hover:-translate-y-1 transition-all duration-300`}>
            <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2"><Code2 size={18} /> Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5', 'CSS3', 'Framer Motion'].map((skill, index) => (
                <span key={index} className={`px-3 py-1 rounded-lg ${darkMode ? 'bg-slate-800/80 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-200'} text-xs border hover:border-emerald-400 transition-colors`}>{skill}</span>
              ))}
            </div>
          </div>
          <div className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-lg'} border space-y-4 hover:border-teal-400/40 hover:-translate-y-1 transition-all duration-300`}>
            <h3 className="text-lg font-bold text-teal-400 flex items-center gap-2"><Database size={18} /> Backend & DB</h3>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Express.js', 'MongoDB', 'REST APIs'].map((skill, index) => (
                <span key={index} className={`px-3 py-1 rounded-lg ${darkMode ? 'bg-slate-800/80 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-200'} text-xs border hover:border-teal-400 transition-colors`}>{skill}</span>
              ))}
            </div>
          </div>
          <div className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-lg'} border space-y-4 hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-300`}>
            <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2"><Wrench size={18} /> Tools</h3>
            <div className="flex flex-wrap gap-2">
              {['Git', 'GitHub Desktop', 'VS Code', 'Postman', 'Vercel', 'MongoDB Atlas'].map((skill, index) => (
                <span key={index} className={`px-3 py-1 rounded-lg ${darkMode ? 'bg-slate-800/80 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-200'} text-xs border hover:border-cyan-400 transition-colors`}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 px-6 max-w-6xl mx-auto border-t ${darkMode ? 'border-slate-900' : 'border-slate-200'}`}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">Portfolio</span>
          <h2 className={`text-3xl md:text-4xl font-bold mt-3 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Featured Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {myProjects.map((project, index) => (
            <div key={index} className={`p-6 rounded-3xl ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-lg'} border hover:border-emerald-400/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4`}>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-emerald-400">{project.title}</h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse">{project.tag}</span>
                </div>
                <p className={`${darkMode ? 'text-slate-300' : 'text-slate-700'} text-sm leading-relaxed`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className={`text-xs ${darkMode ? 'text-slate-300 bg-slate-800' : 'text-slate-700 bg-slate-100'} px-2.5 py-1 rounded-md`}>{t}</span>
                  ))}
                </div>
              </div>
              <div className={`flex gap-4 pt-4 border-t ${darkMode ? 'border-slate-800/80' : 'border-slate-100'}`}>
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:underline">
                  <ExternalLink size={14} /> Live Demo
                </a>
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 text-xs font-medium ${darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}>
                  <Github size={14} /> Source Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-6 max-w-4xl mx-auto border-t ${darkMode ? 'border-slate-900' : 'border-slate-200'} text-center`}>
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">Get In Touch</span>
        <h2 className={`text-3xl md:text-4xl font-bold mt-3 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Let's Work Together</h2>
        <p className={`${darkMode ? 'text-slate-300' : 'text-slate-700'} text-sm mt-2 max-w-md mx-auto`}>
          Have an opportunity or want to connect? Drop me an email or find me on LinkedIn!
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="mailto:your_email@gmail.com" className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:scale-105">
            Mail Me Directly
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={`px-6 py-3 rounded-xl border ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-200' : 'border-slate-300 bg-slate-50 text-slate-800'} hover:border-emerald-400/50 font-medium text-sm transition-all hover:scale-105`}>
            LinkedIn Profile
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t ${darkMode ? 'border-slate-900 text-slate-400' : 'border-slate-200 text-slate-600'} text-center text-xs`}>
        <p>© {new Date().getFullYear()} Junaid Ansari. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}

export default App;