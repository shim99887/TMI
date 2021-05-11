import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid black",
  },
}));

export default function ReportHistoryContatiner(props) {
  const styles = useStyles();
  return (
    <Box>
      <Button>
        <Box className={styles.container}>
          <Box component="span">#{props.testCount}</Box>
          <Box component="span">{props.date}</Box>
        </Box>
      </Button>
    </Box>
  );
}

// 직은 페이지만 만들면됌
