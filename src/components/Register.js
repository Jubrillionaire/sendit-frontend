import React, { Component } from "react";
import "../styles/register.css";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { firstName, lastName, email, phoneNo, password } = this.state;
    fetch("https://sendit-backend01.herokuapp.com/api/v1/users", {
      method: "POST",
      headers: {
        "Content-type": "Application/json"
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_no: phoneNo,
        password: password
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem('userId', res.userId);
          window.location = "/user";
          toast.success(res.msg);
        } else if (res.msg) {
          toast.error(res.msg);

          console.log(res.msg);
        } else {
          res.errors.forEach(err => {
            toast.error(err.msg);
          });
        }
      })
      .catch(error => console.log(error));
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
        <Form className="input" onSubmit={this.handleSubmit}>
          <h1 className="register">Register</h1>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="email"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="mobile-no">Mobile-No</Label>
            <Input
              type="text"
              name="phoneNo"
              placeholder="Mobile-No"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </FormGroup>

          <input type="submit" value="submit" />
        </Form>
      
    );
  }
}

export default Register;
