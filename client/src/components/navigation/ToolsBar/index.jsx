import StudyTimerIcon from '../../../features/Todo/StudyTimer/StudyTimerIcon';
import StandardCalculatorIcon from '../../../features/StandardCalculator/StandardCalculatorIcon';
import DerivativeCalculatorIcon from '../../../features/DerivativeCalculator/DerivativeIcon';
import MatrixIcon from '../../../features/MatrixCalculator/MatrixIcon';
import IntegralCalculatorIcon from '../../../features/IntegralCalculator/IntegralIcon';
import FactorMultipleIcon from '../../../features/FactorMultiple/FactorMultipleIcon';

import './ToolBar.css';

const ToolsBar = ({ variant }) => {

    return (
        <div className='ToolBar'>
            <StudyTimerIcon iconVariant={ variant } />
            <StandardCalculatorIcon iconVariant={ variant } />
            <DerivativeCalculatorIcon iconVariant={ variant } />
            <IntegralCalculatorIcon iconVariant={ variant } />
            <MatrixIcon iconVariant={ variant } />
            <FactorMultipleIcon iconVariant={ variant } />
        </div>
    )
}

export default ToolsBar