import React from "react";

function UsernameBox(props)
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
	}

	return (

		<div style = {style}>
			<div style = {inner_style}>
				<h2>{props.props.user_text ? props.props.user_text : "Username or email"}</h2>
				<input style = {input_style} placeholder = {props.props.user_text ? props.props.user_text : "Username or email"} required/>
			</div>
		</div>

		);
}

export default UsernameBox;