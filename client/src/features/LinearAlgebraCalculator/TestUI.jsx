
const TestUI = () => {
    return ( 
    <>
        <div id="upper">
            <div id="matrix1" class="parent">
                <h1 className="title">Matrix A</h1>
                <input className="m1r1" type="text" value="0"/>
                <input className="m1r1" type="text" value="0"/>
                <input className="m1r1" type="text" value="0"/>
                <input className="m1r2" type="text" value="0"/>
                <input className="m1r2" type="text" value="0"/>
                <input className="m1r2" type="text" value="0"/>
                <input className="m1r3" type="text" value="0"/>
                <input className="m1r3" type="text" value="0"/>
                <input className="m1r3" type="text" value="0"/>		
                <div className="functions">
                    <input className="function" type="button" value="Determinant" onclick="mc.calculateDeterminant()"/>
                    <input className="function" type="button" value="Transpose" onclick="mc.transposeMatrix()"/>
                    <input className="function" type="button" value="Invert" onclick="mc.invertMatrix()"/>
                    <input className="function" type="button" value="Rank" onclick="mc.calculateRank()"/>
                </div>
            </div>
            <div id="operations">
                <input className="operation" type="button" value="A x B" onclick="mc.multiplyMatrix()"/>
                <input className="operation" type="button" value="A + B" onclick="mc.addMatrix()"/>
                <input className="operation" type="button" value="A - B" onclick="mc.subtractMatrix()"/>
            </div>
            <div id="matrix2" className="parent">
                <h1 className="title">Matrix B</h1>
                <input className="m2r1" type="text" value="0"/>
                <input className="m2r1" type="text" value="0"/>
                <input className="m2r1" type="text" value="0"/>
                <input className="m2r2" type="text" value="0"/>
                <input className="m2r2" type="text" value="0"/>
                <input className="m2r2" type="text" value="0"/>
                <input className="m2r3" type="text" value="0"/>
                <input className="m2r3" type="text" value="0"/>
                <input className="m2r3" type="text" value="0"/>		
            </div>
        </div>
        <br/>
        <div id="lower">
            <textarea wrap="soft" rows="10" cols="20" id="console" disabled></textarea>
        </div>
    </>
    )
}

export default TestUI