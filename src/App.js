import React, { Component } from 'react';
import './App.css';
import Header from "./Components/Header.js";
import Login from "./Components/Login.js";
import {BrowserRouter as Router, Link} from "react-router-dom";
import Route from "react-router-dom/Route";
import SubmitButton from "./Components/SubmitButton";
import LandingPage from "./LandingPage.js";
import ProductCard from "./Components/productCard.jsx";
import ForgotPassword from "./Components/ForgotPassword.js";
import SearchResults from "./Components/searchResults";
import Registration from "./Components/Registration.js";
import ProductPage from './Components/ProductPage.js';
import Navbar from "./Components/Navbar";
import UserProfile from "./Components/UserProfile";
import ProductPosting from './Components/Client/ProductPosting.js';

class App extends Component {
  render() {
    return (

    	<Router>

        {/*The main login page*/}
        <Route path="/" exact strict render={() => {
          return (<LandingPage />);
        }} />

        {/*The main login page*/}
    		<Route path="/login" exact strict render={() => {
    			return (<div>
                <Navbar />
        				<Login user_text="Username" password_text="Password"
        				password_link="forgot_password"
        				password_link_text="Forgot Password"
        				register_link="register"
        				register_link_text="Register"
        				/>
      					</div>);
    		}} />

        {/*The page to recover the user's password*/}

      		<Route path="/forgot_password" exact strict render={() => {

      			return(<div>
              <Navbar />
              <ForgotPassword />
              </div>
              );

      		}} />

          {/*The pafe for the user to register a new account on the site*/}

      		<Route path="/register" exact strict render={() => {

      			return(
                <Registration />
              );

      		}} />

          <Route path="/productPosting" exact strict component={ProductPosting}/>
          <Route path="/results" exact strict component={SearchResults}/>


          <Route path="/productPage/:product_id" exact strict render={(props) => <ProductPage {...props} />}/>

          <Route path="/user" exact strict component={UserProfile} />

      	</Router>
    );
  }
}

export default App;
