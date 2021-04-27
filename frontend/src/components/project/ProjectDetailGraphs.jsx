import { Doughnut, Line, Bar } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  colors,
  Grid,
} from "@material-ui/core";

export default function ProjectDetailGraphs() {
  const dataDoughnutGraph = {
    datasets: [
      {
        data: [83, 9, 3, 5],
        backgroundColor: [
          colors.blue[500],
          colors.orange[500],
          colors.red[500],
          colors.purple[500],
        ],
      },
    ],
    labels: ["Pass", "Fail", "Skip", "Error"],
  };

  const dataLineGraph = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  const dataBarGraph = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Card variant="outlined">
        <CardHeader title="Summary" />
        <Divider />
        <Grid container spacing={2} style={{ justifyContent: "space-around" }}>
          <CardContent>
            <Doughnut data={dataDoughnutGraph} />
          </CardContent>
          <CardContent>
            <Line height="300px" data={dataLineGraph} />
          </CardContent>
          <CardContent>
            <Bar height="300px" data={dataBarGraph} />
          </CardContent>
        </Grid>
      </Card>
    </>
  );
}
