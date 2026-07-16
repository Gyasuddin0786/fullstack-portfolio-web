import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, ArrowLeft, Calendar, Tag } from 'lucide-react';
import { FaGithub } from "react-icons/fa";

import { motion } from 'framer-motion';
import api from '../utils/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data.data);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Project not found
          </h1>
          <Link to="/projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/projects"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Projects
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Project Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={project.images?.[currentImageIndex] || 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800'}
                  alt={project.title}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Image Thumbnails */}
              {project.images && project.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                        currentImageIndex === index
                          ? 'border-primary-600'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${project.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Tag size={20} className="mr-2" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Meta */}
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Calendar size={20} className="mr-2" />
              <span>Created on {new Date(project.createdAt).toLocaleDateString()}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center"
                >
                  <ExternalLink size={20} className="mr-2" />
                  View Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  <FaGithub size={20} className="mr-2" />
                  View Source Code
                </a>
              )}
            </div>

            {/* Featured Badge */}
            {project.featured && (
              <div className="inline-flex items-center px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
                ⭐ Featured Project
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;