// import { useState } from "react";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaStoreAlt } from "react-icons/fa";
import { IoTodaySharp } from "react-icons/io5";
// import Chart from "react-apexcharts";
// import Pie from "../../components/graphs/Pie";
import PieChart from "../../components/graphs/Piechart";
import SplineChart from "../../components/graphs/Spineline";
const Home = () => {
  return (
    <div className="h-auto m-2 p-4 bg-white max-h-screen rounded dark:bg-[#1e1e1e] overflow-y-auto ">
      
      <div className="flex  justify-between w-full h-full">
        
        <div className="flex shadow-2xl border border-dark-orange hover:bg-dark-orange hover:bg-opacity-20 dark:text-black  rounded-md w-72 h-auto p-5">
          <BiMoneyWithdraw className="text-white text-6xl  rounded-full bg-green-500  p-2" />

          <div className="ml-4">
            <h6 className="text-black dark:text-white text-sm font-bold">Total Billing</h6>
            <p className="text-black dark:text-white text-3xl font-semibold">$ 50000</p>
          </div>
        </div>

        <div className="flex shadow-2xl border border-dark-orange hover:bg-dark-orange hover:bg-opacity-20 dark:text-black  rounded-md w-72 h-auto p-5">
          < FaStoreAlt  className="text-white text-6xl  rounded-full bg-red-600  p-2" />

          <div className="ml-4">
            <h6 className="text-black dark:text-white text-sm font-bold">Dummy</h6>
            <p className="text-black dark:text-white text-3xl font-semibold">$56.00</p>
          </div>
        </div>

        <div className="flex shadow-2xl border border-dark-orange hover:bg-dark-orange hover:bg-opacity-20 dark:text-black  rounded-md w-72 h-auto p-5">
          < FaStoreAlt  className="text-white text-6xl  rounded-full bg-red-600  p-2" />

          <div className="ml-4">
            <h6 className="text-black dark:text-white text-sm font-bold">Total Stock items</h6>
            <p className="text-black dark:text-white text-3xl font-semibold">50</p>
          </div>
        </div>

        <div className="flex shadow-2xl border border-dark-orange hover:bg-dark-orange hover:bg-opacity-20 rounded-md w-72 h-auto p-5">
          <IoTodaySharp className="text-white text-6xl rounded-full bg-blue-700  p-2" />

          <div className="ml-4">
            <h6 className="text-black dark:text-white text-sm font-bold">Perday Billing</h6>
            <p className="text-black dark:text-white text-3xl font-semibold">$ 20000</p>
          </div>
        </div>

      </div>

      <div className="flex flex-row gap-4 mt-28 ">
        <div className="bg-primary dark:bg-dark2 border border-dark-orange dark:text-white rounded-md shadow-lg w-full">
          <SplineChart />
        </div>
        <div className="bg-primary dark:bg-dark2 border border-dark-orange dark:text-white rounded-md shadow-lg w-full">
          <PieChart sx={{ color: 'white' }}/>
        </div>
      </div>
     
    </div>
  );
};

export default Home;
