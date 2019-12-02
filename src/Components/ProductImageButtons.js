import React from 'react'
import '../styles/ProductImageButtons.css'

function ProductImageButtons(props){
    let arrow = (props.direction=="left")?'<':'>'
    return(
        <button
            className={`slide-arrow ${props.direction}`}
            onClick={props.clickHandler} //execute appropriate change handler from ProductImageCarousel.js
        >
            {arrow}
        </button>
    )
}

export default ProductImageButtons