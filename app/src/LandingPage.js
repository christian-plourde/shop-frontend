
import React, {Component} from 'react';
import "./styles/LandingPage.css";
import ProductCard from "./components/productCard";

class LandingPage extends Component {
   constructor(props){
      super(props);
      
      this.state = {
         isLoaded:false,
         data: []
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
         console.log(this.state.data)
         console.log(this.state.isLoaded)
      })
     // .then(data => this.setState({data}))
      //console.log(this.state.data)      
   }
   render(){
      const {isLoaded,data}= this.state;
      if(!isLoaded){
         return <div> loading...</div>;
      }
      else{
         return(
            <div>
            {data.map( (data,index) => (
               <ProductCard key={index} name = {data.productName} price = {data.productPrice} description = {data.descriptionText} picture= {data.picture} />
               
            ))}
            </div>
            
            
         );

      }
   }
}

export default LandingPage;