import React, { useState, useEffect, useParams, forwardRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Grid,
  // Card,
  // CardContent,
  // Typography,
  // ButtonBase,
  // Modal,
  // Button,
} from "@material-ui/core";
import MaterialTable from "material-table";
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
// import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { projectAxios, appAxios } from "../../utils/axios";

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

export default function Project() {
  var columns = [
    { title: "ID", field: "id", editable: "never" },
    { title: "Title", field: "title" },
    { title: "Descrption", field: "description" },
  ];
  const [projectList, setProjectList] = useState();
  const user = useSelector((state) => state.user);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  async function addRow(data) {
    const response = await projectAxios.postProject({
      title: data.title,
      description: data.description,
      department_id: user.info.department_id,
    });
    let dataToAdd = [...projectList];
    dataToAdd.push(response);
    setProjectList(dataToAdd);
  }

  const history = useHistory();

  useEffect(async () => {
    try {
      const responseData = await projectAxios.getAll();
      setProjectList(responseData);
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
    return () => {};
  }, []);

  const handleRowUpdate = (newData, oldData, resolve) => {
    let errorList = [];
    if (!newData.title) {
      errorList.push("Please enter title");
    }
    if (!newData.description) {
      errorList.push("Please enter description");
    }

    if (errorList.length < 1) {
      const dataUpdate = [...projectList];
      const index = oldData.tableData.id;
      dataUpdate[index] = newData;
      setProjectList([...dataUpdate]);
      resolve();
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowAdd = (newData, resolve) => {
    let errorList = [];
    if (!newData.title) {
      errorList.push("Please enter title");
    }
    if (!newData.description) {
      errorList.push("Please enter description");
    }

    if (errorList.length < 1) {
      addRow(newData);
      resolve();
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    const dataDelete = [...projectList];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);
    setProjectList([...dataDelete]);
    resolve();
  };

  return (
    <>
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
              data={projectList}
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
    </>
  );
}
