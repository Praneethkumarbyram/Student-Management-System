
import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My Progress",
      backgroundColor: "red",
      borderColor: "#243658",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const StudentProgressGraph = () => {
  return (
    <div className="data">
      <Line data={data} />
    </div>
  );
};

export default StudentProgressGraph;