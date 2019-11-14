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
   onSubmit = (e) =>{
      const value = e;
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
      console.log(suggestions);
      
      
   }
   onTextChanged = (e) =>{
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
            {suggestions.map((item)=><Link to={{
               pathname:"/results",
               query:this.props.products,
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
                        <Link to={{
                           pathname:"/results",
                           query: this.props.products,
                           element:"Home"

                        } }> 
                         <h6> Home </h6>
                        </Link>
                        </Dropdown.Item>{" "}
                      </td>

                      <td>
                        <Dropdown.Item href="#/action-1">
                        <Link to={{
                           pathname:"/results",
                           query: this.props.products,
                           element:"Clothing"

                        } }> 
                          <h6> Clothing </h6>
                        </Link>
                        </Dropdown.Item>{" "}
                      </td>

                      <td>
                        <Dropdown.Item href="#/action-1">
                        <Link to={{
                           pathname:"/results",
                           query: this.props.products,
                           element:"Kitchen"

                        } }>
                          <h6> Kitchen </h6>
                        </Link>
                        </Dropdown.Item>{" "}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <Dropdown.Item href="#/action-1">
                        <Link to={{
                           pathname:"/results",
                           query: this.props.products,
                           element:"Electronic"

                        } }>
                          <h6> Electronics</h6>
                        </Link>
                        </Dropdown.Item>{" "}
                      </td>
                      <td>
                        <Dropdown.Item href="#/action-1">
                        <Link to={{
                           pathname:"/results",
                           query: this.props.products,
                           element:"Shrek"

                        } }>
                          <h6> Shrek </h6>
                        </Link>   
                        </Dropdown.Item>{" "}
                      </td>
                      <td>
                        <Dropdown.Item href="#/action-1">
                        <Link to={{
                           pathname:"/results",
                           query: this.props.products,
                           element:"Book"

                        } }>
                          <h6> Books </h6>
                        </Link>  
                        </Dropdown.Item>{" "}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <Dropdown.Item href="#/action-1">
                        <Link to={{
                           pathname:"/results",
                           query: this.props.products,
                           element:"Microsoft"

                        } }>
                          <h6> Microsoft</h6>
                        </Link>
                        </Dropdown.Item>{" "}
                      </td>
                      <td>
                        <Dropdown.Item href="#/action-1">
                        <Link to={{
                           pathname:"/results",
                           query: this.props.products,
                           element:"Everyday"

                        } }>
                          <h6> Everyday</h6>
                        </Link> 
                        </Dropdown.Item>{" "}
                      </td>
                      <td>
                        <Dropdown.Item href="#/action-1">
                        <Link to={{
                           pathname:"/results",
                           query: this.props.products,
                           element:"Toy"

                        } }>
                          <h6> Toys </h6>
                        </Link>
                        </Dropdown.Item>{" "}
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
            
          <Link to={{
             pathname:"/results",
             query: this.props.products,
             element:this.state.text

           } }>  
            <Button id="search" variant="outline-success">
              Search
            </Button>
         </Link>

            {/* Login */}
           <Link to="/login">
              <button id="login" type="button" class="btn btn-secondary btn-sm">
              Login
              </button>
            </Link>

            <Link to="/register">
               <button id="signup" type="button" class="btn btn-secondary btn-sm">
               SignUp
               </button>
            </Link>

            {/* Cart */}
            <button id="cart" type="button" class="btn btn-secondary btn-sm">
              <i id="shoppingCart" class="fas fa-shopping-cart"></i>
            </button>
          </Navbar.Collapse>
        </Navbar>
      </div>

      {/* Second Container */}
      <div id="secondContainer">
      <Link to={{
             pathname:"/results",
             query: this.props.products,
             element:"Home"

           } }>  <Button id="button2" variant="secondary" size="sm">
          Home
        </Button>
      </Link>
      <Link to={{
             pathname:"/results",
             query: this.props.products,
             element:"Clothing"

           } }> 
        <Button id="button2" variant="secondary" size="sm">
          Clothing
        </Button>
      </Link>
      <Link to={{
             pathname:"/results",
             query: this.props.products,
             element:"Kitchen"

           } }>
        <Button id="button2" variant="secondary" size="sm">
          Kitchen
        </Button>
      </Link>
      <Link to={{
             pathname:"/results",
             query: this.props.products,
             element:"Electronic"

           } }>
        <Button id="button2" variant="secondary" size="sm">
          Electronics
        </Button>
      </Link>
      <Link to={{
             pathname:"/results",
             query: this.props.products,
             element:"Shrek"

           } }>
        <Button id="button2" variant="secondary" size="sm">
          Shrek
        </Button>
      </Link>
      <Link to={{
             pathname:"/results",
             query: this.props.products,
             element:"Book"

           } }>
        <Button id="button2" variant="secondary" size="sm">
          Books
        </Button>
      </Link>
      <Link to={{
             pathname:"/results",
             query: this.props.products,
             element:"Microsoft"

           } }>
        <Button id="button2" variant="secondary" size="sm">
          Microsoft
        </Button>
      </Link>
      <Link to={{
             pathname:"/results",
             query: this.props.products,
             element:"Everyday"

           } }>
        <Button id="button2" variant="secondary" size="sm">
          Everyday
        </Button>
      </Link>
      <Link to={{
             pathname:"/results",
             query: this.props.products,
             element:"Toy"

           } }>
        <Button id="button2" variant="secondary" size="sm">
          Toys
        </Button>
      </Link>
      <Link to={{
             pathname:"/results",
             query: this.props.products,
             element:"Sports"

           } }>
        <Button id="button2" variant="secondary" size="sm">
          Sports
        </Button>
      </Link>
      <Link to={{
             pathname:"/results",
             query: this.props.products,
             element:"Outdoor"

           } }>
        <Button id="button2" variant="secondary" size="sm">
          Outdoors
        </Button>
      </Link>
      <Link to={{
             pathname:"/results",
             query: this.props.products,
             element:"Children"

           } }>
        <Button id="button2" variant="secondary" size="sm">
          Children
        </Button>
      </Link>
      </div>
    </div>
  );
  }
   }
}

export default NavbarFunction;