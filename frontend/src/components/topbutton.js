import React from 'react';
import { useEffect, useState } from 'react';
import { ReactComponent as TopButtonIcon } from '../icons/topbutton.svg';
import './topbutton.css';

function TopButton() {

    const [topButton, setTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                setTopButton(true)
            } else {
                setTopButton(false)
            }
        })
    },[])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div>
        {topButton && (
            <button onClick={scrollUp} className='topbutton'>
                <TopButtonIcon className='custom-topbutton' />
            </button>
        )}
        </div>
    );
}

export default TopButton;