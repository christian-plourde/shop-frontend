import React, {Component} from "react";
import SubmitButton from "./SubmitButton.js";
import {Redirect} from "react-router";
import Link from "./Link.js";
import axios from 'axios';

class ForgotPassword extends Component
{
	state = 
	{
		email: "",
		email_mismatch: false
	}

	constructor()
	{
		super();
	}

	handleSubmit = (event) => 
	{
		event.preventDefault();
		
		if(!this.state.email.match("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$", "igm"))
        {
             this.setState({email_mismatch: true});
             return;
        }

        this.setState({email_mismatch: false});

        const data = {
                            email: this.state.email
                            };


        {/*https://shop-354.herokuapp.com/registration.php*/}
        {/*http://localhost/www/shop-backend/php/registration.php*/}
        axios.post('', JSON.stringify(data), {
        headers: {
                     'Content-Type': 'application/json',
              }
              })
              .then((response) => {
                     
                     if(response.data.Accepted)
                     {
                            //do something
                            alert("email sent");
                     }

                     else
                     {
                            //do something else
                            alert("failure");
                     }
                    
              });


	}

	handleEmailChange = (e) =>
	{
		this.setState({email: e.target.value});
	}

	render()
	{

		const style = 
	{
		height: "100px",
		color: "#333",
		marginBottom: "15px",
		textAlign: "center",
		fontSize: "20px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	};

	const error_mess_style = 
	{
		height: "100px",
		color: "#993232",
		marginBottom: "15px",
		textAlign: "center",
		fontSize: "20px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	};

	const input_style = 
		{
			width: "100%",
			fontSize: "20px",
			borderColor: "#333",
			padding: "8px",
			borderRadius: '10px'
		}

		const input_div_style = 
		{
			  margin: "auto auto auto 37.5%",
              width: "25%",
              textAlign: 'left'
		}

		return (

		<div>
			<form onSubmit = {this.handleSubmit}>
			<h2 style = {style}>Please enter your email below to reset your password.</h2>
			<div style = {input_div_style}>
			<input onChange={this.handleEmailChange} value = {this.state.email} style={input_style} placeholder={"Email"} required/>
			</div>

			{this.state.email_mismatch && (
              <div style = {input_div_style}>
                     <h2 style = {error_mess_style}>The email is not of the correct format. Please try again.</h2>
              </div>
              )}
			<SubmitButton />
			</form>
		</div>

		);
	}
}

export default ForgotPassword;