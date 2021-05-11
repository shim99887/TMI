import React, { useState, useEffect } from "react";
import { forwardRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { ButtonBase } from "@material-ui/core";
import { ProjectAxios, AppAxios } from "../../utils/axios";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const cardStyles = makeStyles({
  button: { width: "25%" },
  card: { width: "100%" },
});

function AppList(props) {
  const { pid, history } = props;
  const cardClass = cardStyles();

  const [app, setApp] = useState([]);

  useEffect(async () => {
    const appAxios = new AppAxios();
    try {
      const appAxiosData = await appAxios.getAppByProjectId(pid);
      setApp(appAxiosData);
    } catch (error) {
      console.error(error);
    }
    return () => {};
  }, []);

  return (
    <>
      <Grid container spacing={0}>
        {app.map((app) => (
          <ButtonBase
            className={cardClass.button}
            onClick={(event) => {
              // history.push(`/testjob/${pid}/${testJob.testId}`);
            }}
          >
            <Card className={cardClass.card}>
              <CardContent>
                <Typography align="left">Status: 😀</Typography>
                <Typography align="left">ID: {app.id}</Typography>
                <Typography align="left">Name: {app.title}</Typography>
              </CardContent>
            </Card>
          </ButtonBase>
        ))}
      </Grid>
    </>
  );
}

function Project() {
  var columns = [
    { title: "ID", field: "id" },
    { title: "Title", field: "title" },
    { title: "Descrption", field: "description" },
  ];
  const [projectData, setProjectData] = useState();

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const history = useHistory();

  useEffect(async () => {
    const projectAxios = new ProjectAxios();
    try {
      const projectAxiosData = await projectAxios.all();
      setProjectData(projectAxiosData);
    } catch (error) {
      console.error(error);
    }
    return () => {};
  }, []);

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (!newData.id) {
      errorList.push("Please enter id");
    }
    if (!newData.title) {
      errorList.push("Please enter title");
    }
    if (!newData.description) {
      errorList.push("Please enter description");
    }

    if (errorList.length < 1) {
      const dataUpdate = [...projectData];
      const index = oldData.tableData.id;
      dataUpdate[index] = newData;
      setProjectData([...dataUpdate]);
      resolve();
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if (!newData.id) {
      errorList.push("Please enter id");
    }
    if (!newData.title) {
      errorList.push("Please enter title");
    }
    if (!newData.description) {
      errorList.push("Please enter description");
    }

    if (errorList.length < 1) {
      let dataToAdd = [...projectData];
      dataToAdd.push(newData);
      setProjectData(dataToAdd);
      resolve();
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    const dataDelete = [...projectData];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);
    setProjectData([...dataDelete]);
    resolve();
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <div>
            {iserror && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
          </div>
          <MaterialTable
            title="Project List"
            columns={columns}
            data={projectData}
            detailPanel={(rowData) => {
              return (
                <div>
                  <AppList pid={rowData.id} history={history} />
                </div>
              );
            }}
            icons={tableIcons}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);
                }),
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve);
                }),
            }}
            onRowClick={(evt, selectedRow) =>
              history.push("/project/" + selectedRow.id)
            }
            options={{
              actionsColumnIndex: -1,
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}

export default Project;
