import express from 'express';

import { getPosts, createPost, getPost, updatePost, deletePost, likePost, getPostsBySearch } from '../controllers/posts.js';
import auth from "../middleware/auth.js";


//express.Router() : https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth,  createPost);
// "patch" is used to update available documents (Like is also a kind of updating)
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);


export default router;