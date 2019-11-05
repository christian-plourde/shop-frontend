import React, { Component } from 'react';
import "../styles/slick.css"
import "../styles/slick-theme.css"
import Slider from "react-slick";
import "../styles/carousel.css"
import ProductCard from "./productCard"

class Carousel extends Component{
  constructor(props){
    super(props);
    
    this.state = {
       data : [],
       isLoaded : false
    };
  }
    componentDidMount(){
      this.setState({
        isLoaded:true,
        data: this.props.data
        
     })
    }

   render(){
      const settings = {
        dots: false,
        autoplay: false,
        arrows: true,
        infinite: false,
        speed: 200,
        cssEase: "linear",
        slidesToShow: 3,
        slidesToScroll: 1,
        className: 'slides'
      }
      const{isLoaded,data} = this.state;
      if(!isLoaded){
        return <div> loading...</div>;
     }
     else{
      // console.log(data);
      return(
         <div className="carousel-wrapper">
        <h2> {this.props.category}</h2>
        <Slider {...settings}>
          {this.props.data.map((data,index) =>(
          
            <ProductCard  key={index} name = {data.productName} price = {data.productPrice} description = {data.descriptionText} picture= {data.picture}/>
          
          ))}
         {/* <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>
          <div>
            <h3>9</h3>
          </div>
          [<div>
            <h3>10</h3>
          </div>
          <div>
            <h3>11</h3>
          </div>*/}
        </Slider>
      </div>
    );
    }
   }
}
export default Carousel;