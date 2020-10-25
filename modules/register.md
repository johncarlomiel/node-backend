# Registration
| Key |  Value |
| --- | --- |
| Endpoint | `/users` |
| Method | `POST` |
| Validation | check if the username exists if so return a 422 (Unprocessable Entity) with message that username is already exists | 
| Description | this request will a new user on the database and the user password will be hashed using bcrypt beforehand. |

Body Payload Example
```json
{
  "username": "test",
  "password": "test123"
}
```

- More info for bcrypt:
  - [Security Stackexchange](https://security.stackexchange.com/questions/4781/do-any-security-experts-recommend-bcrypt-for-password-storage)
  - [Article](https://codahale.com/how-to-safely-store-a-password/)
<hr>


#### Install bcrypt `npm i bcryptjs`

#### Create the service
```javascript
const bcrypt = require('bcryptjs')
const pool = require('../configs/mysql-database')

const addUser = async (username, password) => { 
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return await pool.query('INSERT INTO users SET ?', { username, password: hashPassword });
};


module.exports = { 
    addUser
}
```

<hr>


#### Create the controller

```javascript
const userService = require('../services/user.service')

const registerController = (req, res) => {
    const { username, password } = req.body;
    try {
        await userService.addUser(username, password);
        res.json({ message: 'User registered'});
    } catch (error) {
        res.status(400).json({ error })
    }
};

module.exports = {
    registerController
}
```

<hr>

#### `auth.route.js`
```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Register
router.post('/users', authController.registerController);

// Login
router.post('/session', (req, res) => {});


module.exports = router;
```
