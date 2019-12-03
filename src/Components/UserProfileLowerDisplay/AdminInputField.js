import React from 'react';

import localhost from '../../LocalHost.js';
import axios from 'axios';


class AdminInputField extends React.Component {

  constructor(props) {
      super(props)
  }

    render() {

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

      return(<div>
        <button onClick={() => this.props.onClick(this.props.timestamp)} style = {button_style}>
          <h1>{this.props.mapping}</h1>
        </button>
        </div>);
    }
}

export default AdminInputField;
