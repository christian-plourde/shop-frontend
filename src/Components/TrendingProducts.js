import React, { Component } from 'react';
import "../styles/slick.css"
import "../styles/slick-theme.css"
import Slider from "react-slick";
import "../styles/carousel.css"
// import ProductCard from "./productCard.jsx";
import TrendingProductItem from "./TrendingProduct/TrendingProductItem.js";

import axios from "axios";

import localhost from '../LocalHost.js';

class TrendingProducts extends Component{
  constructor(props){
    super(props);

    this.state = {
       isLoaded : false
    };
  }

//Assumes product has cartQuantity and is not stringified
  isInCart = (product_obj_with_cartQuantity) =>
  {
    const cart = localStorage.getItem('cart')
    const product_id = product_obj_with_cartQuantity['productID'];

    console.log('TrendingProducts :: cart\ncart string:', cart, '\ncart split', cart.split())

    cart.split('|').forEach(item => {
      var tmp_product = JSON.parse(item);
        console.log('is in cart :: JSON.parse(item)', tmp_product)
        if (tmp_product['productID'] == product_id)
        {
          console.log('TrendingProducts :: isInCart :: product ', tmp_product, ' is already in the cart.')
          return true;
        }
    })
    return false;
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
  
    componentDidMount(){
      // console.log('TrendingProducts :: Hello?')
      //fetch data via axios
      var site = localhost
        ? "http://localhost/shop-backend/php/get_trending_products.php"
        : "https://shop-354.herokuapp.com/get_trending_products.php";

      const data = JSON.stringify({
        num_to_return:this.props.num_to_return
      })

      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      };

      axios.post(site, data, axiosConfig)
      .then(response => {
        console.log(
          "Succeeded for axios.post call with params\nsite:",
          site,
          "\ndata:",
          data,
          "\nconfig:",
          axiosConfig);

          if (response.data.Accepted)
          {
            console.log('Trending products :: response', response.data.products);
            this.setState({
              isLoaded: true,
              data: response.data.products
            });
            console.log('trending products :: response data products', this.state.data)


          }//end if data accepted
          else
          {
            console.log('Trendingproducts :: Data', data, ' refused')
          }


      }, error => {
        console.log(
          "Didn't succeed for axios.post call with params\nsite:",
          site,
          "\ndata:",
          data,
          "\nconfig:",
          axiosConfig
        );
      });//end then
    }//end componentDidMount

   render(){

      const{isLoaded} = this.state;
      if(!isLoaded){
        return <div> loading trending products...</div>;
     }//end if
     else{
      return(
        this.state.data.map(product => {
          return (
            <TrendingProductItem
              product={product}
              add_to_cart={this.addToCart}
            />
            );//end return
          }//end f'n
        )//end map
      );//end return
    }//end else
  }//end render
}
export default TrendingProducts;
