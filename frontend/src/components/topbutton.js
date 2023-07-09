import React from 'react';
import { ReactComponent as TopButtonIcon } from '../icons/topbutton.svg';
import './topbutton.css';

export default function TopButton({
    scrollTo,
    goToSectionRef,
    showButton,
}) {
    return (
        <div>
        {showButton && (
            <button onClick={() => scrollTo(goToSectionRef)} className='topbutton'>
                <TopButtonIcon className='custom-topbutton' />
            </button>
        )}
        </div>
    );
}