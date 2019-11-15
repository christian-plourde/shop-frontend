import React from "react";
import Link from "react-router-dom";
import CartItem from "./CartItem";
import ProductList from "./ProductList";
export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          name: "Water",
          id: 2,
          brand: "Evian",
          price: 50,
          description: "Water for rich ass mofos"
        },
        {
          name: "Chips",
          id: 1,
          brand: "Kettle",
          price: 5,
          description: "chips n shit"
        }
      ],
      total: 0,
      subtotal: 0
    };
  }

  //   handleRemove = productID => {
  //     // const products = this.state.products.filter(
  //     //   product => product.id !== productID
  //     // );
  //     // this.setState({ products: products });
  //     console.log("hello");
  //   };

  handleAddtoCart = product => {};

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
          <ProductList
            // products={this.state.products}
            onRemove={this.handleRemove}
            handleIncrement={this.handleIncrement}
            handleDecrement={this.handleDecrement}
          ></ProductList>
          <div class="totals">
            <div class="totals-item">
              <label>Subtotal</label>
              <div class="totals-value" id="cart-subtotal"></div>
            </div>
            <div class="totals-item">
              <label>Tax (5%)</label>
              <div class="totals-value" id="cart-tax">
                3.60
              </div>
            </div>
            <div class="totals-item">
              <label>Shipping</label>
              <div class="totals-value" id="cart-shipping">
                15.00
              </div>
            </div>
            <div class="totals-item totals-item-total">
              <label>Grand Total</label>
              <div class="totals-value" id="cart-total">
                {this.state.total}
              </div>
            </div>
          </div>

          <button class="checkout">Checkout</button>
        </div>
      </div>
    );
  }
}
