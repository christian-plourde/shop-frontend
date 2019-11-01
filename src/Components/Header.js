import React from "react";

function Header(props)
{
	const style = 
	{
		height: "100px",
		backgroundColor: "#333",
		color: "whitesmoke",
		marginBottom: "15px",
		textAlign: "center",
		fontSize: "30px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	};

	return (

		<header style = {style}>{props.text}</header>

		);
}

export default Header;