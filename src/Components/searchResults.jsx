import React, { Component } from 'react';
import "../styles/searchResults.css";

class SearchResults extends Component {
   constructor(){
      super();
      this.state = {
         suggestions:[],
         text:'',
         productNames:[],
         isLoaded:false
      }
   }
   componentDidMount(){
      this.setState({
        isLoaded:true,
     })
   }
   onTextChanged = (e) =>{
      const value = e.target.value;
      let suggestions = [];
      if(value.length >0){
         const regex = new RegExp(`^${value}`,'i');
         let tags = [];
         let isAlreadyInArray=false;
         for(var x in this.props.tags){
            for(var y in this.props.tags[x]){
               if(regex.test(this.props.tags[x][y])){
                  for(var i in tags){
                     if(this.props.tags[x][y] === tags[i]){isAlreadyInArray=true;}     
                  }
                  if(!isAlreadyInArray){tags.push(this.props.tags[x][y])};
                  isAlreadyInArray=false;
               }
            }
         }
         suggestions = this.props.productNames.filter(v=>regex.test(v)).concat(tags);

      }
      this.setState(() => ({suggestions,text:value}));
   }
   suggestionSelected(value){
      this.setState(() => ({
         text:value,
         suggestions:[],
      }))
   }
   renderSuggestions () {
      const{suggestions} = this.state;
      if(suggestions.length === 0){
         return null;
      }
      return (
         <ul>
            {suggestions.map((item)=> <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
         </ul>
      );
   }
   render(){
      const{isLoaded,text}= this.state;
      if(!isLoaded){
         return <div> loading...</div>;
      }
      else{
      return(
         <div className = "Results">
            <input value={text} onChange={this.onTextChanged} type="text" placeholder="Search ..." />
            {this.renderSuggestions()}
         </div>
      )
      }
   }
}
export default SearchResults;