# Routes

routes folder will have 3 files

- routes
  - auth.route.js 
  - index.js 
  - post.route.js
  

#### `auth.route.js`
```javascript
const express = require('express');
const router = express.Router();

// Register
router.post('/users', (req, res) => {});

// Login
router.post('/session', (req, res) => {});


module.exports = router;

```

<hr>

#### `post.route.js`

```
const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {});

router.post('/', (req, res) => {});

router.patch('/:postId', (req, res) => {});

router.delete('/:postId', (req, res) => {});

module.exports = router;
```

<hr>

#### `index.js`
```javascript
const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const postRouter = require('./post.route');

router.use('/', authRouter);
router.use('/posts', postRouter);
 
module.exports = router;
```
