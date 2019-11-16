import React, { Component } from "react";
import "./styles/LandingPage.css";
import Carousel from "./Components/carousel";
import Navbar from "./Components/Navbar";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      electronicProducts: []
    };
  }


  componentDidMount() {
    //https://shop-354.herokuapp.com/Products.json
    //http://localhost:3000/Products.json
    fetch("http://localhost:3000/Products.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })

      .then(response => response.json())
      .then(productData => {
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
           for(var x in tagsArray){
               for(var y in tagsArray[x]){
                  if(tagsArray[x][y] ==="clothing"){clothing.push(jsonArray[x])}
                  if(tagsArray[x][y] ==="home"){home.push(jsonArray[x])}
                  if(tagsArray[x][y] ==="electronic"){electronic.push(jsonArray[x])}
               }

           }
           this.setState({
              clothingProducts:clothing,
              homeProducts:home,
              electronicProducts:electronic,
              tags:tagsArray,
              productNames:productNamesArray,
              data:jsonArray
           })
      })
   }
   render(){
      const {isLoaded,data,tags,clothingProducts,homeProducts,electronicProducts,productNames}= this.state;
      if(!isLoaded){
         return <div> loading...</div>;
      }
      else{
         return(
            <div>
               <Navbar productNames={productNames} tags={tags} products={data} />
             <div className="LandingPageBody">
             <div>
               <Carousel data={clothingProducts} category="Clothing Products" />
             </div>
             <div>
               <Carousel data={homeProducts} category="Home Products" />
             </div>
             <div>
               <Carousel data={electronicProducts} category="Electronic Products" />
             </div>
             </div>
            </div>
         );

      }
   }

}

export default LandingPage;
