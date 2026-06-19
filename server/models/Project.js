const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  techStack: [{
    type: String,
    required: true
  }],
  githubUrl: {
    type: String,
    required: true
  },
  liveUrl: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

projectSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Project', projectSchema);