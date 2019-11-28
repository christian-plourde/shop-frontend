import React from 'react';

import ProductThumbnail from './ProductThumbnail.js';
import localhost from '../LocalHost.js';
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
              console.log('display user products for sale :: Displaying products');
              //For every product in the JSON list of products, we want to be passing the product dictionary's values to this ProductThumbnail object, to display it to the user.
              this.setState({
                products:list_of_products
              });
              return;

              // const product_thumbnails = list_of_products.map((product) => {
              //   return (<tr key={"tr:" + product["productID"]}>
              //     <td key={"td:" + product["productID"]}>
              //       <ProductThumbnail 	id={product["productID"]}
              //                           name={product["productName"]}
              //                           picture={product["picture"]}
              //                           price={product["productPrice"]}
              //                           description={product["descriptionText"]}
              //       />
              //     </td>
              //   </tr>)}
              // )//end map f'n


              // console.log('Product thumbnails',product_thumbnails);
              //
              // return(
              //   <div>
              //     <h2>Products for sale</h2>
              //     <table>
              //       {product_thumbnails}
              //     </table>
              //   </div>
              // );
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


    // renderTable(){
    //   return this.state.products.map((product, index) => {
    //       const {productID} = product
    //       return (
    //         <tr key={productID}>
    //           <td key={"td:" + product["productID"]}>
    //             <ProductThumbnail 	id={product["productID"]}
    //                                 name={product["productName"]}
    //                                 picture={product["picture"]}
    //                                 price={product["productPrice"]}
    //                                 description={product["descriptionText"]}
    //             />
    //           </td>
    //         </tr>
    //       )
    //   })
    // }

    // color: "White"
    // descriptionText: "Stunning Microsoft Azure mug to make all your coworkers jealous."
    // dimensions: "4 x4 "
    // modelName: "B46Y9AS0GX"
    // ownerID: "132"
    // productID: "1"
    // productName: "Microsoft Azure Mug"
    // productPrice: "20.00"
    // quantity: "559"

    renderTable(){
      return this.state.products.map((product, index) => {
          const {productID, productName, productPrice, quantity, productDescription} = product
          return (
            <tr key={"tr:"+productID}>
              <td key={"td:" + productID}>
                <ProductThumbnail 	id={productID}
                                    name={productName}
                                    picture={product["picture"]}
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
