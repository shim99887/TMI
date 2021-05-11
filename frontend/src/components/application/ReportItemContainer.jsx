import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ReportErrorContainer from "./ReportErrorContainer";

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

// open하는 부분 accordion으로 바꾸면 더 좋을듯
{
  /* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */
}

export default function ReportItemContainer(props) {
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <Paper>
          <Box
            style={{
              borderLeft: props.color,
              paddingBottom: "1%",
            }}
          >
            <Box className={styles.container}>
              <Box
                style={{
                  fontSize: "150%",
                  color: "#444444",
                  fontWeight: "bold",
                }}
              >
                {props.name}
              </Box>

              <Box
                style={{
                  fontSize: "125%",
                  color: "#444444",
                }}
              >
                ({props.time} ms)
              </Box>

              {(props.resultType === "Error" ||
                props.resultType === "Fail") && (
                <Button onClick={handleClick}>
                  {open === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </Button>
              )}

              <Box
                style={{
                  flexGrow: 1,
                  fontSize: "75%",
                  color: "#444444",
                  textAlign: "right",
                }}
              >
                Case History
              </Box>
            </Box>

            {open === true ? (
              <Box
                style={{
                  borderLeft: props.secondColor,
                  marginLeft: "3%",
                  marginRight: "3%",
                  marginTop: "1%",
                  marginBottom: "1%",
                }}
              >
                <ReportErrorContainer
                  name="Type"
                  content={props.errorType}
                ></ReportErrorContainer>
                <ReportErrorContainer
                  name="Message"
                  content={props.errorMessage}
                ></ReportErrorContainer>
                <ReportErrorContainer
                  name="ResultType"
                  content={props.resultType}
                ></ReportErrorContainer>
              </Box>
            ) : null}
          </Box>
        </Paper>
      </Box>
    </ClickAwayListener>
  );
}
