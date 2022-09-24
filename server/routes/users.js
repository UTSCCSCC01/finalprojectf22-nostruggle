import express from 'express';
import { getUsers, postUser } from '../controllers/users.js';

const router = express.Router();

router.route('/get').get(getUsers);
router.route('/post').post(postUser);

export default router;