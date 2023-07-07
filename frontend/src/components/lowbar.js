import React from 'react';
import { Link } from 'react-router-dom';
import './lowbar.css';
import GitHubIcon from './githublogo';

const Lowbar = () => {
    return(
        <nav className='lowbar'>
            <Link to='https://github.com/JoT8ng/Archi-EPD-Tracker-Web-App' className='github'>
                <GitHubIcon />
            </Link>
        </nav>
    );
}

export default Lowbar;