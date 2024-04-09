import { useState } from "react";
import Chart from "react-apexcharts";

const Pie = () => {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false, // Hide the toolbar containing options like zoom, download, etc.
      },
      background: "transparent", // Set background to transparent
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false, // Hide x-axis line
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
      grid: {
        show: false, // Hide x-axis grid lines
      },
      zero: false, // Hide x-axis zero line
    },
    yaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false, // Hide y-axis line
      },
      axisTicks: {
        show: false, // Hide y-axis ticks
      },
      grid: {
        show: false, // Hide y-axis grid lines
        borderColor: "transparent", // Set grid line color to transparent
      },
    },
    plotOptions: {
      area: {
        fillTo: "origin",
        stroke: {
          show: true,
          colors: ["#ff0000"], // Change the color of the graph to red
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    colors: ["#001242", "#E91E63"],
  });

  const series = [
    {
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];

  return (
    <div className="mixed-chart  bg-white z-10 rounded-md">
      <Chart options={options} series={series} type="area" width="400" />
    </div>
  );
};

export default Pie;
