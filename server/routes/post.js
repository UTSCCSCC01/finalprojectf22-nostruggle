import express from 'express'
import { createPost, getPost } from '../controllers/createPost.js';

const router = express.Router();

router.route('/post').post(createPost);

router.route('/get').get(getPost);

export default router;