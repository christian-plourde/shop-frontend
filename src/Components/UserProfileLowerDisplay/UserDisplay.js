import React from 'react';

import ProductThumbnail from '../ProductThumbnail.js';
import localhost from '../../LocalHost.js';
import axios from 'axios';


class UserDisplay extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          products:[]
        }
    }

    componentDidMount()
    {
      console.log('component did mount');
      this.displayUserProductsCurrentlyForSale();
    }

    displayUserProductsCurrentlyForSale(){
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
              // console.log('display user products for sale :: Displaying products');
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
    }//end function displayUserProductsCurrentlyForSale()


    renderTable(){
      return this.state.products.map((product, index) => {
          const {productID, productName, productPrice, quantity, productDescription, image_url} = product
          console.log('image url[0]',image_url[0]);
          return (
            <tr key={"tr:"+productID}>
              <td key={"td:" + productID}>
                <ProductThumbnail 	id={productID}
                                    name={productName}
                                    picture={image_url[0]}
                                    price={productPrice}
                                    description={productDescription}
                                    quantity={quantity}
                />
              </td>
            </tr>
          )
      })
    }

    render() {
      return(
          <div>
            <h3>USER_DISPLAY :: ITEMS ON SALE {this.props.username}</h3>
            <table>
              <tbody>
                {this.renderTable()}
              </tbody>
            </table>
          </div>
       );
    }
}

export default UserDisplay;
