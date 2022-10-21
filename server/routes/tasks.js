import express from 'express';
import { getTasks, postTasks, patchTasks, getDaily, postDaily } from '../controllers/tasks.js';

const router = express.Router();

router.route('/').get(getTasks);
router.route('/').post(postTasks);
router.route('/').patch(patchTasks);
router.route('/daily').get(getDaily);
router.route('/daily').post(postDaily);
// TODO:
router.route('/daily/date').get(getDaily);


export default router;