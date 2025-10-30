import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Award, Briefcase, User, ChevronDown, Terminal, Sparkles, Youtube, Twitter, Users } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSocialDropdownOpen, setIsSocialDropdownOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [particles, setParticles] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const socialDropdownRef = useRef(null);
  
  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (socialDropdownRef.current && !socialDropdownRef.current.contains(event.target)) {
        setIsSocialDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.observe-fade').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const socialMediaLinks = [
    {
      name: "CodeTube",
      icon: Youtube,
      url: "https://codetubeapp.vercel.app/",
      color: "from-red-500 to-red-600",
      hoverColor: "hover:border-red-500/50"
    },
    {
      name: "ChirpSpace",
      icon: Twitter,
      url: "https://chirpspaceapp.vercel.app/",
      color: "from-blue-400 to-blue-500",
      hoverColor: "hover:border-blue-500/50"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedinapp.vercel.app/",
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:border-blue-600/50"
    }
  ];

  const projects = [
    {
      title: "CareConnect",
      category: "fullstack",
      tech: ["React", "Tailwind CSS", "REST API"],
      description: "Doctor appointment platform with role-based access for Admins, Doctors, and Users",
      features: ["Real-time availability", "Appointment tracking", "Search & filtering"],
      gradient: "from-blue-500 to-cyan-500",
      date: "Feb 2025",
      link: "https://github.com/KaranShah1911/CareConnect"
    },
    {
      title: "SafarMitra",
      category: "fullstack",
      tech: ["React", "Tailwind CSS", "Axios"],
      description: "Taxi pooling platform connecting riders with room-based matching",
      features: ["Dynamic ride views", "Driver allocation", "Real-time updates"],
      gradient: "from-purple-500 to-pink-500",
      date: "Dec 2024",
      link: "https://github.com/sahilwaje23/SafarMitra"
    },
    {
      title: "Blogify",
      category: "backend",
      tech: ["Node.js", "Express", "MongoDB", "EJS"],
      description: "Full-stack blog application with server-side rendering",
      features: ["JWT authentication", "Comment system", "Dynamic templates"],
      gradient: "from-green-500 to-emerald-500",
      date: "Oct 2025",
      link: "https://github.com/Yogesh-Palve/blogify"
    }
  ];

  const skills = {
    languages: ["C++", "JavaScript"],
    frontend: ["React.js", "Tailwind CSS", "HTML5", "CSS3"],
    backend: ["Node.js", "Express.js"],
    database: ["MongoDB", "MySQL"],
    tools: ["Git", "GitHub", "VS Code", "Postman"]
  };

  const achievements = [
    { title: "LeetCode Rating", value: "1611", icon: "🏆" },
    { title: "CodeChef 2★", value: "1495", icon: "⭐" },
    { title: "Travelling Coder", value: "4th Place", icon: "🥈" },
    { title: "Grid of Doom", value: "6th Place", icon: "🎯" },
    { title: "Code Busters", value: "12th Place", icon: "💻" }
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedFilter);

  const navItems = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Terminal },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen relative overflow-hidden">
      {/* Custom Cursor */}
      <div 
        className="fixed w-6 h-6 border-2 border-cyan-400 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out mix-blend-difference"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorVariant === 'hover' ? 1.5 : 1})`
        }}
      />

      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md z-40 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-xl">
                YP
              </div>
              <span className="font-bold text-xl hidden sm:block">Yogesh Palve</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                    activeSection === item.id
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-md border-t border-gray-700">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full px-6 py-3 text-left hover:bg-gray-700 transition-colors flex items-center space-x-3"
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center observe-fade">
          <div className="mb-8 inline-block">
            <Sparkles className="text-cyan-400 w-12 h-12 animate-pulse" />
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
            Hi, I'm Yogesh Palve
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-400 mb-4">
            Computer Engineering Student @ VJTI
          </p>
          
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Full-stack developer passionate about building scalable web applications
            with modern technologies. CGPA: 8.06
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="https://github.com/yogesh-palve"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>

            {/* Social Media Dropdown Button */}
            <div className="relative" ref={socialDropdownRef}>
              <button
                onClick={() => setIsSocialDropdownOpen(!isSocialDropdownOpen)}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
              >
                <Users size={20} />
                <span>Social Media</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isSocialDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isSocialDropdownOpen && (
                <div className="absolute top-full mt-2 w-56 bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50 animate-slide-down">
                  {socialMediaLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsSocialDropdownOpen(false)}
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                      className={`flex items-center space-x-3 px-4 py-3 hover:bg-gray-700 transition-all duration-300 border-b border-gray-700 last:border-b-0 ${social.hoverColor} group`}
                    >
                      <div className={`w-10 h-10 bg-gradient-to-br ${social.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <social.icon size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                          {social.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          Click to visit
                        </div>
                      </div>
                      <ExternalLink size={14} className="ml-auto text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="mailto:yogeshpalve037@gmail.com"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-lg flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
            >
              <Mail size={20} />
              <span>Contact Me</span>
            </a>
          </div>

          <button
            onClick={() => scrollToSection('projects')}
            className="animate-bounce"
          >
            <ChevronDown size={32} className="text-cyan-400" />
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center observe-fade">
            Featured <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 observe-fade">Building scalable solutions with modern technologies</p>

          {/* Project Filters */}
          <div className="flex justify-center space-x-4 mb-12 observe-fade flex-wrap gap-2">
            {['all', 'fullstack', 'backend'].map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className={`px-6 py-2 rounded-full transition-all duration-300 capitalize ${
                  selectedFilter === filter
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="observe-fade bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={20} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  </div>

                  <p className="text-gray-400 mb-4 text-sm">{project.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-cyan-400 mr-2">▹</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-700/50 text-cyan-400 text-xs rounded-full border border-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500">{project.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center observe-fade">
            Technical <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 observe-fade">Technologies I work with</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <div
                key={category}
                className="observe-fade bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold mb-4 capitalize text-purple-400 flex items-center">
                  <Terminal size={20} className="mr-2" />
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item, i) => (
                    <span
                      key={i}
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                      className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-purple-500/20 hover:text-purple-400 transition-all duration-300 cursor-pointer"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Coursework */}
          <div className="mt-12 observe-fade">
            <h3 className="text-2xl font-bold mb-6 text-center text-purple-400">Relevant Coursework</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["Data Structures", "OOP", "DBMS", "Operating Systems", "Algorithm Design", "Automata Theory"].map((course, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-lg"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center observe-fade">
            Achievements & <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Recognition</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 observe-fade">Competitive programming and contests</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="observe-fade bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{achievement.title}</h3>
                <p className="text-3xl font-bold text-white">{achievement.value}</p>
              </div>
            ))}
          </div>

          {/* Responsibilities */}
          <div className="observe-fade bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-center text-cyan-400 flex items-center justify-center">
              <Briefcase size={24} className="mr-2" />
              Leadership & Mentorship
            </h3>
            <div className="max-w-3xl mx-auto">
              <h4 className="text-xl font-bold mb-2 text-yellow-400">Community of Coders - Mentor</h4>
              <p className="text-gray-400 mb-4">Feb 2025 – Present | VJTI</p>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">▹</span>
                  Mentored junior undergraduates in Web Genesis Program focusing on HTML, CSS, and React
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">▹</span>
                  Guiding a team of 4 students in developing MERN stack projects under Inheritance Program
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 bg-gray-800/30 flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center observe-fade">
            Let's <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 observe-fade">
            I'm always open to discussing new projects, opportunities, or collaborations
          </p>

          <div className="grid md:grid-cols-3 gap-6 observe-fade">
            <a
              href="mailto:yogeshpalve037@gmail.com"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 text-center group"
            >
              <Mail size={40} className="mx-auto mb-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-sm text-gray-400">yogeshpalve037@gmail.com</p>
            </a>

            <a
              href="https://www.linkedin.com/in/yogeshpalve37"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 text-center group"
            >
              <Linkedin size={40} className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-2">LinkedIn</h3>
              <p className="text-sm text-gray-400">yogesh-palve</p>
            </a>

            <a
              href="https://github.com/yogesh-palve"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 text-center group"
            >
              <Github size={40} className="mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-2">GitHub</h3>
              <p className="text-sm text-gray-400">yogesh-palve</p>
            </a>
          </div>

          <div className="mt-12 text-center observe-fade">
            <p className="text-gray-500">
              © 2025 Yogesh Palve. Built with React & Tailwind CSS following HCI principles.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-20px); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }

        .observe-fade {
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;