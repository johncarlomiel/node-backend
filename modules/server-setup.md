# Server Setup


#### Create a new `nodeJS` project
  - Create a new folder
  - Type the command below to create a new project and it will prompt some questions regarding the project
    ```console
      npm init
    ```
    
<hr>
<br>

#### Install `nodemon` to automatically restart the node application when file changes in the directory are detected
  ```console
  npm install -g nodemon
  ```
  After the installation it will produce a folder named `node_modules` that contains the packages source code and `package-lock.json` that contains the exact version of your dependencies
  
<hr>
<br>

#### Add a new command on `scripts` property of the package.json for nodemon
  ```json
  "dev": "nodemon server.js"
  ```

<hr>
<br>

#### Create the entry JS file of the server it must be same with the `main` property in package.json
  ```console
  touch server.js
  ```

<hr>
<br>

#### Install express for our web framework to quickly start building a RestAPI without much boilerplates
  ```console
  npm i express
  ```

  Minimal Setup on express
  ```javascript
  
  const express = require('express')
  const app = express()

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.listen(3000)
  ```
  
<hr>
<br>
  
#### Use the `express.json()` middleware from `express` to parse json body
  ```javascript
  app.use(express.json())
  ```

  Install `cors` package to allow other origin to access the endpoints through scripts API like `XMLHttpRequest` and the `Fetch API`
  ```console
  npm install cors
  ```
  
  require the package to use the middleware
  ```javascript
  const cors = require('cors')
  ```
  
  use the middleware on app
  ```javascript
  app.use(cors())
  ```
  
<hr>
<br>

#### Install `express-fileupload` package to get the middleware that setups fileupload and store all of the files on request to the `req.files` property of request

  ```console
  npm i express-fileupload
  ```
  
  require the package to use the middleware
  ```javascript
  const fileUpload = require('express-fileupload')
  ```
  
  Use the middleware on app
  ```javascript
  app.use(fileUpload());
  ```
  
  

  

