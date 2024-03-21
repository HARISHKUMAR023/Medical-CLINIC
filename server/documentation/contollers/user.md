# User Controller

This module exports three functions: `register`, `getuserdata`, and `deleteUser`.

## Dependencies

- `User`: The User model.
- `bcrypt`: A library to hash passwords.
- `RolePermission`: The RolePermission model.
- `multer`: Middleware for handling `multipart/form-data`, which is primarily used for uploading files.
- `path`: Node.js core module for handling and transforming file paths.
- `uuidv4`: A function to generate random UUIDs.

## Functions

### `register(req, res)`

This asynchronous function handles user registration. It first uploads a profile picture if provided, then validates the request body, checks if the email already exists, hashes the password, checks if the default user role exists (and creates it if it doesn't), and finally creates a new user with the provided data.

**Parameters:**

- `req`: The request object. Expected to have `body` and `file` properties.
- `res`: The response object.

**Returns:**

A promise that resolves when the user is created successfully.

### `getuserdata(req, res)`

This asynchronous function fetches all users from the database.

**Parameters:**

- `req`: The request object.
- `res`: The response object.

**Returns:**

A promise that resolves with an array of users.

### `deleteUser(req, res)`

This asynchronous function deletes a user from the database.

**Parameters:**

- `req`: The request object. Expected to have a `params` property with a `userid` field.
- `res`: The response object.

**Returns:**

A promise that resolves when the user is deleted successfully.

## Exports

The module exports an object with three properties: `register`, `getuserdata`, and `deleteUser`. Each property is a function described above.