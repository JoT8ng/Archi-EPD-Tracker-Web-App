import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className='navbar'>
            <Link to='/' className='logo'>
                <span className='logo-text'>the Archi EPD Tracker</span>
            </Link>
            <ul>
                <li>
                    <Link to='/' className='nav-text'>Home</Link>
                </li>
                <li>
                    <Link to='/tracker' className='nav-text'>Tracker</Link>
                </li>
                <li>
                    <Link to='/contact' className='nav-text'>Contact</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;