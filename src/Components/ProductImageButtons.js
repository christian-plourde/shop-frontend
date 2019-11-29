import React from 'react'
import '../styles/ProductImageButtons.css'

function ProductImageButtons(props){
    let arrow = (props.direction=="left")?'<':'>'
    return(
        <button
            className={`slide-arrow ${props.direction}`}
            onClick={props.clickHandler}
        >
            {arrow}
        </button>
    )
}

export default ProductImageButtons