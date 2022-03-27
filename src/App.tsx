import React from 'react';
import styles from './styles/App.module.css';
import NewJob from './components/NewJob';
import JobEntries from './components/JobEntries';
import Job from './models/Job';

function App() {
  
  return (
    <div className={styles.App}>
      <NewJob 
       message='hi'
       num={4}
      />
      
      <JobEntries />
    </div>
  );
}

export default App;
