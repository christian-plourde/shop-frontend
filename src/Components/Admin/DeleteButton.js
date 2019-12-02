import React, { Component } from "react";
import { BrowserRouter as Router, Link as ReactLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

//A variable to make our lives easier

class DeleteButton extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{ float: "right" }}>
				<ReactLink to={"/" + this.props.redirect_to/*Landing page*/}>
					<Button variant="danger" onClick={() => this.props.onClick(this.props.id)}>
						<h1 style={{ color: "black" }}>{this.props.text}</h1>
					</Button>
				</ReactLink>
			</div>
		)
	}
}

export default DeleteButton;
