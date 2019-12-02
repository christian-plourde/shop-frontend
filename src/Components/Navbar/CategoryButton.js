import React, { Component } from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";


class CategoryButton extends Component {
  render()
  {
    return(
      <td>
        <Link to={{
               pathname:"/results",
               query: this.props.query,
               element:this.props.element

             } }>
            <Button id="button2" variant="secondary" size="sm">
              {this.props.element}
             </Button>
        </Link>
      </td>
    );
  }

}

export default CategoryButton;
