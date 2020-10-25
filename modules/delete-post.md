# Delete Post

| Key |  Value |
| --- | --- |
| Endpoint | `/posts/:postId` |
| Method | `DELETE` |
| Headers | token |
| Validation | checks if the user in the token owns the resource | 
| Description | This endpoint delete a post |


#### Create the controller
```javascript
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
```

#### Update the exports of the controller
```javascript
module.exports = {
    createPostController,
    readPostsController,
    updatePostController,
    deletePostController
};
```

#### Create the service
```javascript
const deletePostById = async (postId) => {
    const query = 'DELETE FROM posts WHERE postId = ?';
    return await pool.query(query, postId);
};
```

#### Update the exports of the service
```javascript
module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePostById,
    deletePostById
}
```

#### Update the delete route on `post.route.js`
```javascript
router.delete('/:postId', verifyToken, postController.deletePostController);
```
