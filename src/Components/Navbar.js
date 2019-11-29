// All imports
import React, { Component } from 'react';
import "../styles/Navbar.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "../styles/autoComplete.css";
import {BrowserRouter as Router, Link} from "react-router-dom";
import Route from "react-router-dom/Route";

import DropdownItem from './Navbar/DropdownItem.js';
import CategoryButton from './Navbar/CategoryButton.js';

//A variable to make our lives easier.
import localhost from '../LocalHost.js';

// The Navigation Bar
class NavbarFunction extends Component {
   constructor(){
      super();
      this.state = {
         suggestions:[],
         text:'',
         productNames:[],
         isLoaded:false,
         productNamesArray: [],
         tagsArray: [],
         productData: []
      }
   }

   componentDidMount(){
     var site = (localhost) ?
       "http://localhost:3000/Products.json"
       : "https://shop-354.herokuapp.com/Products.json";
      fetch(site, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })

      .then(response => response.json())
      .then(productData => {
        this.setState({
          isLoaded: true
        });
        let jsonArray = JSON.parse(JSON.stringify(productData.products));
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

          this.setState({productNamesArray: productNamesArray,
            tagsArray: tagsArray,
            productData: jsonArray});
      })
   }
   onSubmit = (e) =>{
      const value = e;
      let suggestions = [];
      if(value.length >0){
         const regex = new RegExp(`^${value}`,'i');
         let tags = [];
         let isAlreadyInArray=false;
         for(var x in this.state.tagsArray){
            for(var y in this.state.tagsArray[x]){
               if(regex.test(this.state.tagsArray[x][y])){
                  for(var i in tags){
                     if(this.state.tagsArray[x][y] === tags[i]){isAlreadyInArray=true;}
                  }
                  if(!isAlreadyInArray){tags.push(this.state.tagsArray[x][y])};
                  isAlreadyInArray=false;
               }
            }
         }
         suggestions = this.state.productNamesArray.filter(v=>regex.test(v)).concat(tags);

      }
      this.setState(() => ({suggestions,text:value}));
      console.log(suggestions);


   }
   onTextChanged = (e) =>{
      const value = e.target.value;
      let suggestions = [];
      if(value.length >0){
         const regex = new RegExp(`^${value}`,'i');
         let tags = [];
         let isAlreadyInArray=false;
         for(var x in this.state.tagsArray){
            for(var y in this.state.tagsArray[x]){
               if(regex.test(this.state.tagsArray[x][y])){
                  for(var i in tags){
                     if(this.state.tagsArray[x][y] === tags[i]){isAlreadyInArray=true;}
                  }
                  if(!isAlreadyInArray){tags.push(this.state.tagsArray[x][y])};
                  isAlreadyInArray=false;
               }
            }
         }
         suggestions = this.state.productNamesArray.filter(v=>regex.test(v)).concat(tags);

      }
      this.setState(() => ({suggestions,text:value}));
   }
   suggestionSelected(value){
      this.setState(() => ({
         text:value,
         suggestions:[],
      }))

   }
   renderSuggestions () {
      const{suggestions} = this.state;
      if(suggestions.length === 0){
         return null;
      }
      return (
        <ul>
            {suggestions.map((item)=><Link to={{
               pathname:"/results",
               query:this.state.productData,
               element:item
            }}
            >
               <li onClick={() => this.suggestionSelected(item)}>{item}</li> </Link>)}
         </ul>
      );
   }

 render(){
  const{isLoaded,text}= this.state;

  if(!isLoaded){
   return <div> loading...</div>;
  }
  else{
   return (
      <div>
         {/* First Container */}
         <div id="firstContainer">
            <Navbar id="Navbar" bg="light" expand="lg">
               {/* Navbar Brand */}
            <Navbar.Brand href="../" id="brand">
               <i id="brandLogo" class="fas fa-spa"></i>
               BrandTitle
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
                      <DropdownItem query={this.state.productData} element="Home" />
                      <DropdownItem query={this.state.productData} element="Clothing" />
                      <DropdownItem query={this.state.productData} element="Kitchen" />
                    </tr>
                    <tr>
                      <DropdownItem query={this.state.productData} element="Electronics" />
                      <DropdownItem query={this.state.productData} element="Shrek" />
                      <DropdownItem query={this.state.productData} element="Book" />
                    </tr>
                    <tr>
                      <DropdownItem query={this.state.productData} element="Microsoft" />
                      <DropdownItem query={this.state.productData} element="Everyday" />
                      <DropdownItem query={this.state.productData} element="Toy" />
                    </tr>
                    <tr>
                    <DropdownItem query={this.state.productData} element="A - Z" />
                    <DropdownItem query={this.state.productData} element="Z - A" />
                    <DropdownItem query={this.state.productData} element="Least to Most Expensive" />
                    <DropdownItem query={this.state.productData} element="Most to Least Expensive" />
                    </tr>
                  </table>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>

            {/* Search Option */}
            <div className="Results">
            <FormControl value={text} onChange={this.onTextChanged} type="text" placeholder="Search" className="mr-sm-2" />

            {this.renderSuggestions()}
            </div>

          <Link to={{
             pathname:"/results",
             query: this.state.productData,
             element:this.state.text

           } }>
            <Button id="search" variant="outline-success">
              Search
            </Button>
         </Link>

            {/* Login */}

            <Link to={localStorage.getItem("logged_in_user") ? "/user" : "/login"}>
              <button id="user_profile" type="button" class="btn btn-secondary btn-sm">
              {localStorage.getItem("logged_in_user") ? localStorage.getItem("logged_in_user") : "Guest"}
              </button>
            </Link>


            {
              !localStorage.getItem("logged_in_user") &&
              <Link to="/login">
                <button id="login" type="button" class="btn btn-secondary btn-sm">
                  Login
                </button>
              </Link>
           }

           {
              !localStorage.getItem("logged_in_user") &&
              <Link to="/register">
               <button id="signup" type="button" class="btn btn-secondary btn-sm">
                  SignUp
               </button>
              </Link>
            }

            {/* Cart */}
            <button id="cart" type="button" class="btn btn-secondary btn-sm">
              <i id="shoppingCart" class="fas fa-shopping-cart"></i>
            </button>
          </Navbar.Collapse>
        </Navbar>
      </div>

      {/* Second Container */}
      <div id="secondContainer">
        <table>
          <tr>
            <CategoryButton query={this.state.productData} element="Home" />
            <CategoryButton query={this.state.productData} element="Clothing" />
            <CategoryButton query={this.state.productData} element="Kitchen" />
            <CategoryButton query={this.state.productData} element="Electronic" />
            <CategoryButton query={this.state.productData} element="Shrek" />
            <CategoryButton query={this.state.productData} element="Book" />
            <CategoryButton query={this.state.productData} element="Microsoft" />
            <CategoryButton query={this.state.productData} element="Everyday" />
            <CategoryButton query={this.state.productData} element="Toy" />
            <CategoryButton query={this.state.productData} element="Sports" />
            <CategoryButton query={this.state.productData} element="Outdoor" />
            <CategoryButton query={this.state.productData} element="Children" />
            <CategoryButton query={this.state.productData} element="A - Z" />
            <CategoryButton query={this.state.productData} element="Z - A" />
            <CategoryButton query={this.state.productData} element="Least to Most Expensive" />
            <CategoryButton query={this.state.productData} element="Most to Least Expensive" />
          </tr>
        </table>
      </div>
    </div>
  );
  }
   }
}

export default NavbarFunction;
