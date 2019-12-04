import "../styles/productPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import React, {Component} from "react";

import localhost from '../LocalHost.js';

import DeleteButton from './Admin/DeleteButton.js';
import NavbarFunction from './Navbar.js'
import ProductComments from './ProductComments.js'
import ProductImageCarousel from './ProductImageCarousel.js'
import AddToCartButton from './ProductPageAddToCartButton.js'
import Review from "./Review.js";

// const localhost = true;//Set to true if working locally

// 2019-11-15, product page layout prototype, cannot access the product image
// for some reason, scr links to the images readily accessible via localhost url
// address added: basic layout, working rendering of text attributes for product
// page

// 2019-11-16, product page layout prototype, product image issue was because of
// missing http:// before the fetching link, review info CORS access issue was
// fixed via adding permissions to httpd.conf in apache server folder added:
// review components by rendering from review objects fetched from backend via
// API removed: flex display in css because it messes up the layout, should
// probably use bootstrap once everything is rendering properly

// need to implement: review score by fetching via API, photo slider with bottom
// thumbnails, fix lack of key props to child component warning gave up tracking
// onward, but need to implement styling, review rating display, and purchase
// console
class ProductPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded : false,
      product : {},
      productReviews : [],
      productReviewsComponents : [],
      productRating : 0,
      reviewNumber : 0,
      isAdmin : (localStorage.getItem("logged_in_user") === 'admin')
    };
  }

  componentDidMount() {
    let product_id = this.props.match.params.product_id;
    console.log(`the product ID is ${product_id}`)

    const productSource =
        (localhost) ? `http://localhost/shop-backend/php/product.php?product=${
                          product_id}`
                    : `https://shop-354.herokuapp.com/product.php?product=${
                          product_id}`;

    fetch(productSource, {
      headers :
          {"Content-Type" : "application/json", Accept : "application/json"}
    })
        .then(response => response.json())
        .then(productData => {this.setState({product : productData})})

    const reviewSource =
        (localhost)
            ? // acquiring the review array associated with the received prop's
              // ID
            `http://localhost/shop-backend/php/reviews.php?review=${product_id}`
            : `https://shop-354.herokuapp.com/reviews.php?review=${product_id}`

    fetch(reviewSource, {
      headers :
          {"Content-Type" : "application/json", Accept : "application/json"}
    })
        .then(response => response.json())
        .then(productReview => {
          this.setState({productReviews : productReview});
        })

    const reviewMetaSources =
        (localhost)
            ? `http://localhost/shop-backend/php/reviews.php?averagereview=${
                  product_id}`
            : `http://shop-354.herokuapp.com/reviews.php?averagereview=${
                  product_id}`
    fetch(reviewMetaSources, {
      // accessing rating and number of reviews
      headers :
          {"Content-Type" : "application/json", Accept : "application/json"}
    })
        .then(response => response.json())
        .then(reviewMeta => {
          if (reviewMeta != null) {
            this.setState({
              productRating : Math.round(reviewMeta.rating),
              reviewNumber : reviewMeta.count,
              isLoaded : true
            })
          } else {
            this.setState(
                {productRating : 0, reviewNumber : 0, isLoaded : true})
          }
        })
  }

  deleteProduct =
      (id) => {
        const site =
            (localhost) ? 'http://localhost/shop-backend/php/delete_product.php'
                        : 'https://shop-354.herokuapp.com/delete_product.php';

        const data = JSON.stringify({id : id});
        const axiosConfig = {
          headers : {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin" : "*",
          },
        };

        axios.post(site, data, axiosConfig)
            .then(
                (response) => {
                  console.log(
                      "Delete product :: axios.post call successful for params\nsite:",
                      site, '\ndata:', data, '\nconfig:', axiosConfig,
                      '\nResponse data:', response.data);
                },
                (error) => {
                  console.log(
                      "Delete product :: axios.post call failure for params\nsite:",
                      site, '\ndata:', data, '\nconfig:', axiosConfig,
                      '\nError:', error);
                });
      }

  deleteReview =
      (id) => {
        const site = (localhost)
                         ? 'http://localhost/shop-backend/php/delete_review.php'
                         : 'https://shop-354.herokuapp.com/delete_review.php';

        const data = JSON.stringify({id : id});
        const axiosConfig = {
          headers : {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin" : "*",
          },
        };

        axios.post(site, data, axiosConfig)
            .then(
                (response) => {
                  console.log(
                      "Delete review :: axios.post call successful for params\nsite:",
                      site, '\ndata:', data, '\nconfig:', axiosConfig,
                      '\nResponse data:', response.data);
                  window.location.reload();
                },
                (error) => {
                  console.log(
                      "Delete review :: axios.post call failure for params\nsite:",
                      site, '\ndata:', data, '\nconfig:', axiosConfig,
                      '\nError:', error);
                });
      }

  render() {
    const {isLoaded, data} = this.state;
    if (!isLoaded) {
      return <div>loading...<
             /div>;
    }
    else {
      const reviewComponents = []
      / /
                 generating an array of review components
      if (this.state.productReviews.length > 0) {
          reviewComponents = this.state.productReviews.map((reviewItems, index) =>
          <div>
            {
          this.state.isAdmin
              ? <DeleteButton onClick = {this.deleteReview} id =
                     {reviewItems.reviewID} text =
                         {'Delete Review'} redirect_to =
                 { 'productPage/' + this.props.match.params.product_id
                 } />
              : ''
            }
            <Review
              key={index}
              reviewID={reviewItems.reviewID}
              productID={reviewItems.productID}
              reviewerID={reviewItems.reviewerID}
              rating={reviewItems.rating}
              reviewText={reviewItems.reviewText}
            /><
                    /div>
          / /
                        spent the last 3 hours trying to figure out why reviews
                            aren't been rendered, turned out removing curly brackets next to <Review .../> fixed it );
      }

      //`https://shop-354.herokuapp.com/${product.picture.substring(1)}`
      //`http://localhost:3000${product.picture.substring(1)}`
      const imageSources = []
          console.log(this.state.product)
          if (this.state.product.images != undefined) {
            if ((this.state.product.images[0]) includes("https://")) {
              imageSources =
                  this.state.product.images.map(imageUrl => `${imageUrl}`);
            } else {
              imageSources = this.state.product.images.map(
                  imageUrl => `https://shop-354.herokuapp.com/ressources/img/${
                      imageUrl}`) // generating a product image url array with
                                  // randomly inserted Shrek, ISS and Donkey(from
                                  // Shrek)
            }
          } let dice = Math.random() * 10
      if (dice > 2.5) {
          imageSources.push(
              'https://upload.wikimedia.org/wikipedia/en/4/4d/Shrek_%28character%29.png')
      }
      if (dice > 5) {
          imageSources.push(
              'https://www.ctl.io/assets/images/products/managed-services/logos/ms-iis-color.png')
      }
      if (dice > 7.5) {
          imageSources.push(
              'https://upload.wikimedia.org/wikipedia/en/6/6c/Donkey_%28Shrek%29.png')
      }
      if (dice > 9) {
          imageSources.push('https://i.redd.it/iu1bhetpmb041.jpg')
      }

      return (
        <div>
          <NavbarFunction />
          <div>
            {this.state.isAdmin ?
              <DeleteButton onClick={this.deleteProduct}
                id={this.props.match.params.product_id}
                text={'Delete Product'}
                redirect_to=''//Landing page
              />
              : ''
            }
            <div className="container">
              <h1>{this.state.product.productName}</h1>
              <div className="rating"><p>{`${this.state.productRating} (${this.state.reviewNumber})`}</p></div>
              <div className="inner_container">
                <div className="photo">
                  {
                    //<img className="product_image" src={
          imageSource} />
                  }
                  <ProductImageCarousel url={imageSources} />
                </div>
                <div className="price">
                  {this.state.product.productPrice}
                </div>
                <AddToCartButton product={
          this.state.product} />
                <div className="text">
                  <p>Item Description:<br />{this.state.product.descriptionText}</p>
                  <ul>
                    <li>Model Name:{this.state.product.modelName}</li>
                    <li>Product Color:{this.state.product.color}</li>
                    <li>Product Dimension{this.state.product.dimensions}</li>
                  </ul>
                </div>
                <div id="purchase">
                  <ProductComments product_id={
          this.props.match.params.product_id} />
                </div>
              </div>
              <div>
                {reviewComponents}
              </div>
            </div>
          </div>
        </div>
      );
    }

  }

}

export default ProductPage;
