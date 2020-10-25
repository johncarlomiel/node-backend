# Update Post

| Key |  Value |
| --- | --- |
| Endpoint | `/posts/:postId` |
| Method | `PATCH` |
| Headers | token |
| Validation | checks if the user in the token owns the resource | 
| Description | This endpoint can update a content and the media |

FormData Example
```
{
  "content": "This is a post content",
  "file": File
}
```

#### Create the controller

```javascript
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
```

<hr>

#### Update the exports of `post.controller.js`
```javascript
module.exports = {
    createPostController,
    readPostsController,
    updatePostController
};
```


#### Create the service
```javascript
const updatePostById = async (content, fileName, postId, updatedBy) => {

    const fields = ['updatedBy = ?'];
    const params = [updatedBy];

    if (content) { 
        fields.push('content = ?');
        params.push(content);
    };

    if (fileName) { 
        fields.push('filePath = ?');
        params.push(fileName);
    };

    // Add Post Id
    params.push(postId);

    const [post] = await pool.query(`UPDATE posts SET ${fields.join(',')} WHERE postId = ?`, params);

    return post;
};
```

#### Update the service exports
```javascript
module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePostById
}
```

#### Update the patch route
```javascript
router.patch('/:postId', verifyToken, postController.updatePostController);
```
