import { useState } from "react";
import {default as JobType} from "../models/Job";
import fakeJobsJSON from "../resources/FakeJobs.json";
import { parseEnvBoolean, randomDelay } from "../utils/commonUtils"

const fetchRealAPI = parseEnvBoolean(process.env.REACT_APP_FETCH_REAL_API);


export default function useJobsAPI() {
  
  const [jobsArr, setJobsArr] = useState<Array<JobType>>([]);
  
  async function fetchJobs() {
    await randomDelay();
    
    if (!fetchRealAPI) {
      setJobsArr(fakeJobsJSON.jobs);
      return;
    }
    
    try {
      const response: Response = await fetch('https://igefue8jt4.execute-api.us-east-1.amazonaws.com/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const resJson = await response.json();
      resJson.items.map((i: { key: string; uuid: string; }) => i.key = i.uuid);
      setJobsArr(resJson.items);
    } catch(exception: unknown) {
      console.log('Error while fetching:', exception);
    }
  }
  
  function addJob(job: JobType) {
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
  
  function postResumeToS3() {
    
  }
  
  return {jobsArr, fetchJobs, addJob};
}