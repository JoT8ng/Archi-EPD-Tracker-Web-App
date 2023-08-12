import React from 'react';
import { NavLink } from 'react-router-dom';
import './lowbar.css';
import { BsGithub, BsLinkedin } from "react-icons/bs";

const Lowbar = () => {
    return(
        <nav className='lowbar'>
            <div className='logo-container'>
                <NavLink exact to='/' className='bottomlogo'>
                    <span className='bottomlogo-text'>EPData.</span>
                </NavLink>
                <p>&#169 2023 Jocelyn Tang. All Rights Reserved</p>
            </div>
            <div className='links-container'>
                <ul className='low-list'>
                    <NavLink exact to='/' className='low-text'>Home</NavLink>
                    <NavLink to='/tracker' className='low-text'>Tracker</NavLink>
                    <NavLink to='/contact' className='low-text'>Contact</NavLink>
                </ul>
            </div>
            <div className='contact-container'>
                <h1>Contact</h1>
                <p className='text'>
                    This web app is an ongoing  project by Jocelyn Tang. Feel free to give feedback by contacting me 
                    on LinkedIn or filling out an issue on Github.
                </p>
                <NavLink to='https://github.com/JoT8ng/Archi-EPD-Tracker-Web-App' className='github'>
                    <BsGithub />
                </NavLink>
                <BsLinkedin />
            </div>
        </nav>
    );
}

export default Lowbar;