import React from 'react';
import { ReactComponent as TopButtonIcon } from '../icons/topbutton.svg';
import './topbutton.css';
import { useEffect, useState } from 'react';

const TopButton = () => {

    const [topButton, setTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY) {
                setTopButton(true)
            }
            else {
                setTopButton(false)
            }
        })
    }, [])

    const scrollToTop = () => {
        const topSection =  document.querySelector('.one');
        if (topSection) {
            window.scrollTo({
                top: topSection.offsetTop,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div>
        {topButton && (
            <button onClick={scrollToTop} className='topbutton'>
                <TopButtonIcon className='custom-topbutton' />
            </button>
        )}
        </div>
    );
}

export default TopButton;