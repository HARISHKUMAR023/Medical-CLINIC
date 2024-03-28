# Purchase Controller

This module exports several functions related to managing purchases.

## `createPurchase(req, res)`

This asynchronous function creates a new purchase and updates or creates new product items and stocks. It expects a request body with `supplier`, `purchaseDate`, `products`, `invoiceNumber`, and `paymentstatus` fields.

1. It starts a new session and transaction.
2. For each product in the `products` array, it checks if a `Productitem` with matching `compositionName` and `manufacturer` exists.
3. If no matching `Productitem` exists, it creates a new one.
4. It then checks if a `Stock` with matching `productitem` and `expiryDate` exists.
5. If a matching `Stock` exists, it updates the existing stock's quantity, MRP, costPrice, sellPrice, and expiryDate.
6. If no matching `Stock` exists, it creates a new one.
7. It creates a new `Purchase` with the provided details and the IDs of the created or updated `Productitem`s.
8. It commits the transaction and sends a 201 response with a success message and the created `Purchase` and `Productitem` IDs.

## `getStocks(req, res)`

This asynchronous function fetches all stocks. It populates the `productitem` field of each stock.

## `getAllPurchases(req, res)`

This asynchronous function fetches all purchases. It populates the `supplier` and `products.productitem` fields of each purchase.

## `getPurchaseById(req, res)`

This asynchronous function fetches a single purchase by ID. It populates the `supplier` and `products` fields of the purchase.

## `updatePurchaseById(req, res)`

This asynchronous function updates a purchase by ID. It sends the updated purchase in the response.

## `deletePurchaseById(req, res)`

This asynchronous function deletes a purchase by ID. It sends a success message in the response.

## `getPurchasesBySupplier(req, res)`

This asynchronous function fetches all purchases for a specific supplier. It populates the `supplier` and `products.productitem` fields of each purchase. If no purchases are found for the supplier, it sends a 404 response with a 'No purchases found for this supplier' message.