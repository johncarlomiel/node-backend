const bcrypt = require('bcryptjs')
const pool = require('../configs/mysql-database')

const addUser = async (username, password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return await pool.query('INSERT INTO users SET ?', { username, password: hashPassword });
};

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


module.exports = {
    addUser,
    checkUser
}