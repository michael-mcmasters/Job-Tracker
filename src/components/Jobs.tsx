import React from 'react';
import JobEntry from './Job';
import {default as JobType} from "../models/Job"
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  jobsArr: Array<JobType>
}


const Job = (props: Props) => {
  
  if (props.jobsArr.length === 0) {
    return (
      <div className="mx-auto mt-20 w-fit">
        <ClipLoader size={150} />
      </div>
    )
  }
  
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


function sortByAppliedDate(jobs: Array<JobType>): Array<JobType> {
  const greatestToLowest = (jobA: JobType, jobB: JobType) => {
    if (toFormattedNumber(jobA.applied) < toFormattedNumber(jobB.applied))
      return 1; 
    return -1;
  }
  const sorted = jobs.sort(greatestToLowest);
  return sorted;
}


// Takes date formatted as 10.14.22 and returns as a number, 101422
// Makes sure all numbers between periods are 2 digits. So 5.4.2022 becomes 05.04.22 which becomes 050422
function toFormattedNumber(dateStr: string) {
  const split: string[] = dateStr.split(".");                 // [5, 4, 2022]
  if (split[0].length === 1) {                  
    split[0] = "0" + split[0];                                // 05
  }
  if (split[1].length === 1) {                  
    split[1] = "0" + split[1];                                // 04
  }
  if (split[2].length === 4) {
    split[2] = split[2].charAt(2) + split[2].charAt(3);       // 22
  }
  return Number(split[0] + split[1] + split[2]);              // 050422
}


export default Job;