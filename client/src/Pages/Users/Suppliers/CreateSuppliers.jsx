import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { CgCloseR } from 'react-icons/cg';
import stateAndCityData from '../../../assets/json/state.json';
import Select from 'react-select';
import "./customstyle.css";
const CreateSuppliers = ({ onClose, refetchSuppliers, editData }) => {
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

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      let url = `${baseURL}suppliers`;

      if (editData) {
        url += `/${editData._id}`;
        await axios.put(url, {
          ...formData,
          createdBy: loginusername,
        });
        toast.success('Supplier updated successfully.');
      } else {
        await axios.post(url, {
          ...formData,
          createdBy: loginusername,
        });
        toast.success('Supplier created successfully.');
      }

      setTimeout(() => {
        onClose();
        refetchSuppliers();
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end bg-gray-800 bg-opacity-75 z-50">
    <ToastContainer />
    <div className="bg-white rounded-lg w-6/12">
      <div className="flex justify-between items-center mb-4 p-4 table-head">
      <h2 className="text-2xl font-bold">{editData ? 'Edit Supplier' : 'Create Supplier'}</h2>
       
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
              placeholder='Agency Contact Name'
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
              placeholder='Contact Mail id'
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
              placeholder='Contact Phone Number'
            />
          </div>

       
          <div className='mx-3 mt-6'>
  <label className="block text-gray-500 text-sm font-medium mb-2" htmlFor="country">
    Country<span className='text-rose-400'>*</span>
  </label>
  <Select
    value={{ value: formData.country || 'India', label: 'India' }}
    onChange={(selectedOption) => setFormData({ ...formData, country: selectedOption.value })}
    options={[{ value: 'India', label: 'India' }]}
    placeholder="Select Country"
    className="border border-gray-300 p-2 py-3 rounded w-80 "styles={{
      control: (base) => ({
        ...base,
        border: 'none',
        boxShadow: 'none'
      }),
      // other styles...
    }}
  />
</div>

<div className='mx-3 mt-6'>
  <label className="block text-gray-500 text-sm font-medium mb-2" htmlFor="state">
    State<span className='text-rose-400'>*</span>
  </label>
  <Select
    value={{ value: formData.state, label: formData.state }}
    onChange={(selectedOption) => setFormData({ ...formData, state: selectedOption.value })}
    options={Object.keys(stateAndCityData).map(state => ({ value: state, label: state }))}
    placeholder="Select State"
    className="border border-gray-300 p-2 py-3 rounded w-80 "
    styles={{
      control: (base) => ({
        ...base,
        border: 'none',
        boxShadow: 'none'
      }),
      // other styles...
    }}
  />
</div>
          <div className='mx-3  mt-6'>
          <label className="block text-gray-500 text-sm font-medium mb-2" htmlFor="city">
                City<span className='text-rose-400'>*</span>
              </label>
              <Select
                value={{ value: formData.city, label: formData.city }}
                onChange={(selectedOption) => setFormData({ ...formData, city: selectedOption.value })}
                options={formData.state ? stateAndCityData[formData.state].map(city => ({ value: city, label: city })) : []}
                placeholder="Select City"
                isDisabled={!formData.state}
                className="border border-gray-300 p-2 py-3 rounded w-80  "    styles={{
                  control: (base) => ({
                    ...base,
                    border: 'none',
                    boxShadow: 'none'
                  }),
                  // other styles...
                }}
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
              placeholder='Pincode'
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
              placeholder='Contact Address'
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
                className={`hover:bg-teal-700 text-white font-bold px-4 rounded py-2 ${
                  editData ? 'bg-blue-500' : 'bg-green-500'
                }`}
              >
                {editData ? 'Update' : 'Create'}
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
  refetchSuppliers: PropTypes.func.isRequired,
  editData: PropTypes.object
};

export default CreateSuppliers;
