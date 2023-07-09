import React from 'react';
import { ReactComponent as SectionButtonIcon } from '../icons/sectionbutton.svg';
import './sectionbutton.css';

export default function SectionButton({
    scrollTo,
    goToSectionRef,
    showArrow,
}) {
    return (
        <div>
        {showArrow && (
            <button onClick={() => scrollTo(goToSectionRef)} className='sectionbutton'>
                <SectionButtonIcon className='custom-sectionbutton' />
            </button>
        )}
        </div>
    );
}