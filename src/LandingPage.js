
import React, {Component} from 'react';
import "./styles/LandingPage.css";
import ProductCard from "./Components/productCard";
import Carousel from "./Components/carousel";
import SearchBar from "./Components/searchBar";
import SearchResults from "./Components/searchResults";

class LandingPage extends Component {
   constructor(props){
      super(props);
      
      this.state = {
         isLoaded:false,
         data: [],
         tags:[],
         productNames:[],
         clothingProducts:[],
         homeProducts:[],
         electronicProducts:[]  
      };
   }

   componentDidMount(){
      fetch('http://localhost:3000/Products.json',{
         headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
      })
      .then(response => response.json())
      .then( (productData) => {
         this.setState({
            isLoaded:true,
            data:productData.products
         
         })
        let jsonArray = JSON.parse(JSON.stringify(this.state.data));
        let tagsArray = [];
        let productNamesArray = [];
        for(var j in jsonArray){
            tagsArray.push(jsonArray[j].tags);
            productNamesArray.push(jsonArray[j].productName);
        }
         //console.log(productNamesArray);
         let clothing = [];
         let home = [];
         let electronic = [];
           for(var x in tagsArray){
               for(var y in tagsArray[x]){
                  if(tagsArray[x][y] ==="clothing"){clothing.push(jsonArray[x])}
                  if(tagsArray[x][y] ==="home"){home.push(jsonArray[x])}
                  if(tagsArray[x][y] ==="electronic"){electronic.push(jsonArray[x])}
               }

                 //console.log(x[v]);
           }
          // console.log(clothing);
           //console.log(home);
           //console.log(electronic);
           this.setState({
              clothingProducts:clothing,
              homeProducts:home,
              electronicProducts:electronic,
              tags:tagsArray,
              productNames:productNamesArray
           })
          // console.log(this.state.clothingProducts);
           //console.log(this.state.homeProducts);
           //console.log(this.state.electronicProducts);

            //console.log(clothing);
        //console.log("the tags ",this.state.tags);
        
         //console.log(this.state.data)
         //console.log(this.state.isLoaded)
      })
     // .then(data => this.setState({data}))
      //console.log(this.state.data)      
   }

   
   searchProducts = (e) => {
      let value = e.target.value.toLowerCase();
      for(var x in this.state.productNames){
         if(value =="")
            console.log("empty search field");
         else if(this.state.productNames[x].toLowerCase().includes(value) )
            console.log("****there is a match***");
         else{}
            
      }
      
   }
  

   render(){
      const {isLoaded,data,tags,clothingProducts,homeProducts,electronicProducts,productNames}= this.state;
      //clothing tags
      //let clothingItems = data.filter(data => data.)
      //const counters = this.state.counters.filter(c => c.id !== counterId);

      if(!isLoaded){
         return <div> loading...</div>;
      }
      else{
        // console.log(clothingProducts);
         return(
           {/*<div>
            {data.map( (data,index) => (
               <ProductCard key={index} name = {data.productName} price = {data.productPrice} description = {data.descriptionText} picture= {data.picture} />
               
            ))}
            </div>
            */},
            <div>
             <div className="SearchBoxContainer">
               <SearchResults productNames ={productNames} tags = {tags}/>
             </div>
             <div> 
               <Carousel data = {clothingProducts} category ="Clothing Products" /> 
             </div>
             <div> 
               <Carousel data = {homeProducts} category ="Home Products" /> 
             </div>
             <div> 
               <Carousel data = {electronicProducts} category = "Electronic Products" /> 
             </div>
            </div>
           
            
            
         );

      }
   }
}

export default LandingPage;