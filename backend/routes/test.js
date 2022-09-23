import express from 'express';

const router = express.Router();

router.route('/').get((req, res) => {
    res.send('You should see this message if you are at localhost:5000/test');
});

export default router;