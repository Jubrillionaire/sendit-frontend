import React, { Component } from "react";
import { Form, FormGroup, Label, Input} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

toast.configure();

export class CreateOrder extends Component {
  state = {
    pickupLocation: "",
    destination: "",
    recipientName: "",
    recipientNo: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { pickupLocation, destination, recipientNo, recipientName } = this.state;
    fetch("http://localhost:5000/api/v1/parcels", {
      method: "POST",
      headers: {
        Authorization:token,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        pickup_location: pickupLocation,
        destination: destination,
        recipient_name: recipientName,
        recipient_phone_no: recipientNo
      })
    })
      .then(res => res.json())
      .then(data => {
          console.log(data)
        if (data.success === true) {
          toast.success(data.msg);
          window.location = "/user";
        } else {
          data.errors.forEach(err => {
            toast.error(err.msg);
          });
        }
      });
  };

  render() {
    return (
      <Form className="input" onSubmit={this.handleSubmit}>
        <h1 className="pickupLocation">Create Order</h1>
        <FormGroup>
          <Label for="pickupLocation">Pickup Location</Label>
          <Input
            type="text"
            name="pickupLocation"
            placeholder="Pickup Location"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="Destination">Destination</Label>
          <Input
            type="text"
            name="destination"
            placeholder="Destination"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="Recipient-name">Recipient's name</Label>
          <Input
            type="text"
            name="recipientName"
            placeholder="Recipient's name"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="Recipient's Mobile-No">Recipient's Mobile-No</Label>
          <Input
            type="text"
            name="recipientNo"
            placeholder="Recipient's Mobile-No"
            onChange={this.handleChange}
          />
        </FormGroup>
        <input type="submit" value="create" />
        {/* <Button>Create Order</Button> */}
      </Form>
    );
  }
}

export default CreateOrder;
