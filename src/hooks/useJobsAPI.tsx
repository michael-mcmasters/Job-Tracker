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
      
    const headers = new Headers();
    headers.append("Content-Type", "text/plain");

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(job)
    };
    
    fetch("https://igefue8jt4.execute-api.us-east-1.amazonaws.com/", requestOptions)
      .then(response => response.text())
      .then(result => console.log("API Result is " + result))
      .catch(error => console.log('error', error));
  }
  
  function postResumeToS3(file: File) {
    const headers = new Headers();
    headers.append("Content-Type", "application/pdf");

    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: headers,
      body: file
    };

    fetch("https://wlxw76ft60.execute-api.us-east-1.amazonaws.com/prod/job-tracker-resumes/first-file.pdf", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  function getResumeFromS3() {
    // fetch("https://8rd8pikf9c.execute-api.us-east-1.amazonaws.com/prod/job-tracker-resumes/abc.jpeg")             // image
    return fetch("https://8rd8pikf9c.execute-api.us-east-1.amazonaws.com/prod/job-tracker-resumes/first-file.pdf")   // pdf
      .then(response => response.blob())
      .then(pdfBlob => URL.createObjectURL(pdfBlob))
      .catch(error => console.log('error', error));
  }
  
  return {jobsArr, fetchJobs, addJob, postResumeToS3, getResumeFromS3};
}