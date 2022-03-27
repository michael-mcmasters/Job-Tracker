import React, { useEffect, useState } from 'react';
import JobEntry from './JobEntry';
import Job from "../models/Job"

const JobEntries = () => {
  const [jobsArr, setJobsArr] = useState<Array<Job>>([]);
  
  // ToDo: Fetch jobs from API and add them here.
  useEffect(() => {
    const firstJob: Job = {
      key: 0,
      company: 'Zillow',
      resume: '3.27.22',
      applied: '3.27.22',
      reason: 'Seems like a fun company',
      appUrl: 'https://careers.zillowgroup.com/job/13901012/frontend-software-engineer-remote/'
    };
    const secondJob: Job = {
      key: 0,
      company: 'NVidia',
      resume: '1.1.22',
      applied: '2.2.22',
      reason: 'Highly rated company',
      appUrl: 'https://www.nvidia.com/en-us/about-nvidia/careers/'
    };
    
    setJobsArr([firstJob, secondJob]);
  }, [])
  
  
  return (
    <>
      {jobsArr.map(j => (
        <JobEntry
          key={j.key}
          job={j}
        />
      ))}
    </>
  );
};

export default JobEntries;