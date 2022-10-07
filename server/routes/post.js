import express from 'express'
import { createPost } from '../controllers/createPost.js';

const router = express.Router();

router.route('/post').post(createPost);

export default router;