require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload')
const routes = require('./routes/index');
const cookieParser = require('cookie-parser');

app.use(express.static('assets'))
app.use(cookieParser());
app.use(express.json())
app.use(cors())
app.use(fileUpload());


app.use('/api/v1', routes);

app.get('/api/v1/cookies', async (req, res) => {
    console.log('Cookies', req.cookies)
    res.json({ cookies: req.cookies});
});

const PORT = 3000;

app.listen(3000, () => console.log(`Server running on port ${PORT}`));