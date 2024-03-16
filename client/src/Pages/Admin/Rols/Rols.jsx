
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
    const response = await axios.get('http://localhost:5000/api/roles');
    setData(response.data);
  } catch (error) {
    console.error('Error fetching user data', error);
  }
};


const handleDataRefresh = async () => {
  await fetchData();
};

  return (
    <div>
 
      <Table data={data} columns={columns} pageSize={8} onDataRefresh={handleDataRefresh} />
    </div>
  );
};

Rols.propTypes = {
  // Add onDataRefresh to propTypes
  onDataRefresh: PropTypes.func.isRequired
};

export default Rols