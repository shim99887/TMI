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
  };
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Doughnut height="200" width="200" data={dataDoughnutGraph} />
    </Box>
  );
}
