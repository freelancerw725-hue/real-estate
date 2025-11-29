const express = require('express');
const Agent = require('../../models/Agent');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all agents (public)
router.get('/', async (req, res) => {
  try {
    const agents = await Agent.find({ active: true }).sort({ createdAt: -1 });
    res.json({ agents });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single agent (public)
router.get('/:id', async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json({ agent });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create agent (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
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
});

// Update agent (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
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
});

// Delete agent (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
