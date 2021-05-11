import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProjectReportGraphs from "../../components/project/ProjectReportGraphs";
import { appAxios } from "../../utils/axios";
import CommonTable from "../../components/table/CommonTable";
import ProjectAppTableBody from "../../components/table/ProjectAppTableBody";
import { Button, Grid, makeStyles, Modal } from "@material-ui/core";
import CreateAppForm from "../../components/form/CreateAppForm";

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

      <div>
        <ProjectReportGraphs appList={appList} />
      </div>
      <div>
        <h2>App List</h2>

        <CommonTable
          head={[
            "App Name",
            "Build Datetime",
            "Line Cov.(%)",
            "Branch Cov.(%)",
            "Pass Rate(%)",
            "Elapsed Time(sec.)",
          ]}
          body={appList.map((app, index) => (
            <ProjectAppTableBody key={index} app={app} />
          ))}
        />
      </div>
      <div style={{ textAlign: "right" }}>
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
    </>
  );
}
