import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  colors,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";

export default function TotalCoverageDoughnutGraph({ data, title }) {
  const dataDoughnutGraph = {
    datasets: [
      {
        data,
        backgroundColor: [colors.blue[500], colors.red[500]],
      },
    ],
    labels: ["Covered", "Missed"],
  };
  return (
    <Box>
      <Typography variant="h5">{title}</Typography>
      <Doughnut height="250" width="250" data={dataDoughnutGraph} />
    </Box>
  );
}
