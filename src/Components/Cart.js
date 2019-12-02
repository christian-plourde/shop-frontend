import React, { Component } from "react";
import "../styles/Cart.css";
import CartItem from "./CartItem";
import ShippingForm from "./shippingForm";

class Cart extends Component {
  constructor(props) {
    super();
    this.state = {
      products: [],
      subtotal: 0.0,
      total: 0.0,
      shipping: 5,
      methodSelected: "standard",
      ableToCheckout: false
    };
  }
  componentDidMount() {
    this.setState({
      products: this.props.products
    });
    let sTotal = 0;
    for (var x in this.props.products) {
      sTotal += this.props.products[x].productPrice;
    }
    this.setState({
      subtotal: sTotal,
      total: sTotal + sTotal * 0.15
    });
  }
  componentDidUpdate() {
    if (
      this.state.total !==
      this.state.subtotal + this.state.subtotal * 0.15 + this.state.shipping
    ) {
      this.setState({
        total:
          this.state.subtotal + this.state.subtotal * 0.15 + this.state.shipping
      });
    }
  }
  handleShipping = () => {
    if (document.getElementById("exp").checked) {
      this.setState({ shipping: 15.0, methodSelected: "express" });
    }
    if (document.getElementById("stan").checked) {
      this.setState({ shipping: 5.0, methodSelected: "standard" });
    }
  };

  handleRemove = productID => {
    let productList = this.state.products.filter(toRemove => {
      return toRemove.productID !== productID;
    });
    /*Subtracts the necessary value from the subtotal*/
    let product = this.state.products.find(
      toRemove => toRemove.productID === productID
    );
    let total = product.productPrice * product.cartQuantity;
    this.setState({
      products: productList,
      subtotal: this.state.subtotal - total
    });
    
    //removing from cart and updating cart
    let updatedCart=""
    let updatedCartQuantity=""
    let intCartQuantity = parseInt(localStorage.getItem("cartQuantity"))
    let newIntCartQuantity = intCartQuantity - product.cartQuantity
    if(productList.length == 0){
      localStorage.removeItem("cart")
      localStorage.removeItem("cartQuantity")
    }
    else{
      for(var x in productList){
        if(x == 0){updatedCart = JSON.stringify(productList[x])}
        else{
          updatedCart = updatedCart + "|" + JSON.stringify(productList[x])
        }
        localStorage.setItem("cart",updatedCart)
      }   
      updatedCartQuantity = newIntCartQuantity.toString()
      localStorage.setItem("cartQuantity",updatedCartQuantity)
    }
    
  };

  handleCheckout = () => {
    if (this.state.ableToCheckout == true) {
      
    } else alert("Verify the delivery address before checking out!");
  };

  adjustSubTotal = price => {
    this.setState({ subtotal: price + this.state.subtotal });
  };

  receiveQuantity = (quantity, productID) => {
    let updatedProducts = this.state.products;
    updatedProducts.find(
      toChange => toChange.productID === productID
    ).cartQuantity = quantity;
    this.setState({ products: updatedProducts });
  };

  checkShippingInfo = validity => {
    if (validity == true) {
      this.setState({ ableToCheckout: true });
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <div class="checkout-body">
        <h3 class="cart-title">Cart</h3>
        <div className="shopping-cart">
          <div class="column-labels">
            <label class="product-image">Image</label>
            <label class="product-details">Product</label>
            <label class="product-price">Price</label>
            <label class="product-quantity">Quantity</label>
            <label class="product-removal">Remove</label>
            <label class="product-line-price">Total</label>
          </div>
          <div>
            {this.state.products.map(x => {
              return (
                <CartItem
                  id={x.productID}
                  name={x.productName}
                  description={x.descriptionText}
                  price={x.productPrice}
                  brand={x.modelName}
                  quantity={x.cartQuantity}
                  onRemove={() => this.handleRemove(x.productID)}
                  receiveTotal={this.adjustSubTotal}
                  receiveQuantity={this.receiveQuantity}
                  image={x.picture}
                />
              );
            })}
          </div>

          <div class="Cart-shipping">
            <div>
              <ShippingForm shippingValidity={this.checkShippingInfo} />
            </div>
            <div class="financial-details">
              <div>
                <div class="shipping-method">
                  <form>
                    <label>Choose a shipping method</label>
                    <br />
                    <label class="shipping">Standard - $5</label>
                    <input
                      type="radio"
                      value="standard"
                      name="shipping"
                      checked={this.state.methodSelected === "standard"}
                      id="stan"
                      onClick={this.handleShipping}
                    />
                    <label class="shipping">Express - $15</label>
                    <input
                      type="radio"
                      value="express"
                      name="shipping"
                      id="exp"
                      checked={this.state.methodSelected === "express"}
                      onClick={this.handleShipping}
                    />
                  </form>
                </div>
                <div class="totals">
                  <div class="totals-item">
                    <label>Subtotal</label>
                    <div class="totals-value" id="cart-subtotal">
                      {this.state.subtotal.toFixed(2)}
                    </div>
                  </div>
                  <div class="totals-item">
                    <label>Tax (15%)</label>
                    <div class="totals-value" id="cart-tax">
                      {(this.state.subtotal * 0.15).toFixed(2)}
                    </div>
                  </div>
                  <div class="totals-item">
                    <label>Shipping </label>
                    <div class="totals-value" id="cart-shipping">
                      {this.state.shipping}
                    </div>
                  </div>
                  <div class="totals-item totals-item-total">
                    <label>Grand Total</label>
                    <div class="totals-value" id="cart-total">
                      {this.state.total.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              <button class="checkout" onClick={this.handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Cart;
