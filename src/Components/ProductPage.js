import React, { Component } from "react";
import "../styles/LandingPage.css";
import Navbar from "./Navbar.js";
import Carousel from "./carousel.jsx";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class ProductPage extends Component {

//Product id
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      data: [],
      tags: [],
      productNames: [],
      clothingProducts: [],
      homeProducts: [],
      electronicProducts: []
    };
  }


  componentDidMount() {
    // fetch("https://shop-354.herokuapp.com/Products.json", {
    fetch("http://localhost:3000/Products.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })

      .then(response => response.json())
      .then(productData => {
        this.setState({
          isLoaded: true,
          data: productData.products
        });
        let jsonArray = JSON.parse(JSON.stringify(this.state.data));
        let tagsArray = [];
        let productNamesArray = [];
        for (var j in jsonArray) {
          tagsArray.push(jsonArray[j].tags);
          productNamesArray.push(jsonArray[j].productName);
        }

         let clothing = [];
         let home = [];
         let electronic = [];
           for(var x in tagsArray){
               for(var y in tagsArray[x]){
                  if(tagsArray[x][y] ==="clothing"){clothing.push(jsonArray[x])}
                  if(tagsArray[x][y] ==="home"){home.push(jsonArray[x])}
                  if(tagsArray[x][y] ==="electronic"){electronic.push(jsonArray[x])}
               }

           }
           this.setState({
              clothingProducts:clothing,
              homeProducts:home,
              electronicProducts:electronic,
              tags:tagsArray,
              productNames:productNamesArray,
              data:jsonArray
           })
      })


   }

   render(){

    const {isLoaded,data}= this.state;
      if(!isLoaded){
         return <div> loading...</div>;
      }
      else{

        var product = null;
        for(var i = 0; i < this.state.data.length; i++)
        {
          if(this.state.data[i].productID == this.props.match.params.product_id)
          {
              product = this.state.data[i];
          }
        }

        return (
         <div>
            <h1>Product Name: {product.productName}</h1>
            <h1>Model Name: {product.modelName}</h1>
            <h1>Color: {product.color}</h1>
            <h1>Dimensions: {product.dimensions}</h1>
            <h1>Price: {product.productPrice}$ </h1>
            <h1>Description: {product.descriptionText} </h1>
         </div>
        );
      }

   }

}

export default ProductPage;
