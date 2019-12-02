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
      cartQuantity:""
    };
  }

  componentDidMount() {
    //https://shop-354.herokuapp.com/Products.json
    //http://localhost:3000/Products.json
    fetch("http://localhost:3000/Products.json", {
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
        for (var x in tagsArray) {
          for (var y in tagsArray[x]) {
            if (tagsArray[x][y] === "clothing") {
              clothing.push(jsonArray[x]);
            }
            if (tagsArray[x][y] === "home") {
              home.push(jsonArray[x]);
            }
            if (tagsArray[x][y] === "electronic") {
              electronic.push(jsonArray[x]);
            }
          }
        }

        this.setState({
          productNamesArray: productNamesArray,
          tagsArray: tagsArray,
          productData: jsonArray
        });
      });
  }
  componentDidUpdate(){
    console.log("Navbar-78")
    let item = localStorage.getItem("cartQuantity")
    console.log("Navbar-80-", "newCartValue", item)
    if(this.state.cartQuantity != item ){
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
    console.log(suggestions);
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
            <li onClick={() => this.suggestionSelected(item)}>{item}</li>{" "}
          </Link>
        ))}
      </ul>
    );
  }

  render() {
    const { isLoaded, text } = this.state;

    if (!isLoaded) {
      return <div> loading...</div>;
    } else {
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
                              <Link
                                to={{
                                  pathname: "/results",
                                  query: this.state.productData,
                                  element: "Home"
                                }}
                              >
                                <h6> Home </h6>
                              </Link>
                            </Dropdown.Item>{" "}
                          </td>

                          <td>
                            <Dropdown.Item href="#/action-1">
                              <Link
                                to={{
                                  pathname: "/results",
                                  query: this.state.productData,
                                  element: "Clothing"
                                }}
                              >
                                <h6> Clothing </h6>
                              </Link>
                            </Dropdown.Item>{" "}
                          </td>

                          <td>
                            <Dropdown.Item href="#/action-1">
                              <Link
                                to={{
                                  pathname: "/results",
                                  query: this.state.productData,
                                  element: "Kitchen"
                                }}
                              >
                                <h6> Kitchen </h6>
                              </Link>
                            </Dropdown.Item>{" "}
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <Dropdown.Item href="#/action-1">
                              <Link
                                to={{
                                  pathname: "/results",
                                  query: this.state.productData,
                                  element: "Electronic"
                                }}
                              >
                                <h6> Electronics</h6>
                              </Link>
                            </Dropdown.Item>{" "}
                          </td>
                          <td>
                            <Dropdown.Item href="#/action-1">
                              <Link
                                to={{
                                  pathname: "/results",
                                  query: this.state.productData,
                                  element: "Shrek"
                                }}
                              >
                                <h6> Shrek </h6>
                              </Link>
                            </Dropdown.Item>{" "}
                          </td>
                          <td>
                            <Dropdown.Item href="#/action-1">
                              <Link
                                to={{
                                  pathname: "/results",
                                  query: this.state.productData,
                                  element: "Book"
                                }}
                              >
                                <h6> Books </h6>
                              </Link>
                            </Dropdown.Item>{" "}
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <Dropdown.Item href="#/action-1">
                              <Link
                                to={{
                                  pathname: "/results",
                                  query: this.state.productData,
                                  element: "Microsoft"
                                }}
                              >
                                <h6> Microsoft</h6>
                              </Link>
                            </Dropdown.Item>{" "}
                          </td>
                          <td>
                            <Dropdown.Item href="#/action-1">
                              <Link
                                to={{
                                  pathname: "/results",
                                  query: this.state.productData,
                                  element: "Everyday"
                                }}
                              >
                                <h6> Everyday</h6>
                              </Link>
                            </Dropdown.Item>{" "}
                          </td>
                          <td>
                            <Dropdown.Item href="#/action-1">
                              <Link
                                to={{
                                  pathname: "/results",
                                  query: this.state.productData,
                                  element: "Toy"
                                }}
                              >
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
                  <FormControl
                    value={text}
                    onChange={this.onTextChanged}
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />

                  {this.renderSuggestions()}
                </div>

                <Link
                  to={{
                    pathname: "/results",
                    query: this.state.productData,
                    element: this.state.text
                  }}
                >
                  <Button id="search" variant="outline-success">
                    Search
                  </Button>
                </Link>

                {/* Login */}

                <Link
                  to={
                    sessionStorage.getItem("logged_in_user")
                      ? "/user"
                      : "/login"
                  }
                >
                  <button
                    id="user_profile"
                    type="button"
                    class="btn btn-secondary btn-sm"
                  >
                    {sessionStorage.getItem("logged_in_user")
                      ? sessionStorage.getItem("logged_in_user")
                      : "Guest"}
                  </button>
                </Link>

                {!sessionStorage.getItem("logged_in_user") && (
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

                {!sessionStorage.getItem("logged_in_user") && (
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

                {/* Cart */}
                <Link to="/checkout">
                  <button
                    id="cart"
                    type="button"
                    class="btn btn-secondary btn-sm"
                  >
                    <i id="shoppingCart" class="fas fa-shopping-cart"></i>
                    <span class="counter">{this.state.cartQuantity}</span>
                  </button>
                </Link>
              </Navbar.Collapse>
            </Navbar>
          </div>

          {/* Second Container */}
          <div id="secondContainer">
            <Link
              to={{
                pathname: "/results",
                query: this.state.productData,
                element: "Home"
              }}
            >
              {" "}
              <Button id="button2" variant="secondary" size="sm">
                Home
              </Button>
            </Link>
            <Link
              to={{
                pathname: "/results",
                query: this.state.productData,
                element: "Clothing"
              }}
            >
              <Button id="button2" variant="secondary" size="sm">
                Clothing
              </Button>
            </Link>
            <Link
              to={{
                pathname: "/results",
                query: this.state.productData,
                element: "Kitchen"
              }}
            >
              <Button id="button2" variant="secondary" size="sm">
                Kitchen
              </Button>
            </Link>
            <Link
              to={{
                pathname: "/results",
                query: this.state.productData,
                element: "Electronic"
              }}
            >
              <Button id="button2" variant="secondary" size="sm">
                Electronics
              </Button>
            </Link>
            <Link
              to={{
                pathname: "/results",
                query: this.state.productData,
                element: "Shrek"
              }}
            >
              <Button id="button2" variant="secondary" size="sm">
                Shrek
              </Button>
            </Link>
            <Link
              to={{
                pathname: "/results",
                query: this.state.productData,
                element: "Book"
              }}
            >
              <Button id="button2" variant="secondary" size="sm">
                Books
              </Button>
            </Link>
            <Link
              to={{
                pathname: "/results",
                query: this.state.productData,
                element: "Microsoft"
              }}
            >
              <Button id="button2" variant="secondary" size="sm">
                Microsoft
              </Button>
            </Link>
            <Link
              to={{
                pathname: "/results",
                query: this.state.productData,
                element: "Everyday"
              }}
            >
              <Button id="button2" variant="secondary" size="sm">
                Everyday
              </Button>
            </Link>
            <Link
              to={{
                pathname: "/results",
                query: this.state.productData,
                element: "Toy"
              }}
            >
              <Button id="button2" variant="secondary" size="sm">
                Toys
              </Button>
            </Link>
            <Link
              to={{
                pathname: "/results",
                query: this.state.productData,
                element: "Sports"
              }}
            >
              <Button id="button2" variant="secondary" size="sm">
                Sports
              </Button>
            </Link>
            <Link
              to={{
                pathname: "/results",
                query: this.state.productData,
                element: "Outdoor"
              }}
            >
              <Button id="button2" variant="secondary" size="sm">
                Outdoors
              </Button>
            </Link>
            <Link
              to={{
                pathname: "/results",
                query: this.state.productData,
                element: "Children"
              }}
            >
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
