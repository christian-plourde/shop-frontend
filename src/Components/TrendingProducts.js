import React, { Component } from 'react';
import "../styles/slick.css"
import "../styles/slick-theme.css"
import Slider from "react-slick";
import "../styles/carousel.css"
import ProductCard from "./productCard.jsx";

import axios from "axios";

import localhost from '../LocalHost.js';

class TrendingProducts extends Component{
  constructor(props){
    super(props);

    this.state = {
       isLoaded : false
    };
  }

  handleButtonPress = (isIncrement, product_id) =>
  {
    // console.log('Handle button press; products before button press ', this.state.products)
    // console.log('Handle button press; subtotal before button press ', this.state.subtotal)
    // return;
    let product_list = [];
    for(var index = 0; index < this.state.products.length; index++)
    {
      let product = this.state.products[index];
      // console.log('Handle button press :: Verifying product ', product)
      let product_to_push = product;
      let product_quantity = Number.parseInt(product_to_push.cartQuantity)
      if (product_to_push.productID == product_id)
      {
        if(product_quantity == 1 && !isIncrement)
        {
          window.alert(
            'Use the remove button'
          );
          return;
        }
        product_to_push.cartQuantity = (isIncrement)
          ? product_quantity + 1
          : product_quantity - 1;
        // console.log('Updated quantity from', product_quantity, ' to ', product_to_push.cartQuantity,' of product ', product)

        //Update local storage
        const list = localStorage.getItem('cart').split('|')
        var new_string = "";
        for (var i = 0; i < list.length; i++)
        {
          var product = JSON.parse(list[i])
          // console.log(product, 'stringified\n', JSON.stringify(product))
          if (product.productID == product_to_push.productID)
          {
            // console.log('this is the product whose quantity we need to change', product)
            var current_quantity = product.cartQuantity;
            product.cartQuantity = (isIncrement) ? current_quantity + 1 : current_quantity - 1;
            // console.log('new cart quantity', product.cartQuantity);
          }
          new_string = new_string.concat(JSON.stringify(product))
          new_string = new_string.concat((i < list.length - 1) ? '|' : '');
        }//end for


        localStorage.setItem('cart', new_string)
        var new_quantity = parseInt(localStorage.getItem('cartQuantity')) + ((isIncrement) ? 1 : -1);
        localStorage.setItem('cartQuantity', new_quantity)
      }
      //Replace the product list
      product_list.push(product_to_push)
    }
    this.setState({products:product_list})


    // console.log('Handle button press; products after button press ', this.state.products)
    //Also recompute subtotal and total
    let sTotal = 0;
    for (var x in this.state.products) {
      let product = this.state.products[x];
      sTotal += Number.parseFloat(product.productPrice) * Number.parseFloat(product.cartQuantity);
    }
    this.setState({
      subtotal: sTotal.toFixed(2),
      total: (sTotal.toFixed(2) * 1.15).toFixed(2)
    });

    // console.log('Handle button press; subtotal after button press ', this.state.subtotal)
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
            <ProductCard
              name={product.productName}
              modelName={product.modelName}
              id={product.productID}
              descriptionText={product.descriptionText}
              price={product.productPrice}
              picture={product.images[0]}
              handleIncrement={this.handleButtonPress}
              onRemove={() => this.handleRemove(product.productID)}
            />
          );//end return
        }//end f'n
      )//end map

      );//end return
    }//end else
  }//end render
}
export default TrendingProducts;
