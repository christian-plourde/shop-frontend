import React from "react";
import {BrowserRouter as Router, Link as ReactLink} from "react-router-dom";
import Route from "react-router-dom/Route";

function Link(redirect_link)
{
	console.log()

	const style = 
	{
	height: "30px",
	color: "#333",
	textAlign: "center"
	};

	const inner_style = 
	{
	margin: "15px auto 15px 40%",
	width: "20%",
	textAlign: 'center'
	};

	const link_style = 
	{
		color: "#333",
		textDecoration:'none',
		fontSize: '18px',
		fontWeight: 'bold'
	};

	return (

		<div style = {style}>
			<div style = {inner_style}>
				<ReactLink to={"/" + redirect_link.redirect_link.link} 
				style = {link_style}>{redirect_link.redirect_link.link_text}</ReactLink>
			</div>
		</div>

	);
}

export default Link;