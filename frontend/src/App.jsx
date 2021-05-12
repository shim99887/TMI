import { Container } from "@material-ui/core";
import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Navigation from "./components/Navigation";
import About from "./pages/About";
import Login from "./pages/login/Login";
import Project from "./pages/project/Project";
import ProjectApp from "./pages/project/ProjectApp";
import Application from "./pages/application/Application";
import ApplicationDetail from "./pages/application/ApplicationDetail";
import "./App.css";
import { loginCheck } from "./components/user/auth";
import LogoutButton from "./components/user/logoutButton";

function App() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ id, password }) => setUser(loginCheck({ id, password }));
  const logout = () => setUser(null);

  return (
    <>
      {authenticated ? (
        <>
          <Redirect to="/project" />
          <Navigation logout={logout} />
          {/* <LogoutButton logout={logout} /> */}
          <Container
            style={{ backgroundColor: "white", height: "100vh", padding: 10 }}
          >
            {/* <Route path="/" exact component={() => <div>Home</div>} /> */}
            <Route path="/project" exact component={Project} />
            <Route path="/project/:id" component={ProjectApp} />
            <Route path="/app" exact component={Application} />
            <Route path="/app/:id" component={ApplicationDetail} />
            <Route path="/about" component={About} />
          </Container>
        </>
      ) : (
        <Route
          path="/"
          render={(props) => (
            <Login authenticated={authenticated} login={login} {...props} />
          )}
        />
      )}
    </>
  );
}

export default App;
