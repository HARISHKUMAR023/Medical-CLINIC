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
    <div className="w-auto h-auto m-4 bg-white  rounded ">
      <div className="row grid grid-cols-3 gap-3">
        <div className="flex shadow-2xl bg-primary  rounded-md w-72 h-auto p-5">
          <BiMoneyWithdraw className="text-white text-6xl  rounded-full bg-green-500  p-2" />

          <div className="ml-4">
            <h6 className="text-white text-sm font-bold">Total Billing</h6>
            <p className="text-white text-3xl font-semibold">$ 50000</p>
          </div>
        </div>

        <div className="flex shadow-2xl bg-primary  rounded-md w-72 h-auto p-5">
          < FaStoreAlt  className="text-white text-6xl  rounded-full bg-red-600  p-2" />

          <div className="ml-4">
            <h6 className="text-white text-sm font-bold">Total Stock items</h6>
            <p className="text-white text-3xl font-semibold">50</p>
          </div>
        </div>

        <div className="flex shadow-2xl bg-primary  rounded-md w-72 h-auto p-5">
          <IoTodaySharp className="text-white text-6xl  rounded-full bg-blue-700  p-2" />

          <div className="ml-4">
            <h6 className="text-white text-sm font-bold">Perday Billing</h6>
            <p className="text-white text-3xl font-semibold">$ 20000</p>
          </div>
        </div>




      </div>

<div className="flex flex-row w-auto mt-28">
  <div className="basis-1/2 bg-white shadow-lg m-5">
  <SplineChart />
  </div>
  <div className="basis-1/2 bg-white shadow-lg m-5">
  <PieChart />
  </div>


</div>
     
    </div>
  );
};

export default Home;
