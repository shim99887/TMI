import React from "react";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import TestJobItemContainer from "../../components/TestJobDetail/TestJobItemContainer";
import TestJobHistory from "../../components/TestJobDetail/TestJobHistory";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
}));

export default function TestJobDetail() {
  const styles = useStyles();
  // const path = useParams();

  // axios.get() Project의 TestJobList 반환받는다
  // Success, Fail, Error, Skip 눌렀을 때
  let success = 8 + 1;
  let fail = 2 + 1;
  let error = 1 + 1;
  let skip = 0 + 1;

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid
          className={styles.container}
          style={{ flexDirection: "column" }}
          item
          xs={2}
        >
          <TestJobHistory testCount="8" date="21/04/28 17:00"></TestJobHistory>
          <TestJobHistory testCount="7" date="21/04/28 17:00"></TestJobHistory>
          <TestJobHistory testCount="6" date="21/04/28 17:00"></TestJobHistory>
          <TestJobHistory testCount="5" date="21/04/28 17:00"></TestJobHistory>
          <TestJobHistory testCount="4" date="21/04/28 17:00"></TestJobHistory>
          <TestJobHistory testCount="3" date="21/04/28 17:00"></TestJobHistory>
          <TestJobHistory testCount="2" date="21/04/28 17:00"></TestJobHistory>
          <TestJobHistory testCount="1" date="21/04/28 17:00"></TestJobHistory>
        </Grid>
        <Grid item xs={10}>
          <Box display="flex" justifyContent="space-between">
            <Box>History : #8 21/04/28 17:00</Box>
            <Box border="1px solid black">
              <Input placeholder="Search"></Input>
            </Box>
          </Box>
          <Box
            className={styles.container}
            fontSize="200%"
            marginTop="1%"
            style={{ cursor: "pointer" }}
          >
            <Box flexGrow={success} onClick={getSuccessList}>
              <Box
                style={{
                  backgroundColor: "#99DD99",
                }}
              >
                Success
              </Box>
              <Box
                style={{
                  backgroundColor: "#22DD22",
                }}
              >
                {success}
              </Box>
            </Box>
            <Box flexGrow={fail} onClick={getFailList}>
              <Box
                style={{
                  backgroundColor: "#FFCC66",
                }}
              >
                Fail
              </Box>
              <Box
                style={{
                  backgroundColor: "#FFAA00",
                }}
              >
                {fail}
              </Box>
            </Box>

            <Box flexGrow={error} onClick={getErrorList}>
              <Box
                style={{
                  backgroundColor: "#FF4444",
                }}
              >
                Error
              </Box>
              <Box
                style={{
                  backgroundColor: "#FF0000",
                }}
              >
                {error}
              </Box>
            </Box>

            <Box flexGrow={skip} onClick={getSkipList}>
              <Box
                style={{
                  backgroundColor: "#CCCCCC",
                }}
              >
                Skip
              </Box>
              <Box
                style={{
                  backgroundColor: "#AAAAAA",
                }}
              >
                {skip}
              </Box>
            </Box>
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
              color="10px solid #22DD22"
              secondColor="8px solid #99DD99"
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

  // axios 재호출할건지 있는 리스트에서 출력할건지
  function getSuccessList() {
    console.log("axios.get getSuccessList");
  }

  function getFailList() {
    console.log("axios.get getFailList");
  }

  function getErrorList() {
    console.log("axios.get getErrorList");
  }

  function getSkipList() {
    console.log("axios.get getSkipList");
  }
}
