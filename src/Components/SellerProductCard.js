import React, { Component } from 'react';
import '../styles/productCard.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css.map';
import {Link} from "react-router-dom";
import { Redirect } from "react-router";

class SellerProductCard extends Component {
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

  addToCart = (product, quantity) => {
    console.log("TrendingProduct :: \nproduct", product, "\nquantity", quantity)
    if(!this.props.isClient)
    {
      window.alert('Sign in to purchase items!')
      return;
    }

    const cart = localStorage.getItem('cart')
    var product_obj = product;
    product_obj["cartQuantity"] = quantity;

    //If the cart doesn't exist, then just add this to the cart.
    if (!cart)
    {
      localStorage.setItem('cart', JSON.stringify(product_obj));
      localStorage.setItem('cartQuantity', quantity);
      this.props.toggleCartUpdate();
      return;
    }
    //else if the cart already exists...
    else
    {
      //If the product we want to add is already in the cart...
      if (this.isInCart(product_obj))
      {
        //...then just increase the amount in the product object, within the cart
        var replacement_cart = [];
        cart.split('|').forEach(item => {
            var tmp_product = JSON.parse(item);
            console.log('Comparing\n', item, '\nwith\n', product_obj)
            if (tmp_product['productID'] == product_obj['productID'])
            {
              tmp_product['cartQuantity'] += quantity;
              console.log('TrendingProducts :: isInCart :: increasing quantity of product ', tmp_product, ' to', tmp_product['cartQuantity']);
            }
            replacement_cart.push(tmp_product);
        })
        localStorage.setItem('cart', JSON.stringify(replacement_cart.join('|')));
        localStorage.setItem('cartQuantity', parseInt(localStorage.getItem('cartQuantity')) + quantity);
      }
      //If the product is not already in the cart...
      else
      {
        //...then just append to the cart
        var new_cart = JSON.stringify(product_obj).concat("|".concat(cart));

        localStorage.setItem('cart', new_cart);
        localStorage.setItem('cartQuantity', parseInt(localStorage.getItem('cartQuantity')) + quantity);
      }
    }
    //Update the cart quantity on the landing page
    this.props.toggleCartUpdate();
  }

   render(){

     console.log('TrendingProductItem :: product', this.props.product, 'image:', this.props.product.images[0])

    var href = "/productPage/" + this.props.id;

      const {productName, productID, productPrice, descriptionText, dimensions, color, modelName, images} = this.props.product;
      const cartQuantity = localStorage.getItem('cartQuantity');

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
export default SellerProductCard;