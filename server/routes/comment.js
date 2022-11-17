import express from 'express';
import { postComment } from '../controllers/comment';


const router = express.router();

router.route('/post').post(postComment);

export default router;