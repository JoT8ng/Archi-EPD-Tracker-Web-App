import React from 'react';
import './home.css';
import mediaimg from '../media/MediaTest.png';
import table from '../media/TableShot1.png';
import Showchart from '../components/showchart';

const Home = () => {

    return (
        <div className='container'>
            <section className='one'>
                <img src={mediaimg} alt='mediaimg' className='mediaimg' />
                <div>
                    <h1 className='EPData'>EPD<span style={{ fontStyle: 'normal', fontWeight: '400' }}>ata</span>.</h1>
                    <p>
                        Track compare, and visualize <span style={{ color: '#D47416' }}>embodied 
                        carbon emissions</span> of construction materials
                    </p>
                </div>
            </section>
            <section className='two'>
                <p>
                    Create <span style={{ color: '#D47416' }}>tables and graphs</span>
                </p>
                <div className='twomedia'>
                    <div>
                        <img src={table} alt='tableimg' className='tableimg' />
                        <div>
                            <Showchart />
                        </div>
                    </div>
                </div>
            </section>
            <section className='three'>
                <div className='three-text'>
                    <h1>What are EPDs?</h1>
                    <p>
                        EPD stands for Environmental Product Declaration. An EPD is a formal document that contains information 
                        of the environmental impact and performance of a product. Some of this information includes: the carbon 
                        footprint of the product throughout its life-cycle stages &#40;manufacturing, assembly, use, end of life 
                        etc.&#41; EPDs should conform to international standards and are used to demonstrate compliance. They 
                        can be used to earn credits for certifications like BREEAM and LEED etc
                    </p>
                    <h1>What benefits do EPDs offer?</h1>
                    <div className='benefits'>
                        <div className='benefits-box'>
                            <h3>Objectivity, Credibility, Transparency</h3>
                        </div>
                        <div className='benefits-box'>
                            <h3>Contributing to sustainable building design</h3>
                        </div>
                        <div className='benefits-box'>
                            <h3>Strengthens market positions of responsible manufacturers</h3>
                        </div>
                    </div>
                    <h1>LCA- Life Cycle Assessment What are the life-cycle stages?</h1>
                    <div className='lca-box'>
                        <p>
                            LCA is a scientific methodology used to quantify the environmental impacts of the different life stages 
                            of a process or product.
                        </p>
                        <div className='construction-stages'>
                        <p>
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
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;