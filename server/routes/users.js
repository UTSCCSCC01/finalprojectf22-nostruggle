import express from 'express';
import { getUser, postUser, getUserByUsername } from '../controllers/users.js';

const router = express.Router();

router.route('/get/:username/:password').get(getUser);
router.route('/username/:username').get(getUserByUsername);
router.route('/post').post(postUser);

export default router;