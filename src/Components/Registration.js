import React, {Component} from "react";
import SubmitButton from "./SubmitButton.js";
import Header from "./Header.js";

class Registration extends Component
{
       constructor(props)
       {
              super(props);
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
       }


       return(
              <div>
              <Header text="Register"/>
              {/*should have first name box, last name box, username box, password box and address box*/}
              <form name="registration" id="registration" method="post" action="">
              <div style = {style}>
                     <div style = {inner_style}>
                            <h2>First Name</h2>
                            <input name="first_name" id="first_name" style = {input_style} placeholder = "First Name" required/>
                     </div>
              </div>
              <div style = {style}>
                     <div style = {inner_style}>
                            <h2>Last Name</h2>
                            <input name="last_name" id="last_name" style = {input_style} placeholder = "Last Name" required/>
                     </div>
              </div>
              <div style = {style}>
                     <div style = {inner_style}>
                            <h2>Address</h2>
                            <input name="address" id="address" style = {input_style} placeholder = "Address" required/>
                     </div>
              </div>
              <div style = {style}>
                     <div style = {inner_style}>
                            <h2>Country</h2>
                            <input name="country" id="country" style = {input_style} placeholder = "Country" required/>
                     </div>
              </div>
              <div style = {style}>
                     <div style = {inner_style}>
                            <h2>Email</h2>
                            <input name="email" id="email" style = {input_style} placeholder = "Email" required/>
                     </div>
              </div>
              <div style = {style}>
                     <div style = {inner_style}>
                            <h2>Username</h2>
                            <input name="username" id="username" style = {input_style} placeholder = "Username" required/>
                     </div>
              </div>
              <div style = {style}>
                     <div style = {inner_style}>
                            <h2>Password</h2>
                            <input name="password" id="password" style = {input_style} placeholder = "Password" type="password" required/>
                     </div>
              </div>
              <div style = {style}>
                     <div style = {inner_style}>
                            <h2>Confirm Password</h2>
                            <input name="confirm_password" id="confirm_password" style = {input_style} placeholder = "Password" type="password" required/>
                     </div>
              </div>
              <SubmitButton />
              </form>
              </div>
              );
       }
       
}

export default Registration;


              