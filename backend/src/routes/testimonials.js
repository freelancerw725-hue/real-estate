const express = require('express');
const {
  getAllTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getAllTestimonialsAdmin
} = require('../controllers/testimonialController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all approved testimonials (public)
router.get('/', getAllTestimonials);

// Get single testimonial (public)
router.get('/:id', getTestimonial);

// Create testimonial (public - for user submissions)
router.post('/', createTestimonial);

// Get all testimonials (admin - including unapproved)
router.get('/admin/all', authenticateToken, requireAdmin, getAllTestimonialsAdmin);

// Update testimonial (admin only)
router.put('/:id', authenticateToken, requireAdmin, updateTestimonial);

// Delete testimonial (admin only)
router.delete('/:id', authenticateToken, requireAdmin, deleteTestimonial);

module.exports = router;
