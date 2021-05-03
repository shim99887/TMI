import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [];

const tableHead = [
  "id",
  "groupName",
  "packageName",
  "className",
  "instructionMissed",
  "instructionCovered",
  "branchMissed",
  "branchCovered",
  "lineMissed",
  "lineCovered",
  "complexityMissed",
  "complexityCovered",
  "methodMissed",
  "methodCovered",
];

// {
//   data.map((project) => (
//     <div>
//       {Object.keys(project).map((key) => (
//         <p>{project[key]}</p>
//       ))}
//     </div>
//   ));
// }

export default function BasicTable({ data }) {
  const classes = useStyles();
  console.log(data[0]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHead.map((head) => (
              <TableCell>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((coverage, index) => (
            <TableRow key={index}>
              {Object.keys(coverage).map((key) => (
                <TableCell>{coverage[key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
