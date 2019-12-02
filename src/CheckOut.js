import React, { Component } from "react";
import "./styles/Cart.css";
import Navbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./Components/Cart";
class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  getCart(){
    let storage = localStorage.getItem("cart")

    let productArrayStrings= storage.split("|") //Return an array of products as Strings


    let productArrayObjects=[]
    for(var x in productArrayStrings){
      productArrayObjects.push(JSON.parse(productArrayStrings[x]))
    }
    console.log('getCart() :: product array objects', productArrayObjects)
    return productArrayObjects
  }

  render() {
    var cart_array = this.getCart();

    return (
      <div>
        <div>
          <Navbar cartQuantity={cart_array.length} />
        </div>
        <div className="CheckOutBody">
          <Cart products={cart_array}></Cart>
        </div>
      </div>
    );
  }

}
export default CheckOut;
