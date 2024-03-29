// Purchase.jsx
import PurchaseTable from "./PurchaseTable";
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const columns = [
    { key: 'invoiceNumber', title: 'Invoice  No.' },
    { key: 'supplier.agencyContactName', title: 'Supplier Name' },
    { key: 'purchaseDate', title: 'purchaseDate' },
    { key: 'amount', title: 'Amount' }, 
    { key: 'productsLength', title: 'No. of Items' }, 
    { key: 'paymentstatus', title: 'Payment status' }, 
];

const Purchase = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const baseURL = import.meta.env.VITE_BASE_URL;
            const url = `${baseURL}purchases`;
            
            const response = await axios.get(url);
            const newData = response.data.map(purchase => {
                // Calculate the total amount for this purchase
                const amount = purchase.products.reduce((total, product) => {
                    return total + product.quantity * product.costPrice;
                }, 0);
    
                return {
                    ...purchase,
                    productsLength: purchase.products.length,
                    'supplier.agencyContactName': purchase.supplier.agencyContactName,
                    amount: amount
                };
            });
            setData(newData);
        } catch (error) {
            console.error('Error fetching financial year data', error);
        }
    };

    const handleDataRefresh = async () => {
        await fetchData();
    };

    return (
        <div>
            <PurchaseTable data={data} columns={columns} pageSize={8} onDataRefresh={handleDataRefresh} />
        </div>
    );
};

Purchase.propTypes = {
    onDataRefresh: PropTypes.func.isRequired
};

export default Purchase;