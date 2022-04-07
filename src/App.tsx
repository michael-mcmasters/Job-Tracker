import React, { useEffect, useState } from 'react';
import styles from './styles/App.module.css';
import NewJob from './components/NewJob';
import JobEntries from './components/JobEntries';
import Job from './models/Job';
import fakeJobsJSON from "./resources/FakeJobs.json";

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
  
  useEffect(() => {
    if (fetchRealAPI) {
      fetchAPI();
    } else {
      setJobsArr(fakeJobsJSON.jobs);
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
