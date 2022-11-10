import express from 'express'
import { createPost, getPost, } from '../controllers/createPost.js';
import {getPostById} from '../controllers/answer.js'
const router = express.Router();

router.route('/post').post(createPost);

router.route('/get').get(getPost);

router.route('/:postId').get(getPostById);

export default router;