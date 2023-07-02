import React from 'react';
import './home.css';

const Home = () => {
    return (
        <div className='container'>
            <section className='one'>
                <p>
                    The <span style={{ color: '#D47416' }}>Archi EPD Tracker</span> is a free web tool that allows architects 
                    and other construction professionals to track and visualize <span style={{ color: '#D47416' }}>embodied 
                    carbon emissions</span> of various construction material options
                </p>
            </section>
            <section className='two'>
                <h1>What are EPDs?</h1>
                <p>
                    EPD stands for Environmental Product Declaration. An EPD is a formal document that contains information 
                    of the environmental impact and performance of a product. Some of this information includes: the carbon 
                    footprint of the product throughout its life-cycle stages &#40;manufacturing, assembly, use, end of life 
                    etc.&#41; EPDs should conform to international standards and are used to demonstrate compliance. They 
                    can be used to earn credits for certifications like BREEAM and LEED etc
                </p>
                <h2>What benefits do EPDs offer?</h2>
            </section>
        </div>
    );
}

export default Home;