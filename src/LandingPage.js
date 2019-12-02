import React, { Component } from "react";
import "./styles/LandingPage.css";
import Carousel from "./Components/carousel";
import Navbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

//A variable to make our lives easier
import localhost from "./LocalHost.js"; //Set to true if working locally

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      data: [],
      tags: [],
      productNames: [],
      clothingProducts: [],
      homeProducts: [],
      electronicProducts: [],
      quantity: ""
    };
  }
  //http://localhost:3000/Products.json
  //https://shop-354.herokuapp.com/product.php?products=-1
  // http://localhost:80/shop-frontend/shop-backend/php/product.php?products=-1
  componentDidMount() {
    var site = localhost
      ? "http://localhost:8081/shop-backend/php/get_products.php"
      : "https://shop-354.herokuapp.com/get_products.php";

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };

    axios.post(site, null, axiosConfig).then(response => {
      // console.log('Response', response.data.products);
      this.setState({
        isLoaded: true,
        data: response.data.products
      });
      // let jsonArray = JSON.parse(JSON.stringify(this.state.data));
      let jsonArray = JSON.parse(JSON.stringify(this.state.data));
      console.log("JSON array", jsonArray);

      let tagsArray = [];
      let productNamesArray = [];
      for (var j in jsonArray) {
        // console.log('json array[', j,']:', jsonArray[j]);
        tagsArray.push(jsonArray[j].tags);
        productNamesArray.push(jsonArray[j].productName);
      }

      let clothing = [];
      let home = [];
      let electronic = [];
      for (var x in tagsArray) {
        for (var y in tagsArray[x]) {
          if (tagsArray[x][y] === "clothing") {
            clothing.push(jsonArray[x]);
          }
          if (tagsArray[x][y] === "home") {
            home.push(jsonArray[x]);
          }
          if (tagsArray[x][y] === "electronic") {
            electronic.push(jsonArray[x]);
          }
        }
      }
      this.setState({
        clothingProducts: clothing,
        homeProducts: home,
        electronicProducts: electronic,
        tags: tagsArray,
        productNames: productNamesArray,
        data: jsonArray
      });
    }); //end then
  }
  render() {
    const {
      isLoaded,
      data,
      tags,
      clothingProducts,
      homeProducts,
      electronicProducts,
      productNames
    } = this.state;
    if (!isLoaded) {
      return <div> loading...</div>;
    } else {
      return (
        <div>
          <div className="LandingPageBody">
            <div>
              <Carousel
                data={clothingProducts}
                category="Clothing Products"
                updateQuantity={() => this.changeQuantity()}
              />
            </div>
            <div>
              <Carousel data={homeProducts} category="Home Products" />
            </div>
            <div>
              <Carousel
                data={electronicProducts}
                category="Electronic Products"
              />
            </div>
          </div>
        </div>
      ); //end return
    }
  }
}

export default LandingPage;
