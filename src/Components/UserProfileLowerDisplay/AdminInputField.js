import React from 'react';

import localhost from '../../LocalHost.js';
import axios from 'axios';


class AdminInputField extends React.Component {

  constructor(props) {
      super(props)
  }

    render() {
      return(<div>
        <button onClick={() => this.props.onClick(this.props.timestamp)}>
          <h1>{this.props.mapping}</h1>
        </button>
        </div>);
    }
}

export default AdminInputField;
