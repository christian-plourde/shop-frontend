import React, {Component} from "react";
import SubmitButton from "./SubmitButton.js";
import Header from "./Header.js";
import Navbar from "./Navbar.js";
import axios from 'axios';
import {Redirect} from "react-router";

class Registration extends Component
{
       state = 
       {
              username: "",
              email: "",
              password: "",
              firstName: "",
              lastName: "",
              address: "",
              Country: "",
              confirmed_password: "",
              password_mismatch: false,
              registration_failed: false,
              redirect: false
       }

       constructor(props)
       {
              super(props);
       }

       handleSubmit = (event) =>
       {
              event.preventDefault();


              if(this.state.password != this.state.confirmed_password)
              {
                     this.setState({password_mismatch: true});
                     return;
              }


              this.setState({password_mismatch: false});

              var encrypted_password = "";
              for(var i = 0; i < this.state.password.length; i++)
              {
                     encrypted_password += String.fromCharCode(this.state.password.charCodeAt(i) + 1);
              }

              const data = {username: this.state.username, 
                            password: encrypted_password,
                            email: this.state.email,
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            address: this.state.address,
                            Country: this.state.Country,
                            };


              {/*https://shop-354.herokuapp.com/registration.php*/}
              {/*http://localhost/www/shop-backend/php/registration.php*/}
              axios.post('https://shop-354.herokuapp.com/registration.php', JSON.stringify(data), {
              headers: {
                     'Content-Type': 'application/json',
              }
              })
              .then((response) => {
                     
                     if(response.data.Accepted)
                     {
                            this.setState({redirect: true})
                     }

                     else
                     {
                            this.setState({registration_failed: true});
                     }
                    
              });
       }

       handleInputChange = (e) =>
       {
              this.setState({[e.target.name]: e.target.value});
       }      

       render()
       {
       
       const style = 
       {
              height: "100px",
              color: "#333",
              textAlign: "center"
       };

       const inner_style = 
       {
              margin: "auto auto auto 40%",
              width: "20%",
              textAlign: 'left'
       };

       const input_style = 
       {
              width: "100%",
              fontSize: "20px",
              borderColor: "#333",
              padding: "8px",
              borderRadius: '10px'
       };

       const first_input_style = 
       {
              height: "100px",
              color: "#333",
              textAlign: "center",
              marginTop: "20px"
       };

       const error_div_style = 
       {
              margin: "15px auto 15px 40%",
              width: "20%",
              textAlign: 'center'
       };

       const error_mess_style = 
       {
              color: "#993232",
              textDecoration:'none',
              fontSize: '18px',
              fontWeight: 'bold'
       };

       return(
              <div>
              <Navbar />
              {/*should have first name box, last name box, username box, password box and address box*/}
              <form onSubmit={this.handleSubmit}>
              <div style={first_input_style}>
                     <div style={inner_style}>
                            <h2>First Name</h2>
                            <input name="firstName" onChange={this.handleInputChange} style={input_style} placeholder="First Name" required/>
                     </div>
              </div>
              <div style={style}>
                     <div style={inner_style}>
                            <h2>Last Name</h2>
                            <input name="lastName" onChange={this.handleInputChange} style={input_style} placeholder="Last Name" required/>
                     </div>
              </div>
              <div style={style}>
                     <div style={inner_style}>
                            <h2>Address</h2>
                            <input name="address" onChange={this.handleInputChange} style={input_style} placeholder="Address" required/>
                     </div>
              </div>
              <div style={style}>
                     <div style={inner_style}>
                            <h2>Country</h2>
                            <input name="Country" onChange={this.handleInputChange} style={input_style} placeholder="Country" required/>
                     </div>
              </div>
              <div style={style}>
                     <div style={inner_style}>
                            <h2>Email</h2>
                            <input name="email" onChange={this.handleInputChange} style={input_style} placeholder="Email" required/>
                     </div>
              </div>
              <div style={style}>
                     <div style={inner_style}>
                            <h2>Username</h2>
                            <input name="username" onChange={this.handleInputChange} style={input_style} placeholder="Username" required/>
                     </div>
              </div>
              <div style={style}>
                     <div style={inner_style}>
                            <h2>Password</h2>
                            <input name="password" onChange={this.handleInputChange} style={input_style} placeholder="Password" type="password" required/>
                     </div>
              </div>
              <div style={style}>
                     <div style={inner_style}>
                            <h2>Confirm Password</h2>
                            <input name="confirmed_password" onChange={this.handleInputChange} style={input_style} placeholder="Password" type="password" required/>
                     </div>
              </div>
              {this.state.password_mismatch && (
              <div style={error_div_style}>
                     <h2 style={error_mess_style}>The passwords do not match. Please try again.</h2>
              </div>
              )}
              {this.state.registration_failed && (
              <div style={error_div_style}>
                     <h2 style={error_mess_style}>Unable to register this user.</h2>
              </div>
              )}      
              <SubmitButton />
              </form>
              {this.state.redirect && (
                            <Redirect to={"/login"}/>
                            )}
              </div>
              );
       }
       
}

export default Registration;


              