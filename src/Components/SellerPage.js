import React, { Component } from "react";
import Navbar from "./Navbar.js";
import Advertisement from "./Advertisement.js";
import { Redirect } from "react-router";
import Link from "./Link.js";
import axios from "axios";
import SellerProductCard from "./SellerProductCard.js";

//A variable to make our lives easier
import localhost from "../LocalHost.js";

class SellerPage extends Component
{
	state = {
		seller_name: "",
		seller_id: null,
		products: null
  	};

  componentDidMount() {

  	this.setState({seller_name: this.props.match.params.seller_name});


//get seller id
	const site_2 = localhost
      ? "http://localhost/shop-backend/php/get_seller_id.php"
      : "https://shop-354.herokuapp.com/get_seller_id.php";

    const data = {username: this.props.match.params.seller_name};

    const axiosConfig_2 = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };

    axios.post(site_2, data, axiosConfig_2).then(
      response => {

      	this.setState({seller_id: response.data.accountID});


      	const site = localhost
      ? "http://localhost/shop-backend/php/get_products.php"
      : "https://shop-354.herokuapp.com/get_products.php";

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };

    axios.post(site, null, axiosConfig).then(
      response => {

      	var prod = [];

      	for(var i = 0; i < response.data.products.length; i++)
      	{
      		if(response.data.products[i].ownerID == this.state.seller_id)
      			prod.push(response.data.products[i]);
      	}

      	this.setState({products: prod});

      },//end response
      error => {
      	console.log(error);
      }
    );


      },//end response
      error => {
      	console.log(error);
      }
    );

  }

  componentWillUpdate(nextProps, nextState) {
   
  }

  constructor(props) {
    super(props);
  }

  render()
  {
    const isClient = !isGuest && (localStorage.getItem("logged_in_user") != null && localStorage.getItem("logged_in_user") != 'admin');

  	return (

  		<div>
  		<Navbar />
  		
      <h1>Products sold by {this.state.seller_name}</h1>


      <SellerProductCard id={this.state.products[0].productID} product={this.state.products[0]}/>


  		</div>
  		);
  }
}

export default SellerPage