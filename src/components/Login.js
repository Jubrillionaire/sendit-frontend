import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../styles/login.css'
toast.configure();

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
      .then(data => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);
          console.log(data.userId)
          window.location = "/user";
          toast.success(data.msg);
        } else if (data.msg) {
          toast.error(data.msg);
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
