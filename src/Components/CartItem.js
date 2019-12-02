import React from "react";
import "../styles/Cart.css";
export default class CartItem extends React.Component {

  render() {

    const { productName, brand, productID, descriptionText, productPrice, picture, cartQuantity } = this.props.product;

    const total = parseFloat(cartQuantity) * parseFloat(productPrice);

    return (
      <div className="product" onLoad={this.sendQuantity}>
        <div className="product-image">
          <img src={picture} alt="Product" />
        </div>
        <div className="product-details">
          <div className="product-name">{productName}</div>
          <div>{brand}</div>
          <p className="product-description">{descriptionText}</p>
        </div>
        <div className="product-price">{productPrice}</div>
        <div className="product-quantity">
          <div>
            <button   className="plus"
                      onClick={()=>this.props.handleIncrement(true, productID)}
            >
              +
            </button>
            <div>{cartQuantity}</div>
            <button   className="minus"
                      onClick={()=>this.props.handleIncrement(false, productID)}
            >
              -
            </button>
          </div>
        </div>
        <div class="product-removal">
          <button
            class="remove-product"
            onClick={() => this.props.onRemove(productID)}
          >
            Remove
          </button>
        </div>
        <div class="product-line-price">
        {total ? total.toFixed(2) : ''}
        </div>
      </div>
    );//end return
  }
}
