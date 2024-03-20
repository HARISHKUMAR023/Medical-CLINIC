import ManufacturerTable from "./ManufacturerTable"
import { useEffect, useState } from 'react';

import axios from 'axios';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const columns = [
  { key: 'manufacturerPic', title: 'Image' },
  { key: 'name', title: 'Name' },
 
  { key: 'createdAt', title: 'Created at' },
  { key: 'createdBy', title: 'createdBy' },
  

];
const Manufacturer = () => {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const url = `${baseURL}manufacturer`;
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  const handleDataRefresh = async () => {
    await fetchData();
  };
  return (
    <div>
      <ToastContainer />
      <ManufacturerTable data={data} columns={columns} pageSize={8}  onDataRefresh={handleDataRefresh}/>
    </div>
  )
}
Manufacturer.propTypes = {
  // Add onDataRefresh to propTypes
  onDataRefresh: PropTypes.func.isRequired
};
export default Manufacturer