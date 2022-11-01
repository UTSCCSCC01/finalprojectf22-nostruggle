import React from 'react';
import { Button } from '@mui/material';
function LinearAlgebraCalculator(props){

    const developing = () => {
        alert("developing!");
    }

    function loadPage()
    {
        const url = 'file:///E:/c01%20project/client/src/features/LinearAlgebraCalculator/MatrixCalculatorUI.html';
        window.open(url);
    
    }

    return (props.trigger) ? (
        <div className="AC">
            <div className='AC-inner'>

                <a href="file:///E:/c01%20project/client/src/features/LinearAlgebraCalculator/MatrixCalculatorUI.html"><button>Matrix Calculator</button></a>
                <br/>
                <button className="cal" onClick={loadPage()}>Linear Transformation Multiplier</button>
                <br/>
                <button className="cal" onClick={developing}>Eigenvalues and Eigenvectors Solver</button>
                <br/>
                <button className="btn-close" onClick={() => props.setTrigger(false)}>fold</button>
                { props.children }

            </div>
        </div>


    ) : "";



}

export default LinearAlgebraCalculator;
