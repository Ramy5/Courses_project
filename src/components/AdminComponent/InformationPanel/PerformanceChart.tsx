import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { t } from "i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceChart = ({ data }) => {
  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 300,
        grid: {
          display: true,
        },
        ticks: {
          stepSize: 50,
          color: "#aaa",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#aaa",
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
      axis: "xy",
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div className="w-full p-5 mx-auto bg-white shadow-lg rounded-2xl text-start">
      <h2 className="mb-5 text-2xl font-bold text-inherit">
        {t("performance")}
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PerformanceChart;
