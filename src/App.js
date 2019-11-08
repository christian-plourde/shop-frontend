import React, { Component } from 'react';
import './App.css';
import Header from "./Components/Header.js";
import Login from "./Components/Login.js";
import {BrowserRouter as Router, Link} from "react-router-dom";
import Route from "react-router-dom/Route";
import InputBox from "./Components/InputBox";
import SubmitButton from "./Components/SubmitButton";
import LandingPage from "./LandingPage.js";
import ProductCard from "./Components/productCard.jsx"; 

class App extends Component {
  render() {
    return (

    	<Router>

        {/*The main login page*/}
        <Route path = "/" exact strict render = {() => {
          return (<LandingPage />);
        }} />

        {/*The main login page*/}
    		<Route path = "/login" exact strict render = {() => {
    			return (<div>
        				<Header text="Login"/>
        				<Login user_text = "Username" password_text = "Password" 
        				password_link = "forgot_password"
        				password_link_text = "Forgot Password"
        				register_link = "register"
        				register_link_text = "Register"
        				/>
      					</div>);
    		}} />
      		
        {/*The page to recover the user's password*/}

      		<Route path = "/forgot_password" exact strict render = {() => {

      			return(<div>
              <Header text="Password Recovery"/>

              </div>
              );

      		}} />

          {/*The pafe for the user to register a new account on the site*/}

      		<Route path = "/register" exact strict render = {() => {

      			return(<div>
              <Header text="Register"/>
              {/*should have first name box, last name box, username box, password box and address box*/}
              <form action = "">
              <InputBox title = "First Name" placeholder = "First Name" />
              <InputBox title = "Last Name" placeholder = "Last Name" />
              <InputBox title = "Address" placeholder = "Address" />
              <InputBox title = "Email" placeholder = "Email" />
              <InputBox title = "Username" placeholder = "Username" />
              <InputBox title = "Password" placeholder = "Password" type = "password"/>
              <InputBox title = "Confirm Password" placeholder = "Password" type = "password"/>
              <SubmitButton />
              </form>
              </div>
              );

      		}} />

      	</Router>
    );
  }
}

export default App;
