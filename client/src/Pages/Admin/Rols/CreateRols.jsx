import { useState } from 'react';
import axios from 'axios';
import { CgCloseR } from "react-icons/cg";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'read_only',
  'edit_ony',
  'update_only',
  'delete_only',
  'full_assess'
 
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CreateRols = ({ onClose ,onDataRefresh}) => {
  const theme = useTheme();
  const loginusername = useSelector((state) => state.auth.user.name);
  const [role, setRole] = useState(''); // State to hold the role
  const [permissions, setPermissions] = useState([]); // State to hold the selected permissions

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleChangePermissions = (event) => {
    setPermissions(event.target.value);
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
      const response = await axios.post('http://localhost:5000/api/roles', postData);
      console.log(response.data);
      onClose();
      onDataRefresh()
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg w-6/12">
        <div className="flex justify-between items-center mb-4 p-4 table-head">
          <h2 className="text-2xl font-bold">Create Roles</h2>
          <button onClick={onClose} className="hover:text-gray-800 pr-3" style={{ color: '#00BBD1' }}>
            <CgCloseR className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mx-3'>
          <TextField id="Role" label="Enter the role "   onChange={handleChangeRole}  
             
              name="Role" type="text" />
            {/* <label className="block text-gray-500 text-sm font-medium" htmlFor="Role">
              Role <span className='text-rose-400'>*</span>
            </label>

            <input
              className="border border-gray-300 p-2 py-4 rounded"
              type="text"
              id="Role"
              name="Role"
              value={role}
              onChange={handleChangeRole}
              required
              placeholder='Enter the role '
            /> */}
          </div>

          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Permissions</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={permissions}
              onChange={handleChangePermissions}
              input={<OutlinedInput id="select-multiple-chip" label="Permissions" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, permissions, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="mb-4 pr-3 absolute bottom-0 right-0" style={{ backgroundColor: '#F4F4F4' }}>
            <div>
              <button
                type="reset"
                className="border-2 text-teal-400 font-bold py-2 px-4 rounded mr-3 reset-color" style={{ borderColor: '#00BBD1', color: '#00BBD1' }}
              >
                Clear
              </button>
              <button
                type="submit"
                className="hover:bg-teal-700 text-white font-bold py-2 px-4 rounded " style={{ backgroundColor: '#00BBD1' }}
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
  onDataRefresh: PropTypes.func.isRequired
};

export default CreateRols;
