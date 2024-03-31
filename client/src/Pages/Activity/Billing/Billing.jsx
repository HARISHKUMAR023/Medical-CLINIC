import  { useState, useEffect,useRef } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import BillingPreview from "../../../components/billing/BillingPreview";
import { useReactToPrint } from 'react-to-print';
import Invoice from "../../../components/billing/Invoice";
import Invoicemain from "../../../components/billing/Invoicemain";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
const Billing = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stocks, setStocks] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [selectedType, setSelectedType] = useState("");
 const [ invoicefechdata , setInvoicefechdata ] = useState([]);

 const componentRef = useRef();

  // Fetch products from the server
  const fetchProductsall = async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/billingdata`;
    const response = await axios.get(url);
    setInvoicefechdata (response.data.bills);
    console.log(response.data.bills)  
    // console.log(response.data.stocks)
  };

  // Call fetchProducts when the component mounts
  useEffect(() => {
    fetchProductsall();
  }, []);

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
    return totalPrice
   // + cgst + sgst;
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


  
  const handlePrint = useReactToPrint({
    content: () => document.getElementById('invoice-container'),
    documentTitle: 'Pharmacy Invoice',
    onAfterPrint: () => setOpen(false), // Close confirmation dialog after printing
  });

  const handlePrintall = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Pharmacyall  Invoice',
    onAfterPrint: () => setOpen(false), // Close confirmation dialog after printing
  });
  // const printDocument = () => {
  //   const input = document.getElementById('divToPrint');
  //   html2canvas(input)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  //       const pageWidth = pdf.internal.pageSize.getWidth();
  //       const pageHeight = pdf.internal.pageSize.getHeight();
  
  //       let width = canvas.width;
  //       let height = canvas.height;
  
  //       // calculate the width and height, max is the dimension of A4
  //       if (width > height) {
  //         if (width > pageWidth) {
  //           height *= pageWidth / width;
  //           width = pageWidth;
  //         }
  //       } else {
  //         if (height > pageHeight) {
  //           width *= pageHeight / height;
  //           height = pageHeight;
  //         }
  //       }
  
  //       pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
  //       pdf.autoPrint();
  //       window.open(pdf.output('bloburl'), '_blank');
  //     });
  // }

  const handleClick = async () => {
    await fetchProductsall();
    handlePrintall(); 
  };
  
  return (
    <div className="flex bg-white my-2 m-2">
      
      <div className="pt-2 px-2" >
        {/* search the poducts */}
        <input type="search" name="" id="" className="border-2" placeholder="Search the Product" onChange={e => setSearchTerm(e.target.value)} />
        <label className="px-2" htmlFor="tablet">Tablet</label>
<input type="checkbox" name="tablet" id="tablet" onChange={e => setSelectedType(e.target.checked ? 'tablet' : '')} />
<label className="px-2" htmlFor="serup">Serup</label>
<input type="checkbox" name="serup" id="serup" onChange={e => setSelectedType(e.target.checked ? 'serup' : '')} />

      <div className="overflow-auto h-[550px]">
      <table className="table-auto ">
          <thead>
            <tr>
              <th className="px-4 py-2 text-sm">Product</th>
              <th className="px-4 py-2 text-sm">Brand</th>
              <th className="px-4 py-2 text-sm">Type</th>
              <th className="px-4 py-2 text-sm">Quantity</th>
              <th className="px-4 py-2 text-sm">Expiry Date</th>
              <th className="px-4 py-2 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto ">
            {Array.isArray(stocks) &&
               stocks
               .filter(stock => selectedType === "" || stock.productitem.type === selectedType)
               .filter(stock => stock.productitem.compositionName.toLowerCase().includes(searchTerm.toLowerCase()))
               .map((stock) =>  (
                <tr key={stock._id} className="text-sm">
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
                      className=""
                      onClick={() => handleQuantityChange(stock, 1)}
                    >
                      +
                    </button>
                    <button
                      className=" ml-2"
                      onClick={() =>
                        handleQuantityChange(stock, -1)
                      }
                    >
                      -
                    </button>
                    <button
                      className="bg-blue-500 text-white text-xs ml-1 px-0,5"
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
                      Add
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
       
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

<div className="flex ">
<button
    className="bg-teal-400 text-white p-2 mt-2 rounded m-3"
    onClick={handleConfirmPurchase}
  >
    Submit Bill
  </button>
</div>
 
</div>
<div hidden>
<div id="invoice-container" >
  <Invoice
    selectedProducts={selectedProducts}
    cgst={cgst}
    sgst={sgst}
    calculateTotalPrice={calculateTotalPrice}
    payableAmount={payableAmount}
  />
</div>
</div>
{/* bill container all */}

   <div hidden >
   <div ref={componentRef}>
      <div id="invoiceall-container" >
        <Invoicemain
          Invoicedata={invoicefechdata}
        />
      </div>
    </div>
   </div>
   <Button onClick={handleClick} color="primary" autoFocus>bill all </Button>
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
