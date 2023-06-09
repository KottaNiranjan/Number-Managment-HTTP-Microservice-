import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numbers, setNumbers] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const fetchNumbers = async () => {
    const api = [
      'http://104.211.219.98/numbers/primes',
      'http://104.211.219.98/numbers/fibo',
    ];

    try {
      const prom = api.map(async (url) => {
        await delay(2000)
        const response = await axios.get(url);
        return response.data.numbers;
      });

      const results = await Promise.all(prom);
      const mergedNumbers = [...new Set(results.flat())];
      setNumbers(mergedNumbers);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  return (
    <div className="App" >
      <h1>Number Management App</h1>
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      <ul >
        {}
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

