import React from 'react';
import { ReactComponent as GitIcon } from '../icons/github.svg';
import './githublogo.css';

const GitHubIcon = () => {
    return (
        <div>
            <GitIcon className='custom-github' />
        </div>
    );
}

export default GitHubIcon;