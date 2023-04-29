import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function PieChart({ chartData }) {
  const plugins = [
    {
      afterDraw: function (chart) {
        const arr = chart.config._config.data.datasets[0].data;
        const isAllZero = arr.every((item) => item === "0");
        if (isAllZero) {
          let ctx = chart.ctx;
          let width = chart.width;
          let height = chart.height;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "rgba(0, 00, 0, .2)";
          ctx.font = "30px Arial";
          ctx.fillText("No data to display", width / 2, height / 2);
          ctx.restore();
        }
      },
    },
  ];
  return <Pie data={chartData} plugins={plugins} />;
}
