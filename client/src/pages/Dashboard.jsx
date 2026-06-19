import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, User, Mail, TrendingUp, Plus, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalMessages: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [projectsRes, messagesRes] = await Promise.all([
        api.get('/projects?limit=5&sort=-createdAt'),
        api.get('/messages')
      ]);

      const projects = projectsRes.data.data;
      const messages = messagesRes.data.data;
      
      setRecentProjects(projects);
      setRecentMessages(messages.slice(0, 5)); // Get latest 5 messages
      
      setStats({
        totalProjects: projectsRes.data.total || projects.length,
        featuredProjects: projects.filter(p => p.featured).length,
        totalMessages: messages.length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FolderOpen,
      color: 'bg-blue-500',
      link: '/dashboard/projects'
    },
    {
      title: 'Featured Projects',
      value: stats.featuredProjects,
      icon: TrendingUp,
      color: 'bg-green-500',
      link: '/dashboard/projects'
    },
    {
      title: 'Messages',
      value: stats.totalMessages,
      icon: Mail,
      color: 'bg-purple-500',
      link: '/dashboard/messages'
    }
  ];

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your portfolio.
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              to={stat.link}
              className="card hover:shadow-lg transition-shadow duration-200 block"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color} text-white mr-4`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Projects
            </h2>
            <Link
              to="/dashboard/projects"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentProjects.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No projects yet. Create your first project!
              </p>
            ) : (
              recentProjects.map((project) => (
                <div
                  key={project._id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={project.images?.[0] || 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=100'}
                      alt={project.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {project.featured && (
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                        Featured
                      </span>
                    )}
                    <Link
                      to={`/projects/${project._id}`}
                      className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <Eye size={16} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Messages
            </h2>
            <Link
              to="/dashboard/messages"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4 mb-6">
            {recentMessages.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No messages yet.
              </p>
            ) : (
              recentMessages.map((message) => (
                <div
                  key={message._id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {message.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <strong>Subject:</strong> {message.subject}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {message.message}
                  </p>
                </div>
              ))
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>

          <div className="space-y-3">
            <Link
              to="/dashboard/projects/new"
              className="flex items-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200"
            >
              <Plus className="text-primary-600 dark:text-primary-400 mr-3" size={20} />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Create New Project
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Add a new project to your portfolio
                </p>
              </div>
            </Link>

            <Link
              to="/dashboard/messages"
              className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
            >
              <Mail className="text-green-600 dark:text-green-400 mr-3" size={20} />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  View Messages
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Check and reply to messages
                </p>
              </div>
            </Link>

            <Link
              to="/dashboard/profile"
              className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
            >
              <User className="text-blue-600 dark:text-blue-400 mr-3" size={20} />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Update Profile
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Edit your personal information
                </p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;