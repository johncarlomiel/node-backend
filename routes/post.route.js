
const express = require('express')
const router = express.Router();
const postController = require('../controllers/post.controller');
const verifyToken = require('../middlewares/verify');
const postPolicy = require('../policies/post.policy')

router.get('/', postController.readPostsController);

router.post('/', verifyToken, postPolicy.createPostPolicy, postController.createPostController);

router.patch('/:postId', verifyToken, postController.updatePostController);

router.delete('/:postId', verifyToken, postController.deletePostController);

module.exports = router;