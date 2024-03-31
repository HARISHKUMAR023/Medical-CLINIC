import React from 'react';
import { useReactToPrint } from 'react-to-print';
import Invoicemain from './Invoicemain';

const PrintInvoice = ({ invoiceData }) => {
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint}>Print Invoice</button>
      <div style={{ display: 'none' }}>
        <Invoicemain invoiceData={invoiceData} ref={componentRef} />
      </div>
    </div>
  );
};

export default PrintInvoice;
