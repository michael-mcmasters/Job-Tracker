import React, { useEffect, useState } from 'react';
import JobEntry from './JobEntry';
import Job from "../models/Job"

interface Props {
  jobsArr: Array<Job>
}

const JobEntries = (props: Props) => {
    
  return (
    <>
      {props.jobsArr.map(j => (
        <JobEntry
          key={j.key}
          job={j}
        />
      ))}
    </>
  );
};

export default JobEntries;