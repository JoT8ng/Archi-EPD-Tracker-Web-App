import React from 'react';
import { NavLink } from 'react-router-dom';
import './lowbar.css';
import { BsGithub, BsLinkedin } from "react-icons/bs";

const Lowbar = () => {
    return(
        <nav className='lowbar'>
            <div className='logo-container'>
                <NavLink exact to='/' className='bottomlogo'>
                    <span className='bottomlogo-text'>EPD<span style={{ fontStyle: 'normal', fontWeight: '400' }}>ata</span>.</span>
                </NavLink>
                <p>&#169; 2023 EPData. All Rights Reserved</p>
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
                <div className='lowbar-icons'>
                    <NavLink to='https://github.com/JoT8ng/Archi-EPD-Tracker-Web-App'>
                        <BsGithub style={{width: '30px', height: '30px', color: 'rgb(208,241,241)'}} />
                    </NavLink>
                    <NavLink to='https://uk.linkedin.com/in/jocelyntang'>
                        <BsLinkedin style={{width: '50px', height: '50px', color: 'rgb(208,241,241)', paddingLeft: '25px'}} />
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Lowbar;