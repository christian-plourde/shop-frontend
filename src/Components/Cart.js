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
        price: 50,
        description: "Water for rich ass mofos",
        quantity: 1
      },
      {
        name: "Chips",
        id: 1,
        brand: "Kettle",
        price: 5,
        description: "chips n shit",
        quantity: 1
      }
    ],
    subtotal: 0,
    total: 0,
    shipping: 15
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
    if (product.quantity == 1) {
      this.setState({
        products: productList,
        subtotal: this.state.subtotal - total
      });
    } else
      this.setState({
        products: productList,
        subtotal: this.state.subtotal - total - product.price
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
    this.setState({ subtotal: sTotal, total: sTotal + sTotal * 0.05 });
  }
  render() {
    return (
      <div>
        <h3>Cart</h3>
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
          <div class="totals">
            <div class="totals-item">
              <label>Subtotal</label>
              <div class="totals-value" id="cart-subtotal">
                {this.state.subtotal}
              </div>
            </div>
            <div class="totals-item">
              <label>Tax (5%)</label>
              <div class="totals-value" id="cart-tax">
                {this.state.subtotal * 0.05}
              </div>
            </div>
            <div class="totals-item">
              <label>Shipping </label>
              <div class="totals-value" id="cart-tax">
                {this.state.shipping}
              </div>
            </div>
            <div class="totals-item totals-item-total">
              <label>Grand Total</label>
              <div class="totals-value" id="cart-total">
                {this.state.subtotal +
                  this.state.subtotal * 0.05 +
                  this.state.shipping}
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
