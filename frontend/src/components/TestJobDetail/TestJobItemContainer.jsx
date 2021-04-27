// fail, error는 눌렀을 때 원인까지 보여주기
// Type, Message, Contents, ResultType
// message에 따라 색깔 바꾸기

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TestJobErrorContainer from "./TestJobErrorContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingTop: "1%",
  },
}));

export default function TestJobDetailItem(props) {
  // method?? 변수명 생각해볼 것
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    // 1. 색칠하는 부분 4가지로 나누기
    // 2. Fail, Error일 때 DropDown 버튼 or OnClick 추가하기
    // 네모 칸만 만들면 된다
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <Paper>
          <div
            style={{
              borderLeft: props.color,
              paddingBottom: "1%",
            }}
          >
            <div className={styles.container}>
              <div
                style={{
                  fontSize: "150%",
                  color: "#444444",
                  fontWeight: "bold",
                }}
              >
                {props.name}
              </div>

              <div
                style={{
                  fontSize: "125%",
                  color: "#444444",
                }}
              >
                ({props.time} ms)
              </div>

              {(props.resultType === "Error" ||
                props.resultType === "Fail") && (
                <Button onClick={handleClick}>
                  {open === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </Button>
              )}

              <div
                style={{
                  flexGrow: 1,
                  fontSize: "75%",
                  color: "#444444",
                  textAlign: "right",
                }}
              >
                Case History
              </div>
            </div>

            {open === true ? (
              <div
                style={{
                  borderLeft: props.secondColor,
                  marginLeft: "3%",
                  marginRight: "3%",
                  marginTop: "1%",
                  marginBottom: "1%",
                }}
              >
                <TestJobErrorContainer
                  name="Type"
                  content={props.errorType}
                ></TestJobErrorContainer>
                <TestJobErrorContainer
                  name="Message"
                  content={props.errorMessage}
                ></TestJobErrorContainer>
                <TestJobErrorContainer
                  name="Contents"
                  content={props.errorContents}
                ></TestJobErrorContainer>
                <TestJobErrorContainer
                  name="ResultType"
                  content={props.resultType}
                ></TestJobErrorContainer>
              </div>
            ) : null}
          </div>
        </Paper>
      </div>
    </ClickAwayListener>
  );
}
