
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
const Layout = () => {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn )
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="main flex flex-row ">
      {/* <div className="container flex flex-row "> */}
        <div className="menucontainer basis-2/12">
          <Menu />
        </div>
        <div className="content-Container basis-10/12">
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
