
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
import Payments from './Pages/Master/Payments/Payments';
import Financialyear from './Pages/Master/Financial_Year/Financialyear';


const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);
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
        path: "Financialyear",
        element: <Financialyear />,
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
