import React from "react";

function SubmitButton()
{
	const style = 
	{
		height: "30px",
		color: "#333",
		textAlign: "center",
		padding: "25px",
		margin: "30px"
	};

	const button_style = 
	{
		padding: "10px",
		border: "3px solid #333",
		borderRadius: "10px",
		backgroundColor: "whitesmoke",
		color: "#333"
	};

	return(

		<div style={style}>
			<button style={button_style} type="submit">Submit</button>
		</div>
		);
}

export default SubmitButton;