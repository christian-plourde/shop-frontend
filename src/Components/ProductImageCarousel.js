import React, {Component} from 'react'
import ControlArrow from './ProductImageButtons.js'
import ImageSlider from './ProductImageSlider.js'
import '../styles/ProductImageButtons.css'

class ProductImageCarousel extends React.Component{ //accept an array of image urls of any size as props
    constructor(props){
        super(props)
        this.state = {
            currentImageIndex:0,
            imageUrl:[]
        }
        this.previousSlide = this.previousSlide.bind(this)
        this.nextSlide = this.nextSlide.bind(this)
    }

    componentDidMount(){
        this.setState({imageUrl: this.props.url})
    }

    previousSlide(){ //modulo operation to decrement current image's index, can loop from index 0 to max index
        let totalImage= this.state.imageUrl.length
        let prevImageIndex = (this.state.currentImageIndex + totalImage - 1) % totalImage
        this.setState({currentImageIndex: prevImageIndex})
    }

    nextSlide(){ //modulo operation to increment current image's index, can loop from max index to index 0
        let nextImageIndex = (this.state.currentImageIndex + 1) % this.state.imageUrl.length
        this.setState({currentImageIndex: nextImageIndex})
    }

    render(){
        let currentImage = this.state.imageUrl[this.state.currentImageIndex]
        //console.log(this.state.imageUrl)
        return(
            <div>
                <div className='carousel'>
                    <ControlArrow direction='left' clickHandler={this.previousSlide}/>
                    <ImageSlider url={currentImage}/>
                    <ControlArrow direction='right' clickHandler={this.nextSlide}/>
                </div>
                <p>
                    {
                        //this.state.currentImageIndex
                    }
                </p>
            </div>
        )
    }
}

export default ProductImageCarousel
