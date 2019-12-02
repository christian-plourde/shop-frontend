import React, { Component } from "react";
import "../styles/productPage.css";
import Review from "./Review.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductImageCarousel from './ProductImageCarousel.js'
import ProductComments from './ProductComments.js'
import axios from 'axios';
import DeleteButton from './Admin/DeleteButton.js';
import localhost from '../LocalHost.js';
import NavbarFunction from './Navbar'

// const localhost = true;//Set to true if working locally

//2019-11-15, product page layout prototype, cannot access the product image for some reason, scr links to the images readily accessible via localhost url address
//added: basic layout, working rendering of text attributes for product page

//2019-11-16, product page layout prototype, product image issue was because of missing http:// before the fetching link, review info CORS access issue was fixed via adding permissions to httpd.conf in apache server folder
//added: review components by rendering from review objects fetched from backend via API
//removed: flex display in css because it messes up the layout, should probably use bootstrap once everything is rendering properly

//need to implement: review score by fetching via API, photo slider with bottom thumbnails, fix lack of key props to child component warning

class ProductPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      data: [],
      productReviews: [],
      productReviewsComponents: [],
      productReviewsMeta: {},
      isAdmin: (localStorage.getItem("logged_in_user") == 'admin')
    };
  }

  componentDidMount() {
    //https://shop-354.herokuapp.com/Products.json
    //http://localhost:3000/Products.json
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
      });

    //acquiring the review array associated with the received prop's ID`
    let review_product_id = this.props.match.params.product_id;
    this.setState({ isLoaded: false })
    fetch(`http://localhost/shop-frontend/shop-backend/php/reviews.php?review=${review_product_id}`, {
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

    const data = JSON.stringify({ id: id });
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios.post(site, data, axiosConfig)
      .then((response) => {
        console.log("Delete product :: axios.post call successful for params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig, '\nResponse data:', response.data);
      },
        (error) => {
          console.log("Delete product :: axios.post call failure for params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig, '\nError:', error);
        });
  }

  deleteReview = (id) => {
    const site = (localhost) ?
      'http://localhost/shop-backend/php/delete_review.php'
      : 'https://shop-354.herokuapp.com/delete_review.php';

    const data = JSON.stringify({ id: id });
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios.post(site, data, axiosConfig)
      .then((response) => {
        console.log("Delete review :: axios.post call successful for params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig, '\nResponse data:', response.data);
        window.location.reload();
      },
        (error) => {
          console.log("Delete review :: axios.post call failure for params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig, '\nError:', error);
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
        <div>
          {this.state.isAdmin ?
            <DeleteButton onClick={this.deleteReview}
              id={reviewItems.reviewID}
              text={'Delete Review'}
              redirect_to={'productPage/' + this.props.match.params.product_id}
            />
            : ''
          }
          <Review
            key={reviewItems.index}
            reviewID={reviewItems.reviewID}
            productID={reviewItems.productID}
            reviewerID={reviewItems.reviewerID}
            rating={reviewItems.rating}
            reviewText={reviewItems.reviewText}
          />
        </div>
        //spent the last 3 hours trying to figure out why reviews aren't been rendered, turned out removing curly brackets next to <Review .../> fixed it
      );

      //`https://shop-354.herokuapp.com/${product.picture.substring(1)}`
      //`http://localhost:3000${product.picture.substring(1)}`
      const imageSource = `http://localhost:3000${product.picture.substring(1)}` //generating a product image array
      const imageSources = [imageSource]

      let dice = Math.random() * 10
      if (dice > 2.5) {
        imageSources.push('https://upload.wikimedia.org/wikipedia/en/4/4d/Shrek_%28character%29.png')
      }
      if (dice > 5) {
        imageSources.push('https://www.ctl.io/assets/images/products/managed-services/logos/ms-iis-color.png')
      }
      if (dice > 7.5) {
        imageSources.push('https://upload.wikimedia.org/wikipedia/en/6/6c/Donkey_%28Shrek%29.png')
      }
      if (dice > 9) {
        imageSource.push('https://i.redd.it/iu1bhetpmb041.jpg')
      }

      // let isLoggedIn = false
      // if(sessionStorage.getItem("logged_in_user") != null){
      //   isLoggedIn = true
      // }



      return (
        <div>
          <NavbarFunction />
          <div className="container">
            {this.state.isAdmin ?
              <DeleteButton onClick={this.deleteProduct}
                id={this.props.match.params.product_id}
                text={'Delete Product'}
                redirect_to=''//Landing page
              />
              : ''
            }
            <div className="container">
              <h1>{product.productName}</h1>
              <div className="rating"> product rating</div>
              <div className="inner_container">
                <div className="photo">
                  {
                    //<img className="product_image" src={imageSource} />
                  }
                  <ProductImageCarousel url={imageSources} />
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
                  <ProductComments product_id={this.props.match.params.product_id} />
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