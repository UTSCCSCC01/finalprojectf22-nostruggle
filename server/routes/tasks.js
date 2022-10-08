import express from 'express';
import { getTasks, postTasks, patchTasks } from '../controllers/tasks.js';

const router = express.Router();

router.route('/').get(getTasks);
router.route('/').post(postTasks);
router.route('/').patch(patchTasks);

export default router;