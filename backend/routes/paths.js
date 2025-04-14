const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Resource = require('../models/resource');

router.post('/generate', async (req, res) => {
  try {
    const { userId, interests, skills } = req.body;
    // Fetch user data
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Filter resources by interests and prerequisites
    const resources = await Resource.find({
      $and: [
        { interests: { $in: user.interests } },
        {
          prerequisites: {
            $all: user.skills.map(skill => ({ $regex: new RegExp(`^${skill.split(':')[0]}:`) }))
          }
        }
      ]
    });

    // Sort by difficulty
    resources.sort((a, b) => {
      const order = ['beginner', 'intermediate', 'advanced'];
      return order.indexOf(a.difficulty) - order.indexOf(b.difficulty);
    });

    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;