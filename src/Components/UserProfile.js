import React, {Component} from "react";
import SubmitButton from "./SubmitButton.js";
import Navbar from "./Navbar.js";
import axios from 'axios';
import edit_blue from "../ressources/icons/edit_blue.png";
import edit_green from "../ressources/icons/edit_green.png";

class UserProfile extends Component
{

	state =
	{
		edit_mode: false,
		username: sessionStorage.getItem("logged_in_user"),
		email: "",
		firstName: "",
		lastName: ""
	}

	constructor(props)
	{
		super(props);
	}

	componentDidMount()
	{
		{/*https://shop-354.herokuapp.com/user_profile_display.php*/}
  		{/*http://localhost/www/shop-backend/php/user_profile_display.php*/}
		axios.post('https://shop-354.herokuapp.com/user_profile_display.php', JSON.stringify({username: sessionStorage.getItem("logged_in_user")}), {
        headers: {
            'Content-Type': 'application/json',
        }
    	})
		.then((response) => {
  			
  			if(response.data.Accepted)
  			{
  				this.setState({email: response.data.email});
  				this.setState({firstName: response.data.firstName});
  				this.setState({lastName: response.data.lastName});
  			}

  			else
  			{

  			}
  			

		});
	}

	handleEditMouseEnter = (e) => {

		e.target.src = edit_green;
	}

	handleEditMouseLeave = (e) => {
		e.target.src = edit_blue;
	}

	handleEditClick = (e) => {

		if(!this.state.edit_mode)
			this.setState({edit_mode: true});
		else
			this.setState({edit_mode: false});

	}

	render()
	{

		const user_div_style = 
		{
			color: "#333",
			textAlign: "center",
			marginTop: "2%",
			width: "40%",
			marginLeft: "2%",
			padding: "20px",
			border: "2px solid #333",
			borderRadius: '10px',
			height: "300px"
		}

		const inner_style = 
		{
			margin: "auto auto auto 5%",
			width: "100%",
			textAlign: 'left'
		};

		const input_style = 
		{
			width: "30%",
			fontSize: "20px",
			borderColor: "#333",
			marginTop: "4px",
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
			paddingLeft: "20px"
		}

		const field_indentifier_style =
		{
			float: "left",
			paddingTop: "10px"
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

		return(
		
			<div>
				<Navbar />
				<form>
					<div style = {user_div_style}>
						<div style = {inner_style}>
							<img style={edit_button} src={edit_blue} onMouseEnter={this.handleEditMouseEnter}
							onMouseLeave={this.handleEditMouseLeave}
							onClick={this.handleEditClick}/>
							<h1 style={account_info_style}>Account Information</h1>

								<h2 style={field_indentifier_style}>Username:</h2>
								{
								(
									this.state.edit_mode &&
									<input style = {input_style} value={this.state.username} required/>
								)
								}
								{
								(
									!this.state.edit_mode &&
									<h2 style={field_value_style}>{this.state.username}</h2>
								)
								}

								<br/>
								<br/>
								<br/>
								<h2 style={field_indentifier_style}>Email:</h2>
								{
								(
									this.state.edit_mode &&
									<input style = {input_style} value={this.state.email} required/>
								)
								}
								{
								(
									!this.state.edit_mode &&
									<h2 style={field_value_style}>{this.state.email}</h2>
								)
								}

								<br/>
								<br/>
								<br/>
								<h2 style={field_indentifier_style}>First Name:</h2>
								{
								(
									this.state.edit_mode &&
									<input style = {input_style} value={this.state.firstName} required/>
								)
								}
								{
								(
									!this.state.edit_mode &&
									<h2 style={field_value_style}>{this.state.firstName}</h2>
								)
								}

								<br/>
								<br/>
								<br/>
								<h2 style={field_indentifier_style}>Last Name:</h2>
								{
								(
									this.state.edit_mode &&
									<input style = {input_style} value={this.state.lastName} required/>
								)
								}
								{
								(
									!this.state.edit_mode &&
									<h2 style={field_value_style}>{this.state.lastName}</h2>
								)
								}

						</div>
					</div>
				</form>
			</div>
    
			);
	}
	
}

export default UserProfile;