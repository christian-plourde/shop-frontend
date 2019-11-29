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
    //const{products}= this.state
    let storage = localStorage.getItem("cart")
    //console.log(temp);
    let productArrayStrings= storage.split("|") // array of products as Strings
    let productArrayObjects=[]
    for(var x in productArrayStrings){
      productArrayObjects.push(JSON.parse(productArrayStrings[x]))
    }
    return productArrayObjects
  }

  render() {
    
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="CheckOutBody">
          <Cart products={this.getCart()}></Cart>
        </div>
      </div>
    );
  }
  
}
export default CheckOut;
