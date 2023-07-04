import React from 'react';
import { ReactComponent as GreenProjects } from '../icons/GreenProjects-03.svg';
import './greenprojects.css';

const GreenProjectsIcon = () => {
    return (
        <div>
            <GreenProjects className='custom-green' />
        </div>
    );
}

export default GreenProjectsIcon;