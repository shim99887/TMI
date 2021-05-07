import React from "react";
import { colors } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";

export default function DoughnutGraph() {
  const dataDoughnutGraph = {
    datasets: [
      {
        data: [83, 9],
        backgroundColor: [colors.blue[500], colors.red[500]],
      },
    ],
    labels: ["Covered", "Missed"],
  };
  return <Doughnut data={dataDoughnutGraph} />;
}
