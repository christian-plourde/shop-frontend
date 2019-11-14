import React, {Component} from "react";

class PasswordBox extends Component
{
	state = 
	{
		encrypted_password: ""
	}

	constructor(props)
	{
    	super(props);
  	}

  	handleChange = (e) => 
  	{
    	var pwd = e.target.value;
    	var enc_pwd = "";
    	for(var i = 0; i < pwd.length; i++)
    	{
    		enc_pwd += String.fromCharCode(pwd.charCodeAt(i) + 1);
    	}
    	this.setState({encrypted_password: enc_pwd});
  	}

	render()
	{
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
		};

		return (

		<div style = {style}>
			<div style = {inner_style}>
				<h2>{this.props.props.password_text ? this.props.props.password_text : "Password"}</h2>
				<input onChange = {this.handleChange}
				style = {input_style} placeholder = {this.props.props.password_text ? this.props.props.password_text : "Password"} type = "password" required />
			</div>
		</div>

		);
	}
}

export default PasswordBox