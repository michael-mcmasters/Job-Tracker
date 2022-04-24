import React from 'react';
import JobEntry from './Job';
import {default as JobType} from "../models/job"

interface Props {
  jobsArr: Array<JobType>
}


const Job = (props: Props) => {

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


function sortByAppliedDate(jobsArr: Array<JobType>): Array<JobType> {
  return jobsArr.sort((a, b) => {
    if (a.applied < b.applied) {
      return 1;
    }
    return -1;
  });
}

export default Job;