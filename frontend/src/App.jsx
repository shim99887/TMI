import React from "react";
import { Route } from "react-router";
import Navigation from "./components/Navigation";
import About from "./pages/About";
import Project from "./pages/project/Project";
import ProjectDetail from "./pages/project/ProjectDetail";
import TestJob from "./pages/testjob/TestJob";
import TestJobDetail from "./pages/testjob/TestJobDetail";

function App() {
  return (
    <>
      <Navigation />
      <Route path="/" exact component={() => <div>Home</div>} />
      <Route path="/project" exact component={Project} />
      <Route path="/project/:id" component={ProjectDetail} />
      <Route path="/testjob" exact component={TestJob} />
      <Route path="/testjob/:id" component={TestJobDetail} />
      <Route path="/about" component={About} />
    </>
  );
}

export default App;
