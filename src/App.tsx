import React, { useEffect, useState } from 'react';
import styles from './styles/App.module.css';
import NewJob from './components/NewJob';
import JobEntries from './components/JobEntries';
import Job from './models/Job';

const fetchRealAPI = process.env.REACT_APP_FETCH_REAL_API === "true" ? true : false

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
        res.items.map((i: { key: string; uuid: string; }) => i.key = i.uuid);
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
      console.log(true);
      fetchAPI();
    } else {
      console.log(false)
      fetchFakeData();
    }
  }, [])
  
  function addJob(job: Job): void {
    setJobsArr([...jobsArr, job])
    
    if (!fetchRealAPI)
      return;
    
      
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(job)
    };
    
    fetch("https://igefue8jt4.execute-api.us-east-1.amazonaws.com/", requestOptions)
      .then(response => response.text())
      .then(result => console.log("API Result is " + result))
      .catch(error => console.log('error', error));
  }
  
  return (
    <div className={styles.App}>
      <NewJob addJob={addJob}/>
      <JobEntries jobsArr={jobsArr} />
    </div>
  );
}

export default App;
