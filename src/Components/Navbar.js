// All imports
import React, { Component } from 'react';
import "../styles/Navbar.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "../styles/searchResults.css";

// The Navigation Bar
class NavbarFunction extends Component {
   constructor(){
      super();
      this.state = {
         suggestions:[],
         text:'',
         productNames:[],
         isLoaded:false
      }
   }
   componentDidMount(){
      this.setState({
        isLoaded:true,
     })
   }
   onTextChanged = (e) =>{
      console.log("in hiya")
      const value = e.target.value;
      let suggestions = [];
      if(value.length >0){
         const regex = new RegExp(`^${value}`,'i');
         let tags = [];
         let isAlreadyInArray=false;
         for(var x in this.props.tags){
            for(var y in this.props.tags[x]){
               if(regex.test(this.props.tags[x][y])){
                  for(var i in tags){
                     if(this.props.tags[x][y] === tags[i]){isAlreadyInArray=true;}     
                  }
                  if(!isAlreadyInArray){tags.push(this.props.tags[x][y])};
                  isAlreadyInArray=false;
               }
            }
         }
         suggestions = this.props.productNames.filter(v=>regex.test(v)).concat(tags);

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
            {suggestions.map((item)=> <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
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
            <Navbar.Brand href="#home" id="brand">
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
                      <td>
                        <Dropdown.Item href="#/action-1">
                          <h6> Electronics </h6>
                        </Dropdown.Item>{" "}
                      </td>

                      <td>
                        <Dropdown.Item href="#/action-1">
                          <h6> Electronics </h6>
                        </Dropdown.Item>{" "}
                      </td>

                      <td>
                        <Dropdown.Item href="#/action-1">
                          <h6> Electronics </h6>
                        </Dropdown.Item>{" "}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>{" "}
                      </td>
                      <td>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>{" "}
                      </td>
                      <td>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>{" "}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>{" "}
                      </td>
                      <td>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>{" "}
                      </td>
                      <td>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>{" "}
                      </td>
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
            
            <Button id="search" variant="outline-success">
              Search
            </Button>

            {/* Login */}
            <button id="login" type="button" class="btn btn-secondary btn-sm">
              Login
            </button>

            <button id="signup" type="button" class="btn btn-secondary btn-sm">
              SignUp
            </button>

            {/* Cart */}
            <button id="cart" type="button" class="btn btn-secondary btn-sm">
              <i id="shoppingCart" class="fas fa-shopping-cart"></i>
            </button>
          </Navbar.Collapse>
        </Navbar>
      </div>

      {/* Second Container */}
      <div id="secondContainer">
        <Button id="button2" variant="secondary" size="sm">
          Home
        </Button>
        <Button id="button2" variant="secondary" size="sm">
          Clothing
        </Button>
        <Button id="button2" variant="secondary" size="sm">
          Gaming
        </Button>
        <Button id="button2" variant="secondary" size="sm">
          Electronics
        </Button>
        <Button id="button2" variant="secondary" size="sm">
          Books
        </Button>
        <Button id="button2" variant="secondary" size="sm">
          Toys
        </Button>
        <Button id="button2" variant="secondary" size="sm">
          Garden
        </Button>
        <Button id="button2" variant="secondary" size="sm">
          Sports
        </Button>
        <Button id="button2" variant="secondary" size="sm">
          Cars
        </Button>
        <Button id="button2" variant="secondary" size="sm">
          Gifts
        </Button>
        <Button id="button2" variant="secondary" size="sm">
          Hobbies
        </Button>

        <Button id="button2" variant="secondary" size="sm">
          WishList
        </Button>
      </div>
    </div>
  );
  }
   }
}

export default NavbarFunction;