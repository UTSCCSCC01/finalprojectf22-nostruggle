import express from 'express';
import { getAnswers, postAnswer } from '../controllers/answer.js';
import { getPostById } from '../controllers/answer.js';

const router = express.Router();

router.route('/post').post(postAnswer);

router.route('/:postId').get(getPostById);

router.route('/answers/:postId').get(getAnswers);

export default router;
