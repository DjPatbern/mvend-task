import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
     
      <div className="not-found">
      
        <div>
        
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          <Link to="/" className="link-home">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
