import React from 'react';
import './styles/App.css';
import NewJob from './components/NewJob';
import Jobs from './components/Jobs';

function App() {
  return (
    <div className="App">
      <NewJob 
       message='hi'
       num={4}
      />
      
      <Jobs />
    </div>
  );
}

export default App;
