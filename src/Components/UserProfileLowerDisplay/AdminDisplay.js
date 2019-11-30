import React from 'react';

import localhost from '../../LocalHost.js';
import axios from 'axios';

import AdminInputField from './AdminInputField.js';

const DATE_OPTIONS = ["24 hours", "one week", "two weeks", "a month", "the website's birth"];

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
          "the website's birth":""
        }
      }

      this.initialize_date_mappings = this.initialize_date_mappings.bind(this);
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
        date_mappings:DATE_MAPPINGS});
  }

  componentDidMount()
  {
    //Initialize date mappings; I need to know when times like 24 hours ago are, in order to make my SQL queries
    this.initialize_date_mappings();
    //Set default value to since the website's birth

  }

  displaySiteCommission(){
    const site = (localhost) ?
        'http://localhost/shop-backend/php/display_user_products.php'
        : 'https://shop-354.herokuapp.com/display_user_products.php';

    const data = (this.props.username)
    ? JSON.stringify({username: this.props.username})
    : null;
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"*",
        },
      };

    axios.post(site, data, axiosConfig)
    .then((response) => {
        console.log("display user products for sale :: axios.post call successful for params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig, '\nResponse data:', response.data);
        if(response.data.Accepted)
        {
          //Return HELLO, where this component's stuff should be
          const list_of_products = response.data.products;
          console.log('display user products for sale :: list of products', list_of_products);
          //If there are no items in this list, then the user has no items for sale
          if (list_of_products.length < 1)
          {
            console.log('No items for sale');
            return (
              <div>
                You have no items for sale!
              </div>
            );
          }
          else{
            console.log('display user products for sale :: Displaying products');
            //For every product in the JSON list of products, we want to be passing the product dictionary's values to this ProductThumbnail object, to display it to the user.
            this.setState({
              products:list_of_products
            });
            return;

          }//end else
        }//end if
        else{
          console.log('display user products for sale :: response data not accepted.\nResponse:', response.data);
        }
    },
    (error) => {
      console.log("display user products for sale :: axios.post call failure for params\nsite:", site, '\ndata:', data, '\nconfig:', axiosConfig, '\nError:', error);
    });
  }//end function displaySiteCommission

  renderInputField()
  {
    if (this.state.from_date_timestamp != "")
    {
      console.log('render input field :: date set')
      return Object.entries(this.state.date_mappings).forEach((entry) => {
          const key = entry[0];
          const value = entry[1];
          console.log('entry', entry, 'key', key, 'value', value);
          return (
            <AdminInputField  mapping={key}
                              timestamp={value}
            />
          )
      })
    }
  }

    render() {
      // return(
      //     <div>
      //       <table>
      //         <thead>
      //         </thead>
      //         <tbody>
      //           <tr>
      //             {this.renderInputField()}
      //           </tr>
      //           <tr></tr>
      //         </tbody>
      //       </table>
      //     </div>
      //  );

      // return(
      //     <AdminInputField date_mappings="lala" timestamp="baba"/>
      //  );

      // return(
      //     Object.entries(this.state.date_mappings).forEach((entry) => {
      //         const key = entry[0];
      //         const value = entry[1];
      //         console.log('entry', entry, 'key', key, 'value', value);
      //         return (
      //           <AdminInputField  mapping={key}
      //                             timestamp={value}
      //           />
      //         )
      //     })
      //  );

      return (<h1>ADMIN</h1>)
    }
}

export default AdminDisplay;
