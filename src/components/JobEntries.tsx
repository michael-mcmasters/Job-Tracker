import React from 'react';
import JobEntry from './JobEntry';
import Job from "../models/Job"

interface Props {
  jobsArr: Array<Job>
}


const JobEntries = (props: Props) => {

  const sortedJobsArr = sortByAppliedDate(props.jobsArr);
  
  return (
    <>
      {sortedJobsArr.map(j => (
        <JobEntry
          key={j.key}
          job={j}
        />
      ))}
    </>
  );
};


function sortByAppliedDate(jobsArr: Array<Job>): Array<Job> {
  return jobsArr.sort((a, b) => {
    if (a.applied < b.applied) {
      return 1;
    }
    return -1;
  });
}

export default JobEntries;