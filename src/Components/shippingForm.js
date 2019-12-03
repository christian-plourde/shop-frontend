import React, { Component } from "react";
import "../styles/shippingform.css";
import localhost from '../LocalHost.js';
import axios from 'axios';


export default class ShippingForm extends Component {
  state = {
    address: "",
    country: "",
    validity: false
  };

  componentDidMount()
  {
    const site = (localhost) ?
      'http://localhost/shop-backend/php/user_profile_display.php'
      : 'https://shop-354.herokuapp.com/user_profile_display.php';
    const data = {username: localStorage.getItem("logged_in_user")};
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"*",
        },
      };

    axios.post(site, data, axiosConfig)
    .then((response) => {
        if(response.data.Accepted)
        {
          console.log("Response accepted");
          this.setState({address: response.data.address});
          this.setState({country: response.data.country});
        }
    }, (error) => {
      console.log("Didn't succeed for axios.post call with params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig);
    });
  }

  handleVerify = () => {
    if (this.state.address.length == 0 || this.state.country.length == 0) {
      document.getElementById("verify").innerHTML = "Not Valid!";
    } else {
      this.setState({ validity: true });
      this.sendValidityToCart();
      document.getElementById("verify").innerHTML = "Verified!";
    }
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendValidityToCart = () => {
    this.props.shippingValidity(true);
  };

  render() {
    return (
      <div class="shippingform">
        <h1>Shipping Details</h1>
        <form>
          <label>Address</label>
          <input
            type="text"
            name="address"
            class="ship"
            value = {this.state.address}
            required
            onChange={this.handleInputChange}
            
          />
          <br />
          <label>Country</label>
          <input
            class="ship"
            type="text"
            name="country"
            required
            value = {this.state.country}
            onChange={this.handleInputChange}
            
          />
          <br />
        </form>
        <button onClick={this.handleVerify.bind(this)} class="deliver">
          Deliver to this address
        </button>
        <p id="verify"></p>
      </div>
    );
  }
}
