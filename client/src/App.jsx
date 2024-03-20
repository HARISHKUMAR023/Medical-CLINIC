
import './App.css'
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
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = () => {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn )
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="main flex flex-row max-h-screen">
      {/* <div className="container flex flex-row "> */}
        <div className="menucontainer  max-h-screen">
          <Menu />
        </div>
        <div className="content-Container basis-full max-h-screen">
          <Navbar />
          <ToastContainer />
          <div className="overflow-y-auto">
      <Outlet />
    </div>
          <Footer />
        </div>
      {/* </div> */}
      
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
        element: <FinancialYear  />,
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
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
]);
function App() {
 

  return (
    <>
     <RouterProvider router={router} />
   {/* <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Login />} />

     
        <Route
          path="/*"
          element={
            <>
              <Navbar/>
              <Asite />
              
            </>
          }
        >
          <Route path="home" element={<Home />} />
       
        </Route>
      </Routes>
    </BrowserRouter> */}
    </>
  )
}

export default App
