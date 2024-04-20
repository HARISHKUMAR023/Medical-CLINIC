
import './App.css'
import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet ,Navigate } from "react-router-dom";
import Login from './Pages/Auth/Login';
import Home from './Pages/Home/Home';
import Navbar  from './components/Navbar/Navbar';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
// import Users from './Pages/Users/Users';
import Admin from "./Pages/Admin/Admin";
import {  useSelector } from 'react-redux';
import Adminuser from './Pages/Admin/adminuser/Adminuser';
import Manufacturer from './Pages/Master/Manufacturer/Manufacturer';
import Products from './Pages/Master/Products/Products';
import FinancialYear from './Pages/Master/FinancialYear/FinancialYear';
import Paymenttype from './Pages/Master/Paymenttype/Paymenttype';
import Suppliers from './Pages/Users/Suppliers/Suppliers';
import Patients from './Pages/Users/Patients/Patients';
import Purchase from './Pages/Activity/Purchase/Purchase';
import AddPurchase from './Pages/Activity/Purchase/AddPurchase';
import Billing from './Pages/Activity/Billing/Billing';
import Pagenotfouned from './Pages/Pagenotfouned';
import Log from './Pages/Log/Log';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from 'react-ga';
ReactGA.initialize('G-EZ432Z7GGJ');
ReactGA.pageview(window.location.pathname + window.location.search);
const Layout = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode === 'true'; // localStorage stores everything as a string
  });
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn )
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className={darkMode ? 'dark' : ''}>
<div  className="bg-white  dark:bg-[#1e1e1e] text-black dark:text-white  flex flex-row h-screen overflow-hidden ">
      {/* <div className="container flex flex-row "> */}
        <div className="menucontainer  max-h-screen">
          <Menu />
        </div>
        <div className="content-Container basis-full h-auto w-64 dark:bg-[#1e1e1e] dark:text-white">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <ToastContainer />
          <div className="overflow-y-auto bg-[#E5EAEF] dark:bg-[#333333] pt-2 rounded-s-xl">
            <Outlet />
          </div>
          <Footer />
        </div>
      {/* </div> */}
      
    </div>
    </div>
    
  );
};

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },

      // {
      //   path: "users",
      //   element: <Users />,
      // },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "adminuser",
        element: <Adminuser />,
      },
      {
        path: "FinancialYear",
        element: <FinancialYear />,
      },
      {
        path: "Products",
        element: <Products  />,
      },
      {
        path: "Manufacturer",
        element: <Manufacturer />,
      },
      {
        path: "Paymenttype",
        element: <Paymenttype/>,
      },
      {
        path: "Suppliersview",
        element: <Suppliers />,
      },
      {
        path: "Patients",
        element: <Patients />,
      },
      {
        path: "Purchase",
        element: <Purchase />,
       
      },
      {
        path: "/dashboard/Purchase/addPurchase",
        element: <AddPurchase />,
       
      },
      {
        path: "Billing",
        element: <Billing />,
       
      },

    ],
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <Pagenotfouned />,
  },
  {
    path: "/logview",
    element: <Log />,
  },
]);
function App() {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // if (!isLoggedIn) {
  //   return <Navigate to="/" />; 
  // }


  return (
    <>
     <RouterProvider router={router}  />

    </>
  )
}

export default App
