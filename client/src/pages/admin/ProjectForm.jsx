import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Upload, X, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: [],
    githubUrl: '',
    liveUrl: '',
    images: [],
    featured: false,
    order: 0
  });

  const [newTech, setNewTech] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id, isEdit]);

  const fetchProject = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setFormData(response.data.data);
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to fetch project');
      navigate('/dashboard/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isEdit) {
        await api.put(`/projects/${id}`, formData);
        toast.success('Project updated successfully');
      } else {
        await api.post('/projects', formData);
        toast.success('Project created successfully');
      }
      navigate('/dashboard/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addTech = () => {
    if (newTech.trim() && !formData.techStack.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const removeTech = (tech) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };

  const addImage = () => {
    if (imageUrl.trim() && !formData.images.includes(imageUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()]
      }));
      setImageUrl('');
    }
  };

  const removeImage = (image) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== image)
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // Get presigned URL
      const response = await api.post('/uploads/presign', {
        fileName: file.name,
        fileType: file.type
      });

      const { presignedUrl, publicUrl, provider } = response.data;

      if (provider === 's3') {
        // Upload to S3
        await fetch(presignedUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type
          }
        });
        
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, publicUrl]
        }));
      } else {
        // Upload to Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', response.data.api_key);
        formData.append('timestamp', response.data.timestamp);
        formData.append('signature', response.data.signature);
        formData.append('folder', response.data.folder);

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${response.data.cloud_name}/image/upload`,
          {
            method: 'POST',
            body: formData
          }
        );

        const result = await uploadResponse.json();
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, result.secure_url]
        }));
      }

      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isEdit ? 'Edit Project' : 'Create New Project'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {isEdit ? 'Update your project details' : 'Add a new project to your portfolio'}
          </p>
        </div>
        <button
          onClick={() => navigate('/dashboard/projects')}
          className="btn-secondary inline-flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="card space-y-6"
      >
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              required
              className="input"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub URL *
            </label>
            <input
              type="url"
              name="githubUrl"
              required
              className="input"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Live URL
            </label>
            <input
              type="url"
              name="liveUrl"
              className="input"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="https://your-project.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Order
            </label>
            <input
              type="number"
              name="order"
              className="input"
              value={formData.order}
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            required
            rows={4}
            className="textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your project..."
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tech Stack *
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              className="input flex-1"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              placeholder="Add technology (e.g., React, Node.js)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
            />
            <button
              type="button"
              onClick={addTech}
              className="btn-primary px-4"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.techStack.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTech(tech)}
                  className="ml-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Images
          </label>
          
          {/* Upload */}
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
              disabled={uploading}
            />
            <label
              htmlFor="image-upload"
              className={`btn-secondary inline-flex items-center cursor-pointer ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Upload size={20} className="mr-2" />
              {uploading ? 'Uploading...' : 'Upload Image'}
            </label>
          </div>

          {/* Manual URL */}
          <div className="flex gap-2 mb-3">
            <input
              type="url"
              className="input flex-1"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Or paste image URL"
            />
            <button
              type="button"
              onClick={addImage}
              className="btn-primary px-4"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Image Preview */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Project ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Featured */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            checked={formData.featured}
            onChange={handleChange}
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Featured Project (will appear on homepage)
          </label>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => navigate('/dashboard/projects')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
          >
            <Save size={20} className="mr-2" />
            {saving ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default ProjectForm;