# Create Post

| Key |  Value |
| --- | --- |
| Endpoint | `/posts` |
| Method | `POST` |
| Headers | `token` |
| Description | This endpoint will create a new `post` |

FormData Example
```
{
  "content": "This is a post content",
  "file": File
}
```

<hr>

#### Serving static files

- Create a `assets/images` folder

- Serve the static folder to all request by adding new middleware on app

```javascript
app.use(express.static('assets'))
```


<hr>

#### Create a middleware that verifies the token on `middlewares/verify.js`
```javascript
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    const secretKey = process.env.JWT_SECRET;
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Unauthorized Request'});
    }
};

module.exports = verifyToken;
```

Create a new controller file `post.controller.js`
```javascript
const postService = require('../services/post.service');

const createPostController = async (req, res) => {
    const content = req.body.content;
    const user = req.user;
    const DOMAIN_URL = process.env.DOMAIN_URL;
    let fileName = '';

    if (req.files && req.files.file) {
        const media = req.files.file;
        const fileExtention = media.mimetype.split('/')[1];
        fileName = `${new Date().toLocaleDateString().replace(/\//g, '-')}.${fileExtention}`;
        media.mv(`assets/images/${fileName}`);
    }

    try {
        const postId = await postService.createPost(content, fileName, user.userId);
        const file = fileName ? `${DOMAIN_URL}/assets/images/${fileName}` : '';
        res.json({ postId, file, content, user: { id: user.userId, username: user.username } });
    } catch (error) {
        res.status(400).json({ error });
    }
};



module.exports = {
    createPostController
};
```

Create a new service file `post.service.js`
```javascript
const pool = require('../configs/mysql-database');

const createPost = async (content, fileName, createdBy) => {
    let body = { userId: createdBy };

    if (content) body.content = content;

    if (fileName) body.filePath = fileName;

    const [post] = await pool.query('INSERT INTO posts SET ?', body);

    return post.insertId;
};

module.exports = {
    createPost
}
```

#### Create a new policy to validate the request input `policies/post.policy.js`

```javascript
const createPostPolicy = (req, res, next) => {
    const isContentExists = req.body.content;
    const isFileExists = req.files && req.files.file;

    if(!isContentExists && !isFileExists) {
        res.status(422).json({ message: 'You need to enter either content or file or both'})
    }

    next();
};


module.exports = {
    createPostPolicy
}
```
<hr>

#### Change the create post route on `routes/post.route.js`

- Import the `postPolicy` and `verifyToken`
  ```javascript
  const verifyToken = require('../middlewares/verify');
  const postPolicy = require('../policies/post.policy')
  ```

- Update the route
  ```javascript
  router.post('/', verifyToken, postPolicy.createPostPolicy, postController.createPostController);
  ```



