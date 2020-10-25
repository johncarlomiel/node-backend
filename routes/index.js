const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const postRouter = require('./post.route');

router.use('/', authRouter);
router.use('/posts', postRouter);
 
module.exports = router;
