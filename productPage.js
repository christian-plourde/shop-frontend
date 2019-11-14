import React, {Component} from 'react'
import '../styles/productPage.css'



class ProductPage extends React.Component{

    constructor(){
        super()
        this.state={
            product:{}
        }
    }

    render(){
        return(
            <div class="container"> 
                <h1>title</h1>
                <div class="rating"> product rating</div>
                <div class="inner_container"> 
                    <div id="photo">
                        photo carousel
                    </div>
                    <div id="text">
                        description text
                    </div>
                    <div id="purchase">
                        purchase box
                    </div>
                </div>
                <div id="comments"> 
                    comments
                </div>
            </div>
        )

    }
}

    
    // constructor(){
    //     super()
    //     this.state ={
    //         loading: false,
    //         products:{},
    //         product: {}
    //     }
    // }

    // componentDidMount(){
    //     console.log('1')
    //     fetch("https://shop-354.herokuapp.com/Products.json")
    //     console.log('2')
    //     .then(response => response.json()) //it seems you have to follow the covention of response and data strictly
    //     console.log('3')
    //     .then(data => {
    //         console.log('4')
    //         this.setState({
    //             products: data
    //          })
    //     })
    // }

    // render(){
    //     return(
    //         <div>
    //             <p>wow</p>
    //             <p>{this.state.products[1].productName}</p>
    //         </div>
    //     )
    // }
    // constructor() {
    //     super()
    //     this.state = {
    //         loading: false,
    //         character: {}
    //     }
    // }
    
//     componentDidMount() {
//         this.setState({loading: true})
//         fetch("https://swapi.co/api/people/1")
//             .then(response => response.json())
//             .then(data => {
//                 this.setState({
//                     loading: false,
//                     character: data
//                 })
//             })
//     }
    
//     render() {
//         const text = this.state.loading ? "loading..." : 'wow'
//         return (
//             <div>
//                 <p>{text}</p>
//             </div>
//         )
//     }
// }

export default ProductPage