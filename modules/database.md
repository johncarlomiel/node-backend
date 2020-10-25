# Database Setup

#### Create a schema
  ```sql
  CREATE SCHEMA `rest_api`;
  ```


<hr>

#### Create `Users` Table

  ```sql
  CREATE TABLE `users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` MEDIUMTEXT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));
  ```

<hr>

#### Create `Posts` table that has a foreign key to `userId` on `Users` table

  ```sql
  CREATE TABLE `posts` (
  `postId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `content` TEXT NULL,
  `filePath` TEXT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` INT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`postId`),
  INDEX `post_user_id_idx` (`userId` ASC),
  INDEX `post_updated_by_id_idx` (`updatedBy` ASC),
  CONSTRAINT `post_user_id`
    FOREIGN KEY (`userId`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `post_updated_by_id`
    FOREIGN KEY (`updatedBy`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
  ```
  
<hr>

#### Install Mysql
  ```console
  npm i mysql2
  ```
  
  Create `mysql-database.js` that contains the exported mysql pool connection
  ```javascript
  const mysql = require('mysql2');

  // Create the connection pool. The pool-specific settings are the defaults
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'rest_api',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  module.exports = pool.promise();
  ```
