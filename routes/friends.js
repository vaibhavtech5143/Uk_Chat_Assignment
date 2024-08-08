const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

router.use(authMiddleware);  // Apply middleware to all routes in this file

// Send a friend request
router.post('/send', async (req, res) => {
  const { recipientId } = req.body;
  try {
    const sender = req.user;
    const recipient = await User.findById(recipientId);
    if (!recipient) return res.status(404).json({ message: 'Recipient not found' });

    sender.friendRequests.push(recipientId);
    await sender.save();
    res.status(200).json({ message: 'Friend request sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Respond to a friend request
router.post('/respond', async (req, res) => {
  const { requestId, action } = req.body;
  try {
    const user = req.user;
    if (action !== 'accept' && action !== 'reject') {
      return res.status(400).json({ message: 'Invalid action' });
    }

    const requester = await User.findById(requestId);
    if (!requester) return res.status(404).json({ message: 'Request not found' });

    if (action === 'accept') {
      user.friends.push(requestId);
      requester.friends.push(user._id);
      user.friendRequests.pull(requestId);
      await user.save();
      await requester.save();
      res.status(200).json({ message: 'Friend request accepted' });
    } else {
      user.friendRequests.pull(requestId);
      await user.save();
      res.status(200).json({ message: 'Friend request rejected' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
