import  { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { CgCloseR } from "react-icons/cg";
import {  ToastContainer } from 'react-toastify';

const CreateSuppliers = ({ onClose }) => {
  const loginusername = useSelector((state) => state.auth.user.name);
  const [formData, setFormData] = useState({
    agencyContactName: '',
    contactMailId: '',
    contactPhoneNumber: '',
    contactAddress: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const postData = new FormData();
    // postData.append('agencyContactName', formData.agencyContactName);
    // postData.append('contactMailId', formData.contactMailId);
    // postData.append('contactPhoneNumber', formData.contactPhoneNumber);
    // postData.append('contactAddress', formData.contactAddress);
    // postData.append('country', formData.country);
    // postData.append('state', formData.state);
    // postData.append('city', formData.city);
    // postData.append('pincode', formData.pincode);
    // postData.append('createdBy', loginusername);

    const errors = {};
    if (formData.contactPhoneNumber.length !== 10) {
      errors.mobile = 'Mobile number must be 10 digits';
    }
    
    if (!validateEmail(formData.contactMailId)) {
      toast.error('Please provide a valid email address.');
      return;
    }
 
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const url = `${baseURL}suppliers`;
  
      // const response = await axios.post(url, postData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      const response =  await axios.post(url, {
        ...formData,
        createdBy: loginusername,
      });
      toast.success(response.data.message);

      setTimeout(() => {
        onClose();
      
      }, 3000);
    } catch (error) {
      console.error('Error suppliers:', error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end bg-gray-800 bg-opacity-75 z-50">
    <ToastContainer />
    <div className="bg-white rounded-lg w-6/12">
      <div className="flex justify-between items-center mb-4 p-4 table-head">
        <h2 className="text-2xl font-bold">Create Suppliers</h2>
        <button onClick={onClose} className="hover:text-gray-800 pr-3" style={{color:'#00BBD1'}}>
          <CgCloseR className="h-6 w-6" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 p-3 flex flex-wrap">
          <div className='mx-3  mt-6'>
            <label className="block text-gray-500 text-sm font-medium mb-2" htmlFor=" AgencyContactName ">
              AgencyContactName <span className='text-rose-400'>*</span>
            </label>
            <input
              className="border border-gray-300 p-2 py-4 rounded w-80"
              type="text"
              id="agencyContactName"
              name="agencyContactName"
              value={formData.agencyContactName}
              onChange={handleChange}
              required
              placeholder='John Doe'
            />
          </div>

          <div className='mx-3 mt-6'>
            <label className="block text-gray-500 text-sm font-medium mb-2" htmlFor="contactMailId">
              ContactMailId <span className='text-rose-400'>*</span>
            </label>
            <input
              className="border border-gray-300 p-2 py-4 rounded w-80"
              type="email"
              id="contactMailId"
              name="contactMailId"
              value={formData.contactMailId}
              onChange={handleChange}
              required
              placeholder='John Doe'
            />
          </div>
    
      
          <div className='mx-3  mt-6'>
            <label className="block text-gray-500 text-sm font-medium  mb-2" htmlFor="contactPhoneNumber">
              ContactPhoneNumber <span className='text-rose-400'>*</span>
            </label>
            <input
              className="border border-gray-300 p-2 py-4 rounded w-80"
              type="number"
              id="contactPhoneNumber"
              name="contactPhoneNumber"
              value={formData.contactPhoneNumber}
              onChange={handleChange}
              required
              placeholder='John Doe'
            />
          </div>

       
          <div className='mx-3 mt-6'>
            <label className="block text-gray-500 text-sm font-medium mb-2" htmlFor="country">
            Country<span className='text-rose-400'>*</span>
            </label>
            <input
              className="border border-gray-300 p-2 py-4 rounded w-80"
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              placeholder='John Doe'
            />
          </div>

          <div className='mx-3  mt-6'>
            <label className="block text-gray-500 text-sm font-medium mb-2" htmlFor="state">
            State<span className='text-rose-400'>*</span>
            </label>
            <input
              className="border border-gray-300 p-2 py-4 rounded w-80"
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              placeholder='John Doe'
            />
          </div>
          <div className='mx-3  mt-6'>
            <label className="block text-gray-500 text-sm font-medium mb-2" htmlFor="city">
            City<span className='text-rose-400'>*</span>
            </label>
            <input
              className="border border-gray-300 p-2 py-4 rounded w-80"
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder='John Doe'
            />
          </div>
          <div className='mx-3 mt-6'>
            <label className="block text-gray-500 text-sm font-medium mb-2" htmlFor="pincode">
            Pincode<span className='text-rose-400'>*</span>
            </label>
            <input
              className="border border-gray-300 p-2 py-4 rounded w-80"
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              placeholder='John Doe'
            />
          </div>

       
        </div>
      
        <div className='mx-3   mt-1 px-3'>
            <label className="block text-gray-500 text-sm font-medium  mb-2" htmlFor="contactAddress">
            ContactAddress <span className='text-rose-400'>*</span>
            </label>
            <textarea
              className="border border-gray-300 p-2 py-4 rounded w-full h-20 resize-none"
              type="text"
              id="contactAddress"
              name="contactAddress"
              value={formData.contactAddress}
              onChange={handleChange}
              required
              placeholder='John Doe'
            />
          </div>
        <div>
          <div className='pr-3 absolute bottom-0 right-0 bg-gray-200 rounded-md w-6/12 h-auto py-3 flex justify-end'>
            <button
              type="reset"
              className="border-2 text-teal-400 font-bold py-2 px-4 rounded mr-3 reset-color" style={{borderColor:'#00BBD1', color:'#00BBD1'}}
            >
              Clear
            </button>
            <button
              type="submit"
              className="hover:bg-teal-700 text-white font-bold py-2 px-4 rounded" style={{backgroundColor:'#00BBD1'}}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  );
};

CreateSuppliers.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDataRefresh: PropTypes.func.isRequired
};

export default CreateSuppliers;
