import React, { Component } from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import CreateOrder from "./components/CreateOrder";
import AdminParcels from './components/AdminParcels';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Redirect } from "react-router-dom";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role")

export class App extends Component {
  state = {
    firstName: ""
  };

  componentDidMount() {
    fetch("http://localhost:4000/api/v1/me", {
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
           {/* <Route path="/parcels" component={AdminParcels} /> */}
             
           <Route
              path="/parcels"
              render={() => {
                if (role === "admin") return <AdminParcels />;
                return <Redirect to="/user" />;
              }}
            />
            

            <Route
              exact
              path="/login"
              render={() => {
                if (!token) return <Login />;
                return <Redirect to="/" />;
              }}
            />

            <Route
              exact
              path="/user"
              render={() => {
                if (role === "member") return <Profile />;
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
