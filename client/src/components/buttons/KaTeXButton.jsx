import { useEffect, useRef } from 'react';
import katex from 'katex';

import RedButton from './RedButton';
import GreenButton from './GreenButton';
import BlueButton from './BlueButton';

const KatexButton = ({ handleClick, tex, buttonColour }) => {
    
    const containerRef = useRef();

    useEffect(() => {
        katex.render(tex, containerRef.current, {
            throwOnError: false
        });
    });


    switch (buttonColour) {
        case 'red':
            return <RedButton onClick={ (e) => handleClick(e) } ref={ containerRef } />
        case 'green':
            return <GreenButton onClick={ (e) => handleClick(e) } ref={ containerRef } />
        default:
            return <BlueButton onClick={ (e) => handleClick(e) } ref={ containerRef }/>
    }
}

export default KatexButton