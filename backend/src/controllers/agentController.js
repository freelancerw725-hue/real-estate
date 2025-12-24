const Agent = require('../models/Agent');

// ===============================
// GET ALL AGENTS
// ===============================
const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find({ active: true }).sort({ createdAt: -1 });
    res.status(200).json({ agents });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch agents',
      error: error.message
    });
  }
};

// ===============================
// GET SINGLE AGENT
// ===============================
const getAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.status(200).json({ agent });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch agent',
      error: error.message
    });
  }
};

// ===============================
// CREATE AGENT (UPDATED & SAFE)
// ===============================
const createAgent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      image,
      experience,
      bio,
      specialties,
      facebook,
      instagram,
      twitter
    } = req.body;

    // 🔴 REQUIRED FIELD CHECK (MODEL MATCH)
    if (!name || !email || !phone || !image || experience === undefined) {
      return res.status(400).json({
        message: 'Name, email, phone, image and experience are required'
      });
    }

    // 🔁 DUPLICATE EMAIL CHECK
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({
        message: 'Agent with this email already exists'
      });
    }

    // ✅ CREATE AGENT
    const agent = await Agent.create({
      name,
      email,
      phone,
      image,
      experience,
      bio,
      specialties,
      facebook,
      instagram,
      twitter,
      active: true
    });

    res.status(201).json({
      message: 'Agent created successfully',
      agent
    });

  } catch (error) {
    console.error('❌ Create Agent Error:', error);

    res.status(500).json({
      message: 'Error saving agent',
      error: error.message
    });
  }
};

// ===============================
// UPDATE AGENT
// ===============================
const updateAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.status(200).json({
      message: 'Agent updated successfully',
      agent
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update agent',
      error: error.message
    });
  }
};

// ===============================
// DELETE AGENT
// ===============================
const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.status(200).json({
      message: 'Agent deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete agent',
      error: error.message
    });
  }
};

module.exports = {
  getAllAgents,
  getAgent,
  createAgent,
  updateAgent,
  deleteAgent
};
