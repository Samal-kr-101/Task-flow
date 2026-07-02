import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function TaskChart({ tasks }) {

  const completed = tasks.filter(
    task => task.completed
  ).length;

  const pending = tasks.length - completed;

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: [
          "#10b981",
          "#f59e0b",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    cutout: "70%",
    responsive: true,
  };

    return (
  <div className="chart-card">

    <h3>Task Analytics</h3>

    <div className="chart-wrapper">

      <Doughnut
        data={data}
        options={{
          ...options,
          maintainAspectRatio: false,
        }}
      />

    </div>

  </div>
);
}

export default TaskChart;