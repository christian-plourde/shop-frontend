
import React, {Component} from 'react';
import "./styles/LandingPage.css";
import ProductCard from "./components/productCard";
import Carousel from "./components/carousel"

class LandingPage extends Component {
   constructor(props){
      super(props);
      
      this.state = {
         isLoaded:false,
         data: [],
         tags:[],
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
        for(var j in jsonArray)
            tagsArray.push(jsonArray[j].tags);

         //console.log(tagsArray);

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
              tags:tagsArray
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
   render(){
      const {isLoaded,data,tags,clothingProducts,homeProducts,electronicProducts}= this.state;
      
      
      
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
             <div> 
               <Carousel data = {clothingProducts} category ="Clothing Products" /> 
             </div>
             <div> 
               <Carousel data = {data} category ="Home Products" /> 
             </div>
             <div> 
               <Carousel data = {data} category = "Electronic Products" /> 
             </div>
            </div>
           
            
            
         );

      }
   }
}

export default LandingPage;