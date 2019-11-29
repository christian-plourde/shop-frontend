import React, {Component} from "react";
import SubmitButton from "./SubmitButton.js";
import Navbar from "./Navbar.js";
import {Redirect} from "react-router";
import Link from "./Link.js";
import axios from 'axios';

//A variable to make our lives easier
import localhost from '../LocalHost.js';

class Login extends Component
{

	state =
	{
		username: "",
		encrypted_password: "",
		redirect: false,
		wrong_information: false
	}

	componentDidMount()
	{
		this.setState({username: localStorage.getItem("username")});
	}

	componentWillUpdate(nextProps, nextState)
	{
		localStorage.setItem("username", nextState.username);
	}

	constructor(props)
	{
		super(props);
	}

	handlePasswordChange = (e) =>
  	{
    	var pwd = e.target.value;
    	var enc_pwd = "";
    	for(var i = 0; i < pwd.length; i++)
    	{
    		enc_pwd += String.fromCharCode(pwd.charCodeAt(i) + 1);
    	}
    	this.setState({encrypted_password: enc_pwd});
  	}

	handleUserNameChange = (e) =>
  	{
  		this.setState({username: e.target.value});
  	}

  	handleSubmit = (event) =>
  	{
			event.preventDefault();

			const site = (localhost) ?
				'http://localhost/shop-backend/php/login.php'
				: 'https://shop-354.herokuapp.com/login.php';

			const data = {
				username: this.state.username,
				password: this.state.encrypted_password,
			};

			const axiosConfig = {
				headers: {
            'Content-Type': 'application/json',
						"Access-Control-Allow-Origin":"*",
        },
			};

    	axios.post(site, data, axiosConfig)
			.then((response) => {
			console.log("axios.post call successful for params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig);
			if(response.data.Accepted)
			{
				this.setState({redirect: true});
				sessionStorage.setItem("logged_in_user", this.state.username);
			}
			else
			{
				this.setState({wrong_information: true});
			}
		}, (error) => {
			console.log("Didn't succeed for axios.post call with params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig);
		});
	}//end handle Submit

	render()
	{
		var password_redirect_link =
		{
			link: this.props.password_link,
			link_text: this.props.password_link_text
		};

		var register_redirect_link =
		{
			link: this.props.register_link,
			link_text: this.props.register_link_text
		};

		const div_style =
		{
			width: "40%"
		}

		const user_div_style =
		{
			height: "100px",
			color: "#333",
			textAlign: "center",
			marginTop: "2%"
		}

		const style =
		{
			height: "100px",
			color: "#333",
			textAlign: "center"
		};

		const inner_style =
		{
			margin: "auto auto auto 40%",
			width: "20%",
			textAlign: 'left'
		};

		const input_style =
		{
			width: "100%",
			fontSize: "20px",
			borderColor: "#333",
			padding: "8px",
			borderRadius: '10px'
		}

		const error_div_style =
		{
			margin: "15px auto 15px 40%",
			width: "20%",
			textAlign: 'center'
		};

		const error_mess_style =
		{
			color: "#993232",
			textDecoration:'none',
			fontSize: '18px',
			fontWeight: 'bold'
		};

	return(
	<form onSubmit={this.handleSubmit}>
		<div style={user_div_style}>
			<div style={inner_style}>
				<h2>{this.props.user_text ? this.props.user_text : "Username or email"}</h2>
				<input onChange={this.handleUserNameChange} value={this.state.username} style={input_style} placeholder={this.props.user_text ? this.props.user_text : "Username or email"} required/>
			</div>
		</div>

        <div style={style}>
			<div style={inner_style}>
				<h2>{this.props.password_text ? this.props.password_text : "Password"}</h2>
				<input onInput={this.handlePasswordChange} style={input_style} placeholder={this.props.password_text ? this.props.password_text : "Password"} type="password" required />
			</div>
		</div>
		<div>
		{this.state.wrong_information && (
			<div style={error_div_style}>
          		<h2 style={error_mess_style}>The username or password is incorrect. Please try again.</h2>
          	</div>
        )}
        	 <SubmitButton />
        	 <Link redirect_link={register_redirect_link}/>
             <Link redirect_link={password_redirect_link}/>
        </div>
        {this.state.redirect && (
          <Redirect to={"/"}/>
        )}
    </form>

		);
	}

}

export default Login;
