const userService = require('../services/user.service')
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET;

const registerController = async (req, res) => {
    const { username, password } = req.body;
    try {
        await userService.addUser(username, password);
        res.json({ message: 'User registered' });
    } catch (error) {
        res.status(400).json({ error })
    }
};

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
        console.log(error);
        res.status(403).json({ error });
    }
};

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

module.exports = {
    registerController,
    loginController,
    refreshTokenController
}