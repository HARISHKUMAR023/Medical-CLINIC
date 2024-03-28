# Authentication Controller

This module exports three functions: `login`, `refreshToken`, and `generateJwtToken`.

## `login(req, res)`

This asynchronous function handles user login. It expects a request body with `name`, `email`, and `password` fields.

1. It first finds the user in the database using the provided email.
2. If the user is not found or the provided password does not match the user's password, it sends a 401 response with an 'Invalid username or password' message.
3. If the user does not have any roles assigned, it throws an 'User type not assigned' error.
4. It then finds the user's role details in the database using the user's role ID.
5. If the role details are not found, it throws a 'User type not found' error.
6. It generates a JWT token using the `generateJwtToken` function and the user's details.
7. It sends a response with the user's name, email, token, and role details.

## `refreshToken(req, res)`

This asynchronous function handles refreshing the JWT token. It expects a request body with a `refreshToken` field.

1. If the refresh token is not provided, it sends a 401 response with a 'Missing refresh token' message.
2. It verifies the refresh token using the JWT refresh secret.
3. If the decoded user ID does not match any user in the database, it sends a 401 response with an 'Invalid refresh token' message.
4. It generates a new access token using the `generateJwtToken` function and the user's details.
5. It sends a response with the new access token.

## `generateJwtToken(userId, name, email, roles)`

This function generates a JWT token.

1. It creates a payload with the user ID, name, email, and roles.
2. It signs the payload with the secret key and sets an expiration time of 1 hour.
3. It returns the signed JWT token.