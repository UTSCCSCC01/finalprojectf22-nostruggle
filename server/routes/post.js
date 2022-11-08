import express from 'express'
import { createPost, getPost, deletePost, patchPost } from '../controllers/createPost.js';

const router = express.Router();

router.route('/post').post(createPost);

router.route('/get').get(getPost);

router.route('/').patch(patchPost);

router.route('/').delete(patchPost);


export default router;