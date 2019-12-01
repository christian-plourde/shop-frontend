import React, { Component } from "react";
import "./styles/LandingPage.css";
import Carousel from "./Components/carousel";
import Navbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
      quantity:0
    };
  }
  //http://localhost:3000/Products.json
  //https://shop-354.herokuapp.com/product.php?products=-1
 // http://localhost:80/shop-frontend/shop-backend/php/product.php?products=-1
  componentDidMount() {
    fetch("http://localhost:3000/Products.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response =>{
        return response.json();
      })//response is mapped on productData
      .then(productData => {
        console.log(typeof(productData))
        this.setState({
          isLoaded: true,
          data: productData.products
      });
        let jsonArray = JSON.parse(JSON.stringify(this.state.data));
        let tagsArray = [];
        let productNamesArray = [];
        for (var j in jsonArray) {
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
  }
  changeQuantity() {
    console.log("LandingPage-72")
    //localStorage.setItem("cartQuantity","5")
    let value = this.state.quantity++
  //  this.setState({quantity:value})
    
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
    if (!isLoaded) {
      return <div> loading...</div>;
    } else {
      return (
        <div>
          <Navbar productNames={productNames} tags={tags} products={data}/>
          <div className="LandingPageBody">
            <div>
              <div className="LandingPageBody">
                <div>
                  <Carousel
                    data={clothingProducts}
                    category="Clothing Products"
                    updateQuantity={""/*() => this.changeQuantity()*/}
                  />
                </div>
                <div>
                  <Carousel data={homeProducts} category="Home Products" />
                </div>
                <div>
                  <Carousel
                    data={electronicProducts}
                    category="Electronic Products"
                  />
                </div>
              </div>
            </div>
            <div>
              <Carousel data={homeProducts} category="Home Products" />
            </div>
            <div>
              <Carousel
                data={electronicProducts}
                category="Electronic Products"
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default LandingPage;
