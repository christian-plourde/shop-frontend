import React, { Component } from "react";
import "../styles/Cart.css";
import CartItem from "./CartItem";

class ProductList extends Component {
  state = {
    products: [
      {
        name: "Water",
        id: 2,
        brand: "Evian",
        price: 50,
        description: "Water for rich ass mofos"
      },
      {
        name: "Chips",
        id: 1,
        brand: "Kettle",
        price: 5,
        description: "chips n shit"
      }
    ]
  };

  handleRemove = productID => {
    let product = this.state.products;
    product = product.filter(x => {
      return x.id !== productID;
    });

    this.setState({ products: product });
  };

  render() {
    return (
      <div>
        {this.state.products.map(x => {
          return (
            <CartItem
              product={this.state.products} //this is redundant maybe remove it
              id={x.id}
              name={x.name}
              description={x.description}
              price={x.price}
              brand={x.brand}
              onRemove={this.handleRemove}
            />
          );
        })}
      </div>
    );
  }
}
export default ProductList;
