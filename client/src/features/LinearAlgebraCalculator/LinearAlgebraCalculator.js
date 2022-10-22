import React from 'react';
import { Button } from '@mui/material';
function LinearAlgebraCalculator(props){

    const developing = () => {
        alert("developing!");
    }

    function loadPage()
    {
    
        window.open("./Testing/TestUI.html");
    
    }

    return (props.trigger) ? (
        <div className="AC">
            <div className='AC-inner'>

                <a href="Testing/TestUI.html"><button>Matrix Calculator</button></a>
                <br/>
                <button className="cal" onClick={window.open("https://www.3schools.in")}>Linear Transformation Multiplier</button>
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
