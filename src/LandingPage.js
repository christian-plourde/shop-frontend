import React, { Component } from "react";
import "./styles/LandingPage.css";
import Advertisement from "./Components/Advertisement.js";
import Carousel from "./Components/carousel";
import Navbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TrendingProducts from './Components/TrendingProducts.js';

import axios from "axios";

//A variable to make our lives easier
import localhost from "./LocalHost.js"; //Set to true if working locally

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      data: [],
      tags: [],
      productNames: [],
      clothingProducts: [],
      homeProducts: [],
      electronicProducts: [],
      quantity: ""
    };
  }

  componentDidMount() {
    var site = localhost
      ? "http://localhost:80/shop-backend/php/get_products.php"
      : "https://shop-354.herokuapp.com/get_products.php";

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };

    axios.post(site, null, axiosConfig).then(response => {
      // console.log('Response', response.data.products);
      this.setState({
        isLoaded: true,
        data: response.data.products
      });
      // let jsonArray = JSON.parse(JSON.stringify(this.state.data));
      let jsonArray = JSON.parse(JSON.stringify(this.state.data));
      // console.log("JSON array", jsonArray);

      let tagsArray = [];
      let productNamesArray = [];
      for (var j in jsonArray) {
        // console.log('json array[', j,']:', jsonArray[j]);
        tagsArray.push(jsonArray[j].tags);
        productNamesArray.push(jsonArray[j].productName);
      }

        let clothing = [];
        let home = [];
        let electronic = [];
        for (var x in tagsArray) {
          for (var y in tagsArray[x]) {
            if (tagsArray[x][y] === "clothing") {
              clothing.push(jsonArray[x]);
            }
            if (tagsArray[x][y] === "home") {
              home.push(jsonArray[x]);
            }
            if (tagsArray[x][y] === "electronic") {
              electronic.push(jsonArray[x]);
            }
          }
        }
        this.setState({
          clothingProducts: clothing,
          homeProducts: home,
          electronicProducts: electronic,
          tags: tagsArray,
          productNames: productNamesArray,
          data: jsonArray
        });
      });
  }//end component did mount

  changeQuantity() {
    let quantityNow = localStorage.getItem("cartQuantity")
    if(quantityNow != this.state.quantity){
      this.setState({quantity:quantityNow})
    }

  }


  render() {
    const {
      isLoaded,
      data,
      tags,
      clothingProducts,
      homeProducts,
      electronicProducts,
      productNames
    } = this.state;

    const isGuest = (localStorage.getItem("username") != null && localStorage.getItem("username") == 'Guest');
    const isClient = !isGuest && (localStorage.getItem("logged_in_user") != null && localStorage.getItem("logged_in_user") != 'admin');

    if (!isLoaded) {
      return <div> loading...</div>;
    } else {
      // return (
      //   <div>
      //     {/*<Navbar productNames={productNames} tags={tags} products={data} cartQuantity={this.state.quantity}/>*/}
      //     <Navbar data={data} renderCart={isClient}/>
      //     <div className="LandingPageBody">
      //       <div>
      //         <div><h1>Trending products</h1></div>
      //         <div className="LandingPageBody">
      //           <div>
      //             <Carousel
      //               data={clothingProducts}
      //               category="Clothing Products"
      //               updateQuantity={()=> this.changeQuantity()}
      //             />
      //           </div>
      //           <div>
      //             <Carousel
      //             data={homeProducts}
      //             category="Home Products"
      //             updateQuantity={()=> this.changeQuantity()}
      //             />
      //           </div>
      //           <div>
      //             <Carousel
      //               data={electronicProducts}
      //               category="Electronic Products"
      //               updateQuantity={()=> this.changeQuantity()}
      //             />
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // );//end return

      return (
        <div>
          {/*<Navbar productNames={productNames} tags={tags} products={data} cartQuantity={this.state.quantity}/>*/}
          <Navbar data={data} renderCart={isClient}/>
          <div className="LandingPageBody">
            <div>
              <div>
                <h1>
                  {isClient ?
                  (<TrendingProducts   num_to_return={3}
                                        toggleCartUpdate={this.changeQuantity()}
                  />)
                  :
                  (<TrendingProducts   num_to_return={3}

                  />)
                  }
                </h1>
              </div>
              <div className="LandingPageBody">
                <div>
                  <Carousel
                    data={clothingProducts}
                    category="Clothing Products"
                    updateQuantity={()=> this.changeQuantity()}
                  />
                </div>
                <div>
                  <Carousel
                  data={homeProducts}
                  category="Home Products"
                  updateQuantity={()=> this.changeQuantity()}
                  />
                </div>
                <div>
                  <Carousel
                    data={electronicProducts}
                    category="Electronic Products"
                    updateQuantity={()=> this.changeQuantity()}
                  />
                </div>
              </div>
            </div>
          </div>
          <Advertisement />
        </div>
      );//end return
    }//end else
  }//end render
}

export default LandingPage;
