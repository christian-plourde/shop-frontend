import React, { Component } from 'react';
import ProductCard from "./productCard";
import "../styles/searchResults.css";
const SearchResults = ({match,location}) => {

   let products = location.query;
   
   let searchElement = location.element;
   console.log(searchElement);
   let elementsToDisplay=[];
   for(var x in products){
      if(products[x].productName.toLowerCase() == searchElement.toLowerCase()){
         elementsToDisplay.push(products[x]);
      }
      else{
         for(var y in products[x].tags){
            
            if(products[x].tags[y].toLowerCase() == searchElement.toLowerCase()){
            elementsToDisplay.push(products[x]);
            console.log(products[x]);
            }
         }
      }
   }
   return(
      <div className="ResultsDisplay">
      <h2 className="TitleResults">Search results related to {searchElement}</h2>
      {elementsToDisplay.map((data,index) =>(
        <ul className="ResultsList">
         <li className="ResultsList-inner">
            <ProductCard  key={index} name = {data.productName} price = {data.productPrice} description = {data.descriptionText} picture= {data.picture}/>
         </li>
        </ul> 
      ))}
      </div>
   )
}

export default SearchResults;