const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Project = require('../models/Project');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});

    // Create admin user
    const adminUser = await User.create({
      name: 'Gyasuddin Ansari',
      email: 'gyasuddina265@gmail.com',
      password: 'Gyasuddin@123',
      role: 'owner',
      bio: 'Full Stack Developer passionate about creating amazing web experiences.',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      resumeUrl: 'https://example.com/resume.pdf',
      socials: {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe',
        website: 'https://johndoe.dev'
      }
    });

    // Create sample projects
    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
        githubUrl: 'https://github.com/johndoe/ecommerce-platform',
        liveUrl: 'https://ecommerce-demo.vercel.app',
        images: [
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
          'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800'
        ],
        featured: true,
        order: 1
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
        techStack: ['Vue.js', 'Socket.io', 'Express', 'PostgreSQL'],
        githubUrl: 'https://github.com/johndoe/task-manager',
        liveUrl: 'https://taskmanager-demo.netlify.app',
        images: [
          'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800'
        ],
        featured: true,
        order: 2
      },
      {
        title: 'Weather Dashboard',
        description: 'A responsive weather dashboard that displays current weather conditions and forecasts for multiple cities with beautiful visualizations.',
        techStack: ['JavaScript', 'Chart.js', 'OpenWeather API', 'CSS3'],
        githubUrl: 'https://github.com/johndoe/weather-dashboard',
        liveUrl: 'https://weather-dashboard-demo.github.io',
        images: [
          'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800'
        ],
        featured: false,
        order: 3
      }
    ];

    await Project.insertMany(projects);

    console.log('Seed data created successfully!');
    console.log('Admin credentials:');
    console.log('Email: gyasuddina265@gmail.com');
    console.log('Password: Gyasuddin@123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();