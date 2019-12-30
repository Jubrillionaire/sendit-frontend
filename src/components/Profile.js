import React, { Component } from "react";
import "../styles/profile.css";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

export class Profile extends Component {
  state = {
    profile: []
  };

  componentDidMount() {
    fetch(`http://localhost:5000/api/v1/users/${userId}/parcels`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        data.sort((a, b) => a.id - b.id);
        this.setState({ profile: data }, console.log(data));
      })
      .catch(err => console.log(err));
  }

  handleEdit = id => {
    const answer = window.prompt("Please Input A Preferred Destination");

    fetch("http://localhost:5000/api/v1/parcels/destination", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        parcelId: id,
        user_id: userId,
        destination: answer
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg) {
          window.location = "/user";
          toast.success(data.msg);
        }
      });
  };

  handleCancel = id => {
    if (window.confirm("are you sure you want to delete this parcel?")) {
      fetch("http://localhost:5000/api/v1/parcels/cancel", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          parcelId: id,
          user_id: userId
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.msg) {
            window.location = "/user";
            toast.success(data.msg);
          }
        })
        .cstch(err => console.log(err));
    } else {
      window.location = "/user";
    }
  };

  render() {
    const { profile } = this.state;
    const table = profile.map(data => {
      return (
        <tbody key={data.id}>
          <tr>
            <button
              onClick={() => this.handleEdit(data.id)}
              className="btn btn-secondary p-1 pl-2 sec"
              disabled={data.status === "cancelled" ? true : false}
            >
              <FaEdit />
            </button>
            <th scope="row">{data.id}</th>
            <td>{data.pickup_location}</td>
            <td>{data.destination}</td>
            <td>{data.recipient_name}</td>
            <td>{data.recipient_phone_no}</td>
            <td>{data.status}</td>
            <button
              onClick={() => this.handleCancel(data.id)}
              className="btn btn-danger p-1 pri"
              disabled={data.status === "cancelled" ? true : false}
            >
              <FaTrashAlt />
            </button>
          </tr>
        </tbody>
      );
    });
    return (
      <div className="all">
        <div class="card" style={{ width: "20rem" }}>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <h5>Number of orders: {profile.length} </h5>{" "}
            </li>
            <li class="list-group-item">
              <h5>
                Orders in Transit:{" "}
                {profile.filter(data => data.status === "in transit").length}{" "}
              </h5>
            </li>
            <li class="list-group-item">
              <h5>
                Delivered:{" "}
                {profile.filter(data => data.status === "delivered").length}{" "}
              </h5>
            </li>
            <li class="list-group-item">
              <h5>
                Cancelled Orders:{" "}
                {profile.filter(data => data.status === "cancelled").length}
              </h5>
            </li>
          </ul>
        </div>
        <div className="profile">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th></th>
                <th scope="col">ID</th>
                <th scope="col">Pickup Location</th>
                <th scope="col">Destination</th>
                <th scope="col">Recipient Name</th>
                <th scope="col">Recipient Phone-No</th>
                <th scope="col">Status</th>
                <th></th>
              </tr>
            </thead>
            {table}
          </table>
        </div>
      </div>
    );
  }
}

export default Profile;
