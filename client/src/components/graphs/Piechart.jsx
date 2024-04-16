
import Chart from 'react-apexcharts';

const PieChart = () => {
  // Sample data for the pie chart
  const series = [44, 55, 13, 43, 22];
  const options = {
    chart: {
      type: 'pie',
      toolbar: {
        show: false // Hide the toolbar
      }
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      height={350}
    />
  );
};

export default PieChart;
