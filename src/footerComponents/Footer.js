import React from "react";
import "./Footer.css";

function Footer() {
    return (

        <div className="footer">

            {/* Footer Content  */}
            <div className="footer-content">

                {/* Brand Section */}
                <div className="footer-section brand">
                    <h3 id="brandHeader"> <i id="mainBrandLogo" class="fas fa-spa"></i> BRANDTITLE </h3>
                    <p>  Bacon ipsum dolor amet brisket strip steak chislic frankfurter bresaola, corned beef shank doner alcatra pork belly shoulder. Brisket jowl spare ribs, drumstick bacon chislic meatloaf. Alcatra prosciutto bacon jowl chuck. Pork loin rump tri-tip pig sirloin, andouille frankfurter picanha meatloaf. Short ribs brisket spare ribs leberkas, alcatra corned beef t-bone kevin.  </p>
                </div>

                {/* QuickLinks Section */}
                <div className="footer-section quickLinks">
                    <h3 id="quickLinksHeader"> QUICK LINKS </h3>
                    <ul>
                        <a href="#"> <li> Home </li> </a>
                        <a href="#"> <li> Buy </li> </a>
                        <a href="#"> <li> Sell </li> </a>
                        <a href="#"> <li> Return Product </li> </a>
                        <a href="#"> <li> Terms & Conditions </li> </a>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="footer-section contact">
                    <h3 id="contactHeader">  CONTACT US </h3>
                    <div className="contactInfo"> <i id="email" class="far fa-envelope"></i>   project354@gmail.com </div>
                    <div className="contactInfo"> <i id="phone" class="fas fa-phone-square"></i> +1 438 938 8923 </div>
                    <div className="contactInfo"> <i id="address" class="fas fa-address-card"></i> 705 Saint-Catherine St W, Montreal, Quebec H3B 4G5 </div>
                    <div className="socials">
                        <a href="https://www.facebook.com/"> <i id="social" class="fab fa-facebook-square"></i> </a>
                        <a href="https://www.instagram.com/?hl=en"> <i id="social" class="fab fa-instagram"></i> </a>
                        <a href="https://ca.linkedin.com/"> <i id="social" class="fab fa-linkedin"></i> </a>
                        <a href="https://twitter.com/"> <i id="social" class="fab fa-twitter-square"></i> </a>
                    </div>
                </div>

            </div>

            {/* Footer Bottom Section */}
            <div className="footer-bottom">
                &copy; BrandTitle 2019
            </div>

        </div >
    );
}

export default Footer;