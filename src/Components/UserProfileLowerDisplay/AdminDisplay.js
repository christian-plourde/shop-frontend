import React from 'react';

import localhost from '../../LocalHost.js';
import axios from 'axios';

import AdminInputField from './AdminInputField.js';

const DATE_OPTIONS = ["24 hours", "One Week", "Two Weeks", "A Month", "All Time"];

var DATE_MAPPINGS = null;

//A function to convert the JS Date format to SQL timestamp
function date_to_timestamp_string(date)
{
  //Timestamps have the format
  //2019-10-30 03:25:23
  var timestamp = "";
  timestamp = timestamp.concat(date.getFullYear() + "-");
  timestamp = timestamp.concat((date.getMonth() < 10)
                                    ? ("0" + date.getMonth())
                                    :   date.getMonth());
  timestamp = timestamp.concat("-");
  timestamp = timestamp.concat((date.getDate() < 10)
                                    ? ("0" + date.getDate())
                                    :   date.getDate());
  timestamp = timestamp.concat(" ");
  timestamp = timestamp.concat((date.getHours() < 10)
                                    ? ("0" + date.getHours())
                                    :   date.getHours());
  timestamp = timestamp.concat(":");
  timestamp = timestamp.concat((date.getMinutes() < 10)
                                    ? ("0" + date.getMinutes())
                                    :   date.getMinutes());
  timestamp = timestamp.concat(":");
  timestamp = timestamp.concat((date.getSeconds() < 10)
                                    ? ("0" + date.getSeconds())
                                    :   date.getSeconds());
  return ("'"+timestamp+"'");
}

class AdminDisplay extends React.Component {

  constructor(props) {
      super(props)

      this.state = {
        from_date_timestamp:"",//Default value at website's origin
        date_mappings:{
          "24 hours":"",
          "one week":"",
          "two weeks":"",
          "a month":"",
          "the website's birth":"",
          "top_items": null,
          "top_sellers": null
        },
        commission:0,
        quantity:0
      }

      this.initialize_date_mappings = this.initialize_date_mappings.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }

  initialize_date_mappings = () =>
  {

    var DATE_MAPPINGS = {};
    for(var i = 0; i < DATE_OPTIONS.length; i++)
    {
      DATE_MAPPINGS[DATE_OPTIONS[i]] = "";
    }

    //Start of the fall semester is september 3rd, or so.
    const origin_of_website = new Date(2019, 9, 3, 0, 0, 0, 0);
    //A date variable to make some date strings with
    var date_var = new Date();
    //yesterday
    date_var.setDate(date_var.getDate() - 1);
    DATE_MAPPINGS[DATE_OPTIONS[0]] = date_to_timestamp_string(date_var);
    //A week ago (a day ago, minus six days, is seven days ago)
    date_var.setDate(date_var.getDate() - 6);
    DATE_MAPPINGS[DATE_OPTIONS[1]] = date_to_timestamp_string(date_var);
    //Two weeks ago
    date_var.setDate(date_var.getDate() - 7);//minus fourteen days
    DATE_MAPPINGS[DATE_OPTIONS[2]] = date_to_timestamp_string(date_var);
    //A month ago
    date_var.setDate(date_var.getDate() - 14);//minus 28 days
    DATE_MAPPINGS[DATE_OPTIONS[3]] = date_to_timestamp_string(date_var);
    //Since the start of the website
    DATE_MAPPINGS[DATE_OPTIONS[4]] = date_to_timestamp_string(origin_of_website);//website's
    console.log(DATE_MAPPINGS);

        this.setState({
            from_date_timestamp:"'2019-09-03 00:00:00'",
            date_mappings:DATE_MAPPINGS,
            commission:0,
            quantity:0});
  }

  componentDidMount()
  {
    //Initialize date mappings; I need to know when times like 24 hours ago are, in order to make my SQL queries
    this.initialize_date_mappings();
    //Set default value to since the website's birth

    //load the top selling
    const site = (localhost) ?
        'http://localhost/shop-backend/php/get_best_selling_items.php'
        : 'https://shop-354.herokuapp.com/get_best_selling_items.php';

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"*",
        },
      };

    axios.post(site, null, axiosConfig)
    .then((response) => {
        
      var top = {};

      top.products = new Array();
      for(var i = 0; i < response.data.products.length; i++)
      {
        top.products.push({productName: response.data.products[i].productName, amount: response.data.products[i].amount_sold});
      }

      this.setState({top_items: top});
      
    },
    (error) => {
      console.log(error);
    });

    //load top sellers (people)
    const site_2 = (localhost) ?
        'http://localhost/shop-backend/php/get_best_sellers.php'
        : 'https://shop-354.herokuapp.com/get_best_sellers.php';

    const axiosConfig_2 = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"*",
        },
      };

    axios.post(site_2, null, axiosConfig_2)
    .then((response) => {
        
      var top = {};

      top.sellers = new Array();
      for(var i = 0; i < response.data.sellers.length; i++)
      {
        top.sellers.push({username: response.data.sellers[i].username, totalSold: response.data.sellers[i].TotalSold});
      }

      this.setState({top_sellers: top});
    },
    (error) => {
      console.log(error);
    });


  }


  createTopItems = () => 
  {
    try
    {
      var items = [];

      for(var i = 0; i < this.state.top_items.products.length; i++)
      {
        items.push(<h1>{i+1}. {this.state.top_items.products[i].productName}: {this.state.top_items.products[i].amount} sold</h1>)
      }
      return <div>{items}</div>;
    }

    catch(error)
    {

    }
      
  }

  createTopSellers = () =>
  {
    try
    {
      var items = [];

      for(var i = 0; i < this.state.top_sellers.sellers.length; i++)
      {
        items.push(<h1>{i+1}. {this.state.top_sellers.sellers[i].username}: {this.state.top_sellers.sellers[i].totalSold}$</h1>);
      }

      return <div>{items}</div>
    }

    catch(error)
    {

    }
  }

  handleClick(timestamp){
    this.setState({from_date_timestamp:timestamp});
    console.log('Handle click :: current state.from_date_timestamp', this.state.from_date_timestamp)
    const site = (localhost) ?
        'http://localhost/shop-backend/php/get_site_commission.php'
        : 'https://shop-354.herokuapp.com/get_site_commission.php';

    const data = JSON.stringify({from_date:timestamp});
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"*",
        },
      };

    axios.post(site, data, axiosConfig)
    .then((response) => {
        console.log("Admin display :: axios.post call successful for params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig, '\nResponse data:', response.data);
        if(response.data.Accepted)
        {
          const commission = response.data.results[0];
          // console.log('commission',commission['commission'])
          const commission_val = commission['commission'];
          const quantity = response.data.results[1];
          const quantity_val = quantity['quantity'];
          console.log(timestamp, 'Commission:', commission, 'Quantity', quantity)
          this.setState({commission:commission_val});
          this.setState({quantity:quantity_val});
        }//end if
    },
    (error) => {
      console.log("Admin display :: axios.post call failure for params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig, '\nError:', error);
    });
  }//end function displaySiteCommission


    render() {

      const account_info_style =
      {
        textDecoration: "underline",
        paddingBottom: '10px'
      }

      const top_selling_items_style = 
      {
        paddingLeft: "20px",
        verticalAlign: "top",
        textAlign: "left"
      }

      return (
        <div>

        <table>
        <tr>
        <td rowspan="2">
          <h1 style = {account_info_style}>Earnings</h1>

          <h1>
            Commission{(this.state.commission > 0) ? ': ' + Math.round(this.state.commission*100)/100 + '$' : ''}
            <br />
            Quantity{(this.state.quantity > 0) ? ': ' + this.state.quantity : ''}
            <br />
          </h1>
          {Object.entries(this.state.date_mappings).map((entry) => {
            const since = entry[0];
            const timestamp = entry[1];
            return (<AdminInputField  mapping={since}
                                      timestamp={timestamp}
                                      onClick={this.handleClick}
                    />)//end return
          })//end map f'n
        }
        </td>
        <td style={top_selling_items_style} >
          <h1 style = {account_info_style}>Top Selling Items</h1>

          {this.createTopItems()}
        </td>
        </tr>
        <tr>
        <td style={top_selling_items_style}>
          <h1 style={account_info_style}>Top Sellers</h1>

          {this.createTopSellers()}

        </td>
        </tr>

        </table>

      </div>
    )//end return

  }//end render
}

export default AdminDisplay;
