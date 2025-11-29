const Agent = require('../models/Agent');

// Get all agents
const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find({ active: true }).sort({ createdAt: -1 });
    res.json({ agents });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single agent
const getAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json({ agent });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create agent
const createAgent = async (req, res) => {
  try {
    const agent = new Agent(req.body);
    await agent.save();
    res.status(201).json({ message: 'Agent created successfully', agent });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Agent with this email already exists' });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

// Update agent
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
    res.json({ message: 'Agent updated successfully', agent });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete agent
const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllAgents,
  getAgent,
  createAgent,
  updateAgent,
  deleteAgent
};
