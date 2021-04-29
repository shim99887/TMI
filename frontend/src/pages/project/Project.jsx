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
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useHistory, Link } from "react-router-dom";
import { ButtonBase } from "@material-ui/core";

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

function createData(id, title, description) {
  return { id, title, description };
}

const originalRows = [
  createData(1, "A", "z"),
  createData(2, "B", "y"),
  createData(3, "C", "x"),
  createData(4, "D", "w"),
  createData(5, "E", "v"),
  createData(6, "F", "u"),
  createData(7, "G", "t"),
  createData(8, "H", "s"),
  createData(9, "I", "r"),
  createData(10, "J", "q"),
  createData(11, "K", "p"),
  createData(12, "L", "o"),
  createData(13, "M", "n"),
  createData(14, "N", "m"),
  createData(15, "O", "l"),
  createData(16, "P", "k"),
  createData(17, "Q", "j"),
  createData(18, "R", "i"),
  createData(19, "S", "h"),
  createData(20, "T", "g"),
  createData(21, "U", "f"),
  createData(22, "V", "e"),
  createData(23, "W", "d"),
  createData(24, "X", "c"),
  createData(25, "Y", "b"),
  createData(26, "Z", "a"),
];

function Project() {
  const cardClass = cardStyles();
  var columns = [
    { title: "ID", field: "id" },
    { title: "Title", field: "title" },
    { title: "Descrption", field: "description" },
  ];
  const [data, setData] = useState(originalRows); //table data

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const history = useHistory();

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
      const dataUpdate = [...data];
      const index = oldData.tableData.id;
      dataUpdate[index] = newData;
      setData([...dataUpdate]);
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
      let dataToAdd = [...data];
      dataToAdd.push(newData);
      setData(dataToAdd);
      resolve();
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    const dataDelete = [...data];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);
    setData([...dataDelete]);
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
            data={data}
            detailPanel={(rowData) => {
              return (
                <div>
                  <Typography>Project ID: {rowData.id}</Typography>
                  <Typography>Coverage: 99%</Typography>
                  <br />
                  <Typography>TestJob List</Typography>
                  <Grid container spacing={0}>
                    <ButtonBase
                      className={cardClass.button}
                      onClick={(event) => {
                        history.push("/testjob/" + 1);
                      }}
                    >
                      <Card className={cardClass.card}>
                        <CardContent>
                          <Typography>
                            Status Icon&nbsp;&nbsp;&nbsp; ID
                          </Typography>
                          <Typography>login unit test</Typography>
                        </CardContent>
                      </Card>
                    </ButtonBase>
                    <ButtonBase
                      className={cardClass.button}
                      onClick={(event) => {
                        history.push("/testjob/" + 2);
                      }}
                    >
                      <Card className={cardClass.card}>
                        <CardContent>
                          <Typography>
                            Status Icon&nbsp;&nbsp;&nbsp; ID
                          </Typography>
                          <Typography>join unit test</Typography>
                        </CardContent>
                      </Card>
                    </ButtonBase>
                    <ButtonBase
                      className={cardClass.button}
                      onClick={(event) => {
                        history.push("/testjob/" + 3);
                      }}
                    >
                      <Card className={cardClass.card}>
                        <CardContent>
                          <Typography>
                            Status Icon&nbsp;&nbsp;&nbsp; ID
                          </Typography>
                          <Typography>edit unit test</Typography>
                        </CardContent>
                      </Card>
                    </ButtonBase>
                    <ButtonBase
                      className={cardClass.button}
                      onClick={(event) => {
                        history.push("/testjob/" + 4);
                      }}
                    >
                      <Card className={cardClass.card}>
                        <CardContent>
                          <Typography>
                            Status Icon&nbsp;&nbsp;&nbsp; ID
                          </Typography>
                          <Typography>delete unit test</Typography>
                        </CardContent>
                      </Card>
                    </ButtonBase>
                  </Grid>
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
