import React, { Component } from 'react';
import '../styles/productCard.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css.map';


class ProductCard extends Component {
   state = {
      quantity:0
   }
   
   handleIncrement = () =>{
      this.setState({quantity: this.state.quantity + 1});
   }
   handleDecrement = () =>{
      this.setState({quantity: this.state.quantity - 1});
   }


   render(){
      return(
         
         <div className="productContainer">
          <h3 className="productTitle">{this.props.name}</h3>
          <a href="#"><img  src = {this.props.picture}alt="product"/></a>
          <div className="productContainerInner">
               
               <p className="productDescription">{this.props.description}</p>
               <p className="price">${this.props.price}</p>
               <p className="brand">brand</p>
               <div className="cartElements">
               <button className="incrementCart" onClick={this.handleIncrement}><span className="glyphicon glyphicon-chevron-right"></span></button>
               <button className="decrementCart" onClick={this.handleDecrement} disabled={this.state.quantity === 0}><span className="glyphicon glyphicon-chevron-left"></span></button>
               <input type="number" className="numItems" value={this.state.quantity}></input>
               <p><button className="addToCart">Add to Cart</button></p>
               </div>

            </div>

         </div>
   
      )

      
   }
   
}
export default ProductCard;