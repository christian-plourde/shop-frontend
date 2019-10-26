import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import Form_demo from '../src/Components/Form-demo';

// ReactDOM.render(<App />, document.getElementById('root')); This would Render the app.js and app.css pages


const email_manager = {
  api: '../../shop-backend/mail.php',
  title: 'Contact Me',
  successMessage: 'Thank you for contacting me.',
  errorMessage: 'Sorry we have some problems.',
  fields:{
    firstName: '',
    lastName: '',
    email: '',
    msg: ''
  },
  fieldsConfig:  [
   { id: 1, label: 'First Name', fieldName: 'firstName', type: 'text',placeholder:'First Name', isRequired: true , shortName:'fname'},
   { id: 2, label: 'Last Name', fieldName: 'lastName', type: 'text', placeholder: 'Last Name', isRequired: true , shortName:'lname'},
   { id: 3, label: 'Email', fieldName: 'email', type: 'email', placeholder: 'Email Address', isRequired: true , shortName:'email'},
   { id: 4, label: 'Message', fieldName: 'msg', type: 'textarea',placeholder:'Placeholder Msg', isRequired: true , shortName:'msg'}
  ]
}
ReactDOM.render(<Form_demo config={email_manager} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
