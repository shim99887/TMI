import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  colors,
  useTheme,
  Grid,
} from "@material-ui/core";

export default function ProjectDetailGraphs() {
  const theme = useTheme();

  const data = {
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

  return (
    <>
      <Card variant="outlined">
        <CardHeader title="Summary" />
        <Divider />
        <Grid container spacing={2}>
          <CardContent>
            <Box
              sx={{
                height: 300,
                position: "relative",
              }}
            >
              <Doughnut data={data} />
            </Box>
          </CardContent>
        </Grid>
      </Card>
    </>
  );
}
