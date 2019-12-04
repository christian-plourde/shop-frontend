import React, { Component } from 'react'
import { Redirect } from "react-router";

class AddToCartButton extends React.Component { //adds product to cart once and redirect to cart page, because otherwise navbar doesn't synchronize
    constructor(props) {
        super(props)
        this.changeHandler = this.changeHandler.bind(this)
        this.state = {
            redirect: false
        }
    }


    changeHandler() {
        let productToAdd = this.props.product
        productToAdd.cartQuantity = '1'
        let cart = localStorage.getItem('cart')

        if (cart == null) { //create cart item and set cart quanity as 1, if localStorage doesn't contain cart
            localStorage.setItem("cart", JSON.stringify(productToAdd))
            localStorage.setItem("cartQuantity", "1")
        }

        else {// update cart item and cart quantity if it exists
            let intCartQuantity = parseInt(localStorage.getItem("cartQuantity")) //update cart quantity
            //console.log(intCartQuantity)
            intCartQuantity += 1
            localStorage.setItem('cartQuantity', intCartQuantity.toString())

            let cartProductsJSON = cart.split('|') //parse local storage cart item into an array of JS objects
            //console.log(cartProductsJSON)
            let cartProducts = cartProductsJSON.map(productJSON => JSON.parse(productJSON) )
            //console.log(cartProducts)
            let alreadyInCart = false

            for (let product of cartProducts) { //if product already exists among them, increment product quantity
                if (product.productID == productToAdd.productID) {
                    product.cartQuantity = parseInt(product.cartQuantity) + 1
                    alreadyInCart = true
                    break
                }
            }

            if (!alreadyInCart) { //if product is not in cart, add product to it
                cartProducts.push(productToAdd)
            }

            let newCartProductsJSON = ''//turn array back into JSON

            cartProducts.map(product => 
                newCartProductsJSON = newCartProductsJSON + '|' + JSON.stringify(product)    
            )
            newCartProductsJSON = newCartProductsJSON.substring(1)
            //console.log(newCartProductsJSON)

            localStorage.setItem('cart', newCartProductsJSON)
        }

        this.setState({ redirect: true })

    }

    render() {
        if (localStorage.getItem("logged_in_user") == null)
            return (
                <br />
            )
        else {
            if (this.state.redirect == false)
                return (
                    <button onClick={this.changeHandler}>
                        Add to Cart
                </button>
                )
            else
                return (
                    <Redirect to={"/checkout"} />
                )

        }
    }

}

export default AddToCartButton