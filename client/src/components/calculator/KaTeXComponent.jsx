import { useEffect, useRef } from 'react';
import katex from 'katex';

const KaTeXComponent = ({ className, tex }) => {
    const containerRef = useRef();

    useEffect(() => {
        katex.render(tex, containerRef.current, {
            throwOnError: false
        });
    });

    return <span className={ className } ref={ containerRef } />
}

export default KaTeXComponent