import React, { useState } from 'react';

export default function App() {
  const apiLink = 'http://numbersapi.com/';

  const [number, setNumber] = useState('');
  const [type, setType] = useState('trivia');
  const [funFact, setFunFact] = useState('');

  async function getNumFact() {
    try {
      const response = await fetch(`${apiLink}${number}/${type}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
  
      const fact = await response.text();
      setFunFact(fact);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setFunFact('Failed to fetch data. Please check your input.');
    }
  }
  

  return (
    <div>
      <label>
        Enter Number
        <input type='text' onChange={(e) => setNumber(e.target.value)} />
      </label>
      <label>
        Choose type:
        <select onChange={(e) => setType(e.target.value)}>
          <option value='trivia'>Trivia</option>
          <option value='math'>Math</option>
          <option value='date'>Date</option>
          <option value='year'>Year</option>
        </select>
      </label>
      <button onClick={getNumFact}>Get Fact</button>
      <p>{funFact}</p>
    </div>
  );
}
