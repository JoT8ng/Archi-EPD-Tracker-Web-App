import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    return(
        <nav className='navbar'>
            <NavLink exact to='/' className='logo'>
                <span className='logo-text'>EPD<span style={{ fontStyle: 'normal', fontWeight: '400' }}>ata</span>.</span>
            </NavLink>
            <ul className='nav-list'>
                <li>
                    <NavLink to='/' className='nav-text' activeClassName='active'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/tracker' className='nav-text' activeClassName='active'>Tracker</NavLink>
                </li>
                <li>
                    <NavLink to='/contact' className='nav-text' activeClassName='active'>Contact</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;