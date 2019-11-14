import React from "react";

function ForgotPasswordText(props)
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

	return (

		<h2 style = {style}>{props.text}</h2>

		);
}

export default ForgotPasswordText;