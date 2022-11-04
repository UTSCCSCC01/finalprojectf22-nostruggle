import MatrixCalculator from './MatrixCalculator';
import './MatrixCalculatorUI.css'


const MatrixCalculatorUI = () => {

    var mc = new MatrixCalculator();

    return ( 
    <>
        <div id="upper">
            <div id="matrix1" class="parent">
                <h1 className="title">Matrix A</h1>
                <input className="m1r1" type="text" defaultValue ="0"/>
                <input className="m1r1" type="text" defaultValue ="0"/>
                <input className="m1r1" type="text" defaultValue ="0"/>
                <input className="m1r2" type="text" defaultValue ="0"/>
                <input className="m1r2" type="text" defaultValue ="0"/>
                <input className="m1r2" type="text" defaultValue ="0"/>
                <input className="m1r3" type="text" defaultValue ="0"/>
                <input className="m1r3" type="text" defaultValue ="0"/>
                <input className="m1r3" type="text" defaultValue ="0"/>		
                <div className="functions">
                    <input className="function" type="button" defaultValue ="Determinant" onClick={ mc.calculateDeterminant }/>
                    <input className="function" type="button" defaultValue ="Transpose" onClick={ mc.transposeMatrix }/>
                    <input className="function" type="button" defaultValue ="Invert" onClick={ mc.invertMatrix }/>
                    <input className="function" type="button" defaultValue ="Rank" onClick={ mc.calculateRank }/>
                </div>
            </div>
            <div id="operations">
                <input className="operation" type="button" defaultValue ="A x B" onClick={ mc.multiplyMatrix }/>
                <input className="operation" type="button" defaultValue ="A + B" onClick={ mc.addMatrix }/>
                <input className="operation" type="button" defaultValue ="A - B" onClick={ mc.subtractMatrix }/>
            </div>
            <div id="matrix2" className="parent">
                <h1 className="title">Matrix B</h1>
                <input className="m2r1" type="text" defaultValue ="0"/>
                <input className="m2r1" type="text" defaultValue ="0"/>
                <input className="m2r1" type="text" defaultValue ="0"/>
                <input className="m2r2" type="text" defaultValue ="0"/>
                <input className="m2r2" type="text" defaultValue ="0"/>
                <input className="m2r2" type="text" defaultValue ="0"/>
                <input className="m2r3" type="text" defaultValue ="0"/>
                <input className="m2r3" type="text" defaultValue ="0"/>
                <input className="m2r3" type="text" defaultValue ="0"/>		
            </div>
        </div>
        <br/>
        <div id="lower">
            <textarea wrap="soft" rows="10" cols="20" id="console" disabled></textarea>
        </div>
    </>
    )
}

export default MatrixCalculatorUI