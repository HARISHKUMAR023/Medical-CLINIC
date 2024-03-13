import * as React from 'react';
import "./Login.css";
import axios from 'axios'; // Or use fetch API
import { useDispatch  } from 'react-redux';
import Dockerimg from "../../assets/illustration/AUTH-illustration/Docker-illustration.svg";

import logoKrn from "../../assets/images/KRN-LOGO.svg";
// import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import IconButton from '@mui/material/IconButton';
import bgtgreen from '../../assets/illustration/AUTH-illustration/t-green.png'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { loginRequest, loginSuccess, loginFailure } from "../../app/authSlice";
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';

import IconButton from '@mui/material/IconButton';
const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginRequest());

      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      // console.log('Login successful:', response.data);
       const user ={
        
         email:response.data.email,
         token : response.data.token,
         usertype:response.data.roles
       }
      console.log( user);
  
      // Assuming your backend returns 'usernames' and 'token'
      // const { usernames, token } = response.data;
      // const { usernames, token } = response.data;

      dispatch(loginSuccess({email:response.data.email, token: response.data.token , usertype:response.data.roles.role}));

      console.log("Login successful");
     
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.error('Authentication failed with status code:', error.response.status);
      } else if (error.request) {
        console.error('No response received from the server.');
      } else {
        console.error('Error during request setup:', error.message);
      }
      dispatch(loginFailure(error.message));
    }
  };
  return (
    <div className="Login py-24   px-24 ">

<div className="h-full w-full   bg-white flex  shadow-md rounded-md ">
<img src={bgtgreen} className="absolute top-0 left-0 z-10  w-auto h-auto " alt="" />
  <div className="Login-left basis-2/4 bg-auto bg-no-repeat  z-40 " >
 
    <img src={Dockerimg} className="" alt="" />
  </div>

  <div className="Login-Right mt-4 text-center basis-2/4 ">
  <img className="mx-auto block " src={logoKrn} alt="" />
    <h1 className="text-center font-bold text-4xl text-teal-300">Login</h1>
    <FormControl sx={{ m: 1, width: '50ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Username</InputLabel>
          <Input className="text-black" value={email} onChange={(e) => setemail(e.target.value)}
            id="standard-adornment-weight"
            endAdornment={<InputAdornment position="end"><FaUser className="text-teal-300" /></InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        </FormControl>
        <br />
        {/* <FormControl sx={{ m: 1, width: '50ch',marginTop:'10ch' }} variant="standard" >
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input className="text-black  " type="password"  value={password}
         onChange={(e) => setPassword(e.target.value)}
            id="standard-adornment-weight"
            endAdornment={<InputAdornment position="end"><FaLock className="text-teal-300  " /></InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
              
            }}
          />
        </FormControl> */}
         <FormControl sx={{ m: 1, width: '50ch',marginTop:'10ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input className="text-black " value={password}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}    onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <FaLock className="text-teal-300  " /> : <Visibility className="text-teal-300  "  />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <div className="flex justify-evenly mt-4">
          <p className="text-teal-300  font-semibold py-1">Forgot Password? Click Here</p>
          <button  className="bg-teal-300 text-white px-10 py-2 font-bold rounded-sm" onClick={handleSubmit}>Login</button>
        </div>



  </div>
</div>

    </div>
  )
}

export default Login