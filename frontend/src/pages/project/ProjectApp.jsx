import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProjectAppCoverageGraphs from "../../components/graph/ProjectAppCoverageGraphs";
import { appAxios, projectAxios, reportAxios } from "../../utils/axios";
import {
  Box,
  Button,
  colors,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import CreateAppForm from "../../components/form/CreateAppForm";
import ProjectAppPassRateGraphs from "../../components/graph/ProjectAppPassRateGraphs";
import TotalCoverageDoughnutGraph from "../../components/graph/TotalCoverageDoughnutGraph";
import ApplicationDetail from "../application/ApplicationDetail";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
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

const columns = [
  { field: "title", headerName: "App Name", flex: 1 },
  { field: "datetime", headerName: "Build Datetime", type: "date", flex: 1 },
  { field: "lastName", headerName: "Line Cov.(%)", type: "number", flex: 1 },
  {
    field: "branchCov",
    headerName: "Branch Cov.(%)",
    type: "number",
    flex: 1,
  },
  {
    field: "passRate",
    headerName: "Pass Rate(%)",
    description: "This column has a value getter and is not sortable.",
    // sortable: false,
    type: "number",
    flex: 1,
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ProjectApp() {
  const params = useParams();
  const [project, setProject] = useState({});
  const [appList, setAppList] = useState([]);
  const [modalCreateAppFromOpen, setModalCreateAppFormOpen] = useState(false);
  const [modalTestDetailOpen, setModalTestDetailOpen] = useState(false);
  const [modalCoverageDetailOpen, setModalCoverageDetailOpen] = useState(false);
  const [coverageDetailData, setCoverageDetailData] = useState([]);
  const [selectedAppTitle, setSelectedAppTitle] = useState("");
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
      <CoverageDetail
        close={() => setModalCoverageDetailOpen(false)}
        data={coverageDetailData}
        title={selectedAppTitle}
      />
    </div>
  );

  useEffect(async () => {
    try {
      const project = await projectAxios.getOne(params.id);
      setProject(project);
      console.log(project);
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
      <div style={{ marginBottom: 15 }}>
        <div style={{ display: "flex" }}>
          <Typography style={{ flexGrow: 1 }} variant="h4">
            {project.title}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setModalCreateAppFormOpen(true)}
          >
            Create new app
          </Button>
        </div>
        <Typography variant="h6">{project.description}</Typography>
        <Typography variant="small">담당부서: {project.department}</Typography>
        <Typography variant="small">등록일: {project.regDate}</Typography>{" "}
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            marginRight: 15,
          }}
        >
          <TotalCoverageDoughnutGraph
            data={[90, 10]}
            title="Current Coverage"
          />
          <TotalCoverageDoughnutGraph
            data={[90, 10]}
            title="Current Pass Rate"
          />
        </div>
        <div style={{ flexGrow: 1 }}>
          <div style={{ height: "75vh", width: "100%" }}>
            <DataGrid
              components={{
                Toolbar: CustomToolbar,
              }}
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
                setCoverageDetailData(responseData);
                setSelectedAppTitle(cell.row.title);
              }}
            />
          </div>
        </div>
      </div>
      <Button variant="contained" onClick={() => setModalTestDetailOpen(true)}>
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
