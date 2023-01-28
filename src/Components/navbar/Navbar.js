import React from 'react';
import { Link } from 'react-router-dom';
import "../../Styles/Navbar.css";


const Navbar = () => {




    return (
        <div className='navbar'>
            <ul>
                <li><Link to="/"  className='link'> Home </Link></li>
                <li><Link to="/"  className='link'> About </Link></li>
                <li><Link to="/"  className='link' > Portfolio </Link></li>
                <li><Link to="/"  className='link' > Contact </Link></li>
                <li><Link to="/registration" className='link' >Registration</Link></li>
            </ul>
        </div>
    );
};

export default Navbar;