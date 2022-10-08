import express from 'express';
import { getOpenApi } from '../controllers/openApi.js';

const router = express.Router();

router.route('/').get(getOpenApi);

export default router;