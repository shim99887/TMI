import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import datetime from "../../utils/moment";
import {
  AppBar,
  Box,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { coverageAxios, testAxios } from "../../utils/axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
import TestDetail from "../../components/test/TestDetail";

// totalBranchCovCovered: 40
// totalBranchCovMissed: 60
// totalElapsedTime: 1800
// totalErrorCount: 2
// totalFailCount: 1
// totalLineCovCovered: 100
// totalLineCovMissed: 60
// totalRunCount: 20
// totalSkipCount: 2

const useStyles = makeStyles((theme) => ({
  dataGrid: {
    cursor: "pointer",
    "&:hover": {
      cursor: "hand",
    },
  },
}));

const columns = [
  {
    field: "datetime",
    headerName: "Build Datetime",
    flex: 1,
    renderCell: (params) => <div>{datetime(params.getValue("datetime"))}</div>,
  },
  {
    field: "lineCov",
    headerName: "Line Cov.(%)",
    description: "Line Coverage (Covered / Missed)",
    flex: 1,
    type: "number",
    valueGetter: (params) => {
      const covered = params.getValue("totalLineCovCovered");
      const missed = params.getValue("totalLineCovMissed");
      const total = covered + missed;

      if (total) {
        return Math.round((covered / total) * 10000) / 100 + " %";
      }
      return 100 + " %";
    },
  },
  {
    field: "totalLineCovCovered",
    headerName: "Line Covered",
    flex: 1,
    type: "number",
  },
  {
    field: "totalLineCovMissed",
    headerName: "Line Missed",
    flex: 1,
    type: "number",
  },
  {
    field: "branchCov",
    headerName: "Branch Cov.(%)",
    flex: 1,
    type: "number",
    valueGetter: (params) => {
      const covered = params.getValue("totalBranchCovCovered");
      const missed = params.getValue("totalBranchCovMissed");
      const total = covered + missed;

      if (total) {
        return Math.round((covered / total) * 10000) / 100 + " %";
      }
      return 100 + " %";
    },
  },
  {
    field: "totalBranchCovCovered",
    headerName: "Branch Covered",
    flex: 1,
    type: "number",
  },
  {
    field: "totalBranchCovMissed",
    headerName: "Branch Missed",
    flex: 1,
    type: "number",
  },
  {
    field: "passRate",
    headerName: "Pass Rate(%)",
    flex: 1,
    type: "number",
    valueGetter: (params) => {
      const run = params.getValue("totalRunCount");

      if (run) {
        return (
          (run /
            (run +
              params.getValue("totalFailCount") +
              params.getValue("totalErrorCount") +
              params.getValue("totalSkipCount"))) *
            100 +
          " %"
        );
      }
      return 0 + " %";
    },
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <Box marginLeft="10px">
        <GridToolbarExport />
      </Box>
    </GridToolbarContainer>
  );
}

export default function CoverageDetail({ aid, title, data, close }) {
  const [classDetail, setClassDetail] = useState(false);
  const [classDetailData, setClassDetailData] = useState([]);
  const [selectedReport, setSelectedReport] = useState({});
  const [testDetail, setTestDetail] = useState(false);
  const classes = useStyles();

  return (
    <>
      {classDetail ? (
        <>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setClassDetail(false);
                  setClassDetailData([]);
                  setSelectedReport({});
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                {title} history group by class &gt;{" "}
                {datetime(selectedReport.datetime)}
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setClassDetail(false);
                  setClassDetailData([]);
                  setSelectedReport({});
                  close();
                }}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div
            style={{
              height: "92.5%",
              width: "100%",
            }}
          >
            <DataGrid
              className={classes.dataGrid}
              components={{
                Toolbar: CustomToolbar,
              }}
              rows={classDetailData}
              columns={[
                { field: "className", headerName: "Class", flex: 1 },
                {
                  field: "lineCov",
                  headerName: "Line Cov.(%)",
                  description: "Line Coverage (Covered / Missed)",
                  type: "number",
                  flex: 1,
                  valueGetter: (params) => {
                    const covered = params.getValue("lineCovCovered");
                    const missed = params.getValue("lineCovMissed");
                    const total = covered + missed;

                    if (total) {
                      return Math.round((covered / total) * 10000) / 100 + " %";
                    }
                    return 100 + " %";
                  },
                },
                {
                  field: "lineCovCovered",
                  headerName: "Line Covered",
                  type: "number",
                  flex: 1,
                },
                {
                  field: "lineCovMissed",
                  headerName: "Line Missed",
                  type: "number",
                  flex: 1,
                },
                {
                  field: "branchCov",
                  headerName: "Branch Cov.(%)",
                  type: "number",
                  flex: 1,
                  valueGetter: (params) => {
                    const covered = params.getValue("branchCovCovered");
                    const missed = params.getValue("branchCovMissed");
                    const total = covered + missed;

                    if (total) {
                      return Math.round((covered / total) * 10000) / 100 + " %";
                    }
                    return 100 + " %";
                  },
                },
                {
                  field: "branchCovCovered",
                  headerName: "Branch Covered",
                  flex: 1,
                  type: "number",
                },
                {
                  field: "branchCovMissed",
                  headerName: "Branch Missed",
                  flex: 1,
                  type: "number",
                },
              ]}
              onCellClick={async (cell, event) => {
                event.preventDefault();
                const newTab = window.open(cell.row.highlightHtml, "_blank");
                newTab.focus();
              }}
            />
          </div>
        </>
      ) : testDetail ? (
        <>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setTestDetail(false);
                  setSelectedReport({});
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                {title} history
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setTestDetail(false);
                  setSelectedReport({});
                  close();
                }}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box maxHeight="40%">
            <TestDetail
              aid={aid}
              id={selectedReport.id}
              title={title}
            ></TestDetail>
          </Box>
        </>
      ) : (
        <>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                {title} history
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setClassDetail(false);
                  setClassDetailData([]);
                  setSelectedReport({});
                  close();
                }}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{ height: "92.5%", width: "100%" }}>
            <DataGrid
              className={classes.dataGrid}
              components={{
                Toolbar: CustomToolbar,
              }}
              rows={data}
              columns={columns}
              onCellClick={async (cell, event) => {
                event.preventDefault();
                if (cell.field == "passRate") {
                  console.log(cell.row.id);
                  console.log(cell.row);
                  setTestDetail(true);
                  setSelectedReport(cell.row);
                } else {
                  const responseData = await coverageAxios.getCoverageListByReportId(
                    cell.row.id
                  );
                  console.log(responseData);
                  setClassDetailData(responseData);
                  setClassDetail(true);
                  setSelectedReport(cell.row);
                }
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
