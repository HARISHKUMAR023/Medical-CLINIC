import { useState } from 'react';
import axios from 'axios';
import { CgCloseR } from "react-icons/cg";
import user from '../../../assets/images/icons/formicone/user.png';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateManufacturer = ({ onClose, onDataRefresh }) => {
  const loginusername = useSelector((state) => state.auth.user.name);

  const [formData, setFormData] = useState({
    name: '',
    manufacturerPic: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'manufacturerPic') {
      setFormData({ ...formData, productPic: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const postData = new FormData();
    postData.append('name', formData.name);
    postData.append('manufacturerPic', formData.productPic);
    postData.append('createdBy', loginusername);
  
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const url = `${baseURL}Manufacturer`;
      await axios.post(url, postData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
        // Display success toast notification
        toast.success('Manufacturer created successfully!');

    // Close the modal after a short delay (e.g., 1 second)
    setTimeout(() => {
      onClose();
      onDataRefresh();
    }, 1000);
      // onClose();
      // onDataRefresh();
      // toast.success('Manufacturer created successfully!');
      // setTimeout(() => {
      //   toastRef.current.success('manufacturer created successfully!');
      // }, 100); // Delay in milliseconds
    } catch (error) {
      console.error('Error creating manufacturer:', error);
      toast.error('Failed to create manufacturer.');
    }
  };
  
  
  return (
    <div className="fixed inset-0 flex  justify-end bg-gray-800 bg-opacity-75 z-50">
      <ToastContainer />
      <div className="bg-white rounded-lg w-3/12">
        <div className="flex justify-between items-center mb-4 p-4 table-head">
          <h2 className="text-2xl font-bold">Create Manufacturer</h2>
          <button onClick={onClose} className="hover:text-gray-800 pr-3" style={{color:'#00BBD1'}}>
            <CgCloseR  className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 p-3 flex flex-wrap">
            <div className='mx-3'>
              <label className="block text-gray-500 text-sm font-medium " htmlFor="name">
                Name <span className='text-rose-400'>*</span> 
              </label>
              <input
                className=" border border-gray-300 p-2 py-4 rounded w-80"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder='Cotton'
              />
            </div>
          </div>
          <div className='flex  ml-6 mt-44'>
            <div className="flex flex-col items-start">
              <label className="block text-gray-500 text-sm font-medium" htmlFor="manufacturerPic">
              ManufacturerPic<span className='text-rose-400'>*</span>
              </label>
              <div className="relative w-auto">
                <input
                  type="file"
                  id="manufacturerPic"
                  name="manufacturerPic"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleChange}
                  className="sr-only w-auto h-auto"
                  required
                />
                <label
                  htmlFor="manufacturerPic"
                  className="border-2 border-dashed border-gray-300 rounded cursor-pointer flex items-center justify-center w-80 h-24"
                >
                  <div className="text-center flex justify-center items-center p-3">
                    <img src={user} alt="Browse" className="w-12 h-14 mx-auto mr-3" />
                    <span>Drag and drop image or <span className='text-blue-600'>Select</span></span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="mb-4 pr-3 absolute bottom-0 right-0" style={{backgroundColor:'#F4F4F4'}}>
            <div>
              <button
                type="reset"
                className="border-2 text-teal-400 font-bold py-2 px-4 rounded mr-3 reset-color"
                style={{borderColor:'#00BBD1', color:'#00BBD1'}}
              >
                Clear
              </button>
              <button
                type="submit"
                className="hover:bg-teal-700 text-white font-bold py-2 px-4 rounded "
                style={{backgroundColor:'#00BBD1'}}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

CreateManufacturer.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDataRefresh: PropTypes.func.isRequired
};

export default CreateManufacturer;
