import { Link } from "react-router-dom";
import "./Menu.css";
// import { MdOutlineDashboard } from "react-icons/md";
// import { IoSettingsOutline } from "react-icons/io5";
// import { LuUsers } from "react-icons/lu";
// import { LuFilePlus2 } from "react-icons/lu";
// import { IoWalletOutline } from "react-icons/io5";
// import { MdDriveFileMoveOutline } from "react-icons/md";
// import { BiHelpCircle } from "react-icons/bi";
import krnlogo from "../../assets/images/KRN-LOGO.svg";
// import { FaUsers } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { useSelector  } from "react-redux";

import dashbord from '../../assets/images/icons/menu/dashbords.png';
import activity from '../../assets/images/icons/menu/activity.png';
import reports from '../../assets/images/icons/menu/reports.png';

import admin from '../../assets/images/icons/menu/admin.png';
import master from '../../assets/images/icons/menu/master.png';
import settings from '../../assets/images/icons/menu/settings.png';
import users from '../../assets/images/icons/menu/users.png';
import img1 from '../../assets/illustration/AUTH-illustration/img1.png';
import button from '../../assets/illustration/AUTH-illustration/button.png';
import center from '../../assets/illustration/AUTH-illustration/center.png';
const Menu = () => {
 
  const  usertype  = useSelector((state) => state.auth.user.usertype);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="">
{/* <div className="mask-container">
        <div className="mask"></div>
    </div> */}

<div className="text-black font-normal flex flex-col items-center h-screen w-auto Menu p-3 ">
<img src={img1} alt="" className=" absolute top-0 left-0  " />
<img src={ button} alt="" className=" fixed bottom-0  w-64 h-52" />
 <img src={center} alt="" className=" absolute w-64 top-52" /> 
      <div className="flex flex-row justify-center items-center z-10 ">
        
      <img src={krnlogo} className="w-16 h-16" alt="" />
      <div className="flex flex-col pl-2">
        <h2 className="font-extrabold text-teal-700  text-2xl">K.R.N</h2>
        <p className="text-sm  font-semibold">MEDICAL CLINIC</p>
      </div>
      </div>
    
      <ul className="mt-5 z-40 ">
      <li className="flex items-center hover:border-l-4 hover:bg-teal-50 rounded" >
  <Link to="home" className="flex items-center mb-4 m-3 ">
    <img src={dashbord} className="mr-2" alt="" />Dashboard
     
  </Link>
</li> 

<li className="flex flex-col group hover:border-l-4 hover:bg-teal-50 rounded transition-all duration-300 ease-in-out ">
    <Link
        to="users"
        className="flex items-center m-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <img src={settings} alt="" className="mr-2"/>Settings 
        {isHovered ? (
            <IoMdArrowDropdown className="ml-2 mt-1" />
        ) : (
            <IoMdArrowDropright className="ml-2 mt-1" />
        )}
    </Link>

    <Link to="/profile" className="mb-4 m-3 ml-10 hidden group-hover:block"  onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
        Profile
    </Link>
</li>
{ usertype == 'admin' && (
  <li className="flex flex-col group hover:border-l-4 hover:bg-teal-50 rounded transition-all duration-300 ease-in-out">
    <Link
      to="admin"
      className="flex items-center m-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={admin} alt="" className="mr-2" />Admin
      {isHovered ? (
        <IoMdArrowDropdown className="ml-2 mt-1" />
      ) : (
        <IoMdArrowDropright className="ml-2 mt-1" />
      )}
    </Link>

    <Link
      to="admin"
      className="mb-4 m-3 ml-10 hidden group-hover:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
      Roles & Acceses
    </Link>

    <Link
      to="/profile"
      className="mb-4 m-3 ml-10 hidden group-hover:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
      Admin User
    </Link>
  </li>
)}
 
   
        <li className="flex items-center   hover:border-l-4 hover:bg-teal-50 rounded">
          <Link to="/users"className="flex items-center mb-4 m-3 "><img src={master} alt="" className="mr-2" />Master</Link>
        </li>
        <li className="flex items-center  hover:border-l-4 hover:bg-teal-50 rounded">
          <Link to="/users"className="flex items-center mb-4 m-3 "><img src={activity} alt="" className="mr-2" />Activity</Link>
        </li>
        <li className="flex items-center   hover:border-l-4 hover:bg-teal-50 rounded">
          <Link to="/users"className="flex items-center mb-4 m-4 "><img src={users} className="mr-2" />Users</Link>
        </li>
        <li className="flex items-center  hover:border-l-4 hover:bg-teal-50 rounded">
          <Link to="/users"className="flex items-center mb-4 m-3 "><img src={reports}className="mr-2" />Reports</Link>
        </li>
      
      </ul>
    </div>

    </div>
  
  );
};

export default Menu;