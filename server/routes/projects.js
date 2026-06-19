const express = require('express');
const { body } = require('express-validator');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const auth = require('../middleware/auth');

const router = express.Router();

const projectValidation = [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
  body('techStack').isArray({ min: 1 }).withMessage('At least one technology is required'),
  body('githubUrl').isURL().withMessage('Valid GitHub URL is required')
];

router.route('/')
  .get(getProjects)
  .post(auth, projectValidation, createProject);

router.route('/:id')
  .get(getProject)
  .put(auth, projectValidation, updateProject)
  .delete(auth, deleteProject);

module.exports = router;