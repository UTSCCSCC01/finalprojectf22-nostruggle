import { useEffect, useRef } from 'react';
import katex from 'katex';

import BlueButton from './BlueButton';

const KatexButton = ({ handleClick, tex, buttonType }) => {
    
    const containerRef = useRef();

    useEffect(() => {
        katex.render(tex, containerRef.current, {
            throwOnError: false
        });
    });


    switch (buttonType) {
        default:
            return <BlueButton onClick={ (e) => handleClick(e) } ref={ containerRef }/>
    }
}

export default KatexButton