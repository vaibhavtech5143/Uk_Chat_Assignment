const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Post = require('../models/Post');
const User = require('../models/User');
const { createPostSchema, commentSchema } = require('../middleware/validate');

router.use(authMiddleware);  // Apply middleware to all routes in this file

// Create a post  -> !Post
router.post('/create', async (req, res) => {
  try {
    const { content } = createPostSchema.parse(req.body);
    const user = req.user;
    const post = new Post({ author: user._id, content });
    await post.save();
    user.posts.push(post._id);
    await user.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.errors });
  }
});

// Comment on a post
router.post('/comment', async (req, res) => {
  try {
    const { postId, text } = commentSchema.parse(req.body);
    const user = req.user;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ commenter: user._id, text });
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.errors });
  }
});

// Get user feed
router.get('/feed', async (req, res) => {
  try {
    const user = req.user;
    const friends = user.friends;
    const posts = await Post.find({ author: { $in: friends } })
      .populate('author', 'username')
      .populate('comments.commenter', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Explore posts
router.get('/explore', async (req, res) => {
  try {
    const user = req.user;
    const friends = user.friends;
    const posts = await Post.find({
      $or: [
        { author: { $in: friends } },
        { 'comments.commenter': { $in: friends } }
      ]
    })
      .populate('author', 'username')
      .populate('comments.commenter', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
