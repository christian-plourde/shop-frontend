import React, { Component } from 'react';
import '../styles/productCard.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css.map';
import {Link} from "react-router-dom";

class ProductThumbnail extends Component {

   render(){

    var href = "/productPage/" + this.props.id;
    const img_link_prefix = "http://shop-354.herokuapp.com/ressources/img/";

    return(

          <div className="productContainer">
          <h3 className="productTitle">{this.props.name}</h3>
          <Link to={href} ><img  src={img_link_prefix + this.props.picture} alt="product"/></Link>
          <div className="productContainerInner">
               <p className="productDescription">{this.props.description}</p>
               <p className="price">${this.props.price}</p>
          </div>
          </div>

      )


   }

}
export default ProductThumbnail;
