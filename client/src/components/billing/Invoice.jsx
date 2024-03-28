import PropTypes from 'prop-types';


const Invoice = ({ selectedProducts, cgst, sgst, totalPrice, payableAmount }) => {
  return (
    <div className="Invoice bg-slate-500">
    <h2>Invoice</h2>
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {selectedProducts.map((product, index) => (
          <tr key={index}>
            <td>{product.product.name}</td>
            <td>{product.quantity}</td>
            <td>{product.sellingPrice}</td>
            <td>{product.quantity * product.sellingPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div>
      <p>CGST (9%): {cgst}</p>
      <p>SGST (9%): {sgst}</p>
      <p>Total (Incl. of all taxes): {totalPrice}</p>
      <p>Payable Amount: {payableAmount}</p>
    </div>
  </div>
  )
}
Invoice.propTypes = {
   selectedProducts: PropTypes.arrayOf(PropTypes.shape({
     product: PropTypes.shape({
       name: PropTypes.string,
     }),
     quantity: PropTypes.number,
     sellingPrice: PropTypes.number,
   })),
   cgst: PropTypes.number,
   sgst: PropTypes.number,
   totalPrice: PropTypes.number,
   payableAmount: PropTypes.number,
};

export default Invoice