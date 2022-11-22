import express from 'express';
import { getComments, postComment } from '../controllers/comment.js';


const router = express.Router();

router.route('/post').post(postComment);

router.route('/get/:answerId').get(getComments);

export default router;