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
    //Also recompute subtotal and total
    let sTotal = 0;
    for (var x in this.props.products) {
      let product = this.props.products[x];
      sTotal += Number.parseFloat(product.productPrice) * Number.parseFloat(product.cartQuantity);
    }
    this.setState({
      subtotal: sTotal.toFixed(2),
      total: (sTotal.toFixed(2) * 1.15).toFixed(2)
    });
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


  checkShippingInfo = validity => {
    if (validity) {
      this.setState({ ableToCheckout: true });
      return true;
    }
    return false;
  };

//A function to handle button presses + or -, to be passed to the cart component.
//If isIncrement is true, increment the quantity. Else, decrement.
  handleButtonPress = (isIncrement, product_id) =>
  {
    // console.log('Handle button press; products before button press ', this.state.products)
    // console.log('Handle button press; subtotal before button press ', this.state.subtotal)
    // return;
    let product_list = [];
    for(var index = 0; index < this.state.products.length; index++)
    {
      let product = this.state.products[index];
      // console.log('Handle button press :: Verifying product ', product)
      let product_to_push = product;
      let product_quantity = Number.parseInt(product_to_push.cartQuantity)
      if (product_to_push.productID == product_id)
      {
        if(product_quantity == 1 && !isIncrement)
        {
          window.alert(
            'Use the remove button'
          );
          return;
        }
        product_to_push.cartQuantity = (isIncrement)
          ? product_quantity + 1
          : product_quantity - 1;
        // console.log('Updated quantity from', product_quantity, ' to ', product_to_push.cartQuantity,' of product ', product)
      }
      //Replace the product list
      product_list.push(product_to_push)
    }
    this.setState({products:product_list})

    // console.log('Handle button press; products after button press ', this.state.products)

    //Also recompute subtotal and total
    let sTotal = 0;
    for (var x in this.props.products) {
      let product = this.props.products[x];
      sTotal += Number.parseFloat(product.productPrice) * Number.parseFloat(product.cartQuantity);
    }
    this.setState({
      subtotal: sTotal.toFixed(2),
      total: (sTotal.toFixed(2) * 1.15).toFixed(2)
    });

    // console.log('Handle button press; subtotal after button press ', this.state.subtotal)
  }

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
            {this.state.products.map(product => {
            
              return (
                <CartItem
                  product={product}
                  handleIncrement={this.handleButtonPress}
                  onRemove={() => this.handleRemove(product.productID)}
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
                      {!isNaN(this.state.subtotal)
                        ? Number.parseFloat(this.state.subtotal).toFixed(2) : ''}
                    </div>
                  </div>
                  <div class="totals-item">
                    <label>Tax (15%)</label>
                    <div class="totals-value" id="cart-tax">
                    {!isNaN(this.state.subtotal)
                        ? Number.parseFloat(this.state.subtotal * 0.15).toFixed(2) : ''}
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
                    {!isNaN(this.state.total)
                      ? Number.parseFloat(this.state.total).toFixed(2) : ''}
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
