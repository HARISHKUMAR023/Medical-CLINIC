import { useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import Switch, { switchClasses } from '@mui/joy/Switch';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { BsFilterLeft } from "react-icons/bs";
import { LuFilter } from "react-icons/lu";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Deletepop from '../../../components/Deletepop/Deletepop';
import axios from 'axios';
import CreateProduct from './CreateProduct';

const Producttable = ({ data, columns, pageSize, onDataRefresh }) => {
    const [showPopup, setShowPopup] = useState(false);
  const [checkedRows, setCheckedRows] = useState({});
  const [itemToDeleteId, setItemToDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalRecordsPerPage = paginatedData.length;
  const [showPopUp, setShowPopUp] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

// Update checkedRows state when data prop changes
useEffect(() => {
  const initialCheckedRows = {};
  data.forEach((item, index) => {
    initialCheckedRows[index] = item.active; // Assuming the 'active' property indicates the product's active/inactive status
  });
  setCheckedRows(initialCheckedRows);
}, [data]);
  

const handleSwitchChange = (rowIndex, isChecked) => {
  setCheckedRows((prevCheckedRows) => ({
    ...prevCheckedRows,
    [rowIndex]: isChecked,
  }));
  const productId = data[rowIndex]._id; // Assuming _id is the unique identifier for each product
  handleToggleProduct(productId, isChecked);
};

 

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleDelete = async (id) => {
    setShowPopUp(true);
    setItemToDeleteId(id);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const url = `${baseURL}products/${itemToDeleteId}`;
      await axios.delete(url);
      onDataRefresh();
      setShowPopUp(false);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleCancel = () => {
    console.log('Cancelled');
    setShowPopUp(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const handleToggleProduct = async (productId, isActive) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/products/${productId}/toggle`;
    await axios.put(url, { active: isActive });
    onDataRefresh();
  } catch (error) {
    console.error('Error toggling product status:', error);
    alert('Error toggling product status');
  }
};
  return (
    <div>
 <div className='h-auto mx-2'>
      {showPopup && <CreateProduct onClose={togglePopup} onDataRefresh={onDataRefresh}/>}
      <div className="container mx-auto p-4 bg-white z-10">
        <div className='flex justify-between mb-4'>
          <div className='flex items-center'>
            <BsFilterLeft className='mr-2'/>
            <p className='mr-3'>Sort By:</p>
            <Box sx={{ minWidth: 120, border: 'none' }} className='border-none bg-white text-white border-white'>
              <FormControl fullWidth className='border-none bg-white text-white border-white' sx={{ border: 'none' }}>
                <NativeSelect className='border-none border-b-0' sx={{ border: 'none', '&:focus': { border: 'none' } }} defaultValue={30}>
                  <option value={10} className='border-none'>Mounth</option>
                  <option value={20} className='border-none'>Week</option>
                  <option value={30} className='border-none'>Newest</option>
                </NativeSelect>
              </FormControl>
            </Box>
            <p className='ml-4'>Total: <span>{data.length}</span></p>
          </div>
          <div className='flex items-center'>
            <IoSearch className='mx-3 text-black' />
            <MdOutlineFormatListBulleted  className='mx-3 text-black'/>
            <LuFilter className='mx-3 text-black' />
            <button className='text-white px-3 p-1 text-sm font-normal rounded' style={{backgroundColor:'#00BBD1'}} onClick={togglePopup}>+ Create New</button>
          </div>
        </div>
        <hr  />
        <table className="min-w-full bg-white text-slate-700 text-sm mt-3">
          <thead>
            <tr className='text-black shadow-sm text-center items-center rounded-md' style={{backgroundColor:'#EAEAEA'}}>
              {columns.map((column) => (
                <th key={column.key} className="py-2 px-4 text-left font-medium">{column.title}</th>
              ))}
              <th className="py-2 px-4 text-left font-medium">Status</th>
              <th className="py-2 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100 shadow-sm py-3 rounded-md">
                {columns.map((column) => (
                  <td key={column.key} className="py-2 px-4 font-light">
                  {column.key === 'productPic' ? (
                      <img src={`http://localhost:5000/uploads/productfile/${row[column.key] || 'default-profile.png'}`} alt="productPic" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }} />
                  ) : column.key === 'name' ? (
                      <div>
                          <div>{row.name}</div>
                      </div>
                  ) : (
                      column.key === 'createdAt' || column.key === 'endDate' ? formatDate(row[column.key]) : row[column.key]
                  )}
              </td>
                ))}
 <td className='py-2 px-4 flex items-center'>
                    <Switch
                      color={checkedRows[index] ? 'success' : 'danger'}
                      checked={checkedRows[index] || false}
                      onChange={(event) => handleSwitchChange(index, event.target.checked)}
                      sx={{
                         paddingTop: '10px',
                        '--Switch-thumbSize': '12px',
                        '--Switch-trackWidth': '30px',
                        '--Switch-trackHeight': '18px',
                        '--Switch-trackBackground': '#FF3838',
                        '&:hover': {
                          '--Switch-trackBackground': '#FF3838',
                        },
                        [`&.${switchClasses.checked}`]: {
                          '--Switch-trackBackground': '#2CA302',
                          '&:hover': {
                            '--Switch-trackBackground': '#2CA302',
                          },
                        },
                      }}
                    />
                    {checkedRows[index] ? (
                      <span className='pl-3 text-green-600 text-center mt-3'>Active</span>
                    ) : (
                      <span className='pl-3 text-red-600 text-center mt-3'>Inactive</span>
                    )}
                  </td>
                <td className="py-2 px-4 ">
                  <button className="px-2 py-1 mr-2 rounded" onClick={() => handleEdit(row)}>
                    <FaEdit className='w-6 h-8'/>
                  </button>
                  <button className="px-2 py-1 mr-2 rounded hover:text-red-500" onClick={() => handleDelete(row._id)}>
                    <MdDelete className='w-6 h-8' />
                  </button>
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
        {showPopUp && (
          <Deletepop 
            message="Are you sure you want to delete?"
            onCancel={handleCancel}
            onDelete={handleDeleteConfirmed}
          />
        )}
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-2 " style={{color:'#999999'}}>{`Records Per Page: ${totalRecordsPerPage} `}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                shape="rounded"
                page={currentPage}
                onChange={(event, page) => handlePageChange(page)}
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}
Producttable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    pageSize: PropTypes.number.isRequired,
    onDataRefresh: PropTypes.func.isRequired
  };
export default Producttable