import {
  AppBar,
  Button,
  colors,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import MyBreadcrumbs from "./Breadcrumbs";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  linkButton: {
    flexGrow: 5,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navigation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TMI
          </Typography>
          <Grid className={classes.linkButton}>
            <Button color="inherit">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/project"
              >
                Project
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/app"
              >
                Test Job
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/about"
              >
                About
              </Link>
            </Button>
          </Grid>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
    // <>
    //   <AppBar position="fixed">
    //     <Link to="/">Home</Link>
    //     {/* <Link to="/dashboard">Dashboard</Link> */}
    //     <Link to="/project">Project</Link>
    //     <Link to="/app">Test Job</Link>
    //     <Link to="/about">About</Link>
    //   </AppBar>
    //   {/* <MyBreadcrumbs /> */}
    // </>
  );
}
