import { Link , NavLink,useLocation} from "react-router-dom";
import { Icon } from "@mui/material";
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
import { GoDotFill } from "react-icons/go";
import toggle from '../../assets/images/icons/menu/Menu.png';
// import selectPermissions from '../../selectors';
// import selectPermissions from '../../selectors'
const Menu = () => {
  const location = useLocation();
  const  usertype  = useSelector((state) => state.auth.user.usertype);
  // const permissions = useSelector(selectPermissions);
  const  permissions  = useSelector((state) => state.auth.user.permissions[0]);
  console.log(permissions)
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleSubMenuClick = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };
  
// const handleMouseEnter = () => {
//   setIsMenuOpen(true);
// };

// const handleMouseLeave = () => {
//   setIsMenuOpen(false);
// };
  return (
    <div className="transition duration-700 ease-in-out ">
{/* <div className="mask-container">
        <div className="mask"></div>
    </div> */}
<button
          className={`togglemenu mt-3 top-0 z-50 ${isMenuOpen ? 'fixed top-0 left-48' : 'fixed top-0 left-20'} ${!isMenuOpen ? "MenuClosed" : ""}`}
          onClick={handleToggle}  
        >
        <img src={toggle} alt="" />
        </button>
<div className={`text-black font-normal flex flex-col items-start h-screen w-auto Menu pl-2 `}>

<img src={img1} alt="" className={` absolute top-0 left-0 ${isMenuOpen ? 'block' : 'hidden'} `} />
<img src={ button} alt="" className={` fixed bottom-0  w-52 h-52 ${isMenuOpen ? 'block' : 'hidden'}`} />
 <img src={center} alt="" className={` absolute w-52 top-52  ${isMenuOpen ? 'block' : 'hidden'}`} />  
      <div className={`flex flex-row justify-center items-center z-10  `}>
        
      <img src={krnlogo} className={`w-16 h-16  `} alt="" />
      <div className={`flex flex-col pl-2 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <h2 className="font-extrabold text-teal-700  text-2xl">K.R.N</h2>
        <p className="text-sm  font-semibold">MEDICAL CLINIC</p>
      </div>
      </div>
    


      <ul className={`mt-5 z-40 `}>
      {permissions.includes('read_only') && (
      <li className={`flex items-center rounded pr-7 ${location.pathname === "/dashboard/home" ? "border-r-4 border-teal-400" : ""}`}>
          <NavLink to="/dashboard/home" className="flex items-center mb-4 m-2">
            {/* <img src={dashbord} className="mr-2" alt="" /> */}
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M13.5 9V4H20v5zM4 12V4h6.5v8zm9.5 8v-8H20v8zM4 20v-5h6.5v5zm1-9h4.5V5H5zm9.5 8H19v-6h-4.5zm0-11H19V5h-4.5zM5 19h4.5v-3H5zm4.5-3"/></svg>
            <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Dashboard</span>
          </NavLink>
        </li>
)}
        <li className="flex flex-col group rounded transition-all duration-300 ease-in-out">
          <Link
            to="users"
            className="flex items-center m-2"
            onClick={() => handleSubMenuClick(1)} // Pass a unique index for each submenu
          >
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12.6 20.936h-1.3a.883.883 0 0 1-.852-.654l-.774-2.833l-2.5 1.435a.886.886 0 0 1-1.06-.138l-.925-.919a.884.884 0 0 1-.143-1.066l1.469-2.545l-.006-.016l-2.787-.747a.882.882 0 0 1-.654-.851V11.3a.882.882 0 0 1 .652-.85l2.839-.777L5.12 7.171a.885.885 0 0 1 .141-1.062l.918-.918a.885.885 0 0 1 1.061-.142l2.552 1.465h.012l.745-2.79a.881.881 0 0 1 .851-.655h1.3a.883.883 0 0 1 .852.655l.762 2.838l2.509-1.441a.885.885 0 0 1 1.059.138l.926.919a.882.882 0 0 1 .141 1.067l-1.466 2.532l.008.022l2.786.746a.883.883 0 0 1 .653.851v1.3a.883.883 0 0 1-.654.852l-2.837.774l1.439 2.505a.881.881 0 0 1-.141 1.063l-.917.917a.888.888 0 0 1-1.063.141l-2.539-1.462l-.018.014l-.745 2.785a.885.885 0 0 1-.855.651m-1.21-1h1.119l.738-2.756a.888.888 0 0 1 .528-.592l.134-.052a.873.873 0 0 1 .76.057l2.51 1.445l.789-.789l-1.423-2.478a.881.881 0 0 1-.048-.78l.052-.125a.875.875 0 0 1 .584-.51l2.8-.749v-1.12l-2.755-.737a.885.885 0 0 1-.592-.529l-.052-.132a.882.882 0 0 1 .057-.763l1.449-2.508l-.8-.79l-2.48 1.425a.878.878 0 0 1-.772.052l-.115-.047a.888.888 0 0 1-.518-.588l-.748-2.806h-1.115l-.738 2.762a.883.883 0 0 1-.539.6l-.12.045a.874.874 0 0 1-.751-.058L6.822 5.962l-.789.789l1.422 2.476a.886.886 0 0 1 .046.785l-.051.12a.876.876 0 0 1-.579.5l-2.8.758v1.121l2.757.738a.889.889 0 0 1 .591.525l.048.121a.874.874 0 0 1-.055.77l-1.454 2.516l.8.791l2.47-1.419a.878.878 0 0 1 .787-.045l.106.044a.874.874 0 0 1 .526.591Zm-1.64-2.454h.008Zm-.15-.061h.007Zm4.655-10.885"/><path fill="currentColor" d="M12 15a3 3 0 1 1 3-3a3 3 0 0 1-3 3m0-5a2 2 0 1 0 2 2a2 2 0 0 0-2-2"/></svg><span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Settings </span>
            {selectedRow === 1 ? (
              <IoMdArrowDropdown className="ml-2 mt-1" />
            ) : (
              <IoMdArrowDropright className="ml-2 mt-1" />
            )}
          </Link>

          <Link
            to="/profile"
            className={`mb-4 m-2 ml-5 ${selectedRow === 1 ? 'block' : 'hidden'}`}
          >
            {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
            <span className={`flex items-center ${isMenuOpen ? 'block' : 'hidden'}`}> <GoDotFill className={`w-2 h-2 mr-3${isMenuOpen ? 'block' : 'hidden'}`} /> <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Profile</span></span>
          </Link>
        </li>

{ usertype == 'user' && (
        <li className="flex flex-col group rounded transition-all duration-300 ease-in-out">
          <Link
           
            className="flex items-center m-2"
            onClick={() => handleSubMenuClick(2)} // Pass a unique index for each submenu
          >
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24px" viewBox="0 0 36 36"><path fill="currentColor" d="M14.68 14.81a6.76 6.76 0 1 1 6.76-6.75a6.77 6.77 0 0 1-6.76 6.75m0-11.51a4.76 4.76 0 1 0 4.76 4.76a4.76 4.76 0 0 0-4.76-4.76" className="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M16.42 31.68A2.14 2.14 0 0 1 15.8 30H4v-5.78a14.81 14.81 0 0 1 11.09-4.68h.72a2.2 2.2 0 0 1 .62-1.85l.12-.11c-.47 0-1-.06-1.46-.06A16.47 16.47 0 0 0 2.2 23.26a1 1 0 0 0-.2.6V30a2 2 0 0 0 2 2h12.7Z" className="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M26.87 16.29a.37.37 0 0 1 .15 0a.42.42 0 0 0-.15 0" className="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="m33.68 23.32l-2-.61a7.21 7.21 0 0 0-.58-1.41l1-1.86A.38.38 0 0 0 32 19l-1.45-1.45a.36.36 0 0 0-.44-.07l-1.84 1a7.15 7.15 0 0 0-1.43-.61l-.61-2a.36.36 0 0 0-.36-.24h-2.05a.36.36 0 0 0-.35.26l-.61 2a7 7 0 0 0-1.44.6l-1.82-1a.35.35 0 0 0-.43.07L17.69 19a.38.38 0 0 0-.06.44l1 1.82a6.77 6.77 0 0 0-.63 1.43l-2 .6a.36.36 0 0 0-.26.35v2.05A.35.35 0 0 0 16 26l2 .61a7 7 0 0 0 .6 1.41l-1 1.91a.36.36 0 0 0 .06.43l1.45 1.45a.38.38 0 0 0 .44.07l1.87-1a7.09 7.09 0 0 0 1.4.57l.6 2a.38.38 0 0 0 .35.26h2.05a.37.37 0 0 0 .35-.26l.61-2.05a6.92 6.92 0 0 0 1.38-.57l1.89 1a.36.36 0 0 0 .43-.07L32 30.4a.35.35 0 0 0 0-.4l-1-1.88a7 7 0 0 0 .58-1.39l2-.61a.36.36 0 0 0 .26-.35v-2.1a.36.36 0 0 0-.16-.35M24.85 28a3.34 3.34 0 1 1 3.33-3.33A3.34 3.34 0 0 1 24.85 28" className="clr-i-outline clr-i-outline-path-4"/><path fill="none" d="M0 0h36v36H0z"/></svg> <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Admin</span>
            {selectedRow === 2 ? (
              <IoMdArrowDropdown className="ml-2 mt-1" />
            ) : (
              <IoMdArrowDropright className="ml-2 mt-1" />
            )}
          </Link>

          <Link
            to="admin"
            className={`mb-4 m-2 ml-5 ${selectedRow === 2 ? 'block' : 'hidden'}`}
          >
            {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
            <span className={`flex items-center ${isMenuOpen ? 'block' : 'hidden'}`}> <GoDotFill className={`w-2 h-2  mr-3${isMenuOpen ? 'block' : 'hidden'}`} /> <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Roles & Access</span></span>
          </Link>
           <Link
            to="adminuser"
            className={`mb-4 m-2 ml-5 ${selectedRow === 2 ? 'block' : 'hidden'}`}
          >
            {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
            <span className={`flex items-center ${isMenuOpen ? 'block' : 'hidden'}`}> <GoDotFill className={`w-2 h-2 mr-3 ${isMenuOpen ? 'block' : 'hidden'}`} /> <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Admin User</span></span>
          </Link>
         
        </li>)}
{/* { usertype == 'admin' && (
  <li className="flex flex-col group  rounded ">
    <Link
      to="admin"
      className="flex items-center m-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={admin} alt="" className="mr-2" /> <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Admin </span>
      {isHovered ? (
        <IoMdArrowDropdown className="ml-2 mt-1" />
      ) : (
        <IoMdArrowDropright className="ml-2 mt-1" />
      )}
    </Link>

    <Link
      to="admin"
      className={`mb-4 m-2 ml-5 hidden group-hover:block ${isMenuOpen ? 'block' : 'hidden'}`} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      <span className={`flex items-center ${isMenuOpen ? 'block' : 'hidden'}`}> <GoDotFill className={`${isMenuOpen ?'block':'hidden'}`}/>  <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Roles & Access </span></span>
     
    </Link>

    <Link
      to="/profile"
      className={`mb-4 m-2 ml-5 hidden group-hover:block ${isMenuOpen ? 'block' : 'hidden'}`} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
  
      <span className={`flex items-center ${isMenuOpen ? 'block' : 'hidden'}`}> <GoDotFill className={`${isMenuOpen ?'block':'hidden'}`} /><span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Admin User </span></span>
     
    </Link>
  </li>
)} */}
 
   
{ usertype == 'user' && (
        <li className="flex flex-col group rounded transition-all duration-300 ease-in-out">
          <Link
           
            className="flex items-center m-2"
            onClick={() => handleSubMenuClick(3)} // Pass a unique index for each submenu
          >
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24px" viewBox="0 0 36 36"><path fill="currentColor" d="M14.68 14.81a6.76 6.76 0 1 1 6.76-6.75a6.77 6.77 0 0 1-6.76 6.75m0-11.51a4.76 4.76 0 1 0 4.76 4.76a4.76 4.76 0 0 0-4.76-4.76" className="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M16.42 31.68A2.14 2.14 0 0 1 15.8 30H4v-5.78a14.81 14.81 0 0 1 11.09-4.68h.72a2.2 2.2 0 0 1 .62-1.85l.12-.11c-.47 0-1-.06-1.46-.06A16.47 16.47 0 0 0 2.2 23.26a1 1 0 0 0-.2.6V30a2 2 0 0 0 2 2h12.7Z" className="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M26.87 16.29a.37.37 0 0 1 .15 0a.42.42 0 0 0-.15 0" className="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="m33.68 23.32l-2-.61a7.21 7.21 0 0 0-.58-1.41l1-1.86A.38.38 0 0 0 32 19l-1.45-1.45a.36.36 0 0 0-.44-.07l-1.84 1a7.15 7.15 0 0 0-1.43-.61l-.61-2a.36.36 0 0 0-.36-.24h-2.05a.36.36 0 0 0-.35.26l-.61 2a7 7 0 0 0-1.44.6l-1.82-1a.35.35 0 0 0-.43.07L17.69 19a.38.38 0 0 0-.06.44l1 1.82a6.77 6.77 0 0 0-.63 1.43l-2 .6a.36.36 0 0 0-.26.35v2.05A.35.35 0 0 0 16 26l2 .61a7 7 0 0 0 .6 1.41l-1 1.91a.36.36 0 0 0 .06.43l1.45 1.45a.38.38 0 0 0 .44.07l1.87-1a7.09 7.09 0 0 0 1.4.57l.6 2a.38.38 0 0 0 .35.26h2.05a.37.37 0 0 0 .35-.26l.61-2.05a6.92 6.92 0 0 0 1.38-.57l1.89 1a.36.36 0 0 0 .43-.07L32 30.4a.35.35 0 0 0 0-.4l-1-1.88a7 7 0 0 0 .58-1.39l2-.61a.36.36 0 0 0 .26-.35v-2.1a.36.36 0 0 0-.16-.35M24.85 28a3.34 3.34 0 1 1 3.33-3.33A3.34 3.34 0 0 1 24.85 28" className="clr-i-outline clr-i-outline-path-4"/><path fill="none" d="M0 0h36v36H0z"/></svg> <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Master</span>
            {selectedRow === 3 ? (
              <IoMdArrowDropdown className="ml-2 mt-1" />
            ) : (
              <IoMdArrowDropright className="ml-2 mt-1" />
            )}
          </Link>

          <Link
            to="FinancialYear"
            className={`mb-4 m-2 ml-5 ${selectedRow === 3 ? 'block' : 'hidden'}`}
          >
            {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
            <span className={`flex items-center ${isMenuOpen ? 'block' : 'hidden'}`}> <GoDotFill className={`w-2 h-2 mr-3 ${isMenuOpen ? 'block' : 'hidden'}`} /> <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Financial Year</span></span>
          </Link>
           <Link
            to="Products"
            className={`mb-4 m-2 ml-5 ${selectedRow === 3 ? 'block' : 'hidden'}`}
          >
            {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
            <span className={`flex items-center ${isMenuOpen ? 'block' : 'hidden'}`}> <GoDotFill className={`w-2 h-2 mr-3 ${isMenuOpen ? 'block' : 'hidden'}`} /> <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Products</span></span>
          </Link>
          <Link
            to="Manufacturer"
            className={`mb-4 m-2 ml-5 ${selectedRow === 3 ? 'block' : 'hidden'}`}
          >
            {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
            <span className={`flex items-center ${isMenuOpen ? 'block' : 'hidden'}`}> <GoDotFill className={`w-2 h-2 mr-3 ${isMenuOpen ? 'block' : 'hidden'}`} /> <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Manufacturer</span></span>
          </Link>
           {/* Paymenttype */}
           <Link
            to="Paymenttype"
            className={`mb-4 m-2 ml-5 ${selectedRow === 3 ? 'block' : 'hidden'}`}
          >
            {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
            <span className={`flex items-center ${isMenuOpen ? 'block' : 'hidden'}`}> <GoDotFill className={`w-2 h-2 mr-3 ${isMenuOpen ? 'block' : 'hidden'}`} /> <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Payment type</span></span>
          </Link>
        </li>)}
        



        { usertype == 'user' && (
        <li className="flex flex-col group rounded transition-all duration-300 ease-in-out">
          <Link
           
            className="flex items-center m-2"
            onClick={() => handleSubMenuClick(4)} // Pass a unique index for each submenu
          >
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24px" viewBox="0 0 36 36"><path fill="currentColor" d="M14.68 14.81a6.76 6.76 0 1 1 6.76-6.75a6.77 6.77 0 0 1-6.76 6.75m0-11.51a4.76 4.76 0 1 0 4.76 4.76a4.76 4.76 0 0 0-4.76-4.76" className="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M16.42 31.68A2.14 2.14 0 0 1 15.8 30H4v-5.78a14.81 14.81 0 0 1 11.09-4.68h.72a2.2 2.2 0 0 1 .62-1.85l.12-.11c-.47 0-1-.06-1.46-.06A16.47 16.47 0 0 0 2.2 23.26a1 1 0 0 0-.2.6V30a2 2 0 0 0 2 2h12.7Z" className="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M26.87 16.29a.37.37 0 0 1 .15 0a.42.42 0 0 0-.15 0" className="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="m33.68 23.32l-2-.61a7.21 7.21 0 0 0-.58-1.41l1-1.86A.38.38 0 0 0 32 19l-1.45-1.45a.36.36 0 0 0-.44-.07l-1.84 1a7.15 7.15 0 0 0-1.43-.61l-.61-2a.36.36 0 0 0-.36-.24h-2.05a.36.36 0 0 0-.35.26l-.61 2a7 7 0 0 0-1.44.6l-1.82-1a.35.35 0 0 0-.43.07L17.69 19a.38.38 0 0 0-.06.44l1 1.82a6.77 6.77 0 0 0-.63 1.43l-2 .6a.36.36 0 0 0-.26.35v2.05A.35.35 0 0 0 16 26l2 .61a7 7 0 0 0 .6 1.41l-1 1.91a.36.36 0 0 0 .06.43l1.45 1.45a.38.38 0 0 0 .44.07l1.87-1a7.09 7.09 0 0 0 1.4.57l.6 2a.38.38 0 0 0 .35.26h2.05a.37.37 0 0 0 .35-.26l.61-2.05a6.92 6.92 0 0 0 1.38-.57l1.89 1a.36.36 0 0 0 .43-.07L32 30.4a.35.35 0 0 0 0-.4l-1-1.88a7 7 0 0 0 .58-1.39l2-.61a.36.36 0 0 0 .26-.35v-2.1a.36.36 0 0 0-.16-.35M24.85 28a3.34 3.34 0 1 1 3.33-3.33A3.34 3.34 0 0 1 24.85 28" className="clr-i-outline clr-i-outline-path-4"/><path fill="none" d="M0 0h36v36H0z"/></svg> <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Users</span>
            {selectedRow === 4 ? (
              <IoMdArrowDropdown className="ml-2 mt-1" />
            ) : (
              <IoMdArrowDropright className="ml-2 mt-1" />
            )}
          </Link>

          <Link
            to="Suppliersview"
            className={`mb-4 m-2 ml-5 ${selectedRow === 4 ? 'block' : 'hidden'}`}
          >
            {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
            <span className={`flex items-center ${isMenuOpen ? 'block' : 'hidden'}`}> <GoDotFill className={`w-2 h-2 mr-3 ${isMenuOpen ? 'block' : 'hidden'}`} /> <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Suppliers</span></span>
          </Link>
           
        </li>)}
        {/* <li className="flex items-center     rounded ">
          <Link to="/users"className="flex items-center mb-4 m-2 "><img src={master} alt="" className="mr-2" /><span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Master </span></Link>
        </li> */}
        <li className="flex items-center   rounded ">
          <Link to="/users"className="flex items-center mb-4 m-2 "><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="19px" height="19px" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25H1a.5.5 0 0 0-.5.5V13a.5.5 0 0 0 .5.5h4.25a.5.5 0 0 0 .5-.5V8.75a.5.5 0 0 0-.5-.5m7.75 0H8.75a.5.5 0 0 0-.5.5V13a.5.5 0 0 0 .5.5H13a.5.5 0 0 0 .5-.5V8.75a.5.5 0 0 0-.5-.5M9.13.5H4.88a.5.5 0 0 0-.5.5v4.25a.5.5 0 0 0 .5.5h4.25a.5.5 0 0 0 .5-.5V1a.5.5 0 0 0-.5-.5"/></svg> <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Activity </span></Link>
        </li>
        <li className="flex items-center   rounded ">
          <Link to="/users"className="flex items-center mb-4 m-2 "><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19.128a9.38 9.38 0 0 0 2.625.372a9.337 9.337 0 0 0 4.121-.952a4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0a3.375 3.375 0 0 1 6.75 0m8.25 2.25a2.625 2.625 0 1 1-5.25 0a2.625 2.625 0 0 1 5.25 0"/></svg><span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Users </span></Link>
        </li>
        <li className="flex items-center   rounded ">
          <Link to="/users"className="flex items-center mb-4 m-2 "><img src={reports}className="mr-2" /> <span className={`${isMenuOpen ? 'block pr-28' : 'hidden'}`}>Reports </span></Link>
        </li>
      
      </ul>
    </div>

    </div>
  
  );
};

export default Menu;