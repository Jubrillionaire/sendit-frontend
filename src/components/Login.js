import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../styles/login.css'
toast.configure();

const role = localStorage.getItem("role")

export class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


 

  handleSubmit = e => {
    const { email, password } = this.state;
    e.preventDefault();
    fetch("https://sendit-backend01.herokuapp.com/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-type": "Application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.token) {
          fetch("https://sendit-backend01.herokuapp.com/api/v1/me", {
            headers: {
              "Content-type": "application/json",
              Authorization: res.token
            }
            })
            .then(res => res.json())
            .then(data => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("userId", res.userId);
          localStorage.setItem("role", data.role);
          console.log(data.role)
          {role === "member" && (window.location = "/user")}
          {role === "admin" && (window.location = "/parcels")}
          toast.success(data.msg)
         })

        } else if (res.msg) {
          toast.error(res.msg);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Form className="inputLogin" onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="email"
            onChange={this.handleChange}
            required={true}
          />
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            required={true}
          />
        </FormGroup>

       <Button>Submit</Button>
      </Form>
    );
  }
}

export default Login;
