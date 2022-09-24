import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import axios from 'axios'
function App() {

  const [ msg, setMsg ] = useState( "this is not the data" )
  
  const getMsg = () => {
    axios.get('http://localhost:5000/test').then(res => setMsg(res.data.message)).catch( err => setMsg(err.message))
  }

  return (
    <div className="App">
      <button onClick={getMsg}>Click button to get data:</button>
      <h2>Message: {`${ msg }`} </h2>
    </div>
  );
}

export default App;
