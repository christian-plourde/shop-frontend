import React, { Component } from 'react';
import '../styles/productCard.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css.map';
import {Link} from "react-router-dom";


class ProductCard extends Component {
   constructor(){
      super();
   
      this.state = {
         quantity:0,
         product:this.props,
      }
      this.addToCart = this.addToCart.bind(this)
   }

   handleIncrement = () =>{
      this.setState({quantity: this.state.quantity + 1});
   }
   handleDecrement = () =>{
      this.setState({quantity: this.state.quantity - 1});
   }
   componentDidMount(){
      this.setState(
         {
         product:this.props.product,

         }
      )
   }
   addToCart(){
     // this.productsToCart.push(this.state.product)
     /* this.setState({
         productsToCart: this.state.productsToCart.push(this.state.product)
      })*/
      
     // console.log(this.productsToCart);
      localStorage.setItem("cart",JSON.stringify(this.state.product))
      let temp=[];
      temp.push(JSON.parse(localStorage.getItem("cart")))
      //let temp1 = JSON.parse(temp);
      temp.push(this.state.product)
      localStorage.setItem("cart",JSON.stringify(temp))


      console.log(temp);
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
               <button className="decrementCart" onClick={this.handleDecrement} disabled={this.state.quantity === 0}><span className="glyphicon glyphicon-chevron-left"></span></button>
               <input type="number" className="numItems" value={this.state.quantity}></input>
               <p><button className="addToCart" onClick={this.addToCart}>Add to Cart</button></p>
               </div>

            </div>

         </div>

      )


   }

}
export default ProductCard;
