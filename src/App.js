import React, { Component } from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import CreateOrder from "./components/CreateOrder";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Redirect } from "react-router-dom";

const token = localStorage.getItem("token");

export class App extends Component {
  state = {
    firstName: ""
  };

  componentDidMount() {
    fetch("https://sendit-backend01.herokuapp.com/api/v1/me", {
      headers: {
        "Content-type": "application/json",
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          firstName: res.first_name
        })
      );
  }
  render() {
    return (
      <div>
        <div className="App">
          <NavBar firstName={this.state.firstName} />
          <div className="space-top">
            <Route
              exact
              path="/"
              render={() => {
                return <Home />;
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (!token) return <Register />;
                return <Redirect to="/user" />;
              }}
            />
            <Route
              exact
              path="/login"
              render={() => {
                if (!token) return <Login />;
                return <Redirect to="/user" />;
              }}
            />

            <Route
              exact
              path="/user"
              render={() => {
                if (token) return <Profile />;
                return <Redirect to="/login" />;
              }}
            />
            <Route
              exact
              path="/create-order"
              render={() => {
                if (token) return <CreateOrder />;
                return <Redirect to="/login" />;
              }}
            />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
