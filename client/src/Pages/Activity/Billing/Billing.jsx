import  { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import BillingPreview from "../../../components/billing/BillingPreview";
import Invoice from "../../../components/billing/Invoice";
import * as ReactDOMServer from 'react-dom/server';
const Billing = () => {
  const [open, setOpen] = useState(false);
 
  const [stocks, setStocks] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
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

// Calculate CGST and SGST based on total price
useEffect(() => {
  const totalPrice = selectedProducts.reduce((acc, product) => acc + (product.quantity * product.sellingPrice), 0);
  const cgstAmount = (totalPrice * 0.09); // Assuming CGST is 9%
  const sgstAmount = (totalPrice * 0.09); // Assuming SGST is 9%
  setCgst(cgstAmount);
  setSgst(sgstAmount);
}, [selectedProducts]);


  // Calculate total price including taxes
  const calculateTotalPrice = () => {
    const totalPrice = selectedProducts.reduce((acc, product) => acc + (product.quantity * product.sellingPrice), 0);
    return totalPrice + cgst + sgst;
  };

  const payableAmount = calculateTotalPrice();



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
      cgst: cgst,
      sgst: sgst,
      totalPrice: calculateTotalPrice(),
      payableAmount: payableAmount,
    });
    fetchProducts();
    
    toast.success(response.data.message);
    setOpen(true);
  } catch (error) {
    console.error('Error confirming purchase:', error);
    toast.error(error.response.data.message)
  }
};

const handleClose = () => {
  setOpen(false);
};

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


  const handlePrint = () => {
    //const printWindow = window.open('', '_blank');
    const printWindow = window;
    const invoice = ReactDOMServer.renderToString(
      <Invoice
        selectedProducts={selectedProducts}
        cgst={cgst}
        sgst={sgst}
        // totalPrice={totalPrice}
        payableAmount={payableAmount}
      />
    );
  
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(invoice);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
  
    printWindow.onafterprint = () => {
      printWindow.close(); // Close the window after printing or canceling
    };
  
    printWindow.print();
  };
  

  return (
    <div className="flex bg-white">

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

   
<div className=" Billing Preview">
<BillingPreview
    selectedProducts={selectedProducts}
   
      setSelectedProducts={setSelectedProducts}
    cgst={cgst}
    sgst={sgst}
    calculateTotalPrice={calculateTotalPrice}
    payableAmount={payableAmount}
  />

  <button
    className="bg-blue-500 text-white p-2 mt-2"
    onClick={handleConfirmPurchase}
  >
    Confirm purchase
  </button>
</div>
<Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Print Bill"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want to print the bill?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handlePrint} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>

    
    </div>
  );
};

export default Billing;
