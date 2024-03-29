
import  { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { BsFilterLeft } from "react-icons/bs";
import { LuFilter } from "react-icons/lu";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { IoSearch } from "react-icons/io5";


import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';




const PurchaseTable = ({ data, columns, pageSize }) => {
   // Inside your component
const navigate = useNavigate();
    
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalRecordsPerPage = paginatedData.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString) => {
    // Parse the date string
    const date = new Date(dateString);
  
    // Extract day, month, and year components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();
  
    // Convert components to strings and pad single digits with leading zeros
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  
    // Arrange components in the desired format
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  
    return formattedDate;
  };
  
  // Usage example
  const originalDate = "2024-03-19T00:00:00.000Z";
  const formattedDate = formatDate(originalDate);
  console.log(formattedDate); // Output: "19-03-2024"
  
  return (
    <div  className='h-auto mx-2'>
      
       
    <div className="container mx-auto p-4  bg-white">
      <div className='flex justify-between mb-4'>
        <div className='flex items-center ' >
        <BsFilterLeft className='mr-2'/>
         <p className='mr-3'>Sort By:</p>
         <Box sx={{ minWidth: 120, border: 'none' }} className='border-none bg-white text-white border-white'>
    <FormControl fullWidth className='border-none bg-white text-white border-white' sx={{ border: 'none' }}>
      <NativeSelect disableUnderline
        className='border-none border-b-0'
        sx={{ border: 'none', '&:focus': { border: 'none' } }}
        defaultValue={30}
      >
        <option value={10} className='border-none'>
          Mounth
        </option>
        <option value={20} className='border-none'>
          Week
        </option>
        <option value={30} className='border-none'>
          Newest
        </option>
      </NativeSelect>
    </FormControl>
  </Box>

  <p className='ml-4'>Total: <span>{data.length}</span></p>
        </div>
        <div className='flex items-center'>
        <IoSearch className='mx-3 text-black' />
        <MdOutlineFormatListBulleted  className='mx-3 text-black'/>
        <LuFilter className='mx-3 text-black' />
        <button 
  className='text-white px-3 p-1 text-sm font-normal rounded' 
  style={{backgroundColor:'#00BBD1'}} 
  onClick={() => navigate('/dashboard/Purchase/addPurchase')}
>
  + Create New
</button>
        </div>
      </div>
      <hr  />
      <table className="min-w-full bg-white   text-slate-700 text-sm mt-3">
        <thead>
          <tr className='text-black shadow-sm text-center items-center rounded-md' style={{backgroundColor:'#EAEAEA'}}>
            {columns.map((column) => (
              <th key={column.key} className="py-2 px-4 text-left font-medium normal-case">
                {column.title}
              </th>
            ))}
            
           <th  className="py-2 px-4 text-left font-medium normal-case">
           
           </th> 
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
          

          <tr key={index} className="hover:bg-gray-100 shadow-sm py-3 rounded-md items-center">
          {columns.map((column) => (
            <td 
              key={column.key} 
              className="py-2 px-4 font-light capitalize text-black"
              style={{ 
                color: column.key === 'paymentstatus' 
                  ? row[column.value] === 'Unpaid' 
                    ? 'red' 
                    : row[column.value] === 'Paid' 
                      ? 'green' 
                      : 'black' 
                  : 'black' 
              }}
            >
              {column.key === 'purchaseDate' || column.key === 'endDate' ? formatDate(row[column.key]) : row[column.key]}
            </td>
          ))}
        </tr>

          ))}
        </tbody>
      </table>
    
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
   
  )
}
PurchaseTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    pageSize: PropTypes.number.isRequired,
    onDataRefresh: PropTypes.func.isRequired
  };
export default PurchaseTable