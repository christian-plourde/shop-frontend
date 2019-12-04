// All imports
import React, { Component } from "react";
import "../styles/Navbar.css";
import "../styles/fonts/fontAwesome/all.css";
import "../styles/fonts/fontAwesome/all.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "../styles/autoComplete.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Route from "react-router-dom/Route";
import { Redirect } from "react-router";

import axios from "axios";

import DropdownItem from "./Navbar/DropdownItem.js";
import CategoryButton from "./Navbar/CategoryButton.js";

//A variable to make our lives easier.
import localhost from "../LocalHost.js";

// The Navigation Bar
class NavbarFunction extends Component {
  constructor() {
    super();
    this.state = {
      suggestions: [],
      text: "",
      productNames: [],
      isLoaded: false,
      productNamesArray: [],
      tagsArray: [],
      productData: [],
      cartQuantity:0,
      isEnterPressed: false,
      isSearchFocused: false
    };
  }


  componentDidMount() {

    console.log('Navbar : this.props.data', this.props.data, ' Execute php? ', !this.props.data)

    //If we're not getting our data from the landing page...
    if (!this.props.data)
    {
      //...then go fetch the data from the database
      this.setStateViaAxios();
    }
    //...else if we're getting our data as a prop already,...
    else
    {
      //...then just use that.
      this.setStateViaProp();
    }

  }//end component did mount

  setStateViaAxios = () => {
    var site = (localhost) ?
      "http://localhost/shop-backend/php/get_products.php"
      : "https://shop-354.herokuapp.com/get_products.php";

      const axiosConfig = {
       headers: {
            'Content-Type': 'application/json',
           "Access-Control-Allow-Origin":"*",
        },
     };

     axios.post(site, null, axiosConfig)
     .then(response => {
         console.log('Response.data', response.data)
         let jsonArray = JSON.parse(JSON.stringify(response.data.products));
         let tagsArray = [];
         let productNamesArray = [];
         for (var j in jsonArray) {
           tagsArray.push(jsonArray[j].tags);
           productNamesArray.push(jsonArray[j].productName);
         }

          let clothing = [];
          let home = [];
          let electronic = [];
            for(var x in tagsArray){
                for(var y in tagsArray[x]){
                   if(tagsArray[x][y] ==="clothing"){clothing.push(jsonArray[x])}
                   if(tagsArray[x][y] ==="home"){home.push(jsonArray[x])}
                   if(tagsArray[x][y] ==="electronic"){electronic.push(jsonArray[x])}
                }

            }

            this.setState({
              isLoaded: true
            });
           this.setState({productNamesArray: productNamesArray,
             tagsArray: tagsArray,
             productData: jsonArray});
       })//end then
  }//end set state via axios

  setStateViaProp = () => {
    let tagsArray = [];
    let productNamesArray = [];
    for (var j in this.props.data) {
      tagsArray.push(this.props.data[j].tags);
      productNamesArray.push(this.props.data[j].productName);
    }
     let clothing = [];
     let home = [];
     let electronic = [];
       for(var x in this.props.data){
           for(var y in this.props.data[x]){
              if(tagsArray[x][y] ==="clothing"){clothing.push(this.props.data[x])}
              if(tagsArray[x][y] ==="home"){home.push(this.props.data[x])}
              if(tagsArray[x][y] ==="electronic"){electronic.push(this.props.data[x])}
           }

       }

       this.setState({
         isLoaded: true
       });
      this.setState({productNamesArray: productNamesArray,
        tagsArray: tagsArray,
        productData: this.props.data});
  }//end set state via props

  componentDidUpdate(){
      // console.log("Navbar-78")
      let item = localStorage.getItem("cartQuantity")
      // console.log("Navbar-80-", "newCartValue", item)
      if(item && this.state.cartQuantity != item ){
        this.setState({ cartQuantity:item})
      }
    }

  onSubmit = e => {
    const value = e;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      let tags = [];
      let isAlreadyInArray = false;
      for (var x in this.state.tagsArray) {
        for (var y in this.state.tagsArray[x]) {
          if (regex.test(this.state.tagsArray[x][y])) {
            for (var i in tags) {
              if (this.state.tagsArray[x][y] === tags[i]) {
                isAlreadyInArray = true;
              }
            }
            if (!isAlreadyInArray) {
              tags.push(this.state.tagsArray[x][y]);
            }
            isAlreadyInArray = false;
          }
        }
      }
      suggestions = this.state.productNamesArray
        .filter(v => regex.test(v))
        .concat(tags);
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  onTextChanged = e => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      let tags = [];
      let isAlreadyInArray = false;
      for (var x in this.state.tagsArray) {
        for (var y in this.state.tagsArray[x]) {
          if (regex.test(this.state.tagsArray[x][y])) {
            for (var i in tags) {
              if (this.state.tagsArray[x][y] === tags[i]) {
                isAlreadyInArray = true;
              }
            }
            if (!isAlreadyInArray) {
              tags.push(this.state.tagsArray[x][y]);
            }
            isAlreadyInArray = false;
          }
        }
      }
      suggestions = this.state.productNamesArray
        .filter(v => regex.test(v))
        .concat(tags);
    }
    this.setState(() => ({ suggestions, text: value }));
  };
  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: []
    }));
  }
 renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map(item => (
          <Link
            to={{
              pathname: "/results",
              query: this.state.productData,
              element: item
            }}
            >
               <li onClick={() => this.suggestionSelected(item)}>{item}</li> </Link>))}
      </ul>
    );
}

searchFocusHandler(isFocused){
  this.setState({isSearchFocused: isFocused})
}

   keyPressHandler(e, newText){
      // charcode 13 is "Enter" && text can't be empty && text can't be whitespaces only
      if(e.charCode === 13 && !!newText && newText.trim().length > 0){
         this.setState({
            isEnterPressed: true,
            text: newText        // the user's input
         });
      }
   }

 render(){
  const{isLoaded,text}= this.state;

  const isGuest = (localStorage.getItem("username") != null && localStorage.getItem("username") == 'Guest');
  const isClient = !isGuest && (localStorage.getItem("logged_in_user") != null && localStorage.getItem("logged_in_user") != 'admin');
  const hasCart = (localStorage.getItem("cart") != null);

  console.log('Navbar::render -> isGuest:', isGuest, ' isClient:', isClient)

//Render the cart is this is a client and they have a cart
  var render_cart = (isClient);
  //unless I specifically say not to render the cart
  if (this.props.renderCart != null && !this.props.renderCart)
  {
    render_cart = false;
  }
  var cart_empty = !localStorage.getItem("cart");

  console.log('Navbar::render -> render cart:', render_cart, ' has Cart:', hasCart)

  const cart = () => {
      if (render_cart)
      {
        return (
          (!cart_empty) ? (
            <Link to="/checkout">
              <button
                id="cart"
                type="button"
                class="btn btn-secondary btn-sm"
              >
                <i id="shoppingCart" class="fas fa-shopping-cart"></i>
                {/*<span class="counter">{this.state.cartQuantity}</span>*/}
                <span class="counter">{
                  //If we receive cart quantity as a prop, render that. Else, render the state
                  !this.props.cartQuantity ? this.state.cartQuantity : this.props.cartQuantity}</span>
              </button>
            </Link>
          )
          :(
            <button
              id="cart"
              type="button"
              class="btn btn-secondary btn-sm"
              onClick={()=>{window.alert('Your cart is empty!')}}
            >
              <i id="shoppingCart" class="fas fa-shopping-cart"></i>
              {/*<span class="counter">{this.state.cartQuantity}</span>*/}
              <span class="counter">{(!this.props.cartQuantity) ? this.state.cartQuantity : this.props.cartQuantity}</span>
            </button>
          )
        )
      }//end if
  }

    if (!isLoaded) {
      return <div> loading navbar...</div>;
    } else {
      return (
        <div>
          {/* First Container */}

          {/* user presses Enter in the search bar */}
          {this.state.isEnterPressed && (
            <Redirect
              to={{
                pathname: "/results",
                query: this.state.productData,
                element: text
              }}
            />
          )}

          {/* reset enter's state */}
          {(this.state.isEnterPressed = false)}

          <div id="firstContainer">
            <Navbar id="Navbar" bg="light" expand="lg">

              {/* Navbar Brand */}
              <Navbar.Brand href="../" id="brand">
              <img src="./favicon.ico" height={50} />
                SwampHouse
              </Navbar.Brand>

              {/* Toggle Effect */}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  {/* Dropdown */}
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Shop All
                    </Dropdown.Toggle>

                    {/* Dropdown Menu*/}
                    <Dropdown.Menu>
                      <table>
                        <tr>
                          <DropdownItem
                            query={this.state.productData}
                            element="Home"
                          />
                          <DropdownItem
                            query={this.state.productData}
                            element="Clothing"
                          />
                          <DropdownItem
                            query={this.state.productData}
                            element="Kitchen"
                          />
                        </tr>
                        <tr>
                          <DropdownItem
                            query={this.state.productData}
                            element="Electronics"
                          />
                          <DropdownItem
                            query={this.state.productData}
                            element="Shrek"
                          />
                          <DropdownItem
                            query={this.state.productData}
                            element="Book"
                          />
                        </tr>
                        <tr>
                          <DropdownItem
                            query={this.state.productData}
                            element="Microsoft"
                          />
                          <DropdownItem
                            query={this.state.productData}
                            element="Everyday"
                          />
                          <DropdownItem
                            query={this.state.productData}
                            element="Toy"
                          />
                        </tr>
                        <tr>
                          <DropdownItem
                            query={this.state.productData}
                            element="A - Z"
                          />
                          <DropdownItem
                            query={this.state.productData}
                            element="Z - A"
                          />
                          <DropdownItem
                            query={this.state.productData}
                            element="Least to Most Expensive"
                          />
                          <DropdownItem
                            query={this.state.productData}
                            element="Most to Least Expensive"
                          />
                        </tr>
                      </table>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>

                {/* Search Option */}

                <div className="Results">
                  <FormControl
                    value={text}
                    onChange={this.onTextChanged}
                    onKeyPress={e => this.keyPressHandler(e, text)}
                    onFocus={() => this.searchFocusHandler(true)}
                    onBlur={() => this.searchFocusHandler(false)}
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />
                  {this.state.isSearchFocused ? this.renderSuggestions() : ''}
                </div>

                <Link
                  to={{
                    pathname: "/results",
                    query: this.state.productData,
                    element: this.state.text
                  }}
                >
            {/* Button is disabed if search bar is empty or only contains whitespaces */}
            <Button id="search" disabled={!text || text.trim().length <= 0} variant="outline-success">

              Search

            </Button>
                </Link>

                {/* Login */}

                <Link
                  to={
                    localStorage.getItem("logged_in_user") ? "/user" : "/login"
                  }
                >
                  <button
                    id="user_profile"
                    type="button"
                    class="btn btn-secondary btn-sm"
                  >
                    {localStorage.getItem("logged_in_user")
                      ? localStorage.getItem("logged_in_user")
                      : "Guest"}
                  </button>
                </Link>

                {!localStorage.getItem("logged_in_user") && (
                  <Link to="/login">
                    <button
                      id="login"
                      type="button"
                      class="btn btn-secondary btn-sm"
                    >
                      Login
                    </button>
                  </Link>
                )}

                {!localStorage.getItem("logged_in_user") && (
                  <Link to="/register">
                    <button
                      id="signup"
                      type="button"
                      class="btn btn-secondary btn-sm"
                    >
                      SignUp
                    </button>
                  </Link>
                )}

                {cart()}


              </Navbar.Collapse>
            </Navbar>
          </div>

          {/* Second Container */}
          <div id="secondContainer">
            <table>
              <tr>
                <CategoryButton query={this.state.productData} element="Home" />
                <CategoryButton
                  query={this.state.productData}
                  element="Clothing"
                />
                <CategoryButton
                  query={this.state.productData}
                  element="Kitchen"
                />
                <CategoryButton
                  query={this.state.productData}
                  element="Electronic"
                />
                <CategoryButton
                  query={this.state.productData}
                  element="Shrek"
                />
                <CategoryButton query={this.state.productData} element="Book" />
                <CategoryButton
                  query={this.state.productData}
                  element="Microsoft"
                />
                <CategoryButton
                  query={this.state.productData}
                  element="Everyday"
                />
                <CategoryButton query={this.state.productData} element="Toy" />
                <CategoryButton
                  query={this.state.productData}
                  element="Sports"
                />
                <CategoryButton
                  query={this.state.productData}
                  element="Outdoor"
                />
                <CategoryButton
                  query={this.state.productData}
                  element="Children"
                />
                <CategoryButton
                  query={this.state.productData}
                  element="A - Z"
                />
                <CategoryButton
                  query={this.state.productData}
                  element="Z - A"
                />
                <CategoryButton
                  query={this.state.productData}
                  element="Least to Most Expensive"
                />
                <CategoryButton
                  query={this.state.productData}
                  element="Most to Least Expensive"
                />
              </tr>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default NavbarFunction;
