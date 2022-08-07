import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = () => {

  const [id , setId] = useState();
  useEffect(() => {
    var jwt1 = localStorage.getItem('myToken');
    setId(jwt1);
  })

  const logoutUser = () => {
    localStorage.removeItem('myToken');
    window.location.href = '/review';
  }


    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <NavLink to="" className="navbar-brand">
                Popcorn
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink  to="/review" className="nav-link">Review</NavLink>
                  </li>
                  {id && 
                  <li className="nav-item">
                    <NavLink to="/liked-movies" className="nav-link" aria-current="page">Wishlist</NavLink>
                  </li>}
                  {id ? <li className="nav-item">
                      <NavLink to="#" className="nav-link" aria-current="page" onClick={logoutUser}>Log Out</NavLink>
                    </li> :
                  <li className="nav-item">
                    <NavLink to="/account" className="nav-link" aria-current="page">Account</NavLink>
                  </li>}
                </ul>
                </div>
        </div>
    </nav>
     );
}
 
export default Navbar;