import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function createData(testName, lineCov, branchCov, passRate, history) {
  return { testName, lineCov, branchCov, passRate, history };
}

const data = [
  createData("Test 1", 95, 90, 98, "4 Hours ago"),
  createData("Test 1", 95, 90, 98, "4 Hours ago"),
  createData("Test 1", 95, 90, 98, "4 Hours ago"),
  createData("Test 1", 95, 90, 98, "4 Hours ago"),
  createData("Test 1", 95, 90, 98, "4 Hours ago"),
  createData("Test 1", 95, 90, 98, "4 Hours ago"),
  createData("Test 1", 95, 90, 98, "4 Hours ago"),
  createData("Test 1", 95, 90, 98, "4 Hours ago"),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Test Name</TableCell>
            <TableCell align="right">Line Coverage</TableCell>
            <TableCell align="right">Branch Coverage</TableCell>
            <TableCell align="right">Pass Rate</TableCell>
            <TableCell align="right">History</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.testName}>
              <TableCell component="th" scope="row">
                {row.testName}
              </TableCell>
              <TableCell align="right">{row.lineCov}%</TableCell>
              <TableCell align="right">{row.branchCov}%</TableCell>
              <TableCell align="right">{row.passRate}%</TableCell>
              <TableCell align="right">{row.history}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
