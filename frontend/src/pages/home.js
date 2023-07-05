import React from 'react';
import './home.css';
import ObjectivityIcon from '../components/ObjectivityIcon';
import GreenProjectsIcon from '../components/greenprojects';
import ResManufacturerIcon from '../components/resmanufacturer';
import LCAIcon from '../components/lca';

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
                <ObjectivityIcon />
                <GreenProjectsIcon />
                <ResManufacturerIcon />
                <h3>Objectivity, Credibility, Transparency</h3>
                <h4>Contributing to sustainable building design</h4>
                <h5>Strengthens market positions of responsible manufacturers</h5>
            </section>
            <section className='three'>
                <h1>LCA- Life Cycle Assessment What are the life-cycle stages?</h1>
                <p>LCA is a scientific methodology used to quantify the environmental impacts of the different life stages 
                    of a process or product.<br />
                    <br />
                    A1 - Raw Material Supply<br />
                    A2 - Transport<br />
                    A3 - Manufacturing<br />
                    A4 - Transport from the gate to the site<br />
                    A5 - Assembly<br />
                    B1 - Use<br />
                    B2 - Maintenance<br />
                    B3 - Repair<br />
                    B4 - Replacement<br />
                    B5 - Refurbishment<br />
                    B6 - Operational Energy Use<br />
                    B7 - Operational Water Use<br />
                    C1 - Deconstruction Demolition<br />
                    C2 - Transport<br />
                    C3 - Waste Processing<br />
                    C4 - Disposal<br />
                    D - Reuse, Recover, Recycling Potential<br />
                </p>
                <LCAIcon />
            </section>
            <section className='four'>
                <p>
                Input EPD data and create <span style={{ color: '#D47416' }}>tables and graphs</span> to keep  
                <span style={{ color: '#D47416' }}> track, compare, and visualize</span> the embodied carbon emissions 
                of different construction materials.
                <br />
                <br />
                Download the visualized data into <span style={{ color: '#D47416' }}>csv or pdf formats</span>. 
                Integrate the data with <span style={{ color: '#D47416' }}>Revit</span>.
                </p>
            </section>
        </div>
    );
}

export default Home;