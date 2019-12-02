import React from 'react'
import '../styles/review.css'

class Review extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reviewID: this.props.reviewID,
            productID: this.props.productID,
            reviewerID: this.props.reviewerID, //can display a reviewer's username if needed
            rating: this.props.rating,
            reviewText: this.props.reviewText
        }
    }

    render() {
        return (
            <div className="review">
                <h1>Rating: {this.state.rating}</h1>
                <p>Review:<br />{this.state.reviewText}</p>
            </div>
        )
    }
}

export default Review