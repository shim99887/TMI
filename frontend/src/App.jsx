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
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN, LOG_OUT } from "./redux/user";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const login = ({ id, password }) => {
    if (loginCheck({ id, password })) {
      dispatch(LOG_IN("test_user"));
    }
  };
  console.log(user);
  const logout = () => dispatch(LOG_OUT());

  return (
    <>
      {user.isLoggedIn ? (
        <>
          <Redirect to="/project" />
          {/* <LogoutButton logout={logout} /> */}
          <Navigation logout={logout} />
          <Container
            style={{ backgroundColor: "white", height: "100vh", padding: 10 }}
          >
            <div style={{ height: 64 }} />
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
          render={(props) => <Login login={login} {...props} />}
        />
      )}
    </>
  );
}

export default App;
