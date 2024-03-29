import PropTypes from 'prop-types';
import { IoRemoveCircleSharp } from "react-icons/io5";

const BillingPreview = ({ selectedProducts, setSelectedProducts, cgst, sgst, calculateTotalPrice, payableAmount }) => {
    const handleRemoveFromBill = (index) => {
        const updatedSelectedProducts = [...selectedProducts];
        updatedSelectedProducts.splice(index, 1);
        setSelectedProducts(updatedSelectedProducts);
      };
      console.log(selectedProducts)
 
    return (
    <div className="BillingPreview m-4">
      <h2>Billing Preview</h2>
      <table className="table-auto text-center">
    <thead>
 
      <tr className='overflow-auto text-sm'>
      <th className="px-3 text-center text-sm">Actions</th>
        <th className="px-3 text-center text-sm">S.no</th>
        <th className="px-3 text-center text-sm">Name</th>
        <th className="px-3 text-center text-sm">Expiry Date</th>
        <th className="px-3 text-center text-sm">Type</th>
        <th className="px-3 text-center text-sm">Quantity</th>
        <th className="px-3 text-center text-sm">Rate</th>
        <th className="px-3 text-center text-sm">Total Price</th> {/* New column for total price */}
     
      </tr>
   
      
    </thead>
    <tbody>
      
  {selectedProducts.map(({ product, quantity, sellingPrice }, index) => {
  const expiryDate = product?.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : "N/A";
BillingPreview.propTypes = {
   selectedProducts: PropTypes.array.isRequired,
   setSelectedProducts: PropTypes.func.isRequired,
   cgst: PropTypes.number.isRequired,
   sgst: PropTypes.number.isRequired,
   calculateTotalPrice: PropTypes.func.isRequired,
   payableAmount: PropTypes.number.isRequired,
};
  

   
   
    const totalPrice = quantity * sellingPrice;

    return (
      <tr key={index} className='overflow-auto text-sm'>
         <td>
          <button className=" p-2" onClick={() => handleRemoveFromBill(index)}><IoRemoveCircleSharp className='text-red-500 w-6 h-6' /></button>
        </td>
        <td>{index + 1}</td>
        <td>{product?.compositionName}</td>
        <td>{expiryDate}</td>
        <td>{product?.type}</td>
        <td>{quantity}</td>
        <td>{sellingPrice}</td>
        <td>{totalPrice}</td>
       
      </tr>
    );
  })}
</tbody>

  </table>
      <div className='overflow-y-auto'>
        <p>CGST (9%): {cgst}</p>
        <p>SGST (9%): {sgst}</p>
        <p>Total (Incl. of all taxes): {calculateTotalPrice()}</p>
        <p>Payable Amount: {payableAmount}</p>
      </div>
    </div>
  );
};

export default BillingPreview;
