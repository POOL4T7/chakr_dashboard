import ReactApexChart from "react-apexcharts";

const GrowthChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: "area",
    },
    xaxis: {
      type: "category",
      categories: data.map(entry => entry.label),
    },
    fill: {
      colors: ["#25CD25"],
      opacity: 0.8,
      type: "gradient",
      gradient: {
        shade: "light",
      },
    },
    stroke: {
        show: true,
        curve: "straight",
        lineCap: "butt",
        colors: "#25CD25",
        width: 6,
        dashArray: [1, 2]
      },
      legend:{
        show: false,
      }
  };

  const chartSeries = [
    {
      name: "Profit Percentage",
      data: data.map((entry) => entry.value),
    },
  ];

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={300}
      />
    </div>
  );
};

export default GrowthChart;
