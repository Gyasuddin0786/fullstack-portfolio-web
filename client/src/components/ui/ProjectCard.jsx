import { ExternalLink, Eye } from 'lucide-react';
import { FaGithub} from "react-icons/fa6";

import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const { _id, title, description, techStack, githubUrl, liveUrl, images } = project;

  return (
    <div className="card group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Project Image */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={images?.[0] || 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600'}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
            <Link
              to={`/projects/${_id}`}
              className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <Eye size={20} />
            </Link>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <FaGithub size={20} />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack?.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link
            to={`/projects/${_id}`}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-center transition-colors duration-200"
          >
            View Details
          </Link>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <Github size={20} />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;