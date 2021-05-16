import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ReportItemContainer from "../../components/application/ReportItemContainer";
import ReportHistoryContainer from "../../components/application/ReportHistoryContainer";
import { makeStyles } from "@material-ui/core/styles";
import { reportAxios, testAxios } from "../../utils/axios";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
}));

export default function ApplicationDetail(props) {
  const styles = useStyles();
  const [idx, setIdx] = useState(-1);
  const [report, setReport] = useState([]);
  const [reportHistory, setReportHistory] = useState([]);
  const [tests, setTests] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filteredTests, setFilteredTests] = useState([]);
  const [condition, setCondition] = useState([]);

  useEffect(async () => {
    const reportResponse = await reportAxios.getListByAppId(
      "4de2e824-12fa-4d01-b397-2effb62f81f8"
    ); // props.id

    setReport(reportResponse);

    let selectedReportList = [];
    for (let i = 0; i < reportResponse.length; i++) {
      // props.idx - 1
      if (i == 6) {
        for (let j = i - 7 < 0 ? 0 : i - 7; j <= i; j++) {
          if (selectedReportList.length >= 7) break; // max length

          let string = JSON.stringify(reportResponse[j]);
          string = string.replace("}", `,"idx":${j}}`);
          selectedReportList.push(JSON.parse(string));
        }
        break;
      }
    }
    console.log(selectedReportList);

    setReportHistory(selectedReportList);

    setIdx(0);
  }, []);

  useEffect(() => {
    setFilteredTests(() => tests.filter(testFilter));
  }, [searchField, condition, tests]);

  async function getReportData(id, index) {
    await testAxios
      .getListByReportId(id)
      .then((res) => {
        setTests(res);
        setIdx(index);
        setCondition("1111");
        console.log(id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const reports = reportHistory.map((data, index) => (
    <Box onClick={() => getReportData(data.id, data.idx)} key={index}>
      <ReportHistoryContainer
        testCount={report.length - data.idx}
        date={data.datetime}
        percent={
          data.totalRunCount == 0
            ? 0
            : data.totalRunCount /
              (data.totalRunCount +
                data.totalErrorCount +
                data.totalFailCount +
                data.totalSkipCount)
        }
        targetPercent={0.7}
      ></ReportHistoryContainer>
    </Box>
  ));

  const testList = filteredTests.map((data, index) => (
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

  function testFilter(obj) {
    if (
      obj.type == "pass" &&
      condition[0] == "1" &&
      obj.name.toLowerCase().includes(searchField.toLowerCase())
    )
      return true;
    if (
      obj.type == "fail" &&
      condition[1] == "1" &&
      obj.name.toLowerCase().includes(searchField.toLowerCase())
    )
      return true;
    if (
      obj.type == "error" &&
      condition[2] == "1" &&
      obj.name.toLowerCase().includes(searchField.toLowerCase())
    )
      return true;
    if (
      obj.type == "skip" &&
      condition[3] == "1" &&
      obj.name.toLowerCase().includes(searchField.toLowerCase())
    )
      return true;
    return false;
  }
  return (
    <Box>
      <Box alignItems="center" textAlign="center">
        <Box
          style={{
            marginTop: "1%",
            marginBottom: "3%",
            fontSize: "200%",
            maxWidth: "20%",
          }}
        >
          Main Server
        </Box>
        <Box
          display="flex"
          flexDirection="Column"
          marginLeft="3%"
          marginRight="3%"
        >
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
      </Box>
      <Box className={styles.container} marginLeft="3%" marginRight="3%">
        <Grid item xs={12}>
          {idx >= 0 && (
            <Box display="flex" justifyContent="space-between" marginTop="3%">
              Report #{report.length - reportHistory[idx].idx} -{" "}
              {reportHistory[idx].datetime.split("T")[0]}{" "}
              {reportHistory[idx].datetime.split("T")[1]} (
              {reportHistory[idx].totalElapsedTime} ms)
              <input
                type="search"
                placeholder="filter"
                onChange={(e) => setSearchField(e.target.value)}
              ></input>
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
                className={
                  condition[0] == "1" ? "typeButtonActive" : "typeButton"
                }
                flexGrow={reportHistory[idx].totalRunCount + 1}
                onClick={getPassList}
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
                  {reportHistory[idx].totalRunCount}
                </Box>
              </Box>
              <Box
                className={
                  condition[1] == "1" ? "typeButtonActive" : "typeButton"
                }
                flexGrow={reportHistory[idx].totalFailCount + 1}
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
                  {reportHistory[idx].totalFailCount}
                </Box>
              </Box>
              <Box
                className={
                  condition[2] == "1" ? "typeButtonActive" : "typeButton"
                }
                flexGrow={reportHistory[idx].totalErrorCount + 1}
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
                  {reportHistory[idx].totalErrorCount}
                </Box>
              </Box>
              <Box
                className={
                  condition[3] == "1" ? "typeButtonActive" : "typeButton"
                }
                flexGrow={reportHistory[idx].totalSkipCount + 1}
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
                  {reportHistory[idx].totalSkipCount}
                </Box>
              </Box>
            </Box>
          )}
          {testList}
        </Grid>
      </Box>
    </Box>
  );

  function getPassList() {
    if (condition[0] == "1")
      setCondition("0" + condition[1] + condition[2] + condition[3]);
    else setCondition("1" + condition[1] + condition[2] + condition[3]);
  }

  function getFailList(e) {
    if (condition[1] == "1")
      setCondition(condition[0] + "0" + condition[2] + condition[3]);
    else setCondition(condition[0] + "1" + condition[2] + condition[3]);
  }

  function getErrorList(e) {
    if (condition[2] == "1")
      setCondition(condition[0] + condition[1] + "0" + condition[3]);
    else setCondition(condition[0] + condition[1] + "1" + condition[3]);
  }

  function getSkipList(e) {
    if (condition[3] == "1")
      setCondition(condition[0] + condition[1] + condition[2] + "0");
    else setCondition(condition[0] + condition[1] + condition[2] + "1");
  }
}
