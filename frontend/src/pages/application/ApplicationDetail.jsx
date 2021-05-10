import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import ReportItemContainer from "../../components/application/ReportItemContainer";
import ReportHistoryContainer from "../../components/application/ReportHistoryContainer";
import { makeStyles } from "@material-ui/core/styles";
import { AppAxios } from "../../utils/axios";
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
}));

export default function ReportDetail() {
  const styles = useStyles();
  const params = useParams();
  const [data, setData] = useState([]);

  // axios.get() Project의 ReportList 반환받는다
  // Success, Fail, Error, Skip 눌렀을 때
  useEffect(async () => {
    const reportAxios = new AppAxios();
    try {
      const responseData = await reportAxios.getOne(params.id);
      setData(responseData);
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
    return () => {};
  }, []);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid
          className={styles.container}
          style={{ flexDirection: "column" }}
          item
          xs={2}
        >
          <ReportHistoryContainer
            testCount="8"
            date="21/04/28 17:00"
          ></ReportHistoryContainer>
          <ReportHistoryContainer
            testCount="7"
            date="21/04/28 17:00"
          ></ReportHistoryContainer>
          <ReportHistoryContainer
            testCount="6"
            date="21/04/28 17:00"
          ></ReportHistoryContainer>
          <ReportHistoryContainer
            testCount="5"
            date="21/04/28 17:00"
          ></ReportHistoryContainer>
          <ReportHistoryContainer
            testCount="4"
            date="21/04/28 17:00"
          ></ReportHistoryContainer>
          <ReportHistoryContainer
            testCount="3"
            date="21/04/28 17:00"
          ></ReportHistoryContainer>
          <ReportHistoryContainer
            testCount="2"
            date="21/04/28 17:00"
          ></ReportHistoryContainer>
          <ReportHistoryContainer
            testCount="1"
            date="21/04/28 17:00"
          ></ReportHistoryContainer>
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
            <Box flexGrow={data.runCount + 1} onClick={getSuccessList}>
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
                {data.runCount}
              </Box>
            </Box>
            <Box flexGrow={data.failCount + 1} onClick={getFailList}>
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
                {data.failCount}
              </Box>
            </Box>
            <Box flexGrow={data.errorCount + 1} onClick={getErrorList}>
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
                {data.errorCount}
              </Box>
            </Box>
            <Box flexGrow={data.skipCount + 1} onClick={getSkipList}>
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
                {data.skipCount}
              </Box>
            </Box>
          </Box>
          <Box
            style={{
              marginTop: "1%",
              marginBottom: "1%",
            }}
          >
            <ReportItemContainer
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
            <ReportItemContainer
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
            <ReportItemContainer
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
            <ReportItemContainer
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
