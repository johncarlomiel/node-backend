# Environment variables

Install the `dotenv` package
```console
npm i dotenv
```

<hr>

Use the package in the entry file `server.js`
```javascript
require('dotenv').config()
```

Create the `.env` on the root directory
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=rest_api
DOMAIN_URL
```

Change the DB Connection
```javascript
const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```
