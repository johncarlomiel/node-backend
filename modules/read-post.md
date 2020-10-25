# Read Post


| Key |  Value |
| --- | --- |
| Endpoint | `/posts` |
| Method | `GET` |
| Description | This endpoint return the posts |

Sample Return
```json
{
  "posts": [
    {"content": "Test Content", "file": "{FILE_URL}"},
    {"content": "Test Content 2", "file": ""}
  ]
}
```

- Fetch a post on the database
- Prepend the domain if media is available
- Return a JSON formatted response on the request


#### Create the controller
```javascript
  const readPostsController = async (req, res) => {
    const { cursor, limit } = req.query;
    try {
        const posts = await postService.getPosts(cursor, limit);
        res.json(posts);
    } catch (error) {
        res.status(400).json({ error })
    }
};
```


#### export the controller
```javascript
module.exports = {
    createPostController,
    readPostsController
};
```

#### Create the service
```javascript
const getPosts = async (cursor, limit) => {
    const params = [];
    let query = `SELECT postId, content, filePath, username FROM posts INNER JOIN users ON posts.userId = users.userId`;

    if (cursor) {
        query += ' WHERE postId < ?'
        params.push(cursor);
    }

    query += ' ORDER BY postId DESC LIMIT ?';
    params.push(Number(limit));

    const [posts] = await pool.query(query, params);

    if (posts.length > 0) {
        return { posts, cursor: posts[posts.length - 1].postId }
    }

    return { posts, cursor: 0 };
};
```

#### Export the service
```javascript
module.exports = {
    createPost,
    getPosts
}
```

#### Change the route of read posts on `routes/post.route.js`
```javascript
router.get('/', postController.readPostsController)
```
