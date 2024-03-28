# Role Controller

This module exports two functions: `createRole` and `getRoles`.

## `createRole(req, res)`

This asynchronous function creates a new role. It expects a request body with `role`, `permissions`, and `createdBy` fields.

1. It creates a new `RolePermission` with the provided details.
2. It saves the new `RolePermission` to the database.
3. It sends a 201 response with the saved `RolePermission` and a success message.
4. If an error occurs during this process, it logs the error and sends a 500 response with an 'Error creating role' message.

## `getRoles(req, res)`

This asynchronous function fetches all roles.

1. It finds all `RolePermission`s in the database.
2. It sends a response with the found `RolePermission`s.
3. If an error occurs during this process, it logs the error and sends a 500 response with an 'Internal server error' message.