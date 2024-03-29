# Supplier Controller

This module exports several functions related to managing suppliers.

## `createSupplier(req, res)`

This asynchronous function creates a new supplier. It expects a request body with `agencyContactName`, `contactMailId`, `contactPhoneNumber`, `contactAddress`, `country`, `state`, `city`, and `pincode` fields.

1. It validates the `contactMailId` and `contactPhoneNumber` fields using the `validator` library.
2. If the validation fails, it sends a 400 response with an error message.
3. It creates a new `Supplier` with the provided details.
4. It saves the new `Supplier` to the database.
5. It sends a 201 response with the saved `Supplier` and a success message.
6. If an error occurs during this process, it sends a 500 response with an error message.

## `getAllSuppliers(req, res)`

This asynchronous function fetches all suppliers.

1. It finds all `Supplier`s in the database.
2. It sends a response with the found `Supplier`s.
3. If an error occurs during this process, it logs the error and sends a 500 response with an error message.

## `updateSupplier(req, res)`

This asynchronous function updates a supplier by ID. It expects a request body with the updated details.

1. It finds a `Supplier` by ID and updates it with the provided details.
2. If the `Supplier` is not found, it sends a 404 response with an error message.
3. It sends a 200 response with the updated `Supplier` and a success message.
4. If an error occurs during this process, it sends a 500 response with an error message.

## `deleteSupplier(req, res)`

This asynchronous function deletes a supplier by ID.

1. It finds a `Supplier` by ID and deletes it.
2. If the `Supplier` is not found, it sends a 404 response with an error message.
3. It sends a 200 response with a success message.
4. If an error occurs during this process, it sends a 500 response with an error message.