import Financialyeartable from "./Financialyeartable";
import { useState, useEffect } from "react";

const columns = [
    { key: 'role', title: 'Role Name' },
    { key: 'createdAt', title: 'Created On' },
    { key: 'createdBy', title: 'Created By' },
];

const Financialyear = () => {
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
  return (
    <div ><Financialyeartable data={data} columns={columns} pageSize={8}/></div>  )
}

export default Financialyear