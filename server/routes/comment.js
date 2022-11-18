import express from 'express';
import { postComment } from '../controllers/comment.js';


const router = express.Router();

router.route('/post').post(postComment);

export default router;