import React, { useEffect, useState } from 'react';
import styles from './styles/App.module.css';
import NewJob from './components/NewJob';
import JobEntries from './components/JobEntries';
import Job from './models/Job';

function App() {
  
  const [jobsArr, setJobsArr] = useState<Array<Job>>([]);

  // ToDo: Fetch jobs from API and add them here.
  useEffect(() => {
    const prepareFakeJobs = () => {
      const firstJob: Job = {
        key: 0,
        company: 'Zillow',
        resume: '3.27.22',
        applied: '3.27.22',
        reason: 'Seems like a fun company',
        appUrl: 'https://careers.zillowgroup.com/job/13901012/frontend-software-engineer-remote/'
      };
      const secondJob: Job = {
        key: 1,
        company: 'NVidia',
        resume: '1.1.22',
        applied: '2.2.22',
        reason: 'Highly rated company',
        appUrl: 'https://www.nvidia.com/en-us/about-nvidia/careers/'
      };
      setJobsArr([firstJob, secondJob]);
    }
    prepareFakeJobs();
  }, [])
  
  function addJob(job: Job): void {
    setJobsArr([...jobsArr, job])
  }
  
  return (
    <div className={styles.App}>
      <NewJob addJob={addJob}/>
      <JobEntries jobsArr={jobsArr} />
    </div>
  );
}

export default App;
