# Product Item Controller

This module exports two functions: `createProductitem` and `fetchProductitems`.

## `createProductitem(req, res)`

This asynchronous function creates a new product item. It expects a request body with `compositionName`, `type`, `brand`, and `manufacturer` fields.

1. It creates a new `Productitem` with the provided details.
2. It saves the new `Productitem` to the database.
3. It sends a 201 response with the saved `Productitem` and a success message.
4. If an error occurs during this process, it sends a 500 response with a 'Server Error' message.

## `fetchProductitems(req, res)`

This asynchronous function fetches all product items.

1. It finds all `Productitem`s in the database.
2. It sends a 200 response with the found `Productitem`s and a success message.
3. If an error occurs during this process, it sends a 500 response with a 'Server Error' message.