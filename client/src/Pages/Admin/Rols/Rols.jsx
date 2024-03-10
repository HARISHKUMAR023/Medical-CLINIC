
// import { useState } from 'react';
import { useEffect, useState } from 'react';
import Table from '../../../components/Tables/Table';
import axios from 'axios';

// const data = [

// ];

const columns = [
  { key: 'name', title: 'Role Name' },
  { key: 'createdAt', title: 'Created On' },
  { key: 'CreatedBy', title: 'Created By' },
  

];

const Rols = () => {
const [data , setData] = useState([]);
useEffect(()=>{
const fetchData = async()=>{
  try{
    const response = await axios.get('http://localhost:5000/api/getuser');
    setData(response.data)
    console.log(response)
  }catch(error){
    console.error('erroe fetching userdata', error)
  }
};
fetchData();

const intervalId = setInterval(fetchData, 5000);
return () => clearInterval(intervalId);
},[]);

  return (
    <div>
 
      <Table data={data} columns={columns} pageSize={8}  />
    </div>
  );
};



export default Rols