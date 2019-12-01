import React, {Component} from "react";
import {BrowserRouter as Router, Link as ReactLink} from "react-router-dom";

//A variable to make our lives easier

class DeleteButton extends Component
{

	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
      <ReactLink to={"/"+this.props.redirect_to/*Landing page*/}>
        <button onClick={() => this.props.onClick(this.props.id)}>
          <h1>{this.props.text}</h1>
        </button>
      </ReactLink>
    )
	}

}

export default DeleteButton;