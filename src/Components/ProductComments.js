import React, {Component} from 'react'

class ProductComments extends React.Component{
    constructor(props){
        super(props)
        this.state={
            rating:'',
            comment:''
        }
        this.formHandler = this.formHandler.bind(this)
    }

    formHandler(event){
        const {name, value} = event.target
        this.setState({[name]:value})
    }

    submitHandler(event){
        alert('Review Submitted!')
        var data = {
            "rating": this.state.username,
            "comment": this.state.comment,
            "pid": this.props.product_id,
            "rid": sessionStorage.getItem("logged_in_user")
         }

         //`http://localhost/shop-frontend/shop-backend/php/reviews.php`
         //`https://shop-354.herokuapp.com/reviews.php`
         
         fetch("http://localhost/shop-frontend/shop-backend/php/reviews.php", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body:  JSON.stringify(data)
         })
         .then(function(response){ 
          return response.json();   
         })
         .then(function(data){ 
         console.log(data)
         });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.submitHandler}> 
                    <label>
                        {//<input name='file' type='file' value='Upload Photo'/>
                        }

                    </label>
                    <br/>
                    <label>
                        Please select a rating:
                        <input type='radio' name='rating' value='1' checked={this.state.rating == '1'} onChange={this.formHandler}/>
                        <input type='radio' name='rating' value='2' checked={this.state.rating == '2'} onChange={this.formHandler}/>
                        <input type='radio' name='rating' value='3' checked={this.state.rating == '3'} onChange={this.formHandler}/>
                        <input type='radio' name='rating' value='4' checked={this.state.rating == '4'} onChange={this.formHandler}/>
                        <input type='radio' name='rating' value='5' checked={this.state.rating == '5'} onChange={this.formHandler}/>
                    </label>
                    <br/>
                    <label>
                        <textarea name='comment' value={this.state.comment} placeholder='Please Enter Your Review' onChange={this.formHandler} rows='15' cols='30'/>
                    </label>
                    <br/>
                    <button>
                        submit review
                    </button>
                </form>
            </div>
        )
    }
}

export default ProductComments