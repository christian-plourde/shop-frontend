import React, { Component } from 'react'
import axios from 'axios'
import localhost from '../LocalHost.js'

class ProductComments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: '',
            comment: '',
            reviewData: null
        }
        this.formHandler = this.formHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    formHandler(event) { //user input is stored as component state in real time, i.e. each click or keystroke
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    submitHandler(event) { //sending review
        alert('Review Submitted!')

        event.preventDefault();

        let reviewerID = (localhost) ?
            localStorage.getItem("logged_in_user")
            : sessionStorage.getItem("logged_in_user")

        const site = (localhost) ?
        'http://localhost/shop-backend/php/reviews.php'
        : 'https://shop-354.herokuapp.com/reviews.php';

        const reviewData = {
            rating: this.state.rating,
            reviewerText: this.state.comment,
            pid: this.props.product_id,
            rid: reviewerID
            }

        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
        };

        axios.post(site, reviewData, axiosConfig)
			.then((response) => {
			console.log("axios.post call successful for params\nsite:", response.data, '\ndata:', reviewData, '\nconfig:', axiosConfig);
            },
            (error) => {
			console.log("Didn't succeed for axios.post call with params\nsite:", site, '\ndata:', reviewData, '\nconfig:', axiosConfig);
		});
    }

    render() {
        if(localStorage.getItem("logged_in_user") != null){ //conditional rendering, currently, any logged in user can leave a review
            return (
                <div>
                    <form onSubmit={this.submitHandler}>
                        <label>
                            {
                                //<input name='file' type='file' value='Upload Photo'/>
                            }

                        </label>
                        <br />
                        <label>
                            Please select a rating:
                            <input type='radio' name='rating' value='1' checked={this.state.rating === '1'} onChange={this.formHandler} />
                            <input type='radio' name='rating' value='2' checked={this.state.rating === '2'} onChange={this.formHandler} />
                            <input type='radio' name='rating' value='3' checked={this.state.rating === '3'} onChange={this.formHandler} />
                            <input type='radio' name='rating' value='4' checked={this.state.rating === '4'} onChange={this.formHandler} />
                            <input type='radio' name='rating' value='5' checked={this.state.rating === '5'} onChange={this.formHandler} />
                        </label>
                        <br />
                        <label>
                            <textarea name='comment' value={this.state.comment} placeholder='Please Enter Your Review' onChange={this.formHandler} rows='15' cols='30' />
                        </label>
                        <br />
                        <button>
                            submit review
                        </button>
                    </form>
                    <p>{
                            // `${this.state.rating}
                            // ${this.state.comment}`
                    }</p>
                </div>
            )
        }

        else{
            return (
                <br/>
            )
        }
    }
}

export default ProductComments
