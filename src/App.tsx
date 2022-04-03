import React, { useEffect, useState } from 'react';
import styles from './styles/App.module.css';
import NewJob from './components/NewJob';
import JobEntries from './components/JobEntries';
import Job from './models/Job';

const fetchRealAPI = false;   // ToDo: Make env variable

function App() {
  
  const [jobsArr, setJobsArr] = useState<Array<Job>>([]);
  
  function fetchAPI() {
    var request = fetch('https://igefue8jt4.execute-api.us-east-1.amazonaws.com/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then(res => {
        console.log(res);
        const items = res.items;
        items.map((i: { key: number; }) => i.key = Math.random());
        setJobsArr(res.items);
      })
      .catch(error => console.log('Error while fetching:', error));
  }
  
  function fetchFakeData() {
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
  
  useEffect(() => {
    if (fetchRealAPI) {
      fetchAPI();
    } else {
      fetchFakeData();
    }
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
