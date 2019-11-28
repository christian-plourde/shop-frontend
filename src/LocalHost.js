/*
  This variable is being imported in whichever files require a link switch from local to heroku. On local testing (on localhost), set to true, and on submission, set to false.
*/
const localhost = false;
/*
  Usage example (LandingPage.js):
  import localhost from './Localhost.js';

//Notice for localhost == true, the site variable is set to "http://localhost:3000/Products.json" - the ideology here is "if I'm working on local, give me the local version of the file I need."

  var site = (localhost) ?
    "http://localhost:3000/Products.json"
    : "https://shop-354.herokuapp.com/Products.json";
  fetch(site, {
      ...
    })
*/

export default localhost;
