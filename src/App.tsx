import React, { useEffect, useState } from 'react';
import styles from './styles/App.module.css';
import NewJob from './components/NewJob';
import JobEntries from './components/JobEntries';
import Job from './models/Job';
import useJobsAPI from './hooks/useJobsAPI';

function App() {
  
  const { jobsArr, fetchJobs, addJob } = useJobsAPI();
  
  useEffect(() => {
    fetchJobs();
  }, [])
  
  return (
    <div className={styles.App}>
      <NewJob addJob={addJob}/>
      <JobEntries jobsArr={jobsArr} />
    </div>
  );
}

export default App;
