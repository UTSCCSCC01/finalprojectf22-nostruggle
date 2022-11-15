import StudyTimer from '../../../features/Todo/StudyTimer/StudyTimer'
import AlgebraCalculator from '../../../features/AlgebraCalculator/AlgebraCalculator'
import LinearAlgebraCalculator from '../../../features/LinearAlgebraCalculator/LinearAlgebraCalculator'
import IntegralCalculator from '../../../features/IntegralCalculator/IntegralCalculator'
import FactorMultiple from '../../../features/FactorMultiple/FactorMultiple'

import './ToolBar.css'

const ToolsBar = () => {

    return (
        <div className='ToolBar'>
            <StudyTimer/>
            <AlgebraCalculator />
            <IntegralCalculator />
            <LinearAlgebraCalculator/>
            <FactorMultiple />
        </div>
    )
}

export default ToolsBar