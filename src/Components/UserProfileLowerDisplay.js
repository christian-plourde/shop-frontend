import React from 'react';

import AdminDisplay from './UserProfileLowerDisplay/AdminDisplay.js';
import UserDisplay from './UserProfileLowerDisplay/UserDisplay.js';

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
