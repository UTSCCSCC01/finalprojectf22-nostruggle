import { useState } from 'react';

const ExponentField = () => {

    const [ entry, setEntry ] = useState({ base: ' ', power: ' ' })

    function resizeInput(type) {
        switch(type) {
            case 'base':
                return entry.base.length === 0 ? 1 : entry.base.length;
            case 'power':
                return entry.power.length === 0 ? 1 : entry.power.length;
            default:
                return 1;
        }
    }

    return (
        <>
            <input className='ExponentBase' 
                size={ resizeInput('base') } 
                onChange={ (e) => setEntry({ ...entry, base: e.target.value })} />

            <input className='ExponentPower' 
                size={ resizeInput('power') } 
                onChange={ (e) => setEntry({ ...entry, power: e.target.value })} />
        </>
    )
}

export default ExponentField