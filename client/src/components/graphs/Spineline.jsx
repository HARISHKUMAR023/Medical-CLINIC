
import Chart from 'react-apexcharts';

const SplineChart = () => {
  // Sample data for the spline line chart
  const series = [
    {
      name: 'Series 1',
      data: [30, 40, 35, 50, 49, 60, 70, 91]
    },
    {
      name: 'Series 2',
      data: [42, 52, 47, 62, 61, 72, 82, 101]
    },
    {
      name: 'Series 3',
      data: [50, 60, 55, 70, 69, 80, 90, 111]
    }
  ];

  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: false // Hide the toolbar
      }
    },
    stroke: {
      curve: 'smooth' // Make the line smooth (spline)
    },
    
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
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
    tooltip: {
      enabled: true,
      y: {
        formatter: function(val) {
          return "$ " + val;
        }
      }
    },
    grid: {
        show: false,
      },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
};

export default SplineChart;
