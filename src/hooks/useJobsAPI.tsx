import { useState } from "react";
import Job from "../models/Job";
import fakeJobsJSON from "../resources/FakeJobs.json";
import { randomDelay, parseEnvBoolean } from "../utils/commonUtils"

const fetchRealAPI = parseEnvBoolean(process.env.REACT_APP_FETCH_REAL_API);


export default function useJobsAPI() {
  
  const [jobsArr, setJobsArr] = useState<Array<Job>>([]);
  
  async function fetchJobs() {
    await randomDelay();
    
    if (!fetchRealAPI) {
      setJobsArr(fakeJobsJSON.jobs);
      return;
    }
    
    fetch('https://igefue8jt4.execute-api.us-east-1.amazonaws.com/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then(res => {
        res.items.map((i: { key: string; uuid: string; }) => i.key = i.uuid);
        setJobsArr(res.items);
      })
      .catch(error => console.log('Error while fetching:', error));
  }
  
  function addJob(job: Job) {
    setJobsArr([...jobsArr, job])
    
    if (!fetchRealAPI) {
      return;
    }
      
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
  
  return {jobsArr, fetchJobs, addJob};
}