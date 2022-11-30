import StudyTimer from '../../../features/Todo/StudyTimer/StudyTimer';
import StandardCalculator from '../../../features/StandardCalculator/StandardCalculator';
import DerivativeCalculator from '../../../features/DerivativeCalculator/DerivativeCalculator';
import MatrixCalculator from '../../../features/MatrixCalculator/MatrixCalculator';
import IntegralCalculator from '../../../features/IntegralCalculator/IntegralCalculator';
import FactorMultiple from '../../../features/FactorMultiple/FactorMultiple';

import './ToolBar.css';

const ToolsBar = ({ variant }) => {

    return (
        <div className='ToolBar'>
            <StudyTimer iconVariant={ variant } />
            <StandardCalculator iconVariant={ variant } />
            <DerivativeCalculator iconVariant={ variant } />
            <IntegralCalculator iconVariant={ variant } />
            <MatrixCalculator iconVariant={ variant } />
            <FactorMultiple iconVariant={ variant } />
        </div>
    )
}

export default ToolsBar