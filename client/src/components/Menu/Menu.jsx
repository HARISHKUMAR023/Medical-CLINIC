import { Link } from "react-router-dom";
import "./Menu.css";
import { MdOutlineDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { LuFilePlus2 } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";
import { MdDriveFileMoveOutline } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import krnlogo from "../../assets/images/KRN-LOGO.svg";
import { FaUsers } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

const Menu = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="text-black font-semibold flex flex-col items-center h-screen w-auto Menu p-3 ">
      <div className="flex flex-row justify-center items-center">
      <img src={krnlogo} className="w-16 h-16" alt="" />
      <div className="flex flex-col pl-2">
        <h2 className="font-extrabold text-teal-700  text-2xl">K.R.N</h2>
        <p className="text-sm  font-semibold">MEDICAL CLINIC</p>
      </div>
      </div>
    
      <ul className="mt-5  text-xl">
      <li className="flex items-center hover:border-l-4 hover:bg-teal-50 rounded" >
  <Link to="/" className="flex items-center mb-4 m-3 ">
    <MdOutlineDashboard className="mr-2" /> Dashboard
  </Link>
</li> 

<li className="flex flex-col group hover:border-l-4 hover:bg-teal-50 rounded transition-all duration-300 ease-in-out ">
    <Link
        to="/master"
        className="flex items-center m-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <IoSettingsOutline className="mr-2" />Settings 
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

<li className="flex flex-col group hover:border-l-4 hover:bg-teal-50 rounded transition-all duration-300 ease-in-ou">
    <Link
        to="/admin"
        className="flex items-center m-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <LuUsers  className="mr-2" />Admin
        {isHovered ? (
            <IoMdArrowDropdown className="ml-2 mt-1" />
        ) : (
            <IoMdArrowDropright className="ml-2 mt-1" />
        )}
    </Link>

    <Link to="/admin" className="mb-4 m-3 ml-10 hidden group-hover:block"  onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
        Roles & Acceses
    </Link>
    <Link to="/profile" className="mb-4 m-3 ml-10 hidden group-hover:block"  onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
        Admin User
    </Link>
</li>

        
   
        <li className="flex items-center   hover:border-l-4 hover:bg-teal-50 rounded">
          <Link to="/users"className="flex items-center mb-4 m-3 "><LuFilePlus2 className="mr-2" />Master</Link>
        </li>
        <li className="flex items-center  hover:border-l-4 hover:bg-teal-50 rounded">
          <Link to="/users"className="flex items-center mb-4 m-3 "><IoWalletOutline className="mr-2" />Activity</Link>
        </li>
        <li className="flex items-center   hover:border-l-4 hover:bg-teal-50 rounded">
          <Link to="/users"className="flex items-center mb-4 m-4 "><FaUsers  className="mr-2" />Users</Link>
        </li>
        <li className="flex items-center  hover:border-l-4 hover:bg-teal-50 rounded">
          <Link to="/users"className="flex items-center mb-4 m-3 "><MdDriveFileMoveOutline className="mr-2" />Reports</Link>
        </li>
        <li className="flex items-center   hover:border-l-4 hover:bg-teal-50 rounded">
          <Link to="/users"className="flex items-center mb-4 m-3 "><BiHelpCircle className="mr-2" />Help / Support</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;