import React, {Component} from "react";
import SubmitButton from "./SubmitButton.js";
import Navbar from "./Navbar.js";
import axios from 'axios';
import edit_blue from "../ressources/icons/edit_blue.png";
import edit_green from "../ressources/icons/edit_green.png";
import exit_blue from "../ressources/icons/exit_blue.png";
import exit_green from "../ressources/icons/exit_green.png";
import {Redirect} from "react-router";

//A variable to make our lives easier
import localhost from '../LocalHost.js';

import UserProfileLowerDisplay from './UserProfileLowerDisplay.js';
import ProductThumbnail from './ProductThumbnail.js';

class UserProfile extends Component
{

	state =
	{
		edit_mode: false,
		username: sessionStorage.getItem("logged_in_user"),
		email: "",
		firstName: "",
		lastName: "",
		address: "",
		country: "",
		isAdmin: false,
		logout: false,
		changeError: false,
		changeSuccess: false
	}

	constructor(props)
	{
		super(props);
	}


	componentDidMount()
	{

		const site = (localhost) ?
			'http://localhost/shop-backend/php/user_profile_display.php'
			: 'https://shop-354.herokuapp.com/user_profile_display.php';
		const data = {username: sessionStorage.getItem("logged_in_user")};
		const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
						"Access-Control-Allow-Origin":"*",
        },
    	};

		axios.post(site, data, axiosConfig)
		.then((response) => {
				// console.log("user profile display :: axios.post call successful for params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig);
				// console.log("Response", response.data);
  			if(response.data.Accepted)
  			{
					// console.log("Response accepted");
  				this.setState({email: response.data.email});
  				this.setState({firstName: response.data.firstName});
  				this.setState({lastName: response.data.lastName});
  				this.setState({address: response.data.address});
  				this.setState({country: response.data.country});
  				this.setState({isAdmin: response.data.isAdmin});
  			}
		}, (error) => {
			// console.log("user profile accepted :: Didn't succeed for axios.post call with params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig);
		});
	}

//A function to manage user info editing; triggered on submission of the user info form.
//Collects all modification input at once.
	handleSubmit = (e) =>
	{
			e.preventDefault();

			const site = (localhost) ?
					'http://localhost/shop-backend/php/user_profile_modification.php'
					: 'https://shop-354.herokuapp.com/user_profile_modification.php';

			const data = JSON.stringify({userName: this.state.username,
					  email: this.state.email,
					  firstName: this.state.firstName,
					  lastName: this.state.lastName,
					  address: this.state.address,
					  country: this.state.country
					});
			const axiosConfig = {
					headers: {
							'Content-Type': 'application/json',
							"Access-Control-Allow-Origin":"*",
					},
				};

			axios.post(site, data, axiosConfig)
			.then((response) => {
					// console.log("user profile modification :: axios.post call successful for params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig);
					if(response.data.Accepted)
					{
						this.setState({changeError: false, changeSuccess: true, edit_mode: false});
					}
					else
					{
						this.setState({changeError: true});
					}
			},
			(error) => {
				// console.log("user profile modification :: axios.post call failure for params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig, '\nError:', error);
			});
	}//end handleSubmit

//A function to modify the color of the edit symbol in response to the user mouse position (if mouse enters)
	handleEditMouseEnter = (e) => {
		e.target.src = edit_green;
	}

//A function to modify the color of the edit symbol in response to the user mouse position (if mouse leaves)
	handleEditMouseLeave = (e) => {
		e.target.src = edit_blue;
	}

//A function to modify the color of the logout symbol in response to the user mouse position (if mouse enters)
	handleExitMouseEnter = (e) => {
		e.target.src = exit_green;
	}

//A function to modify the color of the logout symbol in response to the user mouse position (if mouse leaves)
	handleExitMouseLeave = (e) => {
		e.target.src = exit_blue;
	}

//A function to enable user information editing on click of the edit symbol
	handleEditClick = (e) => {
			this.setState({edit_mode: !this.state.edit_mode});
	}

//A function to handle the user click of the logout symbol
	handleExitClick = (e) => {
		sessionStorage.removeItem("logged_in_user");
		this.setState({logout: true});
	}

//A function to handle the state change reflective of any user input for that state
	handleInput = (e) =>
	{
		this.setState({[e.target.name]: e.target.value});
	}


	render()
	{
		const user_div_style =
		{
			color: "#333",
			textAlign: "center",
			marginTop: "2%",
			width: "40%",
			marginLeft: "30%",
			padding: "20px",
			border: "2px solid #333",
			borderRadius: '10px',
			height: "460px"
		}

		const inner_style =
		{
			margin: "auto auto auto 5%",
			width: "100%",
			textAlign: 'left'
		};

		const input_style =
		{
			width: "60%",
			fontSize: "20px",
			borderColor: "#333",
			marginTop: "5px",
			marginLeft: "5px",
			paddingLeft: "13px",
			borderRadius: '10px',
			color: "#20ab51",
			fontWeight: "500"
		}

		const field_value_style =
		{
			float: "left",
			color: "#20ab51",
			paddingTop: "10px",
			paddingLeft: "20px",
			width: "60%"
		}

		const field_indentifier_style =
		{
			float: "left",
			paddingTop: "10px",
			width: "30%"
		}

		const account_info_style =
		{
			textDecoration: "underline"
		}

		const edit_button =
		{
			float: "right",
			paddingRight: "40px",
			paddingTop: "8px"
		}

		const exit_button =
		{
			float: "right",
			marginRight: "10px",
			marginTop: "25px"
		}

		const test =
		{
			color: "blue"
		}

		const button_style =
		{
			margin: "0 auto",
			marginTop: "20px",
			border: "3px solid #333",
			padding: "5px",
			borderRadius: "10px",
			backgroundColor: "whitesmoke",
			color: "#333",
			fontSize: '15px'
		};

		const error_mess_style =
		{
			color: "#993232",
			textDecoration:'none',
			fontSize: '18px',
			fontWeight: 'bold'
		};

		const success_mess_style =
		{
			color: "#20ab51",
			textDecoration:'none',
			fontSize: '18px',
			fontWeight: 'bold'
		};




		return(

			<div>
				<Navbar />

				<form onSubmit={this.handleSubmit}>
					<div style={user_div_style}>
						<div style={inner_style}>

							<img style={edit_button} src={edit_blue} onMouseEnter={this.handleEditMouseEnter}
							onMouseLeave={this.handleEditMouseLeave}
							onClick={this.handleEditClick}/>
							<h1 style={account_info_style}>Account Information</h1>

								<h2 style={field_indentifier_style}>Username:</h2>

								<h2 style={field_value_style}>{this.state.username}</h2>


								<h2 style={field_indentifier_style}>Email:</h2>
								{
								(
									this.state.edit_mode &&

									<input onInput={this.handleInput} name="email" style={input_style} value={this.state.email} required/>

								)
								}
								{
								(
									!this.state.edit_mode &&
									<h2 style={field_value_style}>{this.state.email}</h2>
								)
								}

								<h2 style={field_indentifier_style}>First Name:</h2>
								{
								(
									this.state.edit_mode &&

									<input onInput={this.handleInput} name="firstName" style={input_style} value={this.state.firstName} required/>

								)
								}
								{
								(
									!this.state.edit_mode &&
									<h2 style={field_value_style}>{this.state.firstName}</h2>
								)
								}

								<h2 style={field_indentifier_style}>Last Name:</h2>
								{
								(
									this.state.edit_mode &&

									<input onInput={this.handleInput} name="lastName" style={input_style} value={this.state.lastName} required/>

								)
								}
								{
								(
									!this.state.edit_mode &&
									<h2 style={field_value_style}>{this.state.lastName}</h2>
								)
								}

								<h2 style={field_indentifier_style}>Address:</h2>
								{
								(
									this.state.edit_mode &&

									<input onInput={this.handleInput} name="address" style={input_style} value={this.state.address} required/>

								)
								}
								{
								(
									!this.state.edit_mode &&
									<h2 style={field_value_style}>{this.state.address}</h2>
								)
								}

								<h2 style={field_indentifier_style}>Country:</h2>
								{
								(
									this.state.edit_mode &&

									<input onInput={this.handleInput} name="country" style={input_style} value={this.state.country} required/>

								)
								}
								{
								(
									!this.state.edit_mode &&
									<h2 style={field_value_style}>{this.state.country}</h2>
								)
								}


								<h2 style={field_indentifier_style}>Account Type:</h2>
								<h2 style={field_value_style}>{this.state.isAdmin ? "Administrator" : "Regular"}</h2>

						</div>

						{
							this.state.changeError && (
								<div>
									<h2 style={error_mess_style}>There was an error in your requested changes. Please review them and try again.</h2>
								</div>
								)
						}

						{
							this.state.changeSuccess && (
								<div>
									<h2 style={success_mess_style}>Changes to your profile have been saved.</h2>
								</div>
								)
						}

						<button style={button_style} type="submit">Save Changes</button>

						<img title="Logout" style={exit_button} src={exit_blue} onMouseEnter={this.handleExitMouseEnter}
							onMouseLeave={this.handleExitMouseLeave}
							onClick={this.handleExitClick}/>

							{this.state.logout && (
          						<Redirect to={"/"}/>
        					)}
					</div>
				</form>
				<div>
					{/*if the user is an admin, display site earnings. Else, display user products for sale.*/}

						<UserProfileLowerDisplay 	isAdmin={this.state.isAdmin}
																			username={this.state.username}
						/>

				</div>

			</div>

			);
	}

}

export default UserProfile;
