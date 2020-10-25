const postService = require('../services/post.service');
const { deleteFile } = require('../util');

const createPostController = async (req, res) => {
    let fileName = '';
    const content = req.body.content;
    const user = req.user;
    const DOMAIN_URL = process.env.DOMAIN_URL;

    if (req.files && req.files.file) {
        const media = req.files.file;
        const fileExtention = media.mimetype.split('/')[1];
        fileName = `${new Date().getTime()}.${fileExtention}`;
        media.mv(`assets/images/${fileName}`);
    }

    try {
        const postId = await postService.createPost(content, fileName, user.userId);
        const file = fileName ? `${DOMAIN_URL}/assets/images/${fileName}` : '';
        res.json({
            postId,
            file,
            content,
            user: { id: user.userId, username: user.username }
        });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const readPostsController = async (req, res) => {
    const { cursor, limit } = req.query;
    try {
        const posts = await postService.getPosts(cursor, limit);
        res.json(posts);
    } catch (error) {
        res.status(400).json({ error })
    }
};

const updatePostController = async (req, res) => {
    try {
        let fileName = '';
        const postId = req.params.postId;
        const post = await postService.getPostById(postId);
        const content = req.body.content;
        const user = req.user;
        const DOMAIN_URL = process.env.DOMAIN_URL;

        if (req.files && req.files.file) {
            const media = req.files.file;
            const fileExtention = media.mimetype.split('/')[1];
            fileName = `${new Date().getTime()}.${fileExtention}`;
            media.mv(`assets/images/${fileName}`);

            // Delete the previous file if exists
            if (post.filePath) {
                await deleteFile(`assets/images/${post.filePath}`);
            }
        }

        await postService.updatePostById(content, fileName, postId, user.userId);
        const file = fileName ? `${DOMAIN_URL}/assets/images/${fileName}` : '';
        res.json({
            content,
            file,
            postId,
            user: { id: user.userId, username: user.username }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};

const deletePostController = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await postService.getPostById(postId);

        // Delete the file if exists
        if (post.filePath) {
            await deleteFile(`assets/images/${post.filePath}`);
        }

        await postService.deletePostById(postId);
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports = {
    createPostController,
    readPostsController,
    updatePostController,
    deletePostController
};