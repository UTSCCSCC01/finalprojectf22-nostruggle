import React from 'react';
import { Button } from '@mui/material';

function LinearAlgebraCalculator(props){
    
    const developing = () => {
        alert("developing!");
    }

    return (
        <div className="AC">
            <div className='AC-inner'>
                
                <button className="close-btn" onClick={developing}>Matrix Solver</button>
                <br/>
                <button className="cal" onClick={developing}>Linear Transformation Multiplier</button>
                <br/>
                <button className="cal" onClick={developing}>Eigenvalues and Eigenvectors Solver</button>
                <br/>
                <button className="cal" onClick={() => props.setTrigger(false)}>fold</button>
                { props.children }

            </div>
        </div>

        
    )    
}

export default LinearAlgebraCalculator;
