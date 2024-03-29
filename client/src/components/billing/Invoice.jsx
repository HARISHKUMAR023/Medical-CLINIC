import PropTypes from 'prop-types';
import kpnlogo from '../../assets/images/KRN-LOGO.svg';
import './Invoice.css';
const Invoice = ({ selectedProducts, cgst, sgst,  payableAmount }) => {
  return (
    <div className="Invoice">
      <h2>Invoice</h2>
      <div className="invoice-header">
        <img src={kpnlogo} alt="KRN Logo" className="logo" />
        {/* Add other static content here, e.g., address, phone number */}
        <div className="invoice-header">
  <p style={{ fontSize: '16px' }}>Company Name</p>

</div>
      </div>
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
      <div className="invoice-summary">
        <p>CGST (9%): {cgst}</p>
        <p>SGST (9%): {sgst}</p>
        <p>Total (Incl. of all taxes): {payableAmount}</p>
        <p>Payable Amount: {payableAmount}</p>
      </div>
    </div>
  );
};

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
  calculateTotalPrice: PropTypes.number,
  payableAmount: PropTypes.number,
};

export default Invoice;
