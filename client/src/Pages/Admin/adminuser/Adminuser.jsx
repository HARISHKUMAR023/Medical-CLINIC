
import { useEffect, useState } from 'react';
import AdminTable from './AdminTable';
import axios from 'axios';
import PropTypes from 'prop-types';




const columns = [
  { key: 'profilePic', title: 'Image' },
  { key: 'nameAndEmail', title: 'Name' },
 
  { key: 'createdAt', title: 'Created at' },
  { key: 'createdBy', title: 'CreatedBy' },
  

];


const Adminuser = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const url = `${baseURL}getuser`;
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  const handleDataRefresh = async () => {
    await fetchData();
  };

// const intervalId = setInterval(fetchData, 5000);
// return () => clearInterval(intervalId);

  return (
    <div className='rounded-md'>
      <AdminTable data={data} columns={columns} pageSize={8}  onDataRefresh={handleDataRefresh} />
    </div>
  )
}
Adminuser.propTypes = {
  // Add onDataRefresh to propTypes
  onDataRefresh: PropTypes.func.isRequired
};

export default Adminuser