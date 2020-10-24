# Login

#### Install `npm i jsonwebtoken` for JWT implementation

<hr>

#### Install `npm install cookie-parser`
Use it on app middleware on entry file
```javascript
const cookieParser = require('cookie-parser');

app.use(cookieParser());
```

#### Create the service

```javascript
const checkUser = async (username, password) => {
    const [users, _] = await pool.query('SELECT userId, username, password FROM users WHERE username = ?', [username]);
    
    if (users.length === 0) {
        throw new Error('Username does not exists');
    }

    const user = users[0];

    const isPasswordMatched = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
        throw new Error('Password is not correct');
    }

    return { userId: user.userId, username };
};
```

<hr>


#### Create the controller
```javascript
const loginController = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userService.checkUser(username, password);

        const accessToken = jwt.sign({ ...user }, secretKey, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ ...user }, secretKey, { expiresIn: '7d' });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 86_400_000,
            httpOnly: true
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(403).json({ error });
    }
};
```

<hr>

#### Refresh token
```javascript
const refreshTokenController = (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        const decoded = jwt.verify(refreshToken, secretKey);

        const accessToken = jwt.sign({ userId: decoded.userId, username: decoded.username }, secretKey, { expiresIn: '1h' });

        res.json({ accessToken })

    } catch (error) {
        console.log(error);
        res.status(403).json({ error });
    }
};
```

<hr>

#### `auth.route.js`
```javascript
router.post('/session', authController.loginController);
```

<hr>
