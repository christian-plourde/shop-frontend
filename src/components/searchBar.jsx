import React, { Component } from 'react';
import "../styles/searchBar.css";

class SearchBar extends Component {
  
   render(){
      return(
         <div>
             <input className="SearchBox" type="text" placeholder="Search..." onChange={this.props.search}></input>
         </div>
      )
   }
}
export default SearchBar;