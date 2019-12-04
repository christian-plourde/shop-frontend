import React, { Component } from 'react';
import '../../styles/productCard.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css.map';
import {Link} from "react-router-dom";
import { Redirect } from "react-router";


class TrendingProductItem extends Component {
   constructor(){
      super();

      this.state = {
         quantity:1,
      }
      this.handleQuantity = this.handleQuantity.bind(this)
   }

  handleQuantity = (isIncrement) => {
    //Only work unless it's quantity 1 and decreasing, because I don't want 0 or negative values.
    if (this.state.quantity > 1 || isIncrement)
    {
      isIncrement
        ? this.setState({quantity: this.state.quantity + 1})
        : this.setState({quantity: this.state.quantity - 1});
      console.log('new quantity', this.state.quantity)
    }
  }

   render(){

     console.log('TrendingProductItem :: product', this.props.product, 'image:', this.props.product.images[0])

    var href = "/productPage/" + this.props.id;

      const {productName, productID, productPrice, descriptionText, dimensions, color, modelName, images} = this.props.product;
      const cartQuantity = this.props.cartQuantity;

      return(

         <div className="productContainer">
          <h3 className="productTitle">{productName}</h3>
          <Link to={href} ><img  src={images[0]} alt="product"/></Link>
          <div className="productContainerInner">

               <p className="productDescription">{descriptionText}</p>
               <p className="price">${productPrice}</p>
               <p className="brand">{modelName}</p>
               <div className="cartElements">
               <button  className="incrementCart"
                        onClick={() => {this.handleQuantity(true)}}>
                          <span className="glyphicon glyphicon-chevron-right">
                          </span>
              </button>
               <button className="decrementCart"
                        onClick={() => {this.handleQuantity(false)}}
                >
                        <span className="glyphicon glyphicon-chevron-left">
                        </span>
              </button>
               <input type="number" className="numItems" value={this.state.quantity}></input>
               <p>
                  <button   className="addToCart"
                            onClick={() => this.props.add_to_cart(this.props.product, this.state.quantity)}
                  >Add to Cart
                  </button>
                </p>
               </div>

            </div>
            {this.state.notLoggedIn && <Redirect to={"/login"} />}
         </div>

      )


   }

}
export default TrendingProductItem;
