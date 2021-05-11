import { Box, IconButton, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { reportAxios } from "../../utils/axios";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ProjectAppReportCollapse from "./ProjectAppReportCollapse";
import ProjectAppReportCell from "./ProjectAppReportCell";

export default function ProjectAppTableBody({ app }) {
  const [reportList, setReportList] = useState([]);
  const [open, setOepn] = useState(false);

  const onClick = () => {
    setOepn(!open);
  };

  useEffect(async () => {
    const responseData = await reportAxios.getListByAppId(app.id);
    console.log(responseData);
    setReportList(responseData);
    return () => {};
  }, []);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={onClick}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{app.title}</TableCell>
        {reportList.slice(0, 1).map((row, index) => (
          <ProjectAppReportCell key={index} row={row} />
        ))}
      </TableRow>
      <ProjectAppReportCollapse open={open} reportList={reportList.slice(1)} />
    </>
  );
}
