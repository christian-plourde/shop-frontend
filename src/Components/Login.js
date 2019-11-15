import React, {Component} from "react";
import SubmitButton from "./SubmitButton.js";
import Navbar from "./Navbar.js";
import Link from "./Link.js";

class Login extends Component
{

	state = 
	{
		username: "",
		encrypted_password: ""
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
    	document.getElementById("password").value = enc_pwd;
  	}

	handleUserNameChange = (e) =>
  	{
  		this.setState({username: e.target.value});
  	}

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
			width: "40%",
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

	return(
	<form name="login" id="login_form" method="post" action="">
		<div style = {style}>
			<div style = {inner_style}>
				<h2>{this.props.user_text ? this.props.user_text : "Username or email"}</h2>
				<input name = "username" id="username" onChange = {this.handleUserNameChange} value = {this.state.username} style = {input_style} placeholder = {this.props.user_text ? this.props.user_text : "Username or email"} required/>
			</div>
		</div>
		       	   
        <div style = {style}>
			<div style = {inner_style}>
				<h2>{this.props.password_text ? this.props.password_text : "Password"}</h2>
				<input onInput = {this.handlePasswordChange} style = {input_style} placeholder = {this.props.password_text ? this.props.password_text : "Password"} type = "password" required />
				<input name = "password" id="password" style = {input_style} placeholder = {this.props.password_text ? this.props.password_text : "Password"} hidden/>
			</div>
		</div>
		<div>
        	 <SubmitButton />
        	 <Link redirect_link = {register_redirect_link}/>
             <Link redirect_link = {password_redirect_link}/>
        </div>
    </form>
		);
	}
	
}

export default Login;