import React, {Component} from "react";
import {BrowserRouter as Router, Link as ReactLink} from "react-router-dom";

//A variable to make our lives easier

function ProductPosting () {

	const button_style =
    {
      margin: "0 auto",
      marginTop: "20px",
      border: "3px solid #333",
      padding: "5px",
      borderRadius: "10px",
      backgroundColor: "whitesmoke",
      color: "#333",
      fontSize: '15px'
    };

  return (
    <ReactLink to={"/productPosting"/*product posting page*/}>
      <button style = {button_style}>
        <h1>New product posting</h1>
      </button>
    </ReactLink>
  );
}

export default ProductPosting;
