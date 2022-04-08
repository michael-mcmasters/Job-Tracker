import React, { useEffect, useState } from 'react';
import JobEntry from './JobEntry';
import Job from "../models/Job"

interface Props {
  jobsArr: Array<Job>
}

const JobEntries = (props: Props) => {
  
  const arr = props.jobsArr.sort((a, b) => {
    if (a.applied < b.applied) {
      return 1;
    }
    return -1;
  });
  
  return (
    <>
      {arr.map(j => (
        <JobEntry
          key={j.key}
          job={j}
        />
      ))}
    </>
  );
};

export default JobEntries;