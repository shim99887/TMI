import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProjectAppCoverageGraphs from "../../components/project/ProjectAppCoverageGraphs";
import { appAxios, coverageAxios, reportAxios } from "../../utils/axios";
import CommonTable from "../../components/table/CommonTable";
import ProjectAppTableBody from "../../components/table/ProjectAppTableBody";
import { Box, Button, colors, makeStyles, Modal } from "@material-ui/core";
import CreateAppForm from "../../components/form/CreateAppForm";
import ProjectAppPassRateGraphs from "../../components/project/ProjectAppPassRateGraphs";
import TotalCoverageDoughnutGraph from "../../components/graph/TotalCoverageDoughnutGraph";
import ApplicationDetail from "../application/ApplicationDetail";
import { DataGrid } from "@material-ui/data-grid";
import CoverageDetail from "../../components/coverage/CoverageDetail";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  createAppForm: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  testDetail: {
    position: "absolute",
    width: "90vw",
    height: "90vh",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const head = [
  "App Name",
  "Build Datetime",
  <>
    Line Cov.(%)
    <Box>
      <small style={{ color: colors.blue[500] }}>Covered</small> /{" "}
      <small style={{ color: colors.red[500] }}>Missed</small>
    </Box>
  </>,
  <>
    Branch Cov.(%)
    <Box>
      <small style={{ color: colors.blue[500] }}>Covered</small> /{" "}
      <small style={{ color: colors.red[500] }}>Missed</small>
    </Box>
  </>,
  <>
    Pass Rate(%)
    <Box>
      <small style={{ color: colors.blue[500] }}>Pass</small> /{" "}
      <small style={{ color: colors.red[500] }}>Fail</small> /{" "}
      <small style={{ color: colors.orange[500] }}>Error</small> /{" "}
      <small style={{ color: colors.purple[500] }}>Skip</small>
    </Box>
  </>,
  "Elapsed Time(sec.)",
];

const columns = [
  { field: "title", headerName: "App Name", flex: 1 },
  { field: "datetime", headerName: "Build Datetime", flex: 1 },
  { field: "lastName", headerName: "Line Cov.(%)", flex: 1 },
  {
    field: "branchCov",
    headerName: "Branch Cov.(%)",
    // type: "number",
    flex: 1,
  },
  {
    field: "passRate",
    headerName: "Pass Rate(%)",
    description: "This column has a value getter and is not sortable.",
    // sortable: false,
    valueGetter: (params) =>
      `${params.getValue("firstName") || ""} ${
        params.getValue("lastName") || ""
      }`,
    flex: 1,
  },
];

export default function ProjectApp() {
  const params = useParams();
  const [appList, setAppList] = useState([]);
  const [modalCreateAppFromOpen, setModalCreateAppFormOpen] = useState(false);
  const [modalTestDetailOpen, setModalTestDetailOpen] = useState(false);
  const [modalCoverageDetailOpen, setModalCoverageDetailOpen] = useState(false);
  const [coverageDetailData, setCoverageDetailData] = useState([]);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const modalCreateAppFrom = (
    <div style={modalStyle} className={classes.createAppForm}>
      <CreateAppForm onClose={() => setModalCreateAppFormOpen(false)} />
    </div>
  );

  const modalTestDetail = (
    <div style={modalStyle} className={classes.testDetail}>
      <ApplicationDetail params={{ id: "uniqueKey1" }} />
    </div>
  );

  const modalCoverageDetail = (
    <div style={modalStyle} className={classes.testDetail}>
      <CoverageDetail data={coverageDetailData} />
    </div>
  );

  useEffect(async () => {
    try {
      const responseData = await appAxios.getAppByProjectId(params.id);
      setAppList(responseData);
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
    return () => {};
  }, []);
  return (
    <>
      <h2>{params.id} PJT</h2>

      {/* sample graphs */}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <TotalCoverageDoughnutGraph data={[90, 10]} title="Current Coverage" />
        <ProjectAppCoverageGraphs title="Coverage Trend" />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <TotalCoverageDoughnutGraph data={[90, 10]} title="Current Pass Rate" />
        <ProjectAppPassRateGraphs title="Pass Rate Trend" />
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <h2 style={{ flexGrow: 1 }}>App List</h2>
          <Button
            variant="contained"
            onClick={() => setModalCreateAppFormOpen(true)}
          >
            Create new app
          </Button>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={appList}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onCellClick={async (cell, event) => {
              event.preventDefault();
              setModalCoverageDetailOpen(true);
              const responseData = await reportAxios.getListByAppId(
                cell.row.id
              );
              console.log(responseData);
              setCoverageDetailData(responseData);
            }}
          />
        </div>
      </div>
      <Button onClick={() => setModalTestDetailOpen(true)}>
        Test Detail Example
      </Button>
      <Modal
        open={
          modalCreateAppFromOpen ||
          modalTestDetailOpen ||
          modalCoverageDetailOpen
        }
        onClose={() => {
          setModalCreateAppFormOpen(false);
          setModalTestDetailOpen(false);
          setModalCoverageDetailOpen(false);
        }}
      >
        {modalCreateAppFromOpen ? (
          modalCreateAppFrom
        ) : modalTestDetailOpen ? (
          modalTestDetail
        ) : modalCoverageDetailOpen ? (
          modalCoverageDetail
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
}
