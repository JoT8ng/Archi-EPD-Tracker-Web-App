import React from 'react';
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import './contact.css';

const Contact = () => {
    return (
        <div className='contact-page'>
            <div className='contactpage-container'>
                <h1 className='contact-title'>Contact</h1>
                <p className='contact-text'>
                    This web app is an ongoing  project by Jocelyn Tang. Feel free to give feedback by contacting me 
                    on LinkedIn or filling out an issue on Github.
                </p>
                <div className='socialmedia'>
                    <NavLink to='https://github.com/JoT8ng/Archi-EPD-Tracker-Web-App'>
                            <BsGithub style={{width: '30px', height: '30px', color: '#000000'}} />
                        </NavLink>
                    <NavLink to='https://www.linkedin.com/in/jocelyntang/'>
                            <BsLinkedin style={{width: '50px', height: '50px', color: '#000000', paddingLeft: '25px'}} />
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Contact;