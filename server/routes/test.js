import express from 'express';
import testmodel from '../models/testmodel.js'
import connection from '../db/database.js'

const router = express.Router();

router.route('/').get(async (req, res) => {
    let data = await testmodel.findById('632e568f9993c11487a057c4')
    res.send({ message: data.mykey});
});

export default router;