import React, { Component } from "react";
import "../styles/LandingPage.css";
import Navbar from "./Navbar.js";
import Carousel from "./carousel.jsx";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/productPage.css";
import Review from "./Review.js";

import axios from 'axios';

import DeleteButton from './Admin/DeleteButton.js';

//A variable to make our lives easier
import localhost from '../LocalHost.js';

// const localhost = true;//Set to true if working locally

//2019-11-15, product page layout prototype, cannot access the product image for some reason, scr links to the images readily accessible via localhost url address
//added: basic layout, working rendering of text attributes for product page

//2019-11-16, product page layout prototype, product image issue was because of missing http:// before the fetching link, review info CORS access issue was fixed via adding permissions to httpd.conf in apache server folder
//added: review components by rendering from review objects fetched from backend via API
//removed: flex display in css because it messes up the layout, should probably use bootstrap once everything is rendering properly

//need to implement: review score by fetching via API, photo slider with bottom thumbnails, order console/button, fix lack of key props to child component warning, removing unnecessary setstates/imports

class ProductPage extends React.Component {

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
      productReviews: [],
      productReviewsComponents: [],
      productReviewsMeta: {},
      isAdmin:(localStorage.getItem("logged_in_user") == 'admin')
    };
  }

  componentDidMount() {
    var site = (localhost) ?
      "http://localhost:3000/Products.json"
      : "https://shop-354.herokuapp.com/Products.json";
    fetch(site, {
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
        for (var x in tagsArray) {
          for (var y in tagsArray[x]) {
            if (tagsArray[x][y] === "clothing") { clothing.push(jsonArray[x]) }
            if (tagsArray[x][y] === "home") { home.push(jsonArray[x]) }
            if (tagsArray[x][y] === "electronic") { electronic.push(jsonArray[x]) }
          }

        }
        this.setState({
          clothingProducts: clothing,
          homeProducts: home,
          electronicProducts: electronic,
          tags: tagsArray,
          productNames: productNamesArray,
          data: jsonArray
        })
      });

    //acquiring the review array associated with the received prop's ID`
    let review_product_id = this.props.match.params.product_id;
    this.setState({ isLoaded: false })
    fetch(`https://shop-354.herokuapp.com/reviews.php?review=${review_product_id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(productReview => {
        this.setState({ productReviews: productReview, isLoaded: true });
      })



    //acquiring the review meta data
    //`http://localhost/shop-frontend/shop-backend/php/reviews.php?averagereview=${review_product_id}`
    //`http://shop-354.herokuapp.com/reviews.php?averagereview=${review_product_id}`
  }

  deleteProduct = (id) => {
    const site = (localhost) ?
        'http://localhost/shop-backend/php/delete_product.php'
        : 'https://shop-354.herokuapp.com/delete_product.php';

    const data = JSON.stringify({id:id});
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"*",
        },
      };

    axios.post(site, data, axiosConfig)
    .then((response) => {
        console.log("Delete product :: axios.post call successful for params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig, '\nResponse data:', response.data);
        if(response.data.Accepted)
        {
          //Redirect to landing page
          console.log('Response', response.data)
        }//end if
    },
    (error) => {
      console.log("Delete product :: axios.post call failure for params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig, '\nError:', error);
    });
  }

  render() {
    const { isLoaded, data } = this.state;
    if (!isLoaded) {
      return <div> loading...</div>;
    }
    else {

      var product = null;

      for (var i = 0; i < this.state.data.length; i++) {
        if (this.state.data[i].productID == this.props.match.params.product_id) {
          product = this.state.data[i];
        }
      }

      //generating an array of review components
      const reviewComponents = this.state.productReviews.map((reviewItems, index) =>
        <Review
          key={reviewItems.index}
          reviewID={reviewItems.reviewID}
          productID={reviewItems.productID}
          reviewerID={reviewItems.reviewerID}
          rating={reviewItems.rating}
          reviewText={reviewItems.reviewText}
        />
        //spent the last 3 hours trying to figure out why reviews aren't been rendered, turned out removing curly brackets next to <Review .../> fixed it
      );

      //`https://shop-354.herokuapp.com/${product.picture.substring(1)}`
      //`http://localhost:3000${product.picture.substring(1)}`
      const imageSource = `https://shop-354.herokuapp.com/${product.picture.substring(1)}`

      return (
        <div>
          <Navbar />
          <div className="container">
            {this.state.isAdmin ?
                 <DeleteButton   onClick={this.deleteProduct}
                                  id={this.props.match.params.product_id}
                  />
                : ''
            }
            <h1>{product.productName}</h1>
            <div className="rating"> product rating</div>
            <div className="inner_container">
              <div className="photo">
                <img className="product_image" src={imageSource} />
              </div>
              <div className="text">
                <p>Item Description:<br />{product.descriptionText}</p>
                <ul>
                  <li>Model Name:{product.modelName}</li>
                  <li>Product Color:{product.color}</li>
                  <li>Product Dimension{product.dimensions}</li>
                </ul>
              </div>
              <div id="purchase">
                purchase box
                      </div>
            </div>
            <div>
              {reviewComponents}
            </div>
          </div>
        </div>
      );
    }

  }

}

export default ProductPage;
