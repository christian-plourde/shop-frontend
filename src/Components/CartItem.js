import React from "react";
import "../styles/Cart.css";
export default class CartItem extends React.Component {
  // state = {
  //   quantity: 1,
  //   total: 0
  // };
  // handleIncrement = () => {
  //   this.setState({ quantity: ++this.state.quantity });
  //   this.setState({ total: this.state.total + this.props.price });
  //   this.sendTotal("+");
  //   this.sendQuantity();
  // };
  // handleDecrement = () => {
  //   if (this.state.quantity !== 1) {
  //     this.setState({ quantity: --this.state.quantity });
  //     this.setState({ total: this.state.total - this.props.price });
  //     this.sendTotal("-");
  //     this.sendQuantity();
  //   } else
  //     alert(
  //       "Cannot decrease quantity. If you want to remove a product, please use the 'Remove' button"
  //     );
  // };

  // sendTotal = s => {
  //   if (s === "+") this.props.receiveTotal(this.props.price);
  //   else this.props.receiveTotal(-this.props.price);
  // };
  //
  // sendQuantity = () => {
  //   this.props.receiveQuantity(this.state.product.cartQuantity, this.props.product.productID);
  //   console.log(this.state.product.cartQuantity);
  // };
  // componentDidMount() {
  //   this.setState({
  //     quantity: this.props.product.cartQuantity,
  //     total: this.props.product.productPrice
  //   });
  // }
  // componentDidUpdate() {
  //   if (this.state.quantity !== this.props.quantity) {
  //     this.setState({
  //       quantity: this.props.quantity,
  //       total: this.props.quantity * this.props.price
  //     });
  //   }
  // }
  render() {
    //     id={x.productID}
    //     name={x.productName}
    //     description={x.descriptionText}
    //     price={x.productPrice}
    //     brand={x.modelName}
    //     quantity={x.cartQuantity}
    //     onRemove={() => this.handleRemove(x.productID)}
    //     receiveTotal={this.adjustSubTotal}
    //     receiveQuantity={this.receiveQuantity}
    //     image={x.picture}

    // const { productName, brand, productID, descriptionText, productPrice, picture, cartQuantity } = this.props.product;


    // return (
    //   <div className="product" onLoad={this.sendQuantity}>
    //     <div className="product-image">
    //       <img src={picture} alt="Product" />
    //     </div>
    //     <div className="product-details">
    //       <div className="product-name">{productName}</div>
    //       <div>{brand}</div>
    //       <p className="product-description">{descriptionText}</p>
    //     </div>
    //     <div className="product-price">{productPrice}</div>
    //     <div className="product-quantity">
    //       <div>
    //         <button className="plus" onClick={this.handleIncrement}>
    //           +
    //         </button>
    //         <div>{this.state.quantity}</div>
    //         <button className="minus" onClick={this.handleDecrement}>
    //           -
    //         </button>
    //       </div>
    //     </div>
    //     <div class="product-removal">
    //       <button
    //         class="remove-product"
    //         onClick={() => this.props.onRemove(productID)}
    //       >
    //         Remove
    //       </button>
    //     </div>
    //     <div class="product-line-price">
    //     {!isNaN(this.state.total) ? Number.parseFloat(this.state.total).toFixed(2) : ''}
    //     </div>
    //   </div>
    // );//end return

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
