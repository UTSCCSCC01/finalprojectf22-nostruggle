import express from 'express';
import { newNotification, getNotifications, markAsRead, hasNewNotifications } from '../controllers/notifications.js';

const router = express.Router();

router.route('/').get(getNotifications);
router.route('/').post(newNotification);
router.route('/read').post(markAsRead);
router.route('/new').get(hasNewNotifications);

export default router;