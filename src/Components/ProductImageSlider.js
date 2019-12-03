import React from 'react'
import '../styles/ProductImageButtons.css'

function ProductImageSlider(props){ //re-render as url passed from the productImageCarousel is changed
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