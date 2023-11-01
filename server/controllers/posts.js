import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const { page } = req.query;
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;

    const totalPosts = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      posts: posts,
      currentPage: Number(page),
      totalPages: Math.ceil(totalPosts / LIMIT),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date() });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: 'Failed to create a post', error: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch the post', error: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  await PostMessage.findByIdAndRemove(id);
  res.status(200).json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    res.status(401).json({ message: 'Unauthenticated' });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((likeId) => likeId === req.userId);

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((likeId) => likeId !== req.userId);
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.status(200).json(updatedPost);
};

export default router;
