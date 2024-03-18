
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet ,Navigate } from "react-router-dom";
import Login from './Pages/Auth/Login';
import Home from './Pages/Home/Home';
import Navbar  from './components/Navbar/Navbar';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import Users from './Pages/Users/Users';
import Admin from "./Pages/Admin/Admin";
import {  useSelector } from 'react-redux';
import Adminuser from './Pages/Admin/adminuser/Adminuser';
import Manufacturer from './Pages/Master/Manufacturer/Manufacturer';
import Products from './Pages/Master/Products/Products';
import Payments from './Pages/Master/Payments/Payments';
import Financialyear from './Pages/Master/Financial_Year/Financialyear';


const Layout = () => {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn )
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="main flex flex-row ">
      {/* <div className="container flex flex-row "> */}
        <div className="menucontainer  ">
          <Menu />
        </div>
        <div className="content-Container basis-full">
          <Navbar />
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

      {
        path: "users",
        element: <Users />,
      },
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
