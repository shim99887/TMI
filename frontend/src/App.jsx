import { Container } from "@material-ui/core";
import React from "react";
import { Route } from "react-router";
import Navigation from "./components/Navigation";
import About from "./pages/About";
import Dashboard from "./pages/dashboard/Dashboard";
import Project from "./pages/project/Project";
import ProjectReport from "./pages/project/ProjectReport";
import Application from "./pages/application/Application";
import ApplicationDetail from "./pages/application/ApplicationDetail";
import "./App.css";

function App() {
  return (
    <>
      <Navigation />
      <Container style={{ backgroundColor: "white" }}>
        <Route path="/" exact component={() => <div>Home</div>} />
        {/* <Route path="/dashboard" exact component={Dashboard} /> */}
        <Route path="/project" exact component={Project} />
        <Route path="/project/:id" component={ProjectReport} />
        <Route path="/app" exact component={Application} />
        <Route path="/app/:pid/:id" component={ApplicationDetail} />
        <Route path="/about" component={About} />
      </Container>
    </>
  );
}

export default App;
