import React from 'react';

import AdminDisplay from './AdminDisplay.js';
import UserDisplay from './UserDisplay.js';

class UserProfileLowerDisplay extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
      return(
          this.props.isAdmin ? <AdminDisplay />
          : <UserDisplay username={this.props.username}/>
       );
    }
}

export default UserProfileLowerDisplay;
