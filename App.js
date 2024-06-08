import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
   const [numberId,setNumberId] = useState('');
   const [data, setData] = useState(null);
   const [error, setError] = useState('');

   const handleCh = (event) => {
    setNumberId(event.target.value);
   };
   const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.get('http://localhost:9876/numbers/${numberId}');
      setData(response.data);
    } catch(error) {
      setError('failed');
    }
   };
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>calculator</h1>
        <form onSubmit={handleSubmit}>
          <input
          type="text"
          value={numberId}
          onChange={handleCh}
          placeholder="enter number id (p,f e,r)"/>
          <button type="submit">fetch number</button>
        </form>
        {error && <p className="error">{error}</p>}
        {data && (
          <div className="result">
            <h2>results:</h2>
            <p>previous state: {JSON.stringify(data.windowPrevState)}</p>
            <p>numbers: {JSON.stringify(data.numbers)}</p>
            <p> current state : {JSON.stringify(data.CurrentState)}</p>
            <p>Average : {data.avg}</p>
          </div>
        )
        }
      </header>
    </div>
  );
}

export default App;
