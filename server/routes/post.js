import express from 'express'
import { createPost, getPost, deletePost, patchPost, } from '../controllers/createPost.js';
import {getPostById} from '../controllers/answer.js'
const router = express.Router();

router.route('/post').post(createPost);

router.route('/get').get(getPost);

router.route('/:postId').get(getPostById);

router.route('/').patch(patchPost);

router.route('/').delete(patchPost);


export default router;