import React, { Component } from 'react';
import '../styles/productCard.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css.map';
import {Link} from "react-router-dom";
import { Redirect } from "react-router";


class ProductCard extends Component {
   constructor(){
      super();

      this.state = {
         quantity:1,
         product:this.props,
         notLoggedIn:false,
         triggered:false
      }
      this.addToCart = this.addToCart.bind(this)
   }

   handleIncrement = () =>{
      console.log("productCard-21", this.state.product)
      this.setState(this.state.product.quantity>this.state.quantity? {quantity: this.state.quantity + 1} : {quantity: this.state.quantity} );
   }
   handleDecrement = () =>{
      this.setState({
         quantity: this.state.quantity - 1

      });
   }
   componentDidMount(){
      this.setState(
         {
         product:this.props.product,

         }
      )
   }
   addToCart(productQuantity){
      //verifying if user is logged in. Make sure to comment in the if else statement
      let isUserloggedIn = localStorage.getItem("logged_in_user")
      if(isUserloggedIn == null) {
         //should be redirected to login page
         this.setState({
            notLoggedIn:true
         })
      }
      else{
         let productToAdd = this.state.product
         productToAdd["cartQuantity"] = productQuantity
         if(localStorage.getItem("cart") == null){
         let firstItem = JSON.stringify(productToAdd)
         localStorage.setItem("cart",firstItem)
         localStorage.setItem("cartQuantity",this.state.quantity)
         this.props.updateQuantity()

         }
         else{
            let item = localStorage.getItem("cart")
            //navbar update of cart
            let cartQuantity = localStorage.getItem("cartQuantity")
            let intCartQuantity = parseInt(cartQuantity)
            intCartQuantity+= productQuantity
            let updatedCartQuantity = intCartQuantity.toString()
            localStorage.setItem("cartQuantity",updatedCartQuantity)
            //navbar update of cart

            let productArrayStrings= item.split("|")
            let productArrayObjects=[]
            for(var x in productArrayStrings){
               productArrayObjects.push(JSON.parse(productArrayStrings[x]))
            }
            for(var y in productArrayObjects ){
                  if(productArrayObjects[y].productID == productToAdd.productID){
                     productArrayObjects[y].cartQuantity+=productToAdd.cartQuantity
                     let newUpdatedCart=""
                     for(var z in productArrayObjects ){
                        if(z == 0){newUpdatedCart = JSON.stringify(productArrayObjects[z]) }
                        else{
                           newUpdatedCart = newUpdatedCart + "|" + JSON.stringify(productArrayObjects[z])
                        }

                     }
                     localStorage.setItem("cart",newUpdatedCart)
                     this.props.updateQuantity()
                     return;
                  }

            }
            let item1 = item + "|" + JSON.stringify(productToAdd)
            localStorage.setItem("cart",item1)
            //updating cart icon
            this.props.updateQuantity()
         }

      }

  }
   render(){

    var href = "/productPage/" + this.props.id;

      // return(
      //
      //    <div className="productContainer">
      //     <h3 className="productTitle">{this.props.name}</h3>
      //     <Link to={href} ><img  src={this.props.picture} alt="product"/></Link>
      //     <div className="productContainerInner">
      //
      //          <p className="productDescription">{this.props.description}</p>
      //          <p className="price">${this.props.price}</p>
      //          <p className="brand">{this.props.modelName}</p>
      //          <div className="cartElements">
      //          <button className="incrementCart" onClick={this.handleIncrement}><span className="glyphicon glyphicon-chevron-right"></span></button>
      //          <button className="decrementCart" onClick={this.handleDecrement} disabled={this.state.quantity === 1}><span className="glyphicon glyphicon-chevron-left"></span></button>
      //          <input type="number" className="numItems" value={this.state.quantity}></input>
      //          <p><button className="addToCart" onClick={() => this.addToCart(this.state.quantity)}>Add to Cart</button></p>
      //          </div>
      //
      //       </div>
      //       {this.state.notLoggedIn && <Redirect to={"/login"} />}
      //    </div>
      //
      // )

      return(

         <div className="productContainer">
          <h3 className="productTitle">{this.props.name}</h3>
          <Link to={href} ><img  src={this.props.picture} alt="product"/></Link>
          <div className="productContainerInner">

               <p className="productDescription">{this.props.description}</p>
               <p className="price">${this.props.price}</p>
               <p className="brand">{this.props.modelName}</p>
               <div className="cartElements">
               <button  className="incrementCart"
                        onClick={this.handleIncrement}>
                          <span className="glyphicon glyphicon-chevron-right">
                          </span>
              </button>
               <button className="decrementCart"
                        onClick={this.handleDecrement}
                        disabled={this.state.quantity === 1}>
                        <span className="glyphicon glyphicon-chevron-left">
                        </span>
              </button>
               <input type="number" className="numItems" value={this.state.quantity}></input>
               <p><button className="addToCart" onClick={() => this.addToCart(this.state.quantity)}>Add to Cart</button></p>
               </div>

            </div>
            {this.state.notLoggedIn && <Redirect to={"/login"} />}
         </div>

      )


   }

}
export default ProductCard;
