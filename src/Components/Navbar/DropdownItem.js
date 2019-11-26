import React, { Component } from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import {Link} from "react-router-dom";


class DropdownItem extends Component {
  render()
  {
    return(
      <td>
      <Link to={{
         pathname:"/results",
         query: this.props.query,
         element:this.props.element

      } }>
          <Dropdown.Item href="#/action-1">

            <h6> {this.props.element} </h6>
          </Dropdown.Item>{" "}
        </Link>
      </td>
    );

    // return(
    //   <td>
    //     <Dropdown.Item href="#/action-1">
    //     <Link to={{
    //        pathname:"/results",
    //        query: this.props.query,
    //        element:this.props.element
    //
    //     } }>
    //       <h6> {this.props.element} </h6>
    //     </Link>
    //     </Dropdown.Item>{" "}
    //   </td>
    // );
  }

}

export default DropdownItem;
