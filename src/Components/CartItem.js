import React from "react";
import "../styles/Cart.css";
export default class CartItem extends React.Component {
  state = {
    quantity: 1,
    total: this.props.price
  };
  handleIncrement = () => {
    this.setState({ quantity: this.state.quantity + 1 });
    this.setState({ total: this.state.total + this.props.price });
  };
  handleDecrement = () => {
    if (this.state.quantity !== 0) {
      this.setState({ quantity: this.state.quantity - 1 });
      this.setState({ total: this.state.total - this.props.price });
    }
  };

  render() {
    // let product = this.props.product;
    const { name, brand, id, description, price, image } = this.props;

    return (
      <div className="product">
        <div className="product-image">
          <img src={image} alt="Product" />
        </div>
        <div className="product-details">
          <div className="product-name">{name}</div>
          <div>{brand}</div>
          <p className="product-description">{description}</p>
        </div>
        <div className="product-price">{price}</div>
        <div className="product-quantity">
          Quantity: {this.state.quantity}
          <div>
            <button onClick={this.handleIncrement.bind()}>+</button>
            <button onClick={this.handleDecrement.bind()}>-</button>
          </div>
        </div>
        <div class="product-removal">
          <button
            class="remove-product"
            onClick={() => this.props.onRemove(id)}
          >
            Remove
          </button>
        </div>
        <div class="product-line-price">{this.state.total}</div>
      </div>
    );
  }
}
