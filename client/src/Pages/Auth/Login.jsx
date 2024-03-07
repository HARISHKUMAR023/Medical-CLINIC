import "./Login.css";
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
const Login = () => {
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const HandleUsernameChange = (event)=>{
    setUsername(event.target.value);

  }
  const HandlePasswordChange = (event)=>{
    setPassword(event.target.value)
  }
  const submitdata = ()=>{
alert(`username ${username}, password is ${password} `)
setUsername('')
setPassword('')
  }

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
          <Input className="text-black" value={username} onChange={HandleUsernameChange}
            id="standard-adornment-weight"
            endAdornment={<InputAdornment position="end"><FaUser className="text-teal-300" /></InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        </FormControl>
        <br />
        <FormControl sx={{ m: 1, width: '50ch',marginTop:'10ch' }} variant="standard" >
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input className="text-black  " type="password"  value={password}
          onChange={ HandlePasswordChange}
            id="standard-adornment-weight"
            endAdornment={<InputAdornment position="end"><FaLock className="text-teal-300  " /></InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
              
            }}
          />
        </FormControl>
        <div className="flex justify-evenly mt-4">
          <p className="text-teal-300  font-semibold py-1">Forgot Password? Click Here</p>
          <button  className="bg-teal-300 text-white px-10 py-2 font-bold rounded-sm" onClick={submitdata}>Login</button>
        </div>



  </div>
</div>

    </div>
  )
}

export default Login