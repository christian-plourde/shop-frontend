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
       isLoaded : false
    };
  }
    componentDidMount(){
      this.setState({
        isLoaded:true,
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
      const{isLoaded} = this.state;
      if(!isLoaded){
        return <div> loading...</div>;
     }
     else{
      return(
         <div className="carousel-wrapper">
        <h2 className="Category"> {this.props.category}</h2>
        <Slider {...settings}>
          {this.props.data.map((data,index) =>(

            // <ProductCard  key={index}
            //               name={data.productName}
            //               price={data.productPrice}
            //               description={data.descriptionText}
            //               picture= {data.picture}
            // />
            <ProductCard  key={index}
                          name={data.productName}
                          price={data.productPrice}
                          description={data.descriptionText}
                          picture= {data.picture}
                          id={data.productID}
                          updateQuantity={""/*() =>this.props.updateQuantity()*/}
            />

          ))}
        </Slider>
      </div>
    );
    }
   }
}
export default Carousel;
