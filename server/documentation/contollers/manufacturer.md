# Manufacturer Controller

This module exports several functions related to managing manufacturers.

## `manufacturer(req, res)`

This asynchronous function creates a new manufacturer. It expects a request body with `name`, `hsltype`, and `createdBy` fields.

1. It handles file upload using Multer. The file is stored in 'uploads/manufacturerfile' directory and the filename is generated using UUID and the current date.
2. If an error occurs during file upload, it sends a 400 response with an error message.
3. It creates a new `Manufacturer` with the provided details and the filename of the uploaded file.
4. It saves the new `Manufacturer` to the database.
5. It sends a 201 response with a success message.
6. If an error occurs during this process, it sends a 500 response with an error message.

## `getAllmanufacturer(req, res)`

This asynchronous function fetches all manufacturers.

1. It finds all `Manufacturer`s in the database.
2. It sends a 200 response with the found `Manufacturer`s.
3. If an error occurs during this process, it sends a 500 response with an error message.

## `deletemanufacturer(req, res)`

This asynchronous function deletes a manufacturer by ID.

1. It finds a `Manufacturer` by ID and deletes it.
2. If the `Manufacturer` is not found, it sends a 404 response with an error message.
3. It sends a 200 response with a success message and the deleted `Manufacturer`.
4. If an error occurs during this process, it sends a 500 response with an error message.

## `updateManufacturer(req, res)`

This asynchronous function updates a manufacturer by ID. It expects a request body with the updated details.

1. It finds a `Manufacturer` by ID and updates it with the provided details.
2. If the `Manufacturer` is not found, it sends a 404 response with an error message.
3. It sends a 200 response with the updated `Manufacturer` and a success message.
4. If an error occurs during this process, it sends a 500 response with an error message.

## `togglemanufacturer(req, res)`

This asynchronous function toggles the active status of a manufacturer by ID.

1. It finds a `Manufacturer` by ID.
2. If the `Manufacturer` is not found, it sends a 404 response with an error message.
3. It toggles the `active` field of the `Manufacturer`.
4. It saves the updated `Manufacturer`.
5. It sends a 200 response with a success message and the updated `Manufacturer`.
6. If an error occurs during this process, it sends a 500 response with an error message.