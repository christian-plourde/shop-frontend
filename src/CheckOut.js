import React, { Component } from "react";
import "./styles/LandingPage.css";
import Navbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./Components/Cart";
class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      products: []
    };
  }

  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <h1>Check Out</h1>
        </div>
        <div className="CheckOutBody">
          <Cart products={this.state.products}></Cart>
        </div>
      </div>
    );
  }
}
export default CheckOut;
