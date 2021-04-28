import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TestJobItemContainer from "../../components/TestJobDetail/TestJobItemContainer";
import TestJobListBox from "../../components/TestJobDetail/TestJobListBox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    fontSize: "200%",
  },
}));

export default function TestJobDetail() {
  const styles = useStyles();
  // const path = useParams();

  // axios.get() Project의 TestJobList 반환받는다
  let success = 8 + 1;
  let fail = 2 + 1;
  let error = 1 + 1;
  let skip = 0 + 1;
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <TestJobListBox testCount="1" date="21/04/28 17:00"></TestJobListBox>
          <TestJobListBox testCount="1" date="21/04/28 17:00"></TestJobListBox>
        </Grid>
        <Grid item xs={9}>
          <Box className={styles.container}>
            <Box
              style={{ backgroundColor: "10px solid #00FF00" }}
              flexGrow={success}
            >
              Success
            </Box>

            <Box flexGrow={fail}>Fail</Box>

            <Box flexGrow={error}>Error</Box>

            <Box flexGrow={skip}>Skip</Box>
          </Box>
          <Box
            style={{
              marginTop: "1%",
              marginBottom: "1%",
            }}
          >
            <TestJobItemContainer
              name="DashBoardDataComponent should run #getCoverageTotal()"
              time="143"
              color="10px solid #00FF00"
              secondColor="8px solid #00DD00"
              resultType="Success"
              errorType="none of content"
              errorMessage="none of content"
              errorContents="none of content"
            />
          </Box>

          <Box
            style={{
              marginTop: "1%",
              marginBottom: "1%",
            }}
          >
            <TestJobItemContainer
              name="DashBoardDataComponent should run #getCoverageTotal()"
              time="143"
              color="10px solid #FFAA00"
              secondColor="8px solid #FFCC66"
              resultType="Fail"
              errorType="none of content"
              errorMessage="none of content"
              errorContents="none of content"
            />
          </Box>

          <Box
            style={{
              marginTop: "1%",
              marginBottom: "1%",
            }}
          >
            <TestJobItemContainer
              name="DashBoardDataComponent should run #getCoverageTotal()"
              time="143"
              color="10px solid #FF0000"
              secondColor="8px solid #FF4444"
              resultType="Error"
              errorType="none of content"
              errorMessage="none of content"
              errorContents="none of content"
            />
          </Box>

          <Box
            style={{
              marginTop: "1%",
              marginBottom: "1%",
            }}
          >
            <TestJobItemContainer
              name="DashBoardDataComponent should run #getCoverageTotal()"
              time="143"
              color="10px solid #AAAAAA"
              secondColor="8px solid #CCCCCC"
              resultType="Skip"
              errorType="none of content"
              errorMessage="none of content"
              errorContents="none of content"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
