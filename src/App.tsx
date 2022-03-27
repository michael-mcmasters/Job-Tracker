import React from 'react';
import styles from './styles/App.module.css';
import NewJob from './components/NewJob';
import Jobs from './components/Jobs';

function App() {
  return (
    <div className={styles.App}>
      <NewJob 
       message='hi'
       num={4}
      />
      
      <Jobs />
    </div>
  );
}

export default App;
