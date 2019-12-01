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
         notLoggedIn:false
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
    /*  if(isUserloggedIn == null) {
         //should be redirected to login page
         this.setState({
            notLoggedIn:true
         })
      }
      else{*/
         let productToAdd = this.state.product
         productToAdd["cartQuantity"] = productQuantity
         if(localStorage.getItem("cart") == null){
            // let temp=[];
            // temp.push(this.state.product)
         console.log(productToAdd)
         let firstItem = JSON.stringify(productToAdd)
         localStorage.setItem("cart",firstItem)

         }
         else{
            // console.log(temp);
            let item = localStorage.getItem("cart")
            let productArrayStrings= item.split("|") // array of products as Strings
            let productArrayObjects=[]
            for(var x in productArrayStrings){
               productArrayObjects.push(JSON.parse(productArrayStrings[x]))
            }
            for(var y in productArrayObjects ){
                  if(productArrayObjects[y].productID == productToAdd.productID)
                     return;
            }
            // console.log(item)
            let item1 = item + "|" + JSON.stringify(productToAdd)
            //console.log(item1);
            localStorage.setItem("cart",item1)
            // temp = item;
            //temp.push(item)
            //console.log(JSON.parse(temp));
            //console.log(typeof(this.state.product));
            //console.log(item)
            //localStorage.setItem("cart",JSON.stringify(temp))
         }
      //}

      //console.log(temp);
  }
   render(){

    var href = "/productPage/" + this.props.id;

      return(

         <div className="productContainer">
          <h3 className="productTitle">{this.props.name}</h3>
          <Link to={href} ><img  src={this.props.picture} alt="product"/></Link>
          <div className="productContainerInner">

               <p className="productDescription">{this.props.description}</p>
               <p className="price">${this.props.price}</p>
               <p className="brand">brand</p>
               <div className="cartElements">
               <button className="incrementCart" onClick={this.handleIncrement}><span className="glyphicon glyphicon-chevron-right"></span></button>
               <button className="decrementCart" onClick={this.handleDecrement} disabled={this.state.quantity === 1}><span className="glyphicon glyphicon-chevron-left"></span></button>
               <input type="number" className="numItems" value={this.state.quantity}></input>
               <p><button className="addToCart" onClick={() => this.addToCart(this.state.quantity)/*() => this.props.updateQuantity()*/}>Add to Cart</button></p>
               </div>

            </div>
            {this.state.notLoggedIn && <Redirect to={"/login"} />}
         </div>

      )


   }

}
export default ProductCard;
