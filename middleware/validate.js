const { z } = require('zod');

const registerSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const createPostSchema = z.object({
  content: z.string().min(1),
});

const commentSchema = z.object({
  postId: z.string().length(24),
  text: z.string().min(1),
});

module.exports = {
  registerSchema,
  loginSchema,
  createPostSchema,
  commentSchema,
};
