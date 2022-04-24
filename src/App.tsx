import { useEffect } from 'react';
import styles from './styles/App.module.css';
import NewJob from './components/NewJobForm';
import JobEntries from './components/Jobs';
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
