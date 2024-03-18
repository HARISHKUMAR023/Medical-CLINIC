import FinancialYearTable from "./FinancialYearTable";
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const columns = [
    { key: 'title', title: 'title' },
    { key: 'startDate', title: 'startDate' },
    { key: 'endDate', title: 'endDate' },
    { key: 'createdBy', title: 'createdBy' },
];
// const baseURL = import.meta.env.VITE_BASE_URL;
// console.log('Base URL:', baseURL);
const FinancialYear = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const baseURL = import.meta.env.VITE_BASE_URL;
            const url = `${baseURL}financial-years`;
            
        
        const response = await axios.get(url);
            console.log('API Response:', response.data); // Log response data
            console.log('Type of response.data:', typeof response.data); // Log type of response data
            setData(response.data);
        } catch (error) {
            console.error('Error fetching financial year data', error);
        }
    };

    const handleDataRefresh = async () => {
        await fetchData();
    };

    console.log('Current data:', data); // Log current data state

    return (
        <div>
            <FinancialYearTable data={data} columns={columns} pageSize={8} onDataRefresh={handleDataRefresh} />
        </div>
    );
};

FinancialYear.propTypes = {
    onDataRefresh: PropTypes.func.isRequired
};

export default FinancialYear;
