import React, { Component } from "react";
import "../styles/Cart.css";
import CartItem from "./CartItem";

class Cart extends Component {
  state = {
    products: [
      {
        name: "Water",
        id: 2,
        brand: "Evian",
        price: 49.99,
        description: "Water for rich ass mofos",
        quantity: 1
      },
      {
        name: "Chips",
        id: 1,
        brand: "Kettle",
        price: 4.99,
        description: "chips n shit",
        quantity: 1
      },
      {
        name: "Yogurt",
        id: 3,
        brand: "IA",
        price: 8,
        description: "Yogurt ",
        quantity: 1
      }
    ],
    subtotal: 0.0,
    total: 0.0,
    shipping: 5,
    methodSelected: "standard"
  };

  handleShipping = () => {
    if (document.getElementById("exp").checked) {
      this.setState({ shipping: 15, methodSelected: "express" });
    }
    if (document.getElementById("stan").checked) {
      this.setState({ shipping: 5, methodSelected: "standard" });
    }
  };

  handleRemove = productID => {
    let productList = this.state.products.filter(toRemove => {
      return toRemove.id !== productID;
    });

    /*Subtracts the necessary value from the subtotal*/
    let product = this.state.products.find(
      toRemove => toRemove.id === productID
    );
    let total = product.price * product.quantity;
    this.setState({
      products: productList,
      subtotal: this.state.subtotal - total
    });
  };

  adjustSubTotal = price => {
    this.setState({ subtotal: price + this.state.subtotal });
  };

  receiveQuantity = (quantity, productID) => {
    let updatedProducts = this.state.products;
    updatedProducts.find(
      toChange => toChange.id === productID
    ).quantity = quantity;
    this.setState({ products: updatedProducts });
  };

  componentDidMount() {
    let sTotal = 0;
    for (var x in this.state.products) {
      sTotal += this.state.products[x].price;
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
                  id={x.id}
                  name={x.name}
                  description={x.description}
                  price={x.price}
                  brand={x.brand}
                  quantity={x.quantity}
                  onRemove={this.handleRemove.bind(this)}
                  receiveTotal={this.adjustSubTotal}
                  receiveQuantity={this.receiveQuantity}
                />
              );
            })}
          </div>
          <div class="shipping-method">
            <form>
              <label>Choose a shipping method</label>
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
          <button class="checkout">Checkout</button>
        </div>
      </div>
    );
  }
}
export default Cart;
