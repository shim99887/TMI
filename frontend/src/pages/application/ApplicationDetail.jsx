import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import ReportItemContainer from "../../components/application/ReportItemContainer";
import ReportHistoryContainer from "../../components/application/ReportHistoryContainer";
import { makeStyles } from "@material-ui/core/styles";
import { reportAxios, testAxios } from "../../utils/axios";
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
  const [idx, setIdx] = useState(-1);
  const [report, setReport] = useState([]);
  const [test, setTest] = useState([]);
  // axios.get() Project의 ReportList 반환받는다
  // Success, Fail, Error, Skip 눌렀을 때
  useEffect(async () => {
    const reportResponse = await reportAxios.getListByAppId(params.id);
    setReport(reportResponse);
    return () => {};
  }, []);

  async function getReportData(id) {
    await testAxios
      .getListByReportId(id)
      .then((res) => {
        setTest(res);
        setIdx(id - 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const reports = report.map((data, index) => (
    <Box onClick={() => getReportData(data.id)} key={index}>
      <ReportHistoryContainer
        testCount={data.id}
        date={data.datetime}
        percent={
          data.totalRunCount /
          (data.totalRunCount +
            data.totalErrorCount +
            data.totalFailCount +
            data.totalSkipCount)
        }
        targetPercent={0.7}
      ></ReportHistoryContainer>
    </Box>
  ));

  const tests = test.map((data, index) => (
    <Box
      style={{
        marginTop: "1%",
        marginBottom: "1%",
      }}
      key={index}
    >
      <ReportItemContainer
        name={data.name}
        time={data.elapsedTime}
        resultType={data.type}
        errorType={data.errorType}
        errorMessage={data.errorMessage}
      />
    </Box>
  ));

  return (
    <Box>
      <Box className={styles.container}>
        <Box
          style={{
            marginTop: "1%",
            marginBottom: "3%",
            flexGrow: "1",
            fontSize: "200%",
            maxWidth: "20%",
          }}
        >
          Main Server
        </Box>
        <Box display="flex" flexDirection="Column" flexGrow="3">
          <Box
            display="flex"
            justifyContent="space-between"
            zIndex="1"
            position="relative"
            marginLeft="5%"
            marginRight="5%"
          >
            {reports}
          </Box>
          <Box
            style={{
              borderTop: "2px solid black",
              zIndex: "0",
              position: "relative",
              top: "-66px",
            }}
          ></Box>
          <Box
            style={{
              height: "14px",
              borderLeft: "2px solid black",
              borderRight: "2px solid black",
              zIndex: "0",
              position: "relative",
              top: "-74px",
            }}
          ></Box>
        </Box>

        <Box flexGrow="1" maxWidth="20%" marginBottom="3%">
          <Input placeholder="Search"></Input>
        </Box>
      </Box>
      <Grid className={styles.container} item>
        <Grid item xs={12}>
          {idx >= 0 && (
            <Box display="flex" justifyContent="space-between" marginTop="3%">
              Report #{idx + 1} - {report[idx].datetime.split("T")[0]}{" "}
              {report[idx].datetime.split("T")[1]}
            </Box>
          )}
          {idx >= 0 && (
            <Box
              className={styles.container}
              fontSize="200%"
              marginTop="1%"
              style={{ cursor: "pointer" }}
            >
              <Box
                flexGrow={report[idx].totalRunCount + 1}
                onClick={() => getSuccessList}
              >
                <Box
                  style={{
                    backgroundColor: "#99DD99",
                  }}
                >
                  Pass
                </Box>
                <Box
                  style={{
                    backgroundColor: "#22DD22",
                  }}
                >
                  {report[idx].totalRunCount}
                </Box>
              </Box>
              <Box
                flexGrow={report[idx].totalFailCount + 1}
                onClick={getFailList}
              >
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
                  {report[idx].totalFailCount}
                </Box>
              </Box>
              <Box
                flexGrow={report[idx].totalErrorCount + 1}
                onClick={getErrorList}
              >
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
                  {report[idx].totalErrorCount}
                </Box>
              </Box>
              <Box
                flexGrow={report[idx].totalSkipCount + 1}
                onClick={getSkipList}
              >
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
                  {report[idx].totalSkipCount}
                </Box>
              </Box>
            </Box>
          )}
          {tests}
        </Grid>
      </Grid>
    </Box>
  );

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
