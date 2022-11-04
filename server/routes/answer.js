import express from 'express';
import { postAnswer } from '../controllers/answer.js';

const router = express.Router();

router.route('/post').post(postAnswer);

export default router;