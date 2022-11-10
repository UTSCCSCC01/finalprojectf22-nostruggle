import express from 'express';
import { postAnswer } from '../controllers/answer.js';
import { getPostById } from '../controllers/answer.js';

const router = express.Router();

router.route('/post').post(postAnswer);

router.route('/:postId').get(getPostById);

export default router;
