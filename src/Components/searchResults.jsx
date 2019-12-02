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

function sort_list_least_to_greatest(some_list){
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

function sort_list_greatest_to_least(some_list){
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
   const pricesort = (searchElement == 'Least to Most Expensive'
                      || searchElement == 'Most to Least Expensive');

   // console.log('Products:', products, '\nsearch element:', searchElement);
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
     // console.log('Product dictionary', product_dict);
     // console.log('Product names', PRODUCT_NAMES);
     // var SORTED_NAMES = sort_list_least_to_greatest(PRODUCT_NAMES);
     var SORTED_NAMES = (searchElement == 'A - Z') ? sort_list_least_to_greatest(PRODUCT_NAMES) :
     sort_list_greatest_to_least(PRODUCT_NAMES);
     console.log('Sorted names', SORTED_NAMES);
     // Now for everybody in this dictionary, find the one with the next alphabetical name
     for (var index = 0; index < SORTED_NAMES.length; index++)
     {
       // console.log('Pushing product_dict[', SORTED_NAMES[index], ']:', product_dict[SORTED_NAMES[index]], ' to things to display');
       elementsToDisplay.push(product_dict[SORTED_NAMES[index]]);
     }
     // console.log('AFTER SORT', elementsToDisplay);
   }
   else if (pricesort) {
     //Fill a dictionary with product prices => products
     //Problem: some items may have the same price. No problem, we'll use lists at each dictionary value. The result is if some products share a price, they join a queue.
     var product_dict = {};
     var PRODUCT_PRICES = [];
     var message_string = (searchElement == "Least to Most Expensive") ? "Least to Most Expensive" : "Least to Most Expensive";
     console.log(message_string, " detected");
     for (var i = 0; i < products.length; i++){
       //If there is no list at that key, create an empty list
       if (!product_dict[products[i].productPrice])
       {
         product_dict[products[i].productPrice] = [];
       }
       //Add this product to that list, at that key
       product_dict[products[i].productPrice].push(products[i]);
       PRODUCT_PRICES.push(products[i].productPrice);
     }
     // console.log('Product dictionary', product_dict);
     // console.log('Product prices', PRODUCT_PRICES);
     // var SORTED_NAMES = sort_list_least_to_greatest(PRODUCT_NAMES);
     var SORTED_PRICES = (searchElement == 'Least to Most Expensive') ? sort_list_least_to_greatest(PRODUCT_PRICES) :
     sort_list_greatest_to_least(PRODUCT_PRICES);
     // console.log('Sorted prices', SORTED_PRICES);
     //The thing about products sharing a price is it doesn't matter which of them is "first".
     for (var index = 0; index < SORTED_PRICES.length; index++)
     {
       //Show me the product at the head of the price list in the dictionary
       const product = product_dict[SORTED_PRICES[index]][0];
       // console.log(product)
       //This product is next in line to be displayed
       elementsToDisplay.push(product);
       //Remove this product from the product dictionary, so if there's another product who shares the price, they can go next.
       product_dict[SORTED_PRICES[index]].shift()
     }
     // console.log('AFTER SORT', elementsToDisplay);
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
