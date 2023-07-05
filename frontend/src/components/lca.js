import React from 'react';
import { ReactComponent as LCADiagramIcon } from '../icons/LCA-04.svg';
import './lca.css';

const LCAIcon = () => {
    return (
        <div>
            <LCADiagramIcon className='custom-lca' />
        </div>
    );
}

export default LCAIcon;