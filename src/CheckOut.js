import React, { Component } from "react";
import "./styles/Cart.css";
import Advertisement from "./Components/Advertisement.js";
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
    console.log('Checkout :: render -> cart array', cart_array);
    var item_quantity = 0;
    for(var i = 0; i < cart_array.length; i++)
    {
      console.log('Checkout :: render -> cart item ', i, ' :', cart_array[i]);
      var product = cart_array[i];
      item_quantity += product.cartQuantity;
    }
    console.log('Checkout :: render -> Detected', item_quantity, 'items.')


    return (
      <div>
        <div>
          <Navbar renderCart={false} cartQuantity={item_quantity} />
          {/*<Navbar cartQuantity={item_quantity} />*/
        /*Uncomment the above to render cart*/}
        </div>
        <div className="CheckOutBody">
          <Cart products={cart_array} />
        </div>
        <Advertisement />
      </div>
    );
  }

}
export default CheckOut;
