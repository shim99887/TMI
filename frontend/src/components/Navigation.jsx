import { colors } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import MyBreadcrumbs from "./Breadcrumbs";

export default function Navigation() {
  return (
    <>
      <nav style={{ backgroundColor: colors.blue[500], padding: 5 }}>
        <Link to="/">Home</Link>
        {/* <Link to="/dashboard">Dashboard</Link> */}
        <Link to="/project">Project</Link>
        {/* <Link to="/app">Test Job</Link> */}
        <Link to="/about">About</Link>
      </nav>
      <MyBreadcrumbs />
    </>
  );
}
