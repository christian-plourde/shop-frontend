import React from 'react';

import AdminDisplay from './UserProfileLowerDisplay/AdminDisplay.js';
import UserDisplay from './UserProfileLowerDisplay/UserDisplay.js';

class UserProfileLowerDisplay extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

    	const div_style =
    	{
    		color: "#333",
			textAlign: "center",
			marginTop: "2%",
			marginLeft: "5%",
			marginBottom: "5%",
			width: "45%",
			float: "left",
			paddingLeft: "50px",
			paddingTop: "20px",
			paddingBottom: "20px",
			border: "2px solid #333",
			borderRadius: '10px',
			textAlign: 'left'
    	}


      return(
      	<div style = {div_style}>
          {this.props.isAdmin ? <AdminDisplay />
          : <UserDisplay username={this.props.username}/>}
        </div>
       );
    }
}

export default UserProfileLowerDisplay;
