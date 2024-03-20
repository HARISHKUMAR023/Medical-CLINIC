import { useState } from 'react';
import axios from 'axios';
import { CgCloseR } from "react-icons/cg";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';


import TextField from '@mui/material/TextField';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const names = [
  "read_only",
  "edit_only",
  "update_only",
  "delete_only",
  "full_access",
];

const CreateRols = ({ onClose, onDataRefresh }) => {
  const loginusername = useSelector((state) => state.auth.user.name);
  const [role, setRole] = useState(""); // State to hold the role
  const [permissions, setPermissions] = useState([]); // State to hold the selected permissions

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setPermissions((prevPermissions) => [...prevPermissions, value]);
    } else {
      setPermissions((prevPermissions) =>
        prevPermissions.filter((permission) => permission !== value)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a payload containing role and permissions
    const postData = {
      role,
      permissions,
      createdBy: loginusername,
    };

    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const url = `${baseURL}roles`;
      const response = await axios.post(url, postData);
      toast.success(response.data.message);
      setTimeout(() => {
          onClose();
          onDataRefresh();
        }, 3000);
    } catch (error) {
      console.error("Error creating role:", error);
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end bg-gray-800 bg-opacity-75 z-50">
       <ToastContainer />
      <div className="bg-white rounded-lg w-3/12">
        <div className="flex justify-between items-center mb-4 p-4 table-head">
          <h2 className="text-2xl font-bold">Create Roles</h2>
          <button
            onClick={onClose}
            className="hover:text-gray-800 pr-3"
            style={{ color: "#00BBD1" }}
          >
            <CgCloseR className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          
          <div className="mx-3">
            <TextField
              id="Role"
              label="Enter the role "
              onChange={handleChangeRole}
              name="Role"
              type="text"
              className='w-80'
            />
          </div>

          <div className="mx-3 my-2">
            {names.map((name) => (
              <FormControlLabel
                key={name}
                control={
                  <Checkbox
                    checked={permissions.includes(name)}
                    onChange={handleCheckboxChange}
                    value={name}
                  />
                }
                label={name}
              />
            ))}
          </div>

          <div className=''
           
          >
            <div className='pr-3 absolute bottom-0 right-0  bg-gray-200  rounded-md w-3/12 h-auto   py-3 flex justify-end'>
              <button
                type="reset"
                className="border-2 text-teal-400 font-bold py-2 px-4 rounded mr-3 reset-color"
                style={{ borderColor: "#00BBD1", color: "#00BBD1" }}
              >
                Clear
              </button>
              <button
                type="submit"
                className="hover:bg-teal-700 text-white font-bold py-2 px-4 rounded "
                style={{ backgroundColor: "#00BBD1" }}
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

CreateRols.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDataRefresh: PropTypes.func.isRequired,
};

export default CreateRols;