// Importing necessary files
import React, { Component } from "react";
import axios from "axios";
import "./ProductPosting.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import {Redirect} from 'react-router-dom';

import localhost from '../../LocalHost.js';

class ProductPosting extends Component {

  state = {
    productName: "",
    picture: "",
    descriptionText: "",
    productPrice: "",
    color: "",
    dimensions: "",
    quantity:0,//Assume this is a number
    userName:(localStorage.getItem("username")),
    isSubmitted:false
  };


  // Image upload handler
  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ picture: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Input handler
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Submit handler
  submitHandler = e => {
    e.preventDefault();

    const site = (localhost) ?
      'http://localhost/shop-backend/php/add_product.php'
      : 'https://shop-354.herokuapp.com/add_product.php';

    const axiosConfig = {
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin":"*",
      },
    };

    axios
      .post(site, this.state, axiosConfig)
      .then(response => {
        console.log(this.state)
        console.log('Product posting :: axios successful with response', response);
        this.setState({isSubmitted:true});
      })
      .catch(error => {
        console.log('Product posting :: axios unsuccessful with error', error);
      });
  };

  inputForm() {
    return (<div>
      <Form onSubmit={this.submitHandler}>
        <Container id="Container">
          {/* Product Name*/}
          <label className="label"> Product Name </label>
          <Form.Control
            name="productName"
            onChange={this.handleInputChange}
            type="text"
            placeholder=""
            required
          />
          <br />

          {/* Product Picture */}
          <input name="picture" type="file" onChange={this.onImageChange} />
          <br />

          {/* Display the Image to the website */}
          <img id="target" src={this.state.picture} height="200" />

          {/* Product Description */}
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="label"> Description </Form.Label>
            <Form.Control
              name="descriptionText"
              onChange={this.handleInputChange}
              as="textarea"
              rows="3"
              required
            />
          </Form.Group>

          {/* Product Price */}
          <label className="label"> Price </label>
          <Form.Control
            name="productPrice"
            onChange={this.handleInputChange}
            size="sm"
            type="text"
            placeholder="$"
            required
          />
          <br />

          {/* Product Quantity */}
          <label className="label"> Quantity </label>
          <Form.Control
            name="quantity"
            onChange={this.handleInputChange}
            size="sm"
            type="text"
            placeholder=""
            required
          />
          <br />

          {/* Product Color */}
          <label className="label"> Color </label>
          <Form.Control
            name="color"
            onChange={this.handleInputChange}
            size="sm"
            type="text"
            placeholder=""
            required
          />
          <br />

          {/* Product Dimensions*/}
          <label className="label">
            Dimensions:
            <select
              name="dimensions"
              value={this.state.dimensions}
              onChange={this.handleInputChange}
              required
            >
              <option value="12×10"> select size </option>
              <option value="14×10"> 14×10 </option>
              <option value="16×10"> 16×10 </option>
              <option value="18×10"> 18×10 </option>
            </select>
          </label>
          <br />
          <br />

          {/* Submit Form */}
          <button id="submitButton" type="submit">
            Add Product
          </button>
        </Container>
      </Form>
    </div>)
  }

  // Render Method
  render() {
    const input_field = () => {
      return (<div>
        <Form onSubmit={this.submitHandler}>
          <Container id="Container">
            {/* Product Name*/}
            <label className="label"> Product Name </label>
            <Form.Control
              name="productName"
              onChange={this.handleInputChange}
              type="text"
              placeholder=""
              required
            />
            <br />

            {/* Product Picture */}
            <input name="picture" type="file" onChange={this.onImageChange} />
            <br />

            {/* Display the Image to the website */}
            <img id="target" src={this.state.picture} height="200" />

            {/* Product Description */}
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="label"> Description </Form.Label>
              <Form.Control
                name="descriptionText"
                onChange={this.handleInputChange}
                as="textarea"
                rows="3"
                required
              />
            </Form.Group>

            {/* Product Price */}
            <label className="label"> Price </label>
            <Form.Control
              name="productPrice"
              onChange={this.handleInputChange}
              size="sm"
              type="text"
              placeholder="$"
              required
            />
            <br />

            {/* Product Quantity */}
            <label className="label"> Quantity </label>
            <Form.Control
              name="quantity"
              onChange={this.handleInputChange}
              size="sm"
              type="text"
              placeholder=""
              required
            />
            <br />

            {/* Product Color */}
            <label className="label"> Color </label>
            <Form.Control
              name="color"
              onChange={this.handleInputChange}
              size="sm"
              type="text"
              placeholder=""
              required
            />
            <br />

            {/* Product Dimensions*/}
            <label className="label">
              Dimensions:
              <select
                name="dimensions"
                value={this.state.dimensions}
                onChange={this.handleInputChange}
                required
              >
                <option value="12×10"> select size </option>
                <option value="14×10"> 14×10 </option>
                <option value="16×10"> 16×10 </option>
                <option value="18×10"> 18×10 </option>
              </select>
            </label>
            <br />
            <br />

            {/* Submit Form */}
            <button id="submitButton" type="submit">
              Add Product
            </button>
          </Container>
        </Form>
      </div>);
    }

    return (
      this.state.isSubmitted ? <Redirect to="/user" /> : input_field()
    );

  }
}

export default ProductPosting;
