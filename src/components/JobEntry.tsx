import React from 'react';
import styles from "../styles/Job.module.css";
import Job from "../models/Job"

interface Props {
  job: Job;
}

const JobEntry = (props: Props) => {
  return (
    // <div className={styles.background}>
      // <span>{props.job.company}</span>
      // <span>{props.job.resume}</span>
      // <span>{props.job.applied}</span>
      // <span>{props.job.reason}</span>
      // <p>
      //   <span>{props.job.appUrl}</span>
      // </p>
    // </div>
    
    <>
      {/* <div className="relative m-4 bg-pink-500 rounded-2xl h-fit">
        <div className="absolute bottom-0 right-0 bg-red-50 w-fit">{props.job.company}</div>
        <div>{props.job.resume}</div>
        <div>{props.job.applied}</div>
        <div>{props.job.reason}</div>
        <div>{props.job.appUrl}</div>
      </div> */}
      
      <div className="px-4 py-2 m-4 transition-all duration-100 bg-cyan-400 rounded-2xl h-fit backdrop-blur-3xl hover:bg-pink-600">
        <div className="text-xl">{props.job.company}</div>
        <div className=""><span className="font-bold text-purple-800">Applied: </span> {props.job.applied}</div>
        <div className=""><span className="font-bold text-purple-800">Resume: </span> {props.job.resume}</div>
        <div className=""><span className="font-bold text-purple-800">Application URL: </span><a href={props.job.appUrl}>{props.job.appUrl}</a></div>
        <div className=""><span className="font-bold text-purple-800">Reason: </span> {props.job.reason}</div>
      </div>
    </>
  );
};

export default JobEntry;