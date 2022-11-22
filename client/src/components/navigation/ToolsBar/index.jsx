import StudyTimer from '../../../features/Todo/StudyTimer/StudyTimer';
import AlgebraCalculator from '../../../features/AlgebraCalculator/AlgebraCalculator.jsx';
import DerivativeCalculator from '../../../features/DerivativeCalculator/DerivativeCalculator.jsx';
import LinearAlgebraCalculator from '../../../features/LinearAlgebraCalculator/LinearAlgebraCalculator';
import IntegralCalculator from '../../../features/IntegralCalculator/IntegralCalculator.jsx';
import FactorMultiple from '../../../features/FactorMultiple/FactorMultiple';

import './ToolBar.css';

const ToolsBar = ({ variant }) => {

    return (
        <div className='ToolBar'>
            <StudyTimer iconVariant={ variant } />
            <AlgebraCalculator iconVariant={ variant } />
            <DerivativeCalculator iconVariant={ variant } />
            <IntegralCalculator iconVariant={ variant } />
            <LinearAlgebraCalculator iconVariant={ variant } />
            <FactorMultiple iconVariant={ variant } />
        </div>
    )
}

export default ToolsBar