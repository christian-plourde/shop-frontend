// Importing necessary files
import React, { Component } from "react";
import axios from "axios";
import "./ProductPosting.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

class ProductPosting extends Component {
  state = {
    productName: "",
    picture: "",
    descriptionText: "",
    productPrice: "",
    color: "",
    dimensions: ""
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
    console.log(this.state);
    axios
      .post("https://shop-354.herokuapp.com/product.php", this.state)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Render Method
  render() {
    return (
      <div>
        <Form onSubmit={this.submitHandler}>
          <Container id="Container">
            {/* Product Name*/}
            <label className="label"> Product Name </label>
            <Form.Control
              name="productName"
              onChange={this.handleInputChange}
              type="text"
              placeholder=""
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
            />
            <br />

            {/* Product Dimensions*/}
            <label className="label">
              Dimensions:
              <select
                name="dimensions"
                value={this.state.dimensions}
                onChange={this.handleInputChange}
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
      </div>
    );
  }
}

export default ProductPosting;
