import express from 'express';
import { getUser, postUser } from '../controllers/users.js';

const router = express.Router();

router.route('/get/:username/:password').get(getUser);
router.route('/post').post(postUser);

export default router;