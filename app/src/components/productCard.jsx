import React, { Component } from 'react';
import '../styles/productCard.css';


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
          <a href="#"><img src="" alt="product"/></a>
          <div>
               <h1 className="productTitle">Home Adress Plate</h1>
               <p className="productDescription">LED 4 number home address plate for driveway.</p>
               <p className="price">25.69</p>
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