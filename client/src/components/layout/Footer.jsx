import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";
import { Heart } from "lucide-react";
import { useState, useEffect } from 'react';
import api from '../../utils/api';

const Footer = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile');
      setProfile(response.data.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };



  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-primary-400 mb-4">Portfolio</h3>
            <p className="text-gray-400 mb-4">
              {profile?.bio || 'Building amazing web experiences with modern technologies.'}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Gyasuddin0786"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/gyasuddin-ansari-199b9b2b5/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://x.com/GyasuddinA2081"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`/#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <p className="text-gray-400 mb-2">
              Ready to work together? Let's create something amazing!
            </p>
            <a
              href="#contact"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            Made with <Heart className="mx-2 text-red-500" size={16} /> by{' '}
            <span className="ml-1 text-white font-medium">
              {profile?.name || 'Developer'}
            </span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;