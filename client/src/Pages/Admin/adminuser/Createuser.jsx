import  { useState, useEffect } from 'react'
import axios from 'axios'; // Assuming you are using axios for HTTP requests
import { CgCloseR } from "react-icons/cg";
import './Createuser.css';
import user from '../../../assets/images/icons/formicone/user.png';
import PropTypes from 'prop-types';
import { useSelector  } from "react-redux";

const Createuser = ({ onClose , onDataRefresh}) => {
  const  loginusername = useSelector((state) => state.auth.user.name)
console.log(loginusername)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    role: '',
    password: '',
    confirmPassword: '',
    profilePic: null,
  });
  const [roles, setRoles] = useState([]);
  // const [errors, setErrors] = useState({});
  useEffect(() => {
    // Fetch roles from API
    axios.get('http://localhost:5000/api/roles')
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);


  const handleChange = (e) => {
    if (e.target.name === 'profilePic') {
      setFormData({ ...formData, profilePic: e.target.files[0] }); // Update profilePic with the selected file
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append('name', formData.name);
    postData.append('email', formData.email);
    postData.append('mobile', formData.mobile);
    postData.append('role', formData.role);
    postData.append('password', formData.password);
    postData.append('confirmPassword', formData.confirmPassword);
    postData.append('profilePic', formData.profilePic); // Append the file to FormData
    postData.append('createdBy',  loginusername);
    const errors = {};
    if (formData.mobile.length !== 10) {
      errors.mobile = 'Mobile number must be 10 digits';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const url = `${baseURL}register`;
      const response = await axios.post(url, postData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data for file upload
        }
      });
      console.log(response.data);
      onClose()
      onDataRefresh()
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  
  return (
    // absolute right-0  z-50 top-0 bg-black h-12/12 w-6/12
    <div className="fixed inset-0 flex  justify-end bg-gray-800 bg-opacity-75 z-50    ">
    <div className="bg-white rounded-lg w-6/12">
      <div className="flex justify-between items-center mb-4 p-4 table-head">
        <h2 className="text-2xl font-bold">Create Admin User</h2>
        <button onClick={onClose} className=" hover:text-gray-800 pr-3" style={{color:'#00BBD1'}}>
          <CgCloseR  className="h-6 w-6" />
        </button>
      </div>
      <form  onSubmit={handleSubmit}>
        {/* Add form fields */}
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
            placeholder='John Doe'
          />
          </div>
          <div className='mx-3 relative'>
  <label className="block text-gray-500 text-sm font-medium " htmlFor="Phone">
    Mobile Number <span className='text-rose-400'>*</span>
  </label>
  <div className="relative">
  <span className="absolute inset-y-0 left-0 px-4 py-2 text-center rounded text-white" style={{backgroundColor:'#999999'}}>+91</span>
  <input
    className="border border-gray-300 p-2 pl-16 rounded w-80"
    type="text"
    id="mobile"
    name="mobile"
    value={formData.mobile}
    onChange={handleChange}
    required
    placeholder='95005 00550'
  />
</div>
</div>

       
        <div className='mx-3 my-3'>
        <label className="block text-gray-500 text-sm font-medium " htmlFor="Phone">
            Role <span className='text-rose-400'>*</span> 
          </label>
          <select
                className='border border-gray-300  bg-white p-2 py-4 rounded w-80'
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                {roles.map(role => (
                  <option key={role._id} value={role.role}>{role.role}</option>
                ))}
              </select>
          {/* <input
            className=" border border-gray-300 p-2 py-4 rounded"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder='95005 00550'
          /> */}
        </div>
        <div className='mx-3 my-3'>
        <label className="block text-gray-500 text-sm font-medium " htmlFor="email">
        Mail Id  <span className='text-rose-400'>*</span> 
          </label>
     
          <input
            className=" border border-gray-300 p-2 py-4 rounded w-80"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder='johndoe@gmail.com'
          />
        </div>
       
        <div className='mx-3 my-3'>
        <label className="block text-gray-500 text-sm font-medium " htmlFor="MailId">
        Password  <span className='text-rose-400'>*</span> 
          </label>
     
          <input
            className=" border border-gray-300 p-2 py-4 rounded w-80"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder='********'
          />
        </div>
        <div className='mx-3 my-3'>
        <label className="block text-gray-500 text-sm font-medium " htmlFor="confirmpassword">
        Confirm Password<span className='text-rose-400'>*</span> 
          </label>
     
          <input
            className=" border border-gray-300 p-2 py-4 rounded w-80"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder='********'
          />
        </div>
  
        </div>
        {/* Add other form fields similarly */}
        <div className='flex justify-center '>
  <div className="flex flex-col items-start">
    <label className="block text-gray-500 text-sm font-medium" htmlFor="profilePic">
      Profile Picture <span className='text-rose-400'>*</span>
    </label>
    <div className="relative w-auto ">
      <input
        type="file"
        id="profilePic"
        name="profilePic"
        accept=".png, .jpg, .jpeg"

        onChange={handleChange}
        className="sr-only w-auto h-auto"
        required
      />
      <label
        htmlFor="profilePic"
        className="border-2 border-dashed border-gray-300  rounded cursor-pointer flex items-center justify-center w-96 h-24"
      >
        <div className="text-center flex justify-center items-center ">
        <img src={user} alt="Browse" className="w-12 h-14 mx-auto mr-3" />
          <span>Drag and drop image or <span className='text-blue-600'>Select</span></span>
          {/* <span className="block">
            <img src={user} alt="Browse" className="w-6 h-6 mx-auto" />
          </span> */}
        </div>
      </label>
    </div>
  </div>
</div>

        <div className="mb-4  pr-3 absolute bottom-0 right-0  " style={{backgroundColor:'#F4F4F4'}}>
          <div>
          <button
            type="reset"
            className="border-2    text-teal-400 font-bold py-2 px-4 rounded mr-3 reset-color" style={{borderColor:'#00BBD1', color:'#00BBD1'}}
          >
            Clear
          </button>
          <button
            type="submit"
            className=" hover:bg-teal-700 text-white font-bold py-2 px-4 rounded " style={{backgroundColor:'#00BBD1'}}
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
Createuser.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDataRefresh: PropTypes.func.isRequired
  // Other prop types here
};
export default Createuser