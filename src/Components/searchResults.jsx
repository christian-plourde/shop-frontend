import React, { Component } from 'react';
import ProductCard from "./productCard";
import Navbar from './Navbar.js';
import "../styles/searchResults.css";

/*
  Some things to clarify with respect to alphabetical sorting of products:
    - If two products are made up of names "aaa" and "aa", I will consider "aa" to come before "aaa"
    - No importance will be given to capitalization
    - After sorting out all letter products, I will return the numerically sorted products
*/

function sort_list_alphabeticallyAZ(some_list){
    for (var i = 0; i < some_list.length; i++)
    {
      for (var j = 0; j < some_list.length; j++)
      {
        if (i != j)
        {
          if (some_list[i] < some_list[j])
          {
            var tmp = some_list[i];
            some_list[i] = some_list[j];
            some_list[j] = tmp;
          }
        }
      }
    }
    return some_list
}

function sort_list_alphabeticallyZA(some_list){
    for (var i = 0; i < some_list.length; i++)
    {
      for (var j = 0; j < some_list.length; j++)
      {
        if (i != j)
        {
          if (some_list[i] > some_list[j])
          {
            var tmp = some_list[i];
            some_list[i] = some_list[j];
            some_list[j] = tmp;
          }
        }
      }
    }
    return some_list
}

const SearchResults = ({match,location}) => {

   let products = location.query;
   let searchElement = location.element;
   let elementsToDisplay=[];

   const alphabeticalsort = (searchElement == 'A - Z' || searchElement == 'Z - A');

   console.log('Products:', products, '\nsearch element:', searchElement);
   if (alphabeticalsort)
   {
     //Fill a dictionary with product names as keys => products
     var product_dict = {};
     var PRODUCT_NAMES = [];
     var message_string = (searchElement == 'A - Z') ? "A to Z" : "Z to A";
     console.log(message_string, ' detected');
     for (var i = 0; i < products.length; i++){
       // console.log(products[i]);
       product_dict[products[i].productName.toLowerCase()] = products[i];
       PRODUCT_NAMES.push(products[i].productName.toLowerCase());
     }
     console.log('Product dictionary', product_dict);
     console.log('Product names', PRODUCT_NAMES);
     // var SORTED_NAMES = sort_list_alphabeticallyAZ(PRODUCT_NAMES);
     var SORTED_NAMES = (searchElement == 'A - Z') ? sort_list_alphabeticallyAZ(PRODUCT_NAMES) :
     sort_list_alphabeticallyZA(PRODUCT_NAMES);
     console.log('Sorted names', SORTED_NAMES);
     // Now for everybody in this dictionary, find the one with the next alphabetical name
     for (var index = 0; index < SORTED_NAMES.length; index++)
     {
       // console.log('Pushing product_dict[', SORTED_NAMES[index], ']:', product_dict[SORTED_NAMES[index]], ' to things to display');
       elementsToDisplay.push(product_dict[SORTED_NAMES[index]]);
     }
     console.log('AFTER SORT', elementsToDisplay);
     // return;
   }
   else
   {
     for(var x in products){
        if(products[x].productName.toLowerCase() == searchElement.toLowerCase()){
           elementsToDisplay.push(products[x]);
        }
        else{
           for(var y in products[x].tags){

              if(products[x].tags[y].toLowerCase() == searchElement.toLowerCase()){
              elementsToDisplay.push(products[x]);
              // console.log(products[x]);
              }
           }
        }
     }
   }

   return(
      <div>
        <Navbar />
        <div className="ResultsDisplay">
        <h2 className="TitleResults">Search results related to {searchElement}</h2>
        {elementsToDisplay.map((data,index) =>(
          <ul className="ResultsList">
           <li className="ResultsList-inner">
              <ProductCard  key={index} name = {data.productName} price = {data.productPrice} description = {data.descriptionText} picture= {data.picture} id={data.productID}/>
           </li>
          </ul>
        ))}
        </div>
      </div>
   )
}

export default SearchResults;
