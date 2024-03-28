# Billing Controller

This module exports two functions: `createBill` and `getBills`.

## `createBill(req, res)`

This asynchronous function creates a new bill and updates the stock of the products in the bill. It expects a request body with the details of the bill.

1. It creates a new `Billing` with the provided details.
2. It saves the new `Billing` to the database.
3. For each product in the bill, it finds the corresponding `Stock` and reduces its quantity by the quantity of the product in the bill.
4. If the `Stock` is not found or its quantity is less than the quantity of the product in the bill, it throws an error.
5. It saves the updated `Stock`.
6. It sends a 201 response with the saved `Billing` and a success message.
7. If an error occurs during this process, it logs the error and sends a 500 response with an error message.

## `getBills(req, res)`

This asynchronous function fetches all bills.

1. It finds all `Billing`s in the database and populates the `products.product` field of each `Billing`.
2. It sends a 200 response with the found `Billing`s.
3. If an error occurs during this process, it sends a 500 response with an error message.