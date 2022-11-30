import { useEffect, useRef } from 'react';
import katex from 'katex';

const KaTeXClearButton = ({ setId, className, tex, handleClick }) => {
    const containerRef = useRef();

    useEffect(() => {
        try {
            katex.render('\\LARGE' + tex, containerRef.current, {
                throwOnError: true
            });
            document.getElementById('error-message').innerHTML = '';
        } catch (e) {
            if (e instanceof katex.ParseError) {
                console.log(e);
                // KaTeX can't parse the expression
                const msg = ("Error in LaTeX '" + tex + "': " + e.message)
                    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                
                console.log(msg);
                document.getElementById('error-message').innerHTML = 'waiting for input...';

            } else {
                throw e;  // other error
            }
        }
    });

    return <button id={ setId } className={ className } onClick={() => handleClick()} ref={ containerRef } style={{ display: 'flex', flexDirection: 'row', flexFlow: 'nowrap', whiteSpace: 'nowrap'}}/>
}

export default KaTeXClearButton