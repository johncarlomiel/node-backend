# REST API Example


## Outline
- Installation
- Database Creation
- Server setup
- Development
- Deployment

## Tools
- NodeJS
- Postman
- Mysql
- Mysql Workbench
- VSCode

### Topics

#### Authentication (JWT and cookies)

##### Registration Specification
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

##### Login Specification
| Key |  Value |
| --- | --- |
| Endpoint | `/session` |
| Method | `POST` |
| Description | this request will check if the username and password match a user in the database and returns a `accessToken` and save the `refreshToken` on `httpOnly` cookies |

Body Payload Example
```json
{
  "username": "test",
  "password": "test123"
}
```

<hr>

#### CRUD (Create, Read, Update, Delete) Resources

##### Create Specification
| Key |  Value |
| --- | --- |
| Endpoint | `/posts` |
| Method | `POST` |
| Headers | token |
| Description | This endpoint will create a new `post` |

FormData Example
```
{
  "content": "This is a post content",
  "file": File
}
```

<hr>

##### Read

| Key |  Value |
| --- | --- |
| Endpoint | `/posts` |
| Method | `GET` |
| Description | This endpoint return the posts |

Sample Return
```json
{
  "posts": [
    {"content": "Test Content", "file": "{FILE_URL}"},
    {"content": "Test Content 2", "file": ""}
  ]
}
```

- Fetch a post on the database
- Prepend the domain if media is available
- Return a JSON formatted response on the request


##### Update

| Key |  Value |
| --- | --- |
| Endpoint | `/posts/:postId` |
| Method | `PATCH` |
| Headers | token |
| Validation | checks if the user in the token owns the resource | 
| Description | This endpoint can update a content and the media |

FormData Example
```
{
  "content": "This is a post content",
  "file": File
}
```

##### Delete

| Key |  Value |
| --- | --- |
| Endpoint | `/posts/:postId` |
| Method | `DELETE` |
| Headers | token |
| Validation | checks if the user in the token owns the resource | 
| Description | This endpoint delete a post |


#### Comments on code (JSDoc and Swagger)
#### Validation (Joi)
#### Mysql Connection with promise





