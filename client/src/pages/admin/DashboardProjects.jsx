import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Star, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const DashboardProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [searchTerm]);

  const fetchProjects = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      params.append('limit', '50');
      params.append('sort', '-createdAt');

      const response = await api.get(`/projects?${params}`);
      setProjects(response.data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setDeleteLoading(id);
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    } finally {
      setDeleteLoading(null);
    }
  };

  const toggleFeatured = async (id, featured) => {
    try {
      const response = await api.put(`/projects/${id}`, { featured: !featured });
      setProjects(projects.map(p => 
        p._id === id ? { ...p, featured: !featured } : p
      ));
      toast.success(`Project ${!featured ? 'featured' : 'unfeatured'} successfully`);
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <Link
          to="/dashboard/projects/new"
          className="btn-primary inline-flex items-center"
        >
          <Plus size={20} className="mr-2" />
          New Project
        </Link>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search projects..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No projects found. Create your first project!
          </p>
          <Link
            to="/dashboard/projects/new"
            className="btn-primary inline-flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Create Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card group hover:shadow-lg transition-shadow duration-200"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={project.images?.[0] || 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400'}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  {project.featured && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1">
                  {project.techStack?.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack?.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-2">
                    <Link
                      to={`/projects/${project._id}`}
                      target="_blank"
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                      title="View Project"
                    >
                      <Eye size={16} />
                    </Link>
                    <button
                      onClick={() => toggleFeatured(project._id, project.featured)}
                      className={`p-2 transition-colors duration-200 ${
                        project.featured
                          ? 'text-yellow-500 hover:text-yellow-600'
                          : 'text-gray-600 dark:text-gray-400 hover:text-yellow-500'
                      }`}
                      title={project.featured ? 'Remove from featured' : 'Add to featured'}
                    >
                      <Star size={16} fill={project.featured ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/dashboard/projects/${project._id}/edit`}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      title="Edit Project"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(project._id, project.title)}
                      disabled={deleteLoading === project._id}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 disabled:opacity-50"
                      title="Delete Project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Meta */}
                <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardProjects;