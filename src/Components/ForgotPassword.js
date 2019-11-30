import React, {Component} from "react";
import SubmitButton from "./SubmitButton.js";
import {Redirect} from "react-router";
import Link from "./Link.js";
import axios from 'axios';

//A variable to make our lives easier
import localhost from '../LocalHost.js';

class ForgotPassword extends Component
{
	state =
	{
		email: "",
		email_mismatch: false,
		success: false,
		failure: false
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


				const site = (localhost) ?
					'http://localhost/shop-backend/php/forgotpassword.php'
					: 'https://shop-354.herokuapp.com/forgotpassword.php';

				const axiosConfig = {
        headers: {
                     'Content-Type': 'application/json',
              }
				};
        axios.post(site, JSON.stringify(data), axiosConfig)
              .then((response) => {

                     if(response.data.Accepted)
                     {
                            //do something
                            this.setState({success: true});
                     }

                     else
                     {
                            //do something else
                            this.setState({failure: true});
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

	const succ_mess_style =
	{
		height: "100px",
		color: "#20ab51",
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
			<form onSubmit={this.handleSubmit}>
			<h2 style={style}>Please enter your email below to reset your password.</h2>
			<div style={input_div_style}>
			<input onChange={this.handleEmailChange} value={this.state.email} style={input_style} placeholder={"Email"} required/>
			</div>

			{this.state.email_mismatch && (
              <div style={input_div_style}>
                     <h2 style={error_mess_style}>The email is not of the correct format. Please try again.</h2>
              </div>
              )}

			{this.state.failure && (
              <div style={input_div_style}>
                     <h2 style={error_mess_style}>The email could not be sent. Please try again.</h2>
              </div>
              )}

			{this.state.success && (
              <div style={input_div_style}>
                     <h2 style={succ_mess_style}>A password reset link has been sent to your email. Please check your email to reset your password.</h2>
              </div>
              )}



			<SubmitButton />
			</form>
		</div>

		);
	}
}

export default ForgotPassword;
