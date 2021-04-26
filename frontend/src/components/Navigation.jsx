import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/project">Project</Link>
      <Link to="/testjob">Test Job</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}
