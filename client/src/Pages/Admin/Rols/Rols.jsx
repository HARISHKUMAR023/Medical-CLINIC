
// import { useState } from 'react';
import { useEffect, useState } from 'react';
import Table from '../../../components/Tables/Table';
import axios from 'axios';
import PropTypes from 'prop-types';
// const data = [

// ];

const columns = [
  { key: 'role', title: 'Role Name' },
  { key: 'createdAt', title: 'Created On' },
  { key: 'createdBy', title: 'Created By' },
  

];

const Rols = () => {
const [data , setData] = useState([]);
useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}roles`;
    const response = await axios.get(url);
    setData(response.data);
  } catch (error) {
    console.error('Error fetching user data', error);
  }
};


const handleDataRefresh = async () => {
  await fetchData();
};

  return (
    <div className='dark:bg-dark1'>
 
      <Table className='dark:bg-dark1' data={data} columns={columns} pageSize={8} onDataRefresh={handleDataRefresh} />
    </div>
  );
};

Rols.propTypes = {
  // Add onDataRefresh to propTypes
  onDataRefresh: PropTypes.func.isRequired
};

export default Rols