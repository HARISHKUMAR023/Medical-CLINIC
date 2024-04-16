import PropTypes from "prop-types";
import kpnlogo from "../../assets/images/KRN-LOGO.svg";
import "./Invoicemain.css";

const Invoicemain = ({ Invoicedata }) => {
  return (
    <>
      {Invoicedata.map((bill, index) => (
        <div
          key={index}
          className="page-container page-break-after print:page-break-after"
          id={`divToPrint_${index}`}
        >
          <div className="invoice-page">
            <div className="invoice-header mb-6 p-5" style={{ background: "#001242" }}>
              <div className="flex justify-between items-center">
                <div>
                  <img src={kpnlogo} alt="KPN Logo" className="h-12 w-auto" />
                  <h2 className="text-2xl font-bold mb-6 text-white">Invoice</h2>
                </div>
                <p className="text-lg font-semibold text-white">Company Name</p>
              </div>
            </div>
            <table className="w-full table-auto border border-gray-300 mb-6">  <thead className="p-4">
                <tr className="border-b-2 border-gray-300 text-center">
                  <th className="py-2">Date</th>
                  <th className="py-2">Product</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">Brand</th>
                  <th className="py-2">Manufacturer</th>
                  <th className="py-2">Quantity</th>
                </tr>
              </thead>
              <tbody className="p-4">
                {bill.products.map((product, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-2 text-center">
                      {new Date(bill.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 text-center">
                      {product.product.compositionName}
                    </td>
                    <td className="py-2 text-center">{product.product.type}</td>
                    <td className="py-2 text-center">
                      {product.product.brand}
                    </td>
                    <td className="py-2 text-center">
                      {product.product.manufacturer}
                    </td>
                    <td className="py-2 text-center">{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          <div className="invoice-summary text-white p-5" style={{ background: "#001242" }}>
            <p className="text-lg font-semibold">Summary</p>
            <p>CGST: {bill.cgst}</p>
            <p>SGST: {bill.sgst}</p>
            <p>Total Price: {bill.totalPrice}</p>
            <p>Payable Amount: {bill.payableAmount}</p>
          </div>
        </div>
      ))}
    </>
  );
};

Invoicemain.propTypes = {
  Invoicedata: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          product: PropTypes.shape({
            compositionName: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            brand: PropTypes.string.isRequired,
            manufacturer: PropTypes.string.isRequired,
          }).isRequired,
          quantity: PropTypes.number.isRequired,
        })
      ).isRequired,
      cgst: PropTypes.number.isRequired,
      sgst: PropTypes.number.isRequired,
      totalPrice: PropTypes.number.isRequired,
      payableAmount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Invoicemain;