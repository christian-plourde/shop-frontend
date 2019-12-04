import React, { Component } from 'react'
import axios from 'axios'
import localhost from '../LocalHost.js'

class ProductComments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: '',
            comment: '',
            reviewData: null,
            photoSelected: [],
            photoSelectedUrls:[],
            reviewEligibility: 0
        }
        this.formHandler = this.formHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.photoHandler = this.photoHandler.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem("logged_in_user") != null) { //set review eligibility to 1 if the user bought the product for more than 15 days 
            let reviewerID = localStorage.getItem("logged_in_user")
            let productID = this.props.product_id
            const checkingEligibility = (localhost) ?
                `http://localhost/shop-backend/php/product.php?eligible=1&pid=${productID}&rid=${reviewerID}`
                : `https://shop-354.herokuapp.com/product.php?eligible=1&pid=${productID}&rid=${reviewerID}`;

            fetch(checkingEligibility, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            })
            .then(response => response.json())
            .then(eligibility => {
                this.setState({reviewEligibility: eligibility.result})     
            });
        }
    }

    formHandler(event) { //user input is stored as component state in real time, i.e. each click or keystroke
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    photoHandler(event) { //appended each additional images to the component state's images array
        const photos = event.target.files
        if (photos.length + this.state.photoSelected.length > 5) {
            alert('Maximum number of images allowed is five, please remove or select less images.')
        }
        else {
            this.setState(prevState => {
                let newPhotos = prevState.photoSelected
                let newPhotoUrls = prevState.photoSelectedUrls
                for (let photo of photos) {
                    newPhotos.push(photo) //make the images accessible by the render method via URLs
                    newPhotoUrls.push(URL.createObjectURL(photo))
                }
                return (
                    {
                        photoSelected: newPhotos,
                        photoSelectedUrls: newPhotoUrls
                    }
                )
            })
        }
        //console.log(this.state.photoSelected)
    }

    submitHandler(event) { //sending review
        event.preventDefault();
        if(this.state.comment.length > 400)
        {
            alert("Reviews are limited to 400 characters. Please try again.");
            return;
        }

        let reviewerID = (localhost) ?
            localStorage.getItem("logged_in_user")
            : localStorage.getItem("logged_in_user")

        const site = (localhost) ?
            'http://localhost/shop-backend/php/reviews.php'
            : 'https://shop-354.herokuapp.com/reviews.php';

        const reviewData = {
            rating: this.state.rating,
            reviewerText: this.state.comment,
            pid: this.props.product_id,
            rid: reviewerID,
            images: this.state.photoSelected
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
                alert('Review Submitted!')
            },
                (error) => {
                    console.log("Didn't succeed for axios.post call with params\nsite:", site, '\ndata:', reviewData, '\nconfig:', axiosConfig);
                });
    }

    render() {
        if (localStorage.getItem("logged_in_user") != null && this.state.reviewEligibility == 0) { //conditional rendering, currently, any logged in user can leave a review, set it to 1 to only have eligible user being able to leave a review
            const images = []
            if (this.state.photoSelected.length > 0) {
                images = this.state.photoSelectedUrls.map(image => <img src={image}/>)
            }
            return (
                <div>
                    <form onSubmit={this.submitHandler}>
                        <label>
                            Upload photo:
                            <input name='file' type='file' onChange={this.photoHandler} multiple />
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
                    <div className='review thumbnails'>
                        {images}
                    </div>
                    <p>{
                        // `${this.state.rating}
                        // ${this.state.comment}`
                    }</p>
                </div>
            )
        }

        else {
            return (
                <br />
            )
        }
    }
}

export default ProductComments
