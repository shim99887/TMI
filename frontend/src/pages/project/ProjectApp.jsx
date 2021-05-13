import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProjectAppCoverageGraphs from "../../components/project/ProjectAppCoverageGraphs";
import { appAxios } from "../../utils/axios";
import CommonTable from "../../components/table/CommonTable";
import ProjectAppTableBody from "../../components/table/ProjectAppTableBody";
import {
  Box,
  Button,
  colors,
  Grid,
  makeStyles,
  Modal,
} from "@material-ui/core";
import CreateAppForm from "../../components/form/CreateAppForm";
import ProjectAppPassRateGraphs from "../../components/project/ProjectAppPassRateGraphs";

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
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ProjectApp() {
  const params = useParams();
  const [appList, setAppList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // dummy test
  const test = [
    { id: 1, title: "test1" },
    { id: 2, title: "test2" },
  ];

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <CreateAppForm handleClose={handleClose} />
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

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* sample graphs */}
        <ProjectAppCoverageGraphs />
        <ProjectAppPassRateGraphs />
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <h2 style={{ flexGrow: 1 }}>App List</h2>
          <Button variant="contained" onClick={handleOpen}>
            Create new app
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </div>

        <CommonTable
          head={[
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
          ]}
          body={appList.map((app, index) => (
            <ProjectAppTableBody key={index} app={app} />
          ))}
        />
      </div>
    </>
  );
}
