import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="pt-4 pb-3">
    <div className="container">
      <div className="row">

        
        <div className="col-md-4 mb-3">
          <h5>Marine Mart</h5>
          <p>MarineMart is your one-stop shop for all supplies and accessories. We bring quality products at competitive prices with reliable shipping.</p>
        </div>

       
        <div className="col-md-4 mb-3">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to=""><li>Products</li></Link>
            <Link to="/cart"><li>Cart</li></Link>
            <Link to=""><li>Contact Us</li></Link>
            
          </ul>
        </div>

        
        <div className="col-md-4 mb-3">
          <h5>Contact</h5>
          <p>Email: support@marinemart.com</p>
          <p>Phone: +94 77 123 4567</p>
          <p>Address: Colombo, Sri Lanka</p>
        </div>

      </div>

      <div className="text-center pt-3 mt-3 footer-bottom">
        <p className="mb-0">© 2025 Marine Mart. All rights reserved.</p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
