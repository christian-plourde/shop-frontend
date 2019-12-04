import React, { Component } from "react";
import axios from "axios";
import localhost from "../LocalHost.js";
import "../styles/productPage.css";

class ProductComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: "",
      comment: "",
      reviewData: null
    };
    this.formHandler = this.formHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  formHandler(event) {
    //user input is stored as component state in real time, i.e. each click or keystroke
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submitHandler(event) {
    //sending review
    alert("Review Submitted!");

    let reviewerID = localhost
      ? localStorage.getItem("logged_in_user")
      : localStorage.getItem("logged_in_user");

    const site = localhost
      ? "http://localhost:8081/shop-backend/php/reviews.php"
      : "https://shop-354.herokuapp.com/reviews.php";

    const reviewData = {
      rating: this.state.rating,
      reviewerText: this.state.comment,
      pid: this.props.product_id,
      rid: reviewerID
    };

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };

    axios.post(site, reviewData, axiosConfig).then(
      response => {
        console.log(
          "axios.post call successful for params\nsite:",
          response.data,
          "\ndata:",
          reviewData,
          "\nconfig:",
          axiosConfig
        );
      },
      error => {
        console.log(
          "Didn't succeed for axios.post call with params\nsite:",
          site,
          "\ndata:",
          reviewData,
          "\nconfig:",
          axiosConfig
        );
      }
    );
  }

  render() {
    if (localStorage.getItem("logged_in_user") != null) {
      //conditional rendering, currently, any logged in user can leave a review
      return (
        <div class="user-reviews">
          <form onSubmit={this.submitHandler}>
            <div class="review-text">
              <textarea
                name="comment"
                value={this.state.comment}
                placeholder="Please Enter Your Review"
                onChange={this.formHandler}
              />
            </div>
            <div>
              <ul class="rate-area">
                <input
                  type="radio"
                  id="5-star"
                  name="rating"
                  value="5"
                  onChange={this.formHandler}
                />
                <label for="5-star" title="Amazing">
                  5 stars
                </label>
                <input
                  type="radio"
                  id="4-star"
                  name="rating"
                  value="4"
                  onChange={this.formHandler}
                />
                <label for="4-star" title="Good">
                  4 stars
                </label>
                <input
                  type="radio"
                  id="3-star"
                  name="rating"
                  value="3"
                  onChange={this.formHandler}
                />
                <label for="3-star" title="Average">
                  3 stars
                </label>
                <input
                  type="radio"
                  id="2-star"
                  name="rating"
                  value="2"
                  onChange={this.formHandler}
                />
                <label for="2-star" title="Not Good">
                  2 stars
                </label>
                <input
                  type="radio"
                  id="1-star"
                  name="rating"
                  value="1"
                  onChange={this.formHandler}
                />
                <label for="1-star" title="Bad">
                  1 star
                </label>
              </ul>
            </div>
            <button>Submit Review</button>
          </form>
        </div>
      );
    } else {
      return <br />;
    }
  }
}

export default ProductComments;
