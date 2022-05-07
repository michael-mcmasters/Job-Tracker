import { useState } from "react";
import {default as JobType} from "../models/Job";
import fakeJobsJSON from "../resources/FakeJobs.json";
import { parseEnvBoolean, randomDelay } from "../utils/commonUtils"

const fetchRealAPI = parseEnvBoolean(process.env.REACT_APP_FETCH_REAL_API);


export default function useJobsAPI() {
  
  const [jobsArr, setJobsArr] = useState<Array<JobType>>([]);
  
  async function fetchJobs() {
    if (!fetchRealAPI) {
      await randomDelay();
      setJobsArr(fakeJobsJSON.jobs);
      return;
    }
    
    try {
        const response: Response = await fetch(String(process.env.REACT_APP_FETCH_JOBS_API), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response);
      const resJson = await response.json();
      console.log(resJson);
      resJson.items.map((i: { key: string; uuid: string; }) => i.key = i.uuid);
      setJobsArr(resJson.items);
    } catch(exception: unknown) {
      console.log('Error while fetching: ' + exception);
    }
  }
  
  
  function postJob(job: JobType) {
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
    
    fetch(String(process.env.REACT_APP_POST_JOB_API), requestOptions)
      .then(response => response.text())
      .then(result => console.log("Job posted to server: " + result))
      .catch(error => console.log('error', error));
  }
  
  
  function postResumeToS3(file: File, fileName: string): Promise<string | void> {
    if (!fetchRealAPI)
      return new Promise<void>((resolve, reject) => {resolve()})
    
    const headers = new Headers();
    headers.append("Content-Type", "application/pdf");

    const api = String(process.env.REACT_APP_POST_RESUME_API) + fileName + ".pdf";
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: headers,
      body: file
    };
    
    return fetch(api, requestOptions)
      .then(response => response.text())
      .then(result => console.log("Resume posted to s3: " + result))
      .catch(error => console.log('error', error));
  }
  
  
  function getResumeFromS3(fileName: string): Promise<string | void> {
    if (!fetchRealAPI)
      return new Promise<string>((resolve, reject) => { resolve("") })
    
    const api = String(process.env.REACT_APP_GET_RESUME_API) + fileName;
      
    return fetch(api)
      .then(response => response.blob())
      .then(pdfBlob => URL.createObjectURL(pdfBlob))
      .catch(error => console.log('error', error));
  }
  
  
  return {jobsArr, fetchJobs, postJob, postResumeToS3, getResumeFromS3};
}