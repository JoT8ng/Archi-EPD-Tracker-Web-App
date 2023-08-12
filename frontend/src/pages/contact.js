import React from 'react';
import { BsGithub, BsLinkedin } from "react-icons/bs";

const Contact = () => {
    return (
        <div>
            <p>Contact</p>
            <p>
                This web app is an ongoing  project by Jocelyn Tang. Feel free to give feedback by contacting me 
                on LinkedIn or filling out an issue on Github.
            </p>
                <BsGithub />
            <BsLinkedin />
        </div>
    );
}

export default Contact;