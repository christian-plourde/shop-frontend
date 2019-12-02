import React from "react";
import "../styles/Cart.css";
export default class CartItem extends React.Component {
  state = {
    quantity: 1,
    total: 0
  };
  handleIncrement = () => {
    this.setState({ quantity: ++this.state.quantity });
    this.setState({ total: this.state.total + this.props.price });
    this.sendTotal("+");
    this.sendQuantity();
  };
  handleDecrement = () => {
    if (this.state.quantity !== 1) {
      this.setState({ quantity: --this.state.quantity });
      this.setState({ total: this.state.total - this.props.price });
      this.sendTotal("-");
      this.sendQuantity();
    } else
      alert(
        "Cannot decrease quantity. If you want to remove a product, please use the 'Remove' button"
      );
  };

  sendTotal = s => {
    if (s === "+") this.props.receiveTotal(this.props.price);
    else this.props.receiveTotal(-this.props.price);
  };

  sendQuantity = () => {
    this.props.receiveQuantity(this.state.quantity, this.props.id);
    console.log(this.state.quantity);
  };
  componentDidMount() {
    this.setState({
      quantity: this.props.quantity,
      total: this.props.price
    });
  }
  // componentDidUpdate() {
  //   if (this.state.quantity !== this.props.quantity) {
  //     this.setState({
  //       quantity: this.props.quantity,
  //       total: this.props.quantity * this.props.price
  //     });
  //   }
  // }
  render() {
    const { name, brand, id, description, price, image } = this.props;
    return (
      <div className="product" onLoad={this.sendQuantity}>
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
          <div>
            <button className="plus" onClick={this.handleIncrement}>
              +
            </button>
            <div>{this.state.quantity}</div>
            <button className="minus" onClick={this.handleDecrement}>
              -
            </button>
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
        <div class="product-line-price">
        {!isNaN(this.state.total) ? Number.parseFloat(this.state.total).toFixed(2) : ''}
        </div>
      </div>
    );
  }
}
