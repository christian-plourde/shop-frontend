import React from "react";
import "../styles/review.css";

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewID: this.props.reviewID,
      productID: this.props.productID,
      reviewerID: this.props.reviewerID, //can display a reviewer's username if needed
      rating: this.props.rating,
      reviewText: this.props.reviewText
    };
  }
  displayStars = () => {
    if (this.state.rating == 5) {
      return <p class="stars">★★★★★</p>;
    } else if (this.state.rating == 4) return <p class="stars">★★★★☆</p>;
    else if (this.state.rating == 3) return <p class="stars">★★★☆☆</p>;
    else if (this.state.rating == 2) return <p class="stars">★★☆☆☆</p>;
    else if (this.state.rating == 1) return <p class="stars">★☆☆☆☆</p>;
    else return <p class="stars">☆☆☆☆☆</p>;
  };
  render() {
    return (
      <div class="review">
        <h1>{this.displayStars()}</h1>
        <p class="review-text">{this.state.reviewText}</p>
      </div>
    );
  }
}

export default Review;
