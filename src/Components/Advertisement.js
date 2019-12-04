import React, { Component } from "react";
import axios from "axios";

//A variable to make our lives easier
import localhost from "../LocalHost.js";

class Advertisement extends Component {
  state = {

    ad_array: null,
    current_ad: 0

  };

  componentDidMount() {

    //we need to load the ads into the state of the component on load
    const site = localhost
      ? "http://localhost/shop-backend/php/ad_loader.php"
      : "https://shop-354.herokuapp.com/ad_loader.php";

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };

    axios.post(site, null, axiosConfig).then(
      response => {
        
        this.setState({ad_array: response.data});
        console.log(this.state.ad_array[0]);

      },//end response
      error => {
        console.log(error);
      }
    );

    window.setInterval(() => {
      //implementation for changing ads goes here
        var ad = Math.ceil(Math.random() * (this.state.ad_array.length - 1));
        this.setState({current_ad : ad});
      }, 15000);
  }

  constructor(props) {
    super(props);
  }

  render() {

    const style = 
    {
      position:"fixed",
      left:"0px",
      bottom:"0px",
      textAlign: 'center',
      width:"100%"
    }

return(
    <div style={style}>
    {
      this.state.ad_array &&
      <img src={this.state.ad_array[this.state.current_ad].url} />
    }
    </div>
    );
  }
}

export default Advertisement;
