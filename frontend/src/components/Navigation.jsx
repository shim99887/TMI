import {
  AppBar,
  Button,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link, withRouter } from "react-router-dom";
// import MyBreadcrumbs from "./Breadcrumbs";
import { useSelector } from "react-redux";

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

function Navigation({ logout, history }) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);

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
          <Typography>{user.info}</Typography>
          <Button
            onClick={() => {
              logout();
              history.push("/");
            }}
            color="inherit"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Navigation);
