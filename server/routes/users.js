import express from 'express';
import { getUser, postUser, getUserByUsername, getAboutMe, putAboutMe } from '../controllers/users.js';

const router = express.Router();

router.route('/get/:username/:password').get(getUser);
router.route('/username/:username').get(getUserByUsername);
router.route('/post').post(postUser);
router.route('/aboutme/:username').get(getAboutMe);
router.route('/aboutme/:username').put(putAboutMe);


export default router;