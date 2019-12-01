import React, {Component} from "react";
import {BrowserRouter as Router, Link as ReactLink} from "react-router-dom";

//A variable to make our lives easier

function ProductPosting () {
  return (
    <ReactLink to={"/productPosting"/*product posting page*/}>
      <button>
        <h1>New product posting</h1>
      </button>
    </ReactLink>
  );
}

export default ProductPosting;
