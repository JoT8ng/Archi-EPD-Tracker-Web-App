import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <nav className='navbar'>
            <NavLink to='/' className='logo'>
                <span className='logo-text'>EPD<span style={{ fontStyle: 'normal', fontWeight: '400' }}>ata</span>.</span>
            </NavLink>
            <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to='/' className='nav-text'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/tracker' className='nav-text'>Tracker</NavLink>
                </li>
                <li>
                    <NavLink to='/contact' className='nav-text'>Contact</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;