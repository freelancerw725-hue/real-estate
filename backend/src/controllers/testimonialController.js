const Testimonial = require('../../models/Testimonial');

// Get all approved testimonials (public)
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
    res.json({ testimonials });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all testimonials (admin - including unapproved)
const getAllTestimonialsAdmin = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ testimonials });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single testimonial
const getTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ testimonial });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create testimonial (public submission)
const createTestimonial = async (req, res) => {
  try {
    const testimonial = new Testimonial({
      ...req.body,
      approved: false // New testimonials need admin approval
    });
    await testimonial.save();
    res.status(201).json({
      message: 'Testimonial submitted successfully. It will be reviewed by our team.',
      testimonial
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update testimonial (admin only)
const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial updated successfully', testimonial });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete testimonial (admin only)
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllTestimonials,
  getAllTestimonialsAdmin,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
