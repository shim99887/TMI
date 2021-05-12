import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid black",
    textTransform: "none",
  },
}));

export default function ReportHistoryContatiner(props) {
  const styles = useStyles();
  const [date, setDate] = useState();
  let temp;
  useEffect(() => {
    temp = props.date;
    setDate(temp.split("T"));
    console.log(date);
  });
  return (
    <Box>
      <Button>
        {/* {temp && ( */}
        <Box className={styles.container}>
          <Box component="span">Report #{props.testCount}</Box>
          <Box component="span">{props.date}</Box>
          {/* <Box component="span">{date[1]}</Box> */}
        </Box>
        {/* )} */}
      </Button>
    </Box>
  );
}

// 직은 페이지만 만들면됌
