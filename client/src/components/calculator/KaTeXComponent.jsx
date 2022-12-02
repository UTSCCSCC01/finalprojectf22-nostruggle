import { useEffect, useRef } from 'react';
import katex from 'katex';

const KaTeXComponent = ({ className, tex, onClick }) => {
    const containerRef = useRef();

    useEffect(() => {
        katex.render(tex, containerRef.current, {
            throwOnError: false
        });
    });

    return <span className={ className } ref={ containerRef } onClick={ onClick }/>
}

export default KaTeXComponent