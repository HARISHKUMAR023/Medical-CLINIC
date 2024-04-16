import { Link, NavLink, useLocation } from "react-router-dom";
// import { Icon } from "@mui/material";
import "./Menu.css";
import krnlogo from "../../assets/images/KRN-LOGO.svg";
// import { FaUsers } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { useSelector } from "react-redux";
//import reports from "../../assets/images/icons/menu/reports.png";
import { GoDotFill } from "react-icons/go";
//import toggle from "../../assets/images/icons/menu/Menu.png";
import { FaUserShield } from "react-icons/fa6";
import { AiFillDatabase } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { MdLocalActivity } from "react-icons/md";
import { FaFileMedical } from "react-icons/fa6";
import { MdSettingsSuggest } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdBookmarkAdded } from "react-icons/md";
const Menu = () => {
  const location = useLocation();
  // const usertype = useSelector((state) => state.auth.user.usertype);
  // const permissions = useSelector(selectPermissions);
  const permissions = useSelector((state) => state.auth.user.permissions);
  console.log(permissions);
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
        className={`togglemenu mt-3 top-0 z-50  ${
          isMenuOpen ? "fixed top-0 left-48" : "fixed top-0 left-20"
        } ${!isMenuOpen ? "MenuClosed" : ""}`}
        onClick={handleToggle}
      >
        <GiHamburgerMenu className="text-2xl text-orange-600 " />
      </button>
      <div
        className={`text-[#848089] font-normal flex flex-col items-start h-screen Menu pl-2 `}
      >
        {/* <img src={img1} alt="" className={` absolute top-0 left-0 ${isMenuOpen ? 'block' : 'hidden'} `} />
<img src={ button} alt="" className={` fixed bottom-0  w-52 h-52 ${isMenuOpen ? 'block' : 'hidden'}`} />
 <img src={center} alt="" className={` absolute w-52 top-52  ${isMenuOpen ? 'block' : 'hidden'}`} />   */}
        <div className={`flex flex-row justify-center items-center z-10 pt-5 `}>
          <img src={krnlogo} className={`w-16 h-16  `} alt="" />
          <div
            className={`flex flex-col pl-2 ${isMenuOpen ? "block" : "hidden"}`}
          >
            <h2 className="font-extrabold text-orange-600  text-2xl">K.R.N</h2>
            <p className="text-sm text-black dark:text-white font-semibold">MEDICAL CLINIC</p>
          </div>
        </div>

        <ul className={`mt-10 z-40   dark:text-primary-text `}>
        {/* permissions.includes(["read_only", "full_access"]) && */}
        {/* &&(usertype === "admin" || usertype === "user") */}
        { (permissions.includes("read_only") || permissions.includes("super_admin_all_page")) && (
            <li
              className={`flex items-center rounded   ${
                location.pathname === "/dashboard/home"
                  ? "border-r-4 border-white"
                  : ""
              }`}
            >
              <NavLink
                to="/dashboard/home"
                className="flex items-center m-2 w-full focus:text-orange-500 focus:bg-orange-100 rounded-md"
              >
                {/* <img src={dashbord} className="mr-2" alt="" /> */}
                <RiDashboardFill className="ml-2 mr-3 text-2xl"/>
                <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                  Dashboard
                </span>
              </NavLink>
            </li>
          )}
          <li className="flex flex-col group rounded transition-all duration-300 ease-in-out mt-5" >
            <Link
              to="users"
              className="flex items-center m-2 custom justify-between"
              onClick={() => handleSubMenuClick(1)} // Pass a unique index for each submenu
            >
              <div className="flex">
                <MdSettingsSuggest  className="ml-2 mr-3 text-2xl"/>
                <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                  Settings{" "}
                </span>
              </div>
              <div className="mr-4">
                {selectedRow === 1 ? (
                  <IoMdArrowDropdown className="ml-2 mt-1" />
                ) : (
                  <IoMdArrowDropright className="ml-2 mt-1" />
                )}
              </div>
            </Link>

            <Link
              to="/profile"
              className={`mb-4 m-2 ml-5 ${
                selectedRow === 1 ? "block" : "hidden"
              }`}
            >
              {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
              <span
                className={`flex items-center ${
                  isMenuOpen ? "block" : "hidden"
                }`}
              >
                {" "}
                <GoDotFill
                  className={`w-2 h-2 mr-3${isMenuOpen ? "block" : "hidden"}`}
                />{" "}
                <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                  Profile
                </span>
              </span>
            </Link>
          </li>

          {  (permissions.includes("read_only") || permissions.includes("super_admin_all_page")) && (
            <li className="flex flex-col group rounded transition-all duration-300 ease-in-out mt-5">
              <Link
               to="admin"
                className="flex items-center m-2 justify-between custom "
                onClick={() => handleSubMenuClick(2)} // Pass a unique index for each submenu
              >
                
                  <div className="flex ">
                    <FaUserShield className="ml-2 mr-3 text-2xl" />{" "}
                    <span className={`${isMenuOpen ? "block" : "hidden"}` }>
                      Admin
                    </span>
                  </div>
                  <div className="mr-4">
                    {selectedRow === 2 ? (
                      <IoMdArrowDropdown className="ml-2 mt-1" />
                    ) : (
                      <IoMdArrowDropright className="ml-2 mt-1" />
                    )}
                  </div>
               
              </Link>

              {/* <Link
                to="admin"
                className={`mb-4 m-2 ml-5 ${
                  selectedRow === 2 ? "block" : "hidden"
                }`}
              >
              
                <span
                  className={`flex items-center ${
                    isMenuOpen ? "block" : "hidden"
                  }`}
                >
                  {" "}
                  <GoDotFill
                    className={`w-2 h-2  mr-3${
                      isMenuOpen ? "block" : "hidden"
                    }`}
                  />{" "}
                  <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                    Roles & Access
                  </span>
                </span>
              </Link> */}
              <Link
                to="admin"
                className={`mb-4 m-2 ml-10 custom2  ${
                  selectedRow === 2 ? "block" : "hidden"
                }`}
              >
                {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
                <span
                  className={`flex items-center  ${
                    isMenuOpen ? "block" : "hidden"
                  }`}
                >
                  {" "}
                  <GoDotFill
                    className={`w-2 h-2 mr-3  ${
                      isMenuOpen ? "block" : "hidden"
                    }`}
                  />{" "}
                  <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                  Roles & Access
                  </span>
                </span>
              </Link>
              <Link
                to="adminuser"
                className={`mb-4 m-2 ml-10 custom2 ${
                  selectedRow === 2 ? "block" : "hidden"
                }`}
              >
                {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
                <span
                  className={`flex items-center ${
                    isMenuOpen ? "block" : "hidden"
                  }`}
                >
                  {" "}
                  <GoDotFill
                    className={`w-2 h-2 mr-3 ${
                      isMenuOpen ? "block" : "hidden"
                    }`}
                  />{" "}
                  <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                    Admin User
                  </span>
                </span>
              </Link>
            </li>
          )}
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

{ (permissions.includes("read_only") || permissions.includes("super_admin_all_page")) &&(
            <li className="flex flex-col group rounded transition-all duration-300 ease-in-out mt-5 ">
              <Link
                className="flex items-center m-2 custom justify-between"
                onClick={() => handleSubMenuClick(3)} // Pass a unique index for each submenu
              >
                <div className="flex">
                  <AiFillDatabase className="ml-2 mr-3 text-2xl" /> {" "}
                  <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                    Master
                  </span>
                </div>
                <div className="mr-4">
                  {selectedRow === 3 ? (
                    <IoMdArrowDropdown className="ml-2 mt-1" />
                  ) : (
                    <IoMdArrowDropright className="ml-2 mt-1" />
                  )}
                </div>
              </Link>

              <Link
                to="FinancialYear"
                className={`mb-4 m-2 ml-10 custom2 ${
                  selectedRow === 3 ? "block" : "hidden"
                }`}
              >
                {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
                <span
                  className={`flex items-center  ${
                    isMenuOpen ? "block" : "hidden"
                  }`}
                >
                  {" "}
                  <GoDotFill
                    className={`w-2 h-2 mr-3 ${
                      isMenuOpen ? "block" : "hidden"
                    }`}
                  />{" "}
                  <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                    Financial Year
                  </span>
                </span>
              </Link>
              <Link
                to="Products"
                className={`mb-4 m-2 ml-10 custom2 ${
                  selectedRow === 3 ? "block" : "hidden"
                }`}
              >
                {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
                <span
                  className={`flex items-center ${
                    isMenuOpen ? "block" : "hidden"
                  }`}
                >
                  {" "}
                  <GoDotFill
                    className={`w-2 h-2 mr-3 ${
                      isMenuOpen ? "block" : "hidden"
                    }`}
                  />{" "}
                  <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                    Products
                  </span>
                </span>
              </Link>
              <Link
                to="Manufacturer"
                className={`mb-4 m-2 ml-10 custom2 ${
                  selectedRow === 3 ? "block" : "hidden"
                }`}
              >
                {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
                <span
                  className={`flex items-center ${
                    isMenuOpen ? "block" : "hidden"
                  }`}
                >
                  {" "}
                  <GoDotFill
                    className={`w-2 h-2 mr-3 ${
                      isMenuOpen ? "block" : "hidden"
                    }`}
                  />{" "}
                  <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                    Manufacturer
                  </span>
                </span>
              </Link>
              {/* Paymenttype */}
              <Link
                to="Paymenttype"
                className={`mb-4 m-2 ml-10 custom2 ${
                  selectedRow === 3 ? "block" : "hidden"
                }`}
              >
                {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
                <span
                  className={`flex items-center ${
                    isMenuOpen ? "block" : "hidden"
                  }`}
                >
                  {" "}
                  <GoDotFill
                    className={`w-2 h-2 mr-3 ${
                      isMenuOpen ? "block" : "hidden"
                    }`}
                  />{" "}
                  <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                    Payment type
                  </span>
                </span>
              </Link>
            </li>
          )}

{ (permissions.includes("read_only") || permissions.includes("super_admin_all_page")) && (
            <li className="flex flex-col group rounded transition-all duration-300 ease-in-out mt-5">
              <Link
                className="flex items-center m-2 custom justify-between"
                onClick={() => handleSubMenuClick(4)} // Pass a unique index for each submenu
              > 
                <div className="flex">
                  <FaUserGroup  className="ml-2 mr-3 text-2xl"/>{" "}
                  <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                    Users
                  </span>
                </div>
                <div className="mr-4">
                  {selectedRow === 4 ? (
                    <IoMdArrowDropdown className="ml-2 mt-1" />
                  ) : (
                    <IoMdArrowDropright className="ml-2 mt-1" />
                  )}
                </div>
              </Link>
              <Link
                to="Patients"
                className={`mb-4 m-2 ml-10 custom2 ${
                  selectedRow === 4 ? "block" : "hidden"
                }`}
              >
                {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
                <span
                  className={`flex items-center ${
                    isMenuOpen ? "block" : "hidden"
                  }`}
                >
                  {" "}
                  <GoDotFill
                    className={`w-2 h-2 mr-3 ${
                      isMenuOpen ? "block" : "hidden"
                    }`}
                  />{" "}
                  <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                    Patients
                  </span>
                </span>
              </Link>
              <Link
                to="Suppliersview"
                className={`mb-4 m-2 ml-10 custom2 ${
                  selectedRow === 4 ? "block" : "hidden"
                }`}
              >
                {/* Add an icon if needed, e.g., <IoProfileOutline className="mr-2" /> */}
                <span
                  className={`flex items-center ${
                    isMenuOpen ? "block" : "hidden"
                  }`}
                >
                  {" "}
                  <GoDotFill
                    className={`w-2 h-2 mr-3 ${
                      isMenuOpen ? "block" : "hidden"
                    }`}
                  />{" "}
                  <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                    Suppliers
                  </span>
                </span>
              </Link>
            </li>
          )}
          {/* <li className="flex items-center     rounded ">
          <Link to="/users"className="flex items-center mb-4 m-2 "><img src={master} alt="" className="mr-2" /><span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Master </span></Link>
        </li> */}
          {/* <li className="flex items-center   rounded ">
          <Link to="/users"className="flex items-center mb-4 m-2 "><svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="19px" height="19px" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25H1a.5.5 0 0 0-.5.5V13a.5.5 0 0 0 .5.5h4.25a.5.5 0 0 0 .5-.5V8.75a.5.5 0 0 0-.5-.5m7.75 0H8.75a.5.5 0 0 0-.5.5V13a.5.5 0 0 0 .5.5H13a.5.5 0 0 0 .5-.5V8.75a.5.5 0 0 0-.5-.5M9.13.5H4.88a.5.5 0 0 0-.5.5v4.25a.5.5 0 0 0 .5.5h4.25a.5.5 0 0 0 .5-.5V1a.5.5 0 0 0-.5-.5"/></svg> <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>Activity </span></Link>
        </li> */}
         { (permissions.includes("read_only") || permissions.includes("super_admin_all_page")) && (
            <li className="flex flex-col group rounded transition-all duration-300 ease-in-out mt-5">
              <Link
                className="flex items-center m-2 custom2 justify-between"
                onClick={() => handleSubMenuClick(5)} // Pass a unique index for each submenu
              >
                <div className="flex">
                  <MdLocalActivity  className="ml-2 mr-3 text-2xl"/>{" "}
                  <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                    Activity{" "}
                  </span>
                </div>
                <div className="mr-4">
                  {selectedRow === 5 ? (
                    <IoMdArrowDropdown className="ml-2 mt-1" />
                  ) : (
                    <IoMdArrowDropright className="ml-2 mt-1" />
                  )}
                </div>
              </Link>
              <Link
                to="Purchase"
                className={`mb-4 m-2 ml-5 custom2 ${
                  selectedRow === 5 ? "block" : "hidden"
                }`}
              >
                <span
                  className={`flex items-center ${
                    isMenuOpen ? "block" : "hidden"
                  }`}
                >
                  {" "}
                  <GoDotFill
                    className={`w-2 h-2 mr-3 ${
                      isMenuOpen ? "block" : "hidden"
                    }`}
                  />{" "}
                  <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                    Purchase
                  </span>
                </span>
              </Link>
              <Link
                to="Billing"
                onClick={() => window.gtag('event', 'visit_billing_page')}
                className={`mb-4 m-2 ml-5 custom ${
                  selectedRow === 5 ? "block" : "hidden"
                }`}
              >
                <span
                  className={`flex items-center ${
                    isMenuOpen ? "block" : "hidden"
                  }`}
                >
                  {" "}
                  <GoDotFill
                    className={`w-2 h-2 mr-3 ${
                      isMenuOpen ? "block" : "hidden"
                    }`}
                  />{" "}
                  <span className={`${isMenuOpen ? "block" : "hidden"}`}>
                    Billing
                  </span>
                </span>
              </Link>
            </li>
          )}
          <li className="flex items-center   rounded mt-5">
            <Link to="/users" className="flex items-center mb-4 m-2 custom">
            <MdBookmarkAdded className="ml-2 mr-3 text-2xl" />{" "}
              <span className={`${isMenuOpen ? "block pr-28" : "hidden"}`}>
                Appoiment {" "}
              </span>
            </Link>
          </li>
          <li className="flex items-center   rounded mt-5">
            <Link to="/users" className="flex items-center mb-4 m-2 custom">
            <FaFileMedical className="ml-2 mr-3 text-2xl" />{" "}
              <span className={`${isMenuOpen ? "block pr-28" : "hidden"}`}>
                Reports{" "}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
