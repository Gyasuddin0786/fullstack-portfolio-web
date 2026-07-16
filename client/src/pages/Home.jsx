import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, Mail, ArrowRight, Code, Palette, Database, Globe, User, MessageSquare, Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";
import { motion } from 'framer-motion';
import api from '../utils/api';
import ProjectCard from '../components/ui/ProjectCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, projectsRes] = await Promise.all([
        api.get('/profile'),
        api.get('/projects?featured=true&limit=6')
      ]);
      setProfile(profileRes.data.data);
      setProjects(projectsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post('/contact', contactForm);
      toast.success('Message sent successfully!');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const skills = [
    { name: 'MERN Stack Development', icon: Code, description: 'React.js, Node.js, Express.js, MongoDB, MySQL with JWT authentication' },
    { name: 'Frontend Technologies', icon: Palette, description: 'React.js, Tailwind CSS, Bootstrap, CodeMirror integration, dynamic routing' },
    { name: 'Backend Development', icon: Database, description: 'Node.js, Express.js, ASP.NET Core & MVC, REST APIs, Role-based access' },
    { name: 'Full Stack Projects', icon: Globe, description: 'E-commerce, Booking systems, Management systems, AI-based applications' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background with theme support */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.img
              src="https://avatars.githubusercontent.com/u/154743162?v=4"
              alt={profile?.name || 'Developer'}
              className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white dark:border-gray-700 shadow-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Hi, I'm <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{profile?.name || 'Developer'}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {profile?.bio || 'Full Stack Developer passionate about creating amazing web experiences'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a 
                href="#contact" 
                className="btn-primary inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch <Mail className="ml-2" size={20} />
              </motion.a>
              <motion.a
                href="https://www.canva.com/design/DAGvFYW4Jxw/mMrQ6HVw3BZ-ZHP_30G0lA/view"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume <Download className="ml-2" size={20} />
              </motion.a>
            </div>
            <div className="flex justify-center space-x-6 mt-8">
              <motion.a 
                href="https://github.com/Gyasuddin0786" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                whileHover={{ scale: 1.2, y: -2 }}
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/gyasuddin-ansari-199b9b2b5/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                whileHover={{ scale: 1.2, y: -2 }}
              >
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a 
                href="https://x.com/GyasuddinA2081" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                whileHover={{ scale: 1.2, y: -2 }}
              >
                <FaTwitter size={24} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {profile?.bio || 'Passionate developer with expertise in modern web technologies'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">Skills & Expertise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300">💻 Technical Expertise & Project Experience</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.name} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: index * 0.1 }} 
                viewport={{ once: true }} 
                whileHover={{ y: -10, scale: 1.02 }}
                className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <skill.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{skill.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Some of my recent work</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project, index) => (
              <motion.div 
                key={project._id} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: index * 0.1 }} 
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/projects" className="btn-primary inline-flex items-center">
                View All Projects <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 overflow-hidden">
        {/* Dynamic background with theme support */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Let's Create Something
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Amazing Together ✨
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to turn your vision into reality? Drop me a message and let's build the future! 🚀
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Contact Info */}
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="lg:col-span-2 space-y-6">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-3">💬</span>
                    Get In Touch
                  </h3>
                  
                  <div className="space-y-6">
                    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Email</h4>
                        <p className="text-gray-300 text-sm">gyasuddina265@gmail.com</p>
                      </div>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <FaGithub className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">GitHub</h4>
                        <p className="text-gray-300 text-sm">@Gyasuddin0786</p>
                      </div>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                        <FaLinkedin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">LinkedIn</h4>
                        <p className="text-gray-300 text-sm">Gyasuddin Ansari</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="backdrop-blur-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 rounded-3xl p-8">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-2">🎯</span> Available For
                  </h4>
                  <div className="space-y-1">
                    {['Full Stack Development', 'MERN Stack Apps', 'Custom Web Solutions'].map((service, index) => (
                      <motion.div key={service} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-center text-gray-200">
                        <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></span>
                        {service}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="lg:col-span-3">
                <form onSubmit={handleContactSubmit} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300">
                  <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
                    <span className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-4">✉️</span>
                    Send Message
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        placeholder=" "
                        className="peer w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl focus:bg-white/10 focus:border-purple-400 text-white placeholder-transparent transition-all duration-300 focus:outline-none"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      />
                      <label className="absolute left-4 -top-2.5 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-sm font-medium transition-all duration-300 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-gradient-to-r peer-focus:from-purple-400 peer-focus:to-pink-400 peer-focus:bg-clip-text peer-focus:text-transparent">
                        <User className="inline w-4 h-4 mr-2" />Your Name
                      </label>
                    </div>
                    
                    <div className="relative group">
                      <input
                        type="email"
                        required
                        placeholder=" "
                        className="peer w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl focus:bg-white/10 focus:border-purple-400 text-white placeholder-transparent transition-all duration-300 focus:outline-none"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      />
                      <label className="absolute left-4 -top-2.5 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-sm font-medium transition-all duration-300 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-gradient-to-r peer-focus:from-purple-400 peer-focus:to-pink-400 peer-focus:bg-clip-text peer-focus:text-transparent">
                        <Mail className="inline w-4 h-4 mr-2" />Email Address
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        placeholder=" "
                        className="peer w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl focus:bg-white/10 focus:border-purple-400 text-white placeholder-transparent transition-all duration-300 focus:outline-none"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      />
                      <label className="absolute left-4 -top-2.5 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-sm font-medium transition-all duration-300 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-gradient-to-r peer-focus:from-purple-400 peer-focus:to-pink-400 peer-focus:bg-clip-text peer-focus:text-transparent">
                        <MessageSquare className="inline w-4 h-4 mr-2" />Subject
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="relative group">
                      <textarea
                        rows={5}
                        required
                        placeholder=" "
                        className="peer w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl focus:bg-white/10 focus:border-purple-400 text-white placeholder-transparent transition-all duration-300 focus:outline-none resize-none"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      />
                      <label className="absolute left-4 -top-2.5 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-sm font-medium transition-all duration-300 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-gradient-to-r peer-focus:from-purple-400 peer-focus:to-pink-400 peer-focus:bg-clip-text peer-focus:text-transparent">
                        <MessageSquare className="inline w-4 h-4 mr-2" />Your Message
                      </label>
                    </div>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 shadow-lg hover:shadow-purple-500/25"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span className="text-lg">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        <span className="text-lg">Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;