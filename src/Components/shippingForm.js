import React, { Component } from "react";
import "../styles/shippingform.css";
export default class ShippingForm extends Component {
  state = {
    address: "",
    city: "",
    country: "",
    province: "",
    postalcode: "",
    validity: false
  };

  handleVerify = () => {
    this.setState({ validity: true });
    this.sendValidityToCart();
    document.getElementById("verify").innerHTML = "Verified!";
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
            required
            onChange={this.handleInputChange}
          />
          <br />
          <label>City</label>
          <input
            class="ship"
            type="text"
            name="city"
            required
            onChange={this.handleInputChange}
          />
          <label>Country</label>
          <input
            class="ship"
            type="text"
            name="country"
            required
            onChange={this.handleInputChange}
          />
          <br />
          <label>Province/State</label>
          <input
            class="ship"
            type="text"
            name="province"
            required
            onChange={this.handleInputChange}
          />
          <br />
          <label>Postal Code</label>
          <input
            class="ship"
            type="text"
            name="postalcode"
            required
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
