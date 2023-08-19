import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <nav className='navbar'>
            <NavLink exact to='/' className='logo'>
                <span className='logo-text'>EPD<span style={{ fontStyle: 'normal', fontWeight: '400' }}>ata</span>.</span>
            </NavLink>
            <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
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