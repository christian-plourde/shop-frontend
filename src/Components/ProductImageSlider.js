import React from 'react'
import '../styles/ProductImageButtons.css'

function ProductImageSlider(props){
    const styling={
        display:'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%'

    }
    return(
        <img src={props.url} style={styling} className="image-slide"/>
    )
}

export default ProductImageSlider