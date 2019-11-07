import React from "react";
import UsernameBox from "./UsernameBox.js";
import PasswordBox from "./PasswordBox.js";
import SubmitButton from "./SubmitButton.js";
import Link from "./Link.js";

function Login(props)
{
	var password_redirect_link = 
	{
		link: props.password_link,
		link_text: props.password_link_text
	};

	var register_redirect_link = 
	{
		link: props.register_link,
		link_text: props.register_link_text
	};

	return(
	<form action = "">
		<div>
		       <UsernameBox props = {props}/>
        	       <PasswordBox props = {props} />
        	       <SubmitButton />
        	       <Link redirect_link = {register_redirect_link}/>
                   <Link redirect_link = {password_redirect_link}/>
                </div>
        </form>
		);
}

export default Login;