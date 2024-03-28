import  { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
const Billing = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Fetch products from the server
  const fetchProducts = async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/stock`;
    const response = await axios.get(url);
    setStocks(response.data.stocks);
    // console.log(response.data.stocks)
  };

  // Call fetchProducts when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // const handleAddToBill = (item, quantity) => {
  //   const existingProduct = selectedProducts.find(
  //     (selectedItem) => selectedItem.product._id === item._id
  //   );
  //   if (existingProduct) {
  //     setSelectedProducts(
  //       selectedProducts.map((selectedItem) =>
  //         selectedItem.product._id === item._id
  //           ? { ...selectedItem, quantity: selectedItem.quantity + quantity }
  //           : selectedItem
  //       )
  //     );
  //   } else {
  //     setSelectedProducts([
  //       ...selectedProducts,
  //       { product: { ...item }, quantity, sellingPrice: item.sellPrice }, // Change sellPrice.sellPrice to item.sellPrice
  //     ]);
  //   }
  // };
  const handleAddToBill = (item, quantity) => {
    const existingProduct = selectedProducts.find(
      (selectedItem) =>
        selectedItem.product._id === item._id &&
        selectedItem.product.expiryDate === item.expiryDate &&
        selectedItem.sellingPrice === item.sellPrice
    );
    if (existingProduct) {
      setSelectedProducts(
        selectedProducts.map((selectedItem) =>
          selectedItem.product._id === item._id &&
          selectedItem.product.expiryDate === item.expiryDate &&
          selectedItem.sellingPrice === item.sellPrice
            ? { ...selectedItem, quantity: selectedItem.quantity + quantity }
            : selectedItem
        )
      );
    } else {
      setSelectedProducts([
        ...selectedProducts,
        { product: { ...item }, quantity, sellingPrice: item.sellPrice },
      ]);
    }
  };

// Handle confirming the purchase
const handleConfirmPurchase = async () => {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/billing`;
    const response = await axios.post(url, {
      products: selectedProducts,
    });
    fetchProducts();
    toast.success(response.data.message);
  } catch (error) {
    console.error('Error confirming purchase:', error);
    toast.error(error.response.data.message)
  }
};

  // Handle increasing or decreasing the quantity of selected products
  // const handleQuantityChange = (product, quantityChange) => {
  //   setSelectedProducts(
  //     selectedProducts.map((item) =>
  //       item.product._id === product._id
  //         ? { ...item, quantity: item.quantity + quantityChange }
  //         : item
  //     )
  //   );
  // };
  const handleQuantityChange = (stock, quantityChange) => {
    setSelectedProducts(
      selectedProducts.map((item) =>
        item.product._id === stock.productitem._id &&
        new Date(item.product.expiryDate).getTime() === new Date(stock.expiryDate).getTime() &&
        parseFloat(item.sellingPrice.toFixed(2)) === parseFloat(stock.sellPrice.toFixed(2))
          ? { ...item, quantity: item.quantity + quantityChange }
          : item
      )
    );
  };

  // Handle removing a product from the bill
  const handleRemoveFromBill = (index) => {
    const updatedSelectedProducts = [...selectedProducts];
    updatedSelectedProducts.splice(index, 1);
    setSelectedProducts(updatedSelectedProducts);
  };

  return (
    <div className="flex bg-white">
      {/* Product selection on the left */}
      <div className="">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Brand</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Expiry Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(stocks) &&
              stocks.map((stock) => (
                <tr key={stock._id}>
                  <td className="border px-4 py-2">
                    {stock.productitem.compositionName}
                  </td>
                  <td className="border px-4 py-2">
                    {stock.productitem.brand}
                  </td>
                  <td className="border px-4 py-2">{stock.productitem.type}</td>
               <td hidden>{stock.sellPrice}</td>
               <td hidden>{stock.MRP}</td>
                  <td className="border px-4 py-2">
                   {stock.quantity} {stock.quantity > 0 ? "Available" : "Out of stock"}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(stock.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 p-2 mr-2"
                      onClick={() => handleQuantityChange(stock, 1)}
                    >
                      +
                    </button>
                    <button
                      className="bg-green-500 p-2 ml-2"
                      onClick={() =>
                        handleQuantityChange(stock, -1)
                      }
                    >
                      -
                    </button>
                    <button
                      className="bg-blue-500 text-white p-2 ml-2"
                      onClick={() =>
                        handleAddToBill(
                          {
                            ...stock.productitem,
                            expiryDate: stock.expiryDate,
                            quantity: stock.quantity,
                            sellPrice:stock.sellPrice,
                          },
                          1
                        )
                      }
                    >
                      Add to bill
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Billing preview on the right */}
     {/* Billing preview on the right */}
<div className=" ">
  <h2>Billing Preview</h2>
  <table className="table-auto text-center">
    <thead>
      <tr>
        <th className="px-3 text-center">S.no</th>
        <th className="px-3 text-center">Name</th>
        <th className="px-3 text-center">Expiry Date</th>
        <th className="px-3 text-center">Type</th>
        <th className="px-3 text-center">Quantity</th>
        <th className="px-3 text-center">Rate</th>
        <th className="px-3 text-center">Total Price</th> {/* New column for total price */}
        <th className="px-3 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
  {selectedProducts.map(({ product, quantity, sellingPrice }, index) => {
  const expiryDate = product?.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : "N/A";
  

  //  // Check if quantity and sellingPrice are valid numbers
  //  if (typeof quantity !== 'number' || typeof sellPrice !== 'number' || isNaN(quantity) || isNaN(sellPrice)) {
  //   console.error(`Invalid quantity or sellingPrice for product ${product.compositionName}`);
  //   return null; // Skip rendering this row
  // }



  // // Check if totalPrice is NaN
  // if (isNaN(totalPrice)) {
  //   console.error(`Total price is NaN for product ${product.compositionName}`);
  //   return null; // Skip rendering this row
  // }
   
   
    const totalPrice = quantity * sellingPrice;

    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{product?.compositionName}</td>
        <td>{expiryDate}</td>
        <td>{product?.type}</td>
        <td>{quantity}</td>
        <td>{sellingPrice}</td>
        <td>{totalPrice}</td>
        <td>
          <button className="bg-red-500 p-2" onClick={() => handleRemoveFromBill(index)}>Remove</button>
        </td>
      </tr>
    );
  })}
</tbody>

  </table>

  <button
    className="bg-blue-500 text-white p-2 mt-2"
    onClick={handleConfirmPurchase}
  >
    Confirm purchase
  </button>
</div>
    </div>
  );
};

export default Billing;
