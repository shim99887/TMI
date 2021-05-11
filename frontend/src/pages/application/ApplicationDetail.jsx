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

  const reports = report.map((data, index) => (
    <Box onClick={() => getReportData(data.id)} key={index}>
      <ReportHistoryContainer
        testCount={data.id}
        date={data.datetime}
      ></ReportHistoryContainer>
    </Box>
  ));

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
      <Grid container spacing={3}>
        <Grid
          className={styles.container}
          style={{ flexDirection: "column" }}
          item
          xs={2}
        >
          {reports}
        </Grid>
        <Grid item xs={10}>
          <Box display="flex" justifyContent="space-between">
            <Box border="1px solid black">
              <Input placeholder="Search"></Input>
            </Box>
          </Box>
          {idx >= 0 && (
            <Box
              className={styles.container}
              fontSize="200%"
              marginTop="1%"
              style={{ cursor: "pointer" }}
            >
              <Box
                flexGrow={report[idx].totalRunCount + 1}
                onClick={getSuccessList}
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
          {tests.length > 0 && tests[0].props.children.props.resultType}
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
