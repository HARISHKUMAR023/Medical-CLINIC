import PropTypes from 'prop-types';


const BillingPreview = ({ selectedProducts, setSelectedProducts, cgst, sgst, calculateTotalPrice, payableAmount }) => {
    const handleRemoveFromBill = (index) => {
        const updatedSelectedProducts = [...selectedProducts];
        updatedSelectedProducts.splice(index, 1);
        setSelectedProducts(updatedSelectedProducts);
      };
      console.log(selectedProducts)
 
    return (
    <div className="BillingPreview">
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
      <div>
        <p>CGST (9%): {cgst}</p>
        <p>SGST (9%): {sgst}</p>
        <p>Total (Incl. of all taxes): {calculateTotalPrice()}</p>
        <p>Payable Amount: {payableAmount}</p>
      </div>
    </div>
  );
};

export default BillingPreview;
